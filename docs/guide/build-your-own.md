# 自己搭建教程

这篇教程说明如何从零搭建一个类似的 AI 前沿科技内容分享站。最终效果是：用 Markdown 写内容，用 VitePress 生成静态页面，用 GitHub Pages 免费托管。

## 准备环境

你需要：

- Node.js 18 或更高版本。
- npm 9 或更高版本。
- 一个 GitHub 仓库。

## 初始化项目

新建目录并初始化 npm：

```bash
mkdir ai-frontier-brief
cd ai-frontier-brief
npm init -y
```

安装 VitePress：

```bash
npm install -D vitepress
```

在 `package.json` 中加入脚本：

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs --host 0.0.0.0",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs --host 0.0.0.0"
  }
}
```

## 创建目录

建议先创建这些文件：

```text
docs/
  index.md
  guide/
    overview.md
    getting-started.md
  daily/
    2026-06-23.md
  deploy/
    github-pages.md
  public/
    favicon.svg
  .vitepress/
    config.ts
```

## 配置 VitePress

创建 `docs/.vitepress/config.ts`：

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI 前沿科技简报',
  description: 'AI 前沿科技内容分享站',
  base: '/你的仓库名/',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    siteTitle: 'AI Frontier Brief',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/overview' },
      { text: 'AI简报', link: '/daily/2026-06-23' },
      { text: '部署', link: '/deploy/github-pages' }
    ],
    sidebar: [
      {
        text: '项目导读',
        items: [
          { text: '项目介绍', link: '/' },
          { text: '整体概览', link: '/guide/overview' }
        ]
      },
      {
        text: 'AI简报',
        items: [
          { text: '2026-06-23', link: '/daily/2026-06-23' }
        ]
      },
      {
        text: '部署',
        items: [
          { text: 'GitHub Pages', link: '/deploy/github-pages' }
        ]
      }
    ],
    search: {
      provider: 'local'
    }
  }
})
```

如果你使用的是用户站点，例如 `https://<owner>.github.io/`，可以把 `base` 改成 `/`。如果是仓库站点，例如 `https://<owner>.github.io/ai-frontier-brief/`，就配置为 `/ai-frontier-brief/`。

## 编写首页

创建 `docs/index.md`：

```md
---
layout: home

hero:
  name: AI 前沿科技简报
  text: 面向 AI 前沿科技的内容分享站
  tagline: 用 VitePress + GitHub Pages 承载项目说明、实现教程、内容归档和部署手册。
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide/overview

features:
  - title: Markdown 写作
    details: 直接用 Markdown 记录每日内容和教程。
  - title: 静态部署
    details: 构建产物可以托管到 GitHub Pages。
  - title: 内容归档
    details: AI简报按日期沉淀，便于检索和回看。
---

## 项目介绍

这里写你的站点定位、内容范围和更新计划。
```

## 新增 AI简报

创建 `docs/daily/2026-06-23.md`：

```md
# 2026-06-23 AI 前沿科技简报

## 今日要点

- 记录一条值得关注的模型、工具或产业动态。
- 补充来源链接。
- 写下你自己的判断。

## 延伸阅读

- [来源标题](https://example.com/)
```

以后每天新增一个 Markdown 文件，并把它加入 `docs/.vitepress/config.ts` 的 `sidebar`。

## 本地预览

```bash
npm run docs:dev
```

浏览器打开终端输出的地址。修改 Markdown 后，页面会自动刷新。

## 构建验证

```bash
npm run docs:build
npm run docs:preview
```

确认首页、侧边栏、搜索和 AI简报页面都能正常访问后，再推送到 GitHub。

## 发布到 GitHub Pages

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build VitePress
        run: npm run docs:build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

然后在 GitHub 仓库的 `Settings -> Pages` 中，把 Source 设置为 `GitHub Actions`。








