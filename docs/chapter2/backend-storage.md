# 第四章 后端与存储

## 技术选型

后端建议使用：

- Node.js
- Express
- SQLite

这套方案适合第一版：接收 Coze HTTP 请求简单，SQLite 单文件存储成本低，后续也能迁移到 MySQL、PostgreSQL 或云数据库。

## 推荐目录

```text
server/
  src/
    app.ts
    config.ts
    db.ts
    routes/
      news.ts
      health.ts
    services/
      newsService.ts
    validators/
      newsPayload.ts
  data/
    news.db
  .env.example
  package.json
```

## 数据库设计

```sql
CREATE TABLE news_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_date TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  tags_json TEXT NOT NULL DEFAULT '[]',
  source TEXT NOT NULL DEFAULT 'Coze',
  source_url TEXT,
  reading_minutes INTEGER,
  raw_payload TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX idx_news_posts_post_date ON news_posts(post_date DESC);
```

## 安全设计

Coze 调用写入接口时必须携带 API Key：

```http
X-Api-Key: <server_api_key>
```

服务端从环境变量读取：

```text
NEWS_API_KEY=xxxxxxxx
```

未通过鉴权的请求直接返回 `401`。

## 接口保护

需要覆盖这些保护点：

- 限制请求体大小。
- 校验字段类型和长度。
- 日志不打印完整 API Key。
- Markdown 渲染前进行安全处理。
- 只开放必要接口。

## 部署建议

第一版可以使用单机部署：

```text
news/
  server/
    data/news.db
  web/
    dist/
  nginx.conf
```

Nginx 负责：

- `/` 指向前端静态文件。
- `/api` 反向代理到 Node 服务。
- 配置 HTTPS。
