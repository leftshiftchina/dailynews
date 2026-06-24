# GitHub Pages 部署

## 部署方式

当前项目使用 GitHub Actions 自动构建并发布 VitePress 站点。工作流文件位于：

```text
.github/workflows/deploy.yml
```

推送到 `main` 或 `master` 分支后，工作流会执行：

1. 拉取代码。
2. 安装 Node.js。
3. 执行 `npm ci`。
4. 执行 `npm run docs:build`。
5. 上传 `docs/.vitepress/dist`。
6. 发布到 GitHub Pages。

## GitHub 仓库设置

在 GitHub 仓库中进入：

```text
Settings -> Pages
```

把 Source 设置为：

```text
GitHub Actions
```

之后每次推送主分支，GitHub 会自动部署最新文档。

## base 配置

GitHub Pages 仓库站点通常带仓库名前缀。例如仓库名是 `news-new`，最终地址可能是：

```text
https://<owner>.github.io/news-new/
```

这时 `docs/.vitepress/config.ts` 需要配置：

```ts
base: '/news-new/'
```

如果仓库名不是 `news-new`，请同步修改：

```ts
base: '/你的仓库名/'
```

如果使用用户站点，例如：

```text
https://<owner>.github.io/
```

则可以改为：

```ts
base: '/'
```

## 本地验证

部署前建议先构建：

```bash
npm run docs:build
```

再预览：

```bash
npm run docs:preview
```

确认页面链接、图片、侧边栏和搜索都正常后再推送。

## 常见问题

### 页面样式丢失

通常是 `base` 配置不匹配。检查线上地址是否包含仓库名前缀，并让 `base` 与仓库名保持一致。

### 工作流 npm ci 失败

如果仓库里还没有 `package-lock.json`，可以先本地执行一次：

```bash
npm install
```

然后提交生成的 `package-lock.json`。

### 页面 404

确认 GitHub Pages 的 Source 已设置为 GitHub Actions，并检查 Actions 页面里的部署任务是否成功。
