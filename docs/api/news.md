# 新闻 API

## 接口总览

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `POST` | `/api/news` | Coze 推送新闻 |
| `GET` | `/api/news/today` | 获取今日新闻 |
| `GET` | `/api/news` | 获取历史新闻列表 |
| `GET` | `/api/news/:date` | 获取指定日期新闻 |
| `GET` | `/api/health` | 健康检查 |

## 推送每日新闻

```http
POST /api/news
Content-Type: application/json
X-Api-Key: <server_api_key>
```

请求体：

```json
{
  "date": "2026-06-23",
  "title": "AI Agent 工作流平台的新趋势",
  "summary": "今日关注 AI Agent 平台化能力。",
  "tags": ["AI", "Agent"],
  "content": "正文 Markdown 内容",
  "source": "Coze",
  "sourceUrl": "",
  "readingMinutes": 3
}
```

响应：

```json
{
  "success": true,
  "data": {
    "id": "2026-06-23",
    "updated": true
  }
}
```

## 获取今日新闻

```http
GET /api/news/today
```

响应：

```json
{
  "success": true,
  "data": {
    "date": "2026-06-23",
    "title": "AI Agent 工作流平台的新趋势",
    "summary": "今日关注 AI Agent 平台化能力。",
    "tags": ["AI", "Agent"],
    "content": "正文 Markdown 内容",
    "source": "Coze",
    "sourceUrl": "",
    "readingMinutes": 3,
    "createdAt": "2026-06-23T08:00:00.000Z",
    "updatedAt": "2026-06-23T08:00:00.000Z"
  }
}
```

## 获取历史新闻列表

```http
GET /api/news?page=1&pageSize=20
```

响应：

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "date": "2026-06-23",
        "title": "AI Agent 工作流平台的新趋势",
        "summary": "今日关注 AI Agent 平台化能力。",
        "tags": ["AI", "Agent"],
        "readingMinutes": 3
      }
    ],
    "page": 1,
    "pageSize": 20,
    "total": 1
  }
}
```

## 获取指定日期新闻

```http
GET /api/news/2026-06-23
```

## 健康检查

```http
GET /api/health
```

响应：

```json
{
  "success": true,
  "data": {
    "status": "ok"
  }
}
```
