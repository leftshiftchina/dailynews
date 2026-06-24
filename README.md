# 每日新技术推送小博客文档站

这是一个基于 VitePress + GitHub Pages 的在线文档站模板，适合承载项目介绍、章节式教程、API 文档和部署说明。

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

## GitHub Pages

默认使用 `.github/workflows/deploy.yml` 构建并发布 `docs/.vitepress/dist`。

如果仓库地址是 `https://github.com/<owner>/<repo>`，请把 `docs/.vitepress/config.ts` 中的 `base` 改成 `/<repo>/`。
