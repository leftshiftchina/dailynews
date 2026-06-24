# 第三章 前端与 PWA

## 技术选型

前端建议使用：

- Vite
- React
- TypeScript
- 普通 CSS 或 CSS Modules

如果只是展示静态内容，纯 HTML/CSS/JavaScript 也能实现。但当你需要历史列表、详情页、PWA 状态、通知订阅和离线缓存时，组件化工程会更容易维护。

## 页面结构

```text
web/
  src/
    api/
      news.ts
    components/
      NavBar.tsx
    pages/
      TodayPage.tsx
      HistoryPage.tsx
      DetailPage.tsx
      SettingsPage.tsx
    styles/
      base.css
```

## 移动端阅读体验

阅读体验优先级高于装饰感。建议：

- 主体内容保持单列。
- 段落间距略大于普通后台系统。
- 不使用过多卡片嵌套。
- 底部导航固定今日、历史、设置三个入口。
- 错误、空状态和加载状态都需要明确。

## PWA 基础能力

PWA 第一阶段需要：

- `manifest.webmanifest`
- Service Worker
- 应用图标
- HTTPS 访问
- 基础缓存策略

缓存策略建议：

| 资源 | 策略 |
| --- | --- |
| HTML/JS/CSS | Cache First，并通过版本更新 |
| 今日新闻 API | Network First，失败时读取最近缓存 |
| 历史列表 API | Network First |
| 图标和字体 | Cache First |

## 通知提醒

每日提醒建议放在 PWA 稳定之后再做。原因是 Web Push 需要浏览器支持、用户授权、VAPID 密钥和后端订阅存储。

交互上应做能力检测：

```text
当前环境支持通知 -> 显示“开启每日提醒”
当前环境不支持通知 -> 显示“添加到主屏幕后可开启提醒”
```
