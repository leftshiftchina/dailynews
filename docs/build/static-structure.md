# 站点结构

本页说明本站的目录、路由和配置方式。读者如果要搭建同款网站，可以用这里作为项目骨架参考。

## 技术选型

当前站点只保留静态内容发布能力，技术栈非常轻：

- VitePress：把 Markdown 构建成静态站点。
- Markdown：编写项目说明、教程和 AI简报。
- GitHub Actions：自动构建。
- GitHub Pages：托管构建产物。
- Giscus：基于 GitHub Discussions 提供评论区。

不需要后端服务、数据库、接口网关或独立前端应用。

## 目录结构

```text
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
    pwa.md
    static-structure.md
    github-pages.md
  daily/
    2026-06-26.md
    2026-06-25.md
    2026-06-23.md
  public/
    apple-touch-icon.png
    favicon.svg
    icon-192.png
    icon-512.png
    manifest.webmanifest
    maskable-icon-512.png
    sw.js
  .vitepress/
    config.ts
    theme/
      GiscusComments.vue
      WechatFollow.vue
      index.ts
      style.css
```

## 目录职责

| 目录 | 作用 |
| --- | --- |
| `docs/about` | 放入“关于本站”栏目下的项目介绍和整体概览 |
| `docs/build` | 放入“搭建同款网站”栏目下的教程、内容规划、站点结构、简报规范和部署说明 |
| `docs/daily` | 放入按日期归档的 AI简报 |
| `docs/public` | 放入 favicon、图片等静态资源 |
| `docs/.vitepress` | 放入 VitePress 配置和主题组件 |

## 路由规则

VitePress 会根据 Markdown 文件路径生成页面路由：

| 文件 | 页面 |
| --- | --- |
| `docs/index.md` | `/` |
| `docs/about/overview.md` | `/about/overview` |
| `docs/build/content-shape.md` | `/build/content-shape` |
| `docs/build/news-sources.md` | `/build/news-sources` |
| `docs/build/pwa.md` | `/build/pwa` |
| `docs/daily/2026-06-25.md` | `/daily/2026-06-25` |
| `docs/build/github-pages.md` | `/build/github-pages` |

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
| `themeConfig.comments` | Giscus 评论区配置 |

当前 AI简报侧边栏会自动扫描 `docs/daily` 目录中的 `YYYY-MM-DD.md` 文件。新增简报后，一般不需要手动改侧边栏。

## 资源管理

静态资源放在：

```text
docs/public/
```

例如 `docs/public/favicon.svg` 会在站点中以 `/favicon.svg` 访问。部署到 GitHub Pages 仓库站点时，VitePress 会结合 `base` 自动处理最终路径。
