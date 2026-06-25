#!/usr/bin/env python3
"""
Collect AI news inputs, ask local Codex to write the brief, and save it to docs/daily/YYYY-MM-DD.md.

Usage:
  python scripts/generate_daily.py
  python scripts/generate_daily.py --date 2026-06-25 --overwrite
  python scripts/generate_daily.py --collect-only --context-out tmp/daily-context.json
"""

from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import os
import re
import shutil
import ssl
import subprocess
import sys
import tempfile
import textwrap
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
SPEC_PATH = ROOT / "docs" / "chapter1" / "news-sources.md"
DAILY_DIR = ROOT / "docs" / "daily"

RSS_SOURCES = [
    ("36氪", "https://www.36kr.com/feed"),
    ("虎嗅", "https://rss.huxiu.com/"),
    ("IT之家", "http://www.ithome.com/rss/"),
    ("InfoQ", "https://feed.infoq.com/ai-ml-data-eng/"),
]

AI_KEYWORDS = [
    "ai",
    "aigc",
    "agent",
    "agents",
    "chatgpt",
    "claude",
    "copilot",
    "deepseek",
    "diffusion",
    "gemini",
    "gpt",
    "llm",
    "openai",
    "rag",
    "人工智能",
    "大模型",
    "多模态",
    "机器学习",
    "模型",
    "生成式",
    "智能体",
    "具身",
    "自动驾驶",
    "机器人",
    "推理",
    "算力",
]


@dataclass
class FeedItem:
    source: str
    title: str
    link: str
    summary: str = ""
    published: str = ""


@dataclass
class ArxivItem:
    arxiv_title: str
    arxiv_link: str
    summary: str = ""
    published: str = ""
    authors: list[str] | None = None


@dataclass
class GitHubItem:
    title: str
    link: str
    description: str = ""
    language: str = ""
    stars: int = 0
    forks: int = 0
    updated_at: str = ""


def fetch_text(url: str, timeout: int = 30, token: str | None = None) -> str:
    headers = {
        "User-Agent": "dailynews-ai-brief/1.0 (+https://github.com/)",
        "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml, application/json, text/html;q=0.8, */*;q=0.5",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"

    request = urllib.request.Request(url, headers=headers)
    try:
        return open_url_text(request, timeout)
    except urllib.error.URLError as exc:
        if "CERTIFICATE_VERIFY_FAILED" not in str(exc):
            raise
        insecure_context = ssl._create_unverified_context()
        return open_url_text(request, timeout, context=insecure_context)


def open_url_text(
    request: urllib.request.Request,
    timeout: int,
    context: ssl.SSLContext | None = None,
) -> str:
    with urllib.request.urlopen(request, timeout=timeout, context=context) as response:
        raw = response.read()
        content_type = response.headers.get("content-type", "")
        match = re.search(r"charset=([\w.-]+)", content_type, flags=re.I)
        encoding = match.group(1) if match else "utf-8"
        return raw.decode(encoding, errors="replace")


def strip_html(value: str) -> str:
    value = re.sub(r"(?is)<(script|style).*?</\1>", " ", value or "")
    value = re.sub(r"(?s)<[^>]+>", " ", value)
    value = html.unescape(value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def truncate(value: str, limit: int = 360) -> str:
    value = strip_html(value)
    if len(value) <= limit:
        return value
    return value[: limit - 1].rstrip() + "…"


def local_name(tag: str) -> str:
    return tag.rsplit("}", 1)[-1].lower()


def first_child_text(element: ET.Element, names: set[str]) -> str:
    for child in list(element):
        if local_name(child.tag) in names and child.text:
            return child.text.strip()
    return ""


def parse_feed(source: str, xml_text: str, limit: int) -> list[FeedItem]:
    root = ET.fromstring(xml_text)
    root_name = local_name(root.tag)

    if root_name == "rss":
        channel = next((child for child in root if local_name(child.tag) == "channel"), root)
        entries = [child for child in channel if local_name(child.tag) == "item"]
    elif root_name == "feed":
        entries = [child for child in root if local_name(child.tag) == "entry"]
    else:
        entries = [child for child in root.iter() if local_name(child.tag) in {"item", "entry"}]

    items: list[FeedItem] = []
    for entry in entries[:limit * 2]:
        title = truncate(first_child_text(entry, {"title"}), 180)
        link = first_child_text(entry, {"link"})
        summary = first_child_text(entry, {"description", "summary", "content", "encoded"})
        published = first_child_text(entry, {"pubdate", "published", "updated", "date"})

        if not link:
            for child in list(entry):
                if local_name(child.tag) == "link":
                    link = child.attrib.get("href", "").strip()
                    if link:
                        break

        if title and link:
            items.append(
                FeedItem(
                    source=source,
                    title=title,
                    link=link,
                    summary=truncate(summary),
                    published=truncate(published, 80),
                )
            )
        if len(items) >= limit:
            break
    return items


def is_ai_related(item: FeedItem) -> bool:
    haystack = f"{item.title} {item.summary}".lower()
    return any(keyword.lower() in haystack for keyword in AI_KEYWORDS)


def collect_rss(limit_per_source: int) -> tuple[list[FeedItem], list[str]]:
    all_items: list[FeedItem] = []
    errors: list[str] = []

    for source, url in RSS_SOURCES:
        try:
            xml_text = fetch_text(url)
            items = parse_feed(source, xml_text, limit_per_source)
            ai_items = [item for item in items if is_ai_related(item)]
            all_items.extend(ai_items or items[: max(3, limit_per_source // 3)])
        except (urllib.error.URLError, TimeoutError, ET.ParseError, UnicodeError) as exc:
            errors.append(f"{source} ({url}) 抓取失败：{exc}")

    return all_items, errors


def collect_arxiv(max_results: int) -> tuple[list[ArxivItem], list[str]]:
    query = 'cat:cs.AI OR cat:cs.CL OR cat:cs.LG OR cat:cs.CV OR cat:stat.ML'
    params = urllib.parse.urlencode(
        {
            "search_query": query,
            "sortBy": "submittedDate",
            "sortOrder": "descending",
            "max_results": str(max_results),
        }
    )
    url = f"https://export.arxiv.org/api/query?{params}"
    errors: list[str] = []

    try:
        xml_text = fetch_text(url, timeout=45)
        root = ET.fromstring(xml_text)
    except (urllib.error.URLError, TimeoutError, ET.ParseError, UnicodeError) as exc:
        return [], [f"arXiv 抓取失败：{exc}"]

    entries = [child for child in root if local_name(child.tag) == "entry"]
    items: list[ArxivItem] = []

    for entry in entries[:max_results]:
        title = truncate(first_child_text(entry, {"title"}), 220)
        summary = truncate(first_child_text(entry, {"summary"}), 500)
        published = truncate(first_child_text(entry, {"published", "updated"}), 80)
        authors = [
            first_child_text(child, {"name"})
            for child in list(entry)
            if local_name(child.tag) == "author"
        ]
        authors = [author for author in authors if author]
        link = ""

        for child in list(entry):
            if local_name(child.tag) != "link":
                continue
            if child.attrib.get("title") == "pdf" or child.attrib.get("type") == "application/pdf":
                link = child.attrib.get("href", "")
                break
            link = link or child.attrib.get("href", "")

        if title and link:
            items.append(
                ArxivItem(
                    arxiv_title=title,
                    arxiv_link=link,
                    summary=summary,
                    published=published,
                    authors=authors[:5],
                )
            )

    return items, errors


def collect_github(max_results: int, days: int) -> tuple[list[GitHubItem], list[str]]:
    since = (dt.date.today() - dt.timedelta(days=days)).isoformat()
    queries = [
        f"topic:artificial-intelligence stars:>100 pushed:>={since}",
        f"topic:llm stars:>50 pushed:>={since}",
        f"topic:ai-agent stars:>20 pushed:>={since}",
        f"topic:generative-ai stars:>50 pushed:>={since}",
    ]
    token = os.environ.get("GITHUB_TOKEN")
    errors: list[str] = []
    repos: dict[str, GitHubItem] = {}

    for query in queries:
        params = urllib.parse.urlencode(
            {
                "q": query,
                "sort": "stars",
                "order": "desc",
                "per_page": str(min(30, max_results)),
            }
        )
        url = f"https://api.github.com/search/repositories?{params}"
        try:
            payload = json.loads(fetch_text(url, timeout=45, token=token))
        except (urllib.error.URLError, TimeoutError, UnicodeError, json.JSONDecodeError) as exc:
            errors.append(f"GitHub 查询失败：{query}；{exc}")
            continue

        for repo in payload.get("items", []):
            name = repo.get("full_name") or repo.get("name")
            link = repo.get("html_url", "")
            if not name or not link or name in repos:
                continue
            repos[name] = GitHubItem(
                title=name,
                link=link,
                description=truncate(repo.get("description") or "", 300),
                language=repo.get("language") or "",
                stars=int(repo.get("stargazers_count") or 0),
                forks=int(repo.get("forks_count") or 0),
                updated_at=repo.get("updated_at") or "",
            )

    items = sorted(repos.values(), key=lambda repo: (repo.stars, repo.forks), reverse=True)
    return items[:max_results], errors


def build_prompt(date: str, spec: str, context: dict[str, Any]) -> str:
    context_json = json.dumps(context, ensure_ascii=False, indent=2)
    return textwrap.dedent(
        f"""
        你将根据给定规范和采集结果，生成当天 AI 前沿科技简报。

        生成日期：{date}

        重要要求：
        - 只输出最终 Markdown 正文，不要解释过程，不要使用代码围栏包裹。
        - 严格遵循“新闻来源与日报规范”中的角色、工作流、输出数量和格式。
        - 标题必须使用：# AI简报 by@leftshift {date}
        - 必须输出 3 个模块：🚀 AI技术新闻、📚 AI学术论文、💻 AI开源项目。
        - 内容总量尽量固定为 10 条 AI 技术新闻、5 篇 AI 学术论文、5 个 AI 开源项目。
        - 不要编造链接；只能使用采集结果中的原始链接。
        - 优先选择 AI、LLM、AIGC、大模型、智能体、机器人、算力、AI 编程相关内容。
        - 排除广告、营销、无关公司消息和非 AI 内容。
        - 每个条目都要有独有 Emoji、标题、链接、概况。

        ## 新闻来源与日报规范

        {spec}

        ## 采集结果

        ```json
        {context_json}
        ```
        """
    ).strip()


def resolve_codex_bin(codex_bin: str) -> Path:
    candidate = Path(codex_bin).expanduser()
    if candidate.exists():
        return candidate

    names = [codex_bin]
    if os.name == "nt" and Path(codex_bin).suffix == "":
        names.extend([f"{codex_bin}.cmd", f"{codex_bin}.CMD", f"{codex_bin}.exe"])

    for name in names:
        resolved = shutil.which(name)
        if resolved:
            return Path(resolved)

    if os.name == "nt":
        user_profile = Path(os.environ.get("USERPROFILE", ""))
        appdata = os.environ.get("APPDATA")
        common_candidates = []
        if appdata:
            common_candidates.extend(
                [
                    Path(appdata) / "npm" / "codex.cmd",
                    Path(appdata) / "npm" / "codex.CMD",
                ]
            )
        if user_profile:
            common_candidates.extend(user_profile.glob(".vscode/extensions/openai.chatgpt-*/bin/windows-*/codex.exe"))

        for path in common_candidates:
            if path.exists():
                return path

    raise FileNotFoundError(
        "找不到 Codex CLI。请确认命令行可以执行 `codex --help`，"
        "或者使用 --codex-bin 传入完整路径，例如："
        r'--codex-bin "C:\Users\你的用户名\AppData\Roaming\npm\codex.cmd"'
    )


def build_codex_command(codex_bin: str, model: str | None, last_message: Path) -> list[str]:
    resolved = resolve_codex_bin(codex_bin)
    executable = str(resolved)
    args = [
        "exec",
        "--sandbox",
        "read-only",
        "--output-last-message",
        str(last_message),
        "-",
    ]
    if model:
        args[1:1] = ["--model", model]

    if os.name == "nt" and resolved.suffix.lower() in {".cmd", ".bat"}:
        comspec = os.environ.get("COMSPEC", "cmd.exe")
        return [comspec, "/d", "/c", executable, *args]

    return [executable, *args]


def run_codex(prompt: str, output_path: Path, codex_bin: str, model: str | None, timeout: int) -> str:
    with tempfile.TemporaryDirectory(prefix="daily-codex-") as temp_dir:
        last_message = Path(temp_dir) / "last-message.md"
        command = build_codex_command(codex_bin, model, last_message)

        try:
            completed = subprocess.run(
                command,
                input=prompt,
                text=True,
                cwd=ROOT,
                capture_output=True,
                timeout=timeout,
                encoding="utf-8",
                errors="replace",
            )
        except FileNotFoundError as exc:
            raise RuntimeError(str(exc)) from exc

        if completed.returncode != 0:
            details = "\n".join(
                part
                for part in [
                    completed.stdout.strip(),
                    completed.stderr.strip(),
                ]
                if part
            )
            raise RuntimeError(f"codex exec 失败，退出码 {completed.returncode}\n{details}")

        if last_message.exists():
            content = last_message.read_text(encoding="utf-8").strip()
        else:
            content = completed.stdout.strip()

    content = clean_markdown(content)
    if not content.startswith("# "):
        raise RuntimeError("Codex 输出不像 Markdown 日报：缺少一级标题。")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(content.rstrip() + "\n", encoding="utf-8")
    return content


def clean_markdown(content: str) -> str:
    content = content.strip()
    fence = re.fullmatch(r"```(?:markdown|md)?\s*(.*?)\s*```", content, flags=re.S | re.I)
    if fence:
        return fence.group(1).strip()
    return content


def write_context(path: Path, context: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(context, ensure_ascii=False, indent=2), encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="采集 AI 信息源并调用本地 Codex 生成 Daily Markdown。")
    parser.add_argument("--date", default=dt.date.today().isoformat(), help="日报日期，格式 YYYY-MM-DD。")
    parser.add_argument("--output", help="输出文件路径，默认 docs/daily/YYYY-MM-DD.md。")
    parser.add_argument("--overwrite", action="store_true", help="允许覆盖已存在的日报文件。")
    parser.add_argument("--collect-only", action="store_true", help="只采集上下文，不调用 Codex。")
    parser.add_argument("--context-out", help="保存采集上下文 JSON，便于调试。")
    parser.add_argument("--codex-bin", default=os.environ.get("CODEX_BIN", "codex"), help="Codex CLI 路径。")
    parser.add_argument("--model", help="传给 codex exec 的模型名。")
    parser.add_argument("--codex-timeout", type=int, default=900, help="Codex 生成超时时间，单位秒。")
    parser.add_argument("--feed-limit", type=int, default=20, help="每个 RSS 源最多读取条数。")
    parser.add_argument("--arxiv-limit", type=int, default=20, help="最多读取 arXiv 论文数。")
    parser.add_argument("--github-limit", type=int, default=20, help="最多读取 GitHub 项目数。")
    parser.add_argument("--github-days", type=int, default=14, help="GitHub 项目 pushed 时间窗口，单位天。")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    date = args.date
    output_path = Path(args.output) if args.output else DAILY_DIR / f"{date}.md"
    if not output_path.is_absolute():
        output_path = ROOT / output_path

    if output_path.exists() and not args.overwrite and not args.collect_only:
        print(f"输出文件已存在：{output_path}", file=sys.stderr)
        print("如需覆盖，请添加 --overwrite。", file=sys.stderr)
        return 2

    if not SPEC_PATH.exists():
        print(f"找不到规范文档：{SPEC_PATH}", file=sys.stderr)
        return 2

    spec = SPEC_PATH.read_text(encoding="utf-8")

    print("采集 RSS 新闻源...")
    rss_items, rss_errors = collect_rss(args.feed_limit)
    print(f"RSS 候选：{len(rss_items)} 条")

    print("采集 arXiv 论文...")
    arxiv_items, arxiv_errors = collect_arxiv(args.arxiv_limit)
    print(f"arXiv 候选：{len(arxiv_items)} 篇")

    print("采集 GitHub 项目...")
    github_items, github_errors = collect_github(args.github_limit, args.github_days)
    print(f"GitHub 候选：{len(github_items)} 个")

    context = {
        "date": date,
        "articles": [asdict(item) for item in rss_items if item.source == "36氪"],
        "articles1": [asdict(item) for item in rss_items if item.source == "虎嗅"],
        "articles2": [asdict(item) for item in rss_items if item.source == "IT之家"],
        "articles3": [asdict(item) for item in rss_items if item.source == "InfoQ"],
        "arxiv": [asdict(item) for item in arxiv_items],
        "GitHub": [asdict(item) for item in github_items],
        "errors": rss_errors + arxiv_errors + github_errors,
    }

    if args.context_out:
        write_context(ROOT / args.context_out, context)
        print(f"采集上下文已写入：{ROOT / args.context_out}")

    if args.collect_only:
        if not args.context_out:
            print(json.dumps(context, ensure_ascii=False, indent=2))
        return 0

    if not rss_items and not arxiv_items and not github_items:
        print("没有采集到任何候选内容，终止生成。", file=sys.stderr)
        for error in context["errors"]:
            print(error, file=sys.stderr)
        return 1

    print("调用本地 Codex 生成简报...")
    prompt = build_prompt(date, spec, context)
    run_codex(prompt, output_path, args.codex_bin, args.model, args.codex_timeout)
    print(f"日报已写入：{output_path}")

    if context["errors"]:
        print("采集过程中存在部分失败：")
        for error in context["errors"]:
            print(f"- {error}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
