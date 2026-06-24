# 快速开始

## 环境要求

建议使用：

- Node.js 18 或更高版本。
- npm 9 或更高版本。
- 一个 GitHub 仓库，用于发布 GitHub Pages。

## 安装依赖

在 `work/news-new` 目录下执行：

```bash
npm install
```

## 本地预览

```bash
npm run docs:dev
```

启动后访问终端输出的本地地址。VitePress 会提供热更新，修改 Markdown 后浏览器会自动刷新。

## 构建静态文件

```bash
npm run docs:build
```

构建产物会生成在：

```text
docs/.vitepress/dist
```

## 预览构建结果

```bash
npm run docs:preview
```

这一步用于确认静态产物是否能正确加载侧边栏、样式、搜索索引和页面链接。

## 修改站点信息

主要配置位于：

```text
docs/.vitepress/config.ts
```

最常改的是：

| 配置 | 说明 |
| --- | --- |
| `title` | 浏览器标题和站点名 |
| `description` | 站点描述 |
| `base` | GitHub Pages 仓库名前缀 |
| `themeConfig.nav` | 顶部导航 |
| `themeConfig.sidebar` | 左侧章节目录 |

如果你的仓库名不是 `news-new`，需要把 `base` 改成你的仓库名：

```ts
base: '/你的仓库名/'
```
