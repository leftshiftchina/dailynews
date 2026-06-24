---
layout: home

hero:
  name: 每日新技术推送小博客
  text: Coze 工作流驱动的技术资讯文档站
  tagline: 用 VitePress + GitHub Pages 承载项目说明、实现教程、API 文档和部署手册。
  image:
    src: /favicon.svg
    alt: Daily Tech News
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide/overview
    - theme: alt
      text: 快速开始
      link: /guide/getting-started

features:
  - title: 文档式阅读
    details: 使用 VitePress 的章节、侧边栏、页内目录和本地搜索组织内容，适合长期维护。
  - title: GitHub Pages 部署
    details: 内置 GitHub Actions 工作流，推送到 main 或 master 分支即可自动构建发布。
  - title: 面向项目落地
    details: 文档围绕 Coze 内容生成、后端接收、前端阅读和 PWA 能力展开。
---

## 项目介绍

每日新技术推送小博客是一个轻量的技术资讯阅读项目：每天由 Coze 工作流生成一篇技术新闻或技术趋势内容，再通过 HTTP 接口推送到服务端保存，最后在移动端网页或 PWA 中阅读。

这个仓库现在采用 VitePress 作为在线文档站方案，适合放在 GitHub Pages 上公开访问。文档结构参考书籍式阅读体验：左侧是章节目录，正文使用 Markdown 编写，每个页面自动生成页内目录和标题锚点。

## 你将获得什么

| 模块 | 内容 | 状态 |
| --- | --- | --- |
| 项目导读 | 项目背景、使用场景、整体链路 | 已完成 |
| 产品与内容链路 | 页面形态、Coze 输出、每日内容流转 | 已完成 |
| 工程实现 | 前端 PWA、后端 API、SQLite 存储 | 已完成 |
| API 文档 | 新闻写入、今日新闻、历史列表、健康检查 | 已完成 |
| 部署说明 | VitePress 构建与 GitHub Pages 发布 | 已完成 |

## 内容导航

| 章节 | 关键内容 | 链接 |
| --- | --- | --- |
| 整体概览 | 项目目标、架构和阅读路线 | [进入](/guide/overview) |
| 快速开始 | 本地安装、预览和构建 | [进入](/guide/getting-started) |
| 第一章 产品形态 | 今日页、历史页、详情页、设置页 | [进入](/chapter1/product-shape) |
| 第二章 Coze 内容流 | JSON 输出、入库规则、内容校验 | [进入](/chapter1/coze-flow) |
| 第三章 前端与 PWA | Vite、移动端阅读、离线缓存 | [进入](/chapter2/frontend-pwa) |
| 第四章 后端与存储 | Express、SQLite、接口边界 | [进入](/chapter2/backend-storage) |
| 新闻 API | 接口定义和请求示例 | [进入](/api/news) |
| GitHub Pages | 自动构建和发布配置 | [进入](/deploy/github-pages) |

## 阅读建议

如果你只是想把文档站跑起来，先读 [快速开始](/guide/getting-started) 和 [GitHub Pages](/deploy/github-pages)。

如果你想继续完善原来的每日新闻项目，建议按照章节顺序阅读：先确定产品页面，再稳定 Coze 输出结构，然后实现后端接收和前端阅读体验。
