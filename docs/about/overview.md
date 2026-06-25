# 整体概览

本页说明这个网站是什么、读者应该怎么读，以及当前侧边栏为什么这样组织。

## 项目目标

AI 前沿科技简报是一个轻量的内容分享站，用稳定、低成本、易维护的方式沉淀 AI 资讯、实现教程和部署手册。

当前阶段关注两件事：

- 对读者：提供稳定的 AI简报归档。
- 对想搭建同款网站的人：提供一条从本地运行到 GitHub Pages 发布的教程路径。

## 阅读路径

侧边栏分成三条主线：

| 栏目 | 用途 |
| --- | --- |
| 关于本站 | 说明网站定位和阅读方式，后续可以继续扩展组织介绍、项目背景等内容 |
| AI简报 | 固定展示按日期归档的 AI 前沿科技内容 |
| 搭建同款网站 | 提供可照着做的搭建教程、内容规范、站点结构和部署说明 |

如果你只是来阅读内容，可以直接进入 AI简报。

如果你想搭一个类似的网站，建议按这个顺序阅读：

1. [快速开始](/build/getting-started)
2. [从零搭建](/build/build-your-own)
3. [内容规划](/build/content-shape)
4. [站点结构](/build/static-structure)
5. [简报来源与规范](/build/news-sources)
6. [GitHub Pages 部署](/build/github-pages)

## 总体架构

```text
Markdown 内容
  |
  | docs/**/*.md
  v
VitePress 构建
  |
  | docs/.vitepress/dist
  v
GitHub Pages 托管
  |
  v
公开访问的 AI 前沿科技分享站
```

## 文档站结构

```text
dailynews/
  docs/
    index.md
    about/
      index.md
      overview.md
    build/
      getting-started.md
      build-your-own.md
      content-shape.md
      news-sources.md
      static-structure.md
    daily/
      2026-06-25.md
      2026-06-23.md
      github-pages.md
    public/
      favicon.svg
    .vitepress/
      config.ts
      theme/
  scripts/
    generate_daily.py
  .github/
    workflows/
      deploy.yml
  package.json
```

## 为什么使用 VitePress

VitePress 适合这个场景的原因很直接：

- Markdown 写作成本低，适合持续维护简报、教程和项目说明。
- 自动生成侧边栏、页内目录、搜索、上一页和下一页。
- 构建结果是静态文件，适合部署到 GitHub Pages。
- 可以继续添加自定义 Vue 组件，例如当前站点底部的 Giscus 评论区。

## 路由说明

VitePress 会根据 Markdown 文件路径生成页面路由。当前开启了 `cleanUrls: true`，因此链接通常不带 `.html` 后缀：

```text
/about/overview
/build/content-shape
/daily/2026-06-25
```

部署到 GitHub Pages 仓库站点时，还需要带上仓库名前缀，例如：

```text
https://<owner>.github.io/dailynews/about/overview
```

页面内的小标题锚点仍然支持，例如：

```text
https://<owner>.github.io/dailynews/daily/2026-06-25#ai-技术新闻
```
