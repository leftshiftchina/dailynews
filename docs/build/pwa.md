# PWA 配置

本站已配置轻量 PWA，支持浏览器识别为可安装应用，并提供基础离线缓存能力。

## 文件位置

PWA 相关文件都放在静态资源目录：

```text
docs/public/
  apple-touch-icon.png
  icon-192.png
  icon-512.png
  manifest.webmanifest
  maskable-icon-512.png
  sw.js
```

VitePress 会把 `docs/public` 下的文件原样复制到构建产物根目录。

## Manifest

`docs/public/manifest.webmanifest` 用来声明应用名称、启动地址、主题色和图标。

当前关键配置：

| 配置 | 说明 |
| --- | --- |
| `name` | 安装后的完整应用名 |
| `short_name` | 安装后的短名称 |
| `start_url` | 从桌面图标打开时进入的地址 |
| `scope` | PWA 控制的路径范围 |
| `display` | 使用 `standalone`，安装后更像独立应用 |
| `theme_color` | 浏览器地址栏和安装体验使用的主题色 |
| `icons` | 使用 `icon-192.png`、`icon-512.png` 和 `maskable-icon-512.png` 作为安装图标，同时保留 `favicon.svg` |

## 添加到桌面图标

PWA 安装到桌面时，浏览器优先读取 `manifest.webmanifest` 中的 PNG 图标。本站已准备三类图标：

- `icon-192.png`：常规应用图标，适合桌面快捷方式和小尺寸入口。
- `icon-512.png`：高清应用图标，适合安装弹窗和高分屏设备。
- `maskable-icon-512.png`：可裁切安全图标，适合 Android 等会自动套圆角、圆形或其他形状的平台。

iOS Safari 对 Web App 图标的支持更依赖 `apple-touch-icon`，所以页面头部也配置了：

```ts
['link', { rel: 'apple-touch-icon', href: '/dailynews/apple-touch-icon.png', sizes: '180x180' }]
```

如果你替换了 `docs/public/favicon.svg`，建议同步重新生成这些 PNG 图标，避免添加到桌面后仍显示旧图标或浏览器默认图标。

因为本站部署在 GitHub Pages 仓库路径下，所以 `start_url` 和 `scope` 使用：

```json
"/dailynews/"
```

如果你的仓库名不是 `dailynews`，需要同步修改：

- `docs/.vitepress/config.ts` 中的 `base`
- `docs/public/manifest.webmanifest` 中的 `start_url`、`scope`、图标路径
- `docs/public/sw.js` 中的 `BASE_PATH`

## Service Worker

`docs/public/sw.js` 提供基础缓存能力：

- 首次安装时缓存首页、favicon、安装图标和 manifest。
- 访问站内页面时使用 network first 策略，优先拿最新页面，断网时回退缓存。
- 访问 CSS、JS、图片、字体等静态资源时使用 stale while revalidate 策略，优先快速返回缓存，同时后台更新。
- 新版本激活时清理旧缓存。

## 注册方式

Service Worker 在主题入口中注册：

```ts
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/dailynews/sw.js')
  })
}
```

位置：

```text
docs/.vitepress/theme/index.ts
```

## 本地验证

先构建并预览：

```bash
npm run docs:build
npm run docs:preview
```

然后打开浏览器开发者工具：

1. 进入 Application 面板。
2. 查看 Manifest 是否正常识别。
3. 查看 Service Workers 是否注册成功。
4. 刷新页面后查看 Cache Storage 中是否出现 `dailynews-pwa-v1`。

开发环境下浏览器可能缓存旧 Service Worker。调试时可以在 Application 面板中执行 unregister，或者清理站点数据后重新访问。
