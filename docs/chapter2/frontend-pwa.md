# 静态站点结构

## 技术选型

当前站点只保留静态内容发布能力，技术栈非常轻：

- VitePress：把 Markdown 构建成静态站点。
- Markdown：编写项目说明、教程和 Daily 内容。
- GitHub Actions：自动构建。
- GitHub Pages：托管构建产物。

不需要后端服务、数据库、接口网关或独立前端应用。

## 目录结构

```text
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
  public/
    favicon.svg
  .vitepress/
    config.ts
    theme/
```

## 路由规则

VitePress 会根据 Markdown 文件路径生成页面路由：

| 文件 | 页面 |
| --- | --- |
| `docs/index.md` | `/` |
| `docs/guide/overview.md` | `/guide/overview` |
| `docs/daily/2026-06-23.md` | `/daily/2026-06-23` |
| `docs/deploy/github-pages.md` | `/deploy/github-pages` |

因为当前开启了 `cleanUrls: true`，线上地址会隐藏 `.html` 后缀。

## 导航配置

站点导航集中在：

```text
docs/.vitepress/config.ts
```

常用配置包括：

| 配置 | 作用 |
| --- | --- |
| `title` | 浏览器标题 |
| `description` | 站点描述 |
| `base` | GitHub Pages 仓库名前缀 |
| `themeConfig.nav` | 顶部导航 |
| `themeConfig.sidebar` | 左侧目录 |

新增页面后，记得把它加入 `sidebar` 或首页导航表中，否则用户只能通过直接链接或搜索访问。

## 资源管理

静态资源放在：

```text
docs/public/
```

例如 `docs/public/favicon.svg` 会在站点中以 `/favicon.svg` 访问。部署到 GitHub Pages 仓库站点时，VitePress 会结合 `base` 自动处理最终路径。
