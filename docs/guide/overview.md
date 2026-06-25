# 整体概览

## 项目目标

本项目的目标是搭建一个 AI 前沿科技内容分享站，用稳定、低成本、易维护的方式沉淀每日资讯、实现教程、项目说明和部署手册。

第一阶段关注静态内容站本身：

- 用 Markdown 编写 AI 科技内容和教程。
- 用 VitePress 生成首页、侧边栏、页内目录和搜索。
- 用 GitHub Pages 发布静态页面。
- 保留 `daily` 目录，按日期归档每日内容。
- 不维护服务端、数据库或特定内容生成平台。

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

## 文档站架构

```text
dailynews/
  docs/
    index.md
    guide/
      overview.md
      getting-started.md
      build-your-own.md
    chapter1/
      product-shape.md
    chapter2/
      frontend-pwa.md
    daily/
      2026-06-23.md
    deploy/
      github-pages.md
    .vitepress/
      config.ts
      theme/
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
- 后续可以继续添加自定义 Vue 组件，承载更丰富的示例。

## 站点路由说明

你给的参考站点使用的是 `#/./chapter8/...` 这种哈希路由，看起来更像 Docsify 的运行时渲染方式。

VitePress 默认是构建期生成静态页面，因此路由通常是：

```text
/guide/overview
/chapter1/product-shape
/daily/2026-06-23
```

部署到 GitHub Pages 仓库站点时，还需要带上仓库名前缀，例如：

```text
https://<owner>.github.io/dailynews/guide/overview
```

页面内的小标题锚点仍然支持，例如：

```text
https://<owner>.github.io/dailynews/daily/2026-06-23#ai-技术新闻
```

