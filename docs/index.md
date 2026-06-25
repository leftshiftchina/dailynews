---
layout: home

hero:
  name: AI 前沿科技简报
  text: 面向 AI 前沿科技的内容分享站
  tagline: 用 VitePress + GitHub Pages 承载项目说明、实现教程、内容归档和部署手册。
  image:
    src: /favicon.svg
    alt: AI Frontier Brief
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
  - title: AI简报沉淀
    details: 每篇 AI 科技内容都以 Markdown 归档，便于复盘、检索、引用和持续扩展。
---

## 项目介绍

AI 前沿科技简报是一个轻量的内容分享站，用来记录和整理 AI、Agent、模型工具、开发者生态、产业动态等方向的前沿资讯。它不依赖后端服务，也不需要额外的内容接口，所有正文都直接写在 `docs` 目录下的 Markdown 文件中。

这个仓库采用 VitePress 作为在线文档站方案，并通过 GitHub Pages 发布。VitePress 负责把 Markdown 构建成静态页面，GitHub Pages 负责托管访问；日常维护只需要新增或修改 Markdown，再推送到仓库。

## LeftShift 组织介绍

LeftShift 关注 AI Coding 与智能体应用实践，目标是打造轻量、开放、可定制的 AI Coding 工作流，让开发者更自然地把 AI 融入日常研发。

AI Coding 指利用人工智能辅助编程，包括代码生成、程序调试、算法优化、文档整理和工程实践沉淀。它的核心价值可以概括为三点：减少重复性编码工作，降低使用和学习门槛，让开发者把更多精力放在设计、判断和创造性工作上。

LeftShift 倡导四个设计原则：

1. 简单易用：降低使用门槛，开箱即用。
2. 可扩展：支持多种 AI 模型、工具和插件。
3. 本地优先：优先保护数据和上下文隐私。
4. 开源透明：代码开放，文档清晰，社区共建。

相关入口：

| 入口 | 说明 |
| --- | --- |
| [官方网站](https://gitee.com/leftShift/) | LeftShift 组织主页 |
| [微信公众号](https://gitee.com/leoli2024/helloworld/raw/master/1777177786188.jpg) | 获取内容更新 |
| [CSDN](https://blog.csdn.net/qq_42299461?type=lately) | 阅读技术文章 |
| [todo_list](https://gitee.com/leoli2024/todo_list) | 智能体开发模板集合 |
| [hello-ai-coding](https://gitee.com/leftShift/hello-ai-coding) | AI Coding 最佳实践 |

## 你将获得什么

| 模块 | 内容 | 状态 |
| --- | --- | --- |
| 项目导读 | 项目定位、内容范围、站点结构 | 已完成 |
| AI简报 | 按日期归档的 AI 前沿科技分享 | 持续更新 |
| 搭建教程 | 从零搭建同款 VitePress 内容站 | 已完成 |
| 内容规范 | 标题、摘要、标签、引用和归档方式 | 已完成 |
| 部署说明 | VitePress 构建与 GitHub Pages 发布 | 已完成 |

## 内容导航

| 章节 | 关键内容 | 链接 |
| --- | --- | --- |
| 整体概览 | 项目目标、架构和阅读路线 | [进入](/guide/overview) |
| 快速开始 | 本地安装、预览和构建 | [进入](/guide/getting-started) |
| 自己搭建教程 | 初始化项目、配置导航、发布站点 | [进入](/guide/build-your-own) |
| 内容形态 | AI简报页面、专题页、教程页如何组织 | [进入](/chapter1/product-shape) |
| 新闻来源与简报规范 | RSS 来源、编辑角色、筛选流程和输出模板 | [进入](/chapter1/news-sources) |
| 静态站点结构 | VitePress 目录、Markdown 路由和资源管理 | [进入](/chapter2/frontend-pwa) |
| AI简报示例 | 2026-06-23 内容归档 | [进入](/daily/2026-06-23) |
| GitHub Pages | 自动构建和发布配置 | [进入](/deploy/github-pages) |

## 阅读建议

如果你只是想把文档站跑起来，先读 [快速开始](/guide/getting-started) 和 [GitHub Pages](/deploy/github-pages)。

如果你想自己搭一个同款内容分享站，直接读 [自己搭建教程](/guide/build-your-own)。如果你是来阅读内容，可以从 [AI简报](/daily/2026-06-23) 开始。


