# 第二章 Coze 内容流

## 内容链路

Coze 工作流负责生成每日内容，后端负责接收和保存，前端负责阅读展示。

```text
定时触发
  -> 搜集技术资讯
  -> 生成摘要和正文
  -> 输出结构化 JSON
  -> HTTP POST 到后端
  -> 前端读取并展示
```

## Coze 输出建议

建议让 Coze 输出 JSON，而不是一整段纯文本。结构化数据更适合校验、保存、搜索和页面展示。

```json
{
  "date": "2026-06-23",
  "title": "AI Agent 工作流平台的新趋势",
  "summary": "今日关注 AI Agent 从单点工具调用走向可观测、可编排、可治理的平台化能力。",
  "tags": ["AI", "Agent", "Workflow"],
  "content": "正文内容，支持 Markdown 格式。",
  "source": "Coze",
  "sourceUrl": "",
  "readingMinutes": 3
}
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `date` | string | 是 | 内容日期，格式为 `YYYY-MM-DD` |
| `title` | string | 是 | 标题 |
| `summary` | string | 是 | 一句话摘要 |
| `tags` | string[] | 否 | 标签 |
| `content` | string | 是 | 正文，建议使用 Markdown |
| `source` | string | 否 | 来源，默认 `Coze` |
| `sourceUrl` | string | 否 | 原始链接 |
| `readingMinutes` | number | 否 | 预计阅读分钟数 |

## 入库规则

- 使用 `date` 作为每日内容唯一键。
- 同一天重复推送时默认覆盖当天内容。
- 保存原始请求内容，便于排查 Coze 输出问题。
- 对标题、摘要、正文和标签做长度限制，避免异常内容写入。

建议限制：

| 字段 | 最大长度 |
| --- | --- |
| `title` | 120 字 |
| `summary` | 300 字 |
| `content` | 20000 字 |
| `tags` | 最多 8 个 |

## 内容安全

如果正文支持 Markdown，需要注意：

- 渲染后禁止执行脚本。
- 过滤危险 HTML 标签和属性。
- 外链设置 `rel="noopener noreferrer"`。
- 图片资源可以先不开放，后续如需开放再加域名白名单。
