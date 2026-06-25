# AI简报生成脚本说明

本文档说明 `scripts/generate_daily.py` 的设计思路、运行方式、参数含义、输出结果和常见问题。它面向项目维护者编写，目标是让任何人都能看懂这个脚本如何把外部信息源整理成站点里的 AI简报。

## 脚本定位

`generate_daily.py` 是项目里的自动内容生产入口。

它做三件事：

1. 从 RSS、arXiv、GitHub 采集 AI 相关候选内容。
2. 读取 `docs/build/news-sources.md` 中定义的编辑规范。
3. 调用本地 Codex CLI 分析采集结果，并输出 Markdown 到 `docs/daily/YYYY-MM-DD.md`。

生成后的文件会被 VitePress 当作普通 Markdown 页面渲染。项目的 VitePress 配置会自动扫描 `docs/daily` 目录，因此新增文件后不需要手动改侧边栏。

每篇文章结尾会由 VitePress 主题统一展示微信公众号二维码和关注提示，不需要在每篇简报里重复粘贴同一段 HTML。

## 整体流程

```text
外部信息源
  ├─ RSS：36氪、虎嗅、IT之家、InfoQ
  ├─ arXiv：AI / NLP / ML / CV / 统计机器学习方向论文
  └─ GitHub：近期活跃的 AI / LLM / Agent / Generative AI 项目
        ↓
generate_daily.py 采集并清洗数据
        ↓
组织为统一 JSON 上下文
        ↓
读取 docs/build/news-sources.md 作为编辑规范
        ↓
把“规范 + JSON 上下文”交给本地 Codex
        ↓
Codex 输出最终 Markdown
        ↓
写入 docs/daily/YYYY-MM-DD.md
```

脚本本身不负责“写文章”，它负责把可靠的上下文准备好，再让本地 Codex 按统一规范完成筛选、摘要和排版。

## 运行前准备

### 1. Python

脚本只使用 Python 标准库，不需要安装第三方依赖。

建议使用 Python 3.10 或更高版本：

```bash
python --version
```

### 2. 本地 Codex CLI

脚本最终会执行：

```bash
codex exec ...
```

因此需要先确保当前命令行能找到 Codex：

```bash
codex --help
```

如果 Windows 上提示找不到命令，可以使用 `--codex-bin` 指定完整路径，例如：

```bash
python scripts/generate_daily.py --codex-bin "C:\Users\你的用户名\AppData\Roaming\npm\codex.cmd"
```

也可以设置环境变量：

```powershell
$env:CODEX_BIN="C:\Users\你的用户名\AppData\Roaming\npm\codex.cmd"
python scripts/generate_daily.py
```

### 3. 网络访问

脚本需要访问以下外部地址：

- `https://www.36kr.com/feed`
- `https://rss.huxiu.com/`
- `http://www.ithome.com/rss/`
- `https://feed.infoq.com/ai-ml-data-eng/`
- `https://export.arxiv.org/api/query`
- `https://api.github.com/search/repositories`

如果网络受限，可能只采集到部分来源。脚本会把失败信息放进 `errors` 字段，并在命令行末尾打印出来。

### 4. GitHub Token，可选

GitHub Search API 有匿名访问限额。为了提高稳定性，可以设置 `GITHUB_TOKEN`：

```powershell
$env:GITHUB_TOKEN="你的 GitHub Token"
python scripts/generate_daily.py
```

Token 只用于请求 GitHub API，不会写入生成的 Markdown。

## 快速开始

在项目根目录运行：

```bash
python scripts/generate_daily.py
```

默认行为：

- 日期使用当天日期。
- 输出到 `docs/daily/YYYY-MM-DD.md`。
- 如果目标文件已经存在，脚本会拒绝覆盖。
- 自动采集 RSS、arXiv、GitHub。
- 调用本地 Codex 生成 AI简报。

生成成功后会看到类似输出：

```text
采集 RSS 新闻源...
RSS 候选：12 条
采集 arXiv 论文...
arXiv 候选：20 篇
采集 GitHub 项目...
GitHub 候选：20 个
调用本地 Codex 生成简报...
简报已写入：D:\dailynews\docs\daily\2026-06-25.md
```

## 常用命令

### 生成指定日期

```bash
python scripts/generate_daily.py --date 2026-06-25
```

输出文件为：

```text
docs/daily/2026-06-25.md
```

### 覆盖已有文件

如果文件已经存在，默认不会覆盖。确认要重新生成时使用：

```bash
python scripts/generate_daily.py --date 2026-06-25 --overwrite
```

### 只采集，不调用 Codex

调试采集质量时很有用：

```bash
python scripts/generate_daily.py --collect-only
```

这会把采集上下文直接打印到命令行。

### 保存采集上下文

```bash
python scripts/generate_daily.py --collect-only --context-out tmp/daily-context.json
```

这个 JSON 文件可以用来检查：

- RSS 是否抓到了内容。
- AI 关键词过滤是否过严。
- arXiv 论文标题和链接是否正常。
- GitHub 项目是否符合预期。
- 哪些来源出现了抓取失败。

### 生成到自定义路径

```bash
python scripts/generate_daily.py --date 2026-06-25 --output tmp/preview.md --overwrite
```

适合先生成预览稿，确认内容后再移动到 `docs/daily`。

### 指定 Codex 模型

```bash
python scripts/generate_daily.py --model gpt-5
```

脚本会把模型名透传给：

```bash
codex exec --model gpt-5 ...
```

是否可用取决于本地 Codex CLI 支持的模型配置。

## 参数说明

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `--date` | 当天日期 | AI简报日期，格式为 `YYYY-MM-DD`。 |
| `--output` | `docs/daily/YYYY-MM-DD.md` | 输出文件路径。可以是相对路径或绝对路径。 |
| `--overwrite` | `false` | 允许覆盖已存在的输出文件。 |
| `--collect-only` | `false` | 只采集上下文，不调用 Codex，不生成 Markdown。 |
| `--context-out` | 空 | 保存采集上下文 JSON 的路径。 |
| `--codex-bin` | `CODEX_BIN` 环境变量或 `codex` | Codex CLI 路径。 |
| `--model` | 空 | 传给 `codex exec` 的模型名。 |
| `--codex-timeout` | `900` | Codex 生成超时时间，单位秒。 |
| `--feed-limit` | `20` | 每个 RSS 源最多读取多少条。 |
| `--arxiv-limit` | `20` | 最多读取多少篇 arXiv 论文。 |
| `--github-limit` | `20` | 最多读取多少个 GitHub 项目。 |
| `--github-days` | `14` | GitHub 项目的近期活跃窗口，单位天。 |

## 信息源说明

### RSS 新闻

RSS 来源在脚本里的 `RSS_SOURCES` 常量中定义：

```python
RSS_SOURCES = [
    ("36氪", "https://www.36kr.com/feed"),
    ("虎嗅", "https://rss.huxiu.com/"),
    ("IT之家", "http://www.ithome.com/rss/"),
    ("InfoQ", "https://feed.infoq.com/ai-ml-data-eng/"),
]
```

采集逻辑：

1. 逐个请求 RSS 地址。
2. 同时兼容 RSS 和 Atom 格式。
3. 提取标题、链接、摘要、发布时间。
4. 使用 `AI_KEYWORDS` 判断是否与 AI 相关。
5. 如果某个源没有匹配到 AI 内容，会保留少量原始候选，交给 Codex 做最后筛选。

这样做的原因是：有些 RSS 摘要很短，关键词可能漏掉真实的 AI 内容。保留少量候选可以降低漏选概率。

### arXiv 论文

脚本请求 arXiv 官方 API，查询范围是：

```text
cat:cs.AI OR cat:cs.CL OR cat:cs.LG OR cat:cs.CV OR cat:stat.ML
```

排序方式：

- `sortBy=submittedDate`
- `sortOrder=descending`

也就是优先读取最近提交的 AI、自然语言处理、机器学习、计算机视觉和统计机器学习论文。

每篇论文会整理成：

```json
{
  "arxiv_title": "论文标题",
  "arxiv_link": "论文链接，优先 PDF",
  "summary": "论文摘要",
  "published": "发布时间",
  "authors": ["作者1", "作者2"]
}
```

### GitHub 项目

脚本通过 GitHub Search API 检索近期活跃项目，当前查询包括：

```text
topic:artificial-intelligence stars:>100 pushed:>=最近 N 天
topic:llm stars:>50 pushed:>=最近 N 天
topic:ai-agent stars:>20 pushed:>=最近 N 天
topic:generative-ai stars:>50 pushed:>=最近 N 天
```

其中 `最近 N 天` 由 `--github-days` 控制，默认是 14 天。

项目会按 stars 和 forks 排序，保留最靠前的候选。

每个项目会整理成：

```json
{
  "title": "owner/repo",
  "link": "https://github.com/owner/repo",
  "description": "项目描述",
  "language": "主要语言",
  "stars": 1234,
  "forks": 123,
  "updated_at": "更新时间"
}
```

## 采集上下文结构

脚本最终交给 Codex 的核心数据结构如下：

```json
{
  "date": "2026-06-25",
  "articles": [],
  "articles1": [],
  "articles2": [],
  "articles3": [],
  "arxiv": [],
  "GitHub": [],
  "errors": []
}
```

字段含义：

| 字段 | 来源 | 说明 |
| --- | --- | --- |
| `date` | 命令行参数 | 本次生成日期。 |
| `articles` | 36氪 | RSS 新闻候选。 |
| `articles1` | 虎嗅 | RSS 新闻候选。 |
| `articles2` | IT之家 | RSS 新闻候选。 |
| `articles3` | InfoQ | RSS 新闻候选。 |
| `arxiv` | arXiv API | 学术论文候选。 |
| `GitHub` | GitHub Search API | 开源项目候选。 |
| `errors` | 脚本内部 | 部分来源失败时的错误信息。 |

这些字段名保持了 `docs/build/news-sources.md` 里的规范表达，方便 Codex 按既定格式理解输入。

## Codex 调用方式

脚本不会让 Codex 修改项目文件，而是用只读沙箱执行生成：

```bash
codex exec --sandbox read-only --output-last-message 临时文件 -
```

关键点：

- `--sandbox read-only`：Codex 只能读上下文，不能自己改文件。
- `--output-last-message`：把 Codex 最后一条回复写入临时 Markdown 文件。
- `-`：提示词从标准输入传入。
- Python 脚本最后读取 Codex 输出，再由脚本写入 `docs/daily/YYYY-MM-DD.md`。

这种设计让写文件动作集中在 Python 脚本里，结果更可控。

## 生成提示词的组成

`build_prompt()` 会把三部分拼在一起：

1. 本次日期。
2. 固定生成要求，例如标题必须是 `# AI简报 by@leftshift YYYY-MM-DD`。
3. `docs/build/news-sources.md` 的完整规范。
4. 脚本采集到的 JSON 上下文。

提示词要求 Codex：

- 只输出最终 Markdown。
- 不解释生成过程。
- 不使用代码围栏包裹。
- 固定输出 3 个模块：
  - `🚀 AI技术新闻`
  - `📚 AI学术论文`
  - `💻 AI开源项目`
- 尽量输出 10 条技术新闻、5 篇论文、5 个开源项目。
- 不编造链接，只使用采集结果里的原始链接。

## 输出文件格式

输出文件是普通 Markdown，例如：

```md
# AI简报 by@leftshift 2026-06-25

## 🚀 AI技术新闻

🤖 **新闻标题**
链接：https://example.com/news
概况：这里是一两句话的摘要。

## 📚 AI学术论文

🧪 **论文标题**
链接：https://arxiv.org/...
概况：这里是一两句话的摘要。

## 💻 AI开源项目

🧰 **owner/repo - 项目简介**
链接：https://github.com/owner/repo
概况：这里是一两句话的摘要。
```

生成后建议人工快速检查：

- 是否只有 AI 相关内容。
- 是否每条都有链接。
- 是否存在明显重复。
- 是否存在不自然或过度夸张的摘要。
- 是否满足站点的阅读风格。

## 修改新闻源

如果要增加或删除 RSS 来源，需要同时关注两处：

1. `scripts/generate_daily.py` 中的 `RSS_SOURCES`。
2. `docs/build/news-sources.md` 中的来源说明。

示例：

```python
RSS_SOURCES = [
    ("36氪", "https://www.36kr.com/feed"),
    ("新来源", "https://example.com/feed.xml"),
]
```

如果新增来源希望在上下文中单独作为一个字段传给 Codex，还需要调整 `main()` 中构造 `context` 的部分。当前脚本固定输出：

- `articles`
- `articles1`
- `articles2`
- `articles3`

所以只简单追加 RSS 源时，最好同步改上下文字段和规范文档，避免 Codex 不知道新来源应该如何使用。

## 调整 AI 关键词

RSS 初筛关键词位于 `AI_KEYWORDS`：

```python
AI_KEYWORDS = [
    "ai",
    "aigc",
    "agent",
    "llm",
    "大模型",
    "智能体",
    "机器人",
]
```

关键词越多，召回越高，但可能混入更多弱相关内容。

关键词越少，内容更聚焦，但可能漏掉一些标题表达不明显的 AI 新闻。

一般建议：

- 新增中文行业词，例如“具身智能”“推理模型”“AI 编程”。
- 新增常见产品名，例如“Claude”“Gemini”“DeepSeek”。
- 避免加入过宽泛的词，例如“科技”“数据”“平台”。

## 常见问题

### 1. FileNotFoundError: 找不到 Codex CLI

原因：当前命令行找不到 `codex`。

处理方式：

```bash
codex --help
```

如果这个命令失败，就用完整路径：

```bash
python scripts/generate_daily.py --codex-bin "C:\Users\你的用户名\AppData\Roaming\npm\codex.cmd"
```

或者设置：

```powershell
$env:CODEX_BIN="C:\Users\你的用户名\AppData\Roaming\npm\codex.cmd"
```

### 2. codex exec 失败，提示 unexpected argument

原因：本地 Codex CLI 的参数和脚本不匹配。

当前脚本使用的是：

```bash
codex exec --sandbox read-only --output-last-message ...
```

如果后续 Codex CLI 参数变化，需要修改 `build_codex_command()`。

### 3. 输出文件已存在

脚本默认保护已有内容，避免误覆盖。

处理方式：

```bash
python scripts/generate_daily.py --date 2026-06-25 --overwrite
```

### 4. GitHub 候选为空或很少

可能原因：

- GitHub API 匿名额度用完。
- 当前网络无法访问 GitHub。
- `--github-days` 时间窗口太短。
- 查询 topic 下近期活跃项目较少。

处理方式：

```powershell
$env:GITHUB_TOKEN="你的 GitHub Token"
python scripts/generate_daily.py --github-days 30
```

### 5. RSS 某个来源抓取失败

脚本会继续处理其他来源，不会因为一个 RSS 源失败就整体退出。

建议先运行：

```bash
python scripts/generate_daily.py --collect-only --context-out tmp/daily-context.json
```

然后查看 `errors` 字段。

### 6. SSL 证书失败

脚本对 `CERTIFICATE_VERIFY_FAILED` 做了兜底：如果正常证书校验失败，会尝试使用不校验证书的 SSL 上下文重新请求。

这样可以提高在某些 Windows 本地环境中的可用性。不过如果所有请求都失败，仍然需要检查本机网络、代理或证书配置。

### 7. Codex 输出不像 Markdown

脚本会检查 Codex 输出是否以一级标题开头。

如果报错：

```text
Codex 输出不像 Markdown 简报：缺少一级标题。
```

通常说明 Codex 输出了错误信息、解释过程或空内容。可以先用 `--collect-only` 检查上下文，再重新执行。

## 推荐工作流

日常生成建议按下面顺序：

```bash
python scripts/generate_daily.py --collect-only --context-out tmp/daily-context.json
python scripts/generate_daily.py --date 2026-06-25
```

如果已经生成过，需要重跑：

```bash
python scripts/generate_daily.py --date 2026-06-25 --overwrite
```

生成后本地预览站点：

```bash
npm run docs:dev
```

然后打开 VitePress 页面检查 `AI简报` 导航下是否出现对应日期。

## 维护建议

- 修改输出格式时，优先改 `docs/build/news-sources.md`，再确认 `build_prompt()` 中的强约束是否也要同步。
- 修改采集来源时，同步更新本文档和站点里的来源说明。
- 调试采集质量时，优先使用 `--collect-only --context-out`，不要一上来反复调用 Codex。
- 提交生成内容前，人工检查一遍标题、链接和摘要，尤其是 GitHub 项目描述是否准确。
- `docs/daily` 是站点路由目录，虽然目录名保留为 `daily`，页面展示统一使用“AI简报”。
