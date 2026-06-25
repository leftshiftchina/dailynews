# AI 前沿科技简报

这是一个基于 VitePress + GitHub Pages 的 AI 前沿科技内容分享站，适合承载项目说明、实现教程、AI简报归档和部署手册。

当前项目只保留静态文档能力：内容写在 `docs` 目录下的 Markdown 文件中，通过 GitHub Pages 发布，不包含后端接口、数据库或第三方工作流接入。

## 本地预览

```bash
npm install
npm run docs:dev
```

## 构建

```bash
npm run docs:build
npm run docs:preview
```

## 生成 AI 简报

脚本会采集 `docs/chapter1/news-sources.md` 中定义的信息源，调用本地 Codex 分析并生成 Markdown 到 `docs/daily/YYYY-MM-DD.md`。

```bash
python scripts/generate_daily.py
```

常用参数：

```bash
python scripts/generate_daily.py --date 2026-06-25 --overwrite
python scripts/generate_daily.py --collect-only --context-out tmp/daily-context.json
```

如需提升 GitHub API 额度，可设置 `GITHUB_TOKEN` 环境变量。

## GitHub Pages

默认使用 `.github/workflows/deploy.yml` 构建并发布 `docs/.vitepress/dist`。

如果仓库地址是 `https://github.com/<owner>/<repo>`，请把 `docs/.vitepress/config.ts` 中的 `base` 改成 `/<repo>/`。

## GitHub Pages 配置办法

Settings -> Pages
Source: GitHub Actions



