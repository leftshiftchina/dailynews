# 整体概览

## 项目目标

本项目的目标是搭建一个面向移动端阅读的每日技术资讯系统，并配套一个清晰的在线文档站。

第一阶段关注内容链路和阅读体验：

- Coze 每天生成一篇技术新闻或技术趋势内容。
- Coze 通过 HTTP 接口把结构化 JSON 推送到后端。
- 后端保存每日内容，并提供今日内容和历史内容接口。
- 前端以移动优先方式展示今日内容、历史列表和详情页。
- 文档站记录产品设计、接口设计、部署方式和后续迭代计划。

## 总体架构

```text
Coze 定时工作流
  |
  | HTTP POST /api/news
  v
Node.js / Express 后端
  |
  | 保存每日内容
  v
SQLite 或云数据库
  |
  | GET /api/news/today
  | GET /api/news
  v
移动端 PWA 网页
```

## 文档站架构

```text
news-new/
  docs/
    index.md
    guide/
    chapter1/
    chapter2/
    api/
    deploy/
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

- Markdown 写作成本低，适合持续维护教程和 API 文档。
- 自动生成侧边栏、页内目录、搜索、上一页和下一页。
- 构建结果是静态文件，适合部署到 GitHub Pages。
- 后续可以继续添加自定义 Vue 组件，承载更丰富的示例。

## 站点路由说明

你给的参考站点使用的是 `#/./chapter8/...` 这种哈希路由，看起来更像 Docsify 的运行时渲染方式。

VitePress 默认是构建期生成静态页面，因此路由通常是：

```text
/guide/overview
/chapter1/product-shape
/api/news
```

部署到 GitHub Pages 仓库站点时，还需要带上仓库名前缀，例如：

```text
https://<owner>.github.io/news-new/guide/overview
```

页面内的小标题锚点仍然支持，例如：

```text
https://<owner>.github.io/news-new/chapter1/coze-flow#coze-输出建议
```
