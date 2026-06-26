# 从零搭建

我是用codex 搭建的，采用的技术架构是VitePress \+ GitHub Pages 。

```HTML
我现在想做的是VitePress + GitHub Pages 搭建的在线文档站  
```

AI 会帮我们实现好整个架构的代码（或者直接clone我这个项目代码），我们需要做的就是github的相关配置。

1. 首先我们要有一个github账号，https://github\.com/官网用邮箱注册一个。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWUwOWM0ZmU5ODc0OTkwZTQ3NzUyZDNiNzFkODM5NTdfNWZhY2VjMDRhZDFlNDdjNGE1ZGJiOGEzM2E3ZTdhMzdfSUQ6NzY1NTUyNTc2OTg3MTkyMDA5Ml8xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)

2. 创建一个公开仓库

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWE1NTA4ZWZkODQ4NWMwMzgwMmE5MzdkNDkxOWRhYjhfOTMzZmExMTNiZmZhMTI3NmIzODUxNDkxMWJiNTA5YzJfSUQ6NzY1NTUyNjc3MDU3NDI4MTkwOF8xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)

3. 设置仓库Settings \-\> Pages  和 Actions\.  将 GitHub Pages 选择 **GitHub Actions** 发布。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTdhODkzZTUwZjI0MWMzYzRiMzg5NDE5MmQyZDBlZWZfZjRiMzZiZTAyNzc3MWQ0MTBkZmEyYTY5ZjJmYzMzYTdfSUQ6NzY1NTUyODY5MDczNjQwMTM4N18xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)

这里要注意， GitHub 仓库名和 VitePress 的 base配置保持一致。VitePress 官方也要求 GitHub Pages 项目站点要把 `base` 配成 /\<repo\>/。

发布后地址会是：https://你的用户名\.github\.io/\<repo\>/

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmJiZjBkNTQ5NWQyZGJjM2MyYWE1OTZiNzMzMGY3NzFfNjk3YTY5NmQxYWUxN2Q2YWRhODJiMTc2MTEzMDE4M2ZfSUQ6NzY1NTUyOTA5MDIzODI3MDQyMl8xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)



4. 将AI生成的本地代码放到这个仓库中，执行如下命令（前提本地安装Git：https://git\-scm\.com\)。或者页面上手动上传文件，如下图

```HTML
Set-Location 'D:\AIProject\新建文件夹\work\news-new'

git init
git add .
git commit -m "init vitepress docs"
git branch -M main
git remote add origin https://github.com/你的用户名/news-new.git
git push -u origin main
```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzBkMzVlZTFjMzg0MTZhZTdiZWFjNGQ4Y2U2ZDc2NWFfMzlmZDNmOWNlYmJkZjI2MGE0MTAzYjRiNGVkZmMyNzdfSUQ6NzY1NTUzMDc5MTE2MjMwMTQwM18xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGUxNGMyYjdmODJiOGY0NTA5YWNhZjVjY2FkZjU5YzNfZjBlYmI3YWUyNzAwMWJkN2NhYTQwZDgzOGFmNTQ4NTFfSUQ6NzY1NTUzMDAzMTkzMDU3NjA1OF8xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)

5. 代码上传后会触发Build and deployment，等它变绿。成功后访问：https://你的用户名\.github\.io/\<repo\>/

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDczODg3ZThhM2Q0YjhjMDE1OThkNzUyOWJhN2Y3NWJfNzk0MjFiOGM0ZGI2ODY2YWEwYmEwZDEyOWVlN2RmMjRfSUQ6NzY1NTUzMTE4NjE2NDQ1MjMwOF8xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)



**注：**

你仓库里已经有这个部署文件\.github/workflows/deploy\.yml\.它会自动执行如下命令然后把 docs/\.vitepress/dist 发布到 GitHub Pages。所以后续你直接更新文章推送到仓库里，就可以了。md文档会被自动渲染的。

```HTML
npm ci
npm run docs:build
```



到这里就完成整个个人博客的搭建了。下面是添加评论区功能，如果不需要可以跳过。



评论区功能技术选型：仓库开启 Discussions \+ 安装配置 Giscus

前置硬性要求：仓库必须是 Public（公开仓库），私有仓库 Giscus 无法读取评论。

第一步：给仓库启用 Discussions 功能

1. 进入你的仓库主页，顶部导航栏点击 Settings（设置）

2. 默认进入 `General` 页面，往下滚动找到 Features 区块

3. 勾选 Discussions 复选框

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzdjMDhhMWNlOThmOThiZjk2N2ZjYjBiMzBjOGY1MDdfY2ExZGFlNDQxMWZlNGQ3M2Y4NWI1OTFiM2JhOGE0YTJfSUQ6NzY1NTUzNDI3Njk2OTY0NzI4M18xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODgyZjYzMjAyYTcyMDdiODMwNWRjMjRlNTZhZjkxZjZfNjAxZTdlOWRjZjQwZDUxMzBlOTU2ZGQyYTc1MTFjZTlfSUQ6NzY1NTUzNDM2NDc4ODQyNzk4OV8xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)

刷新页面，仓库顶部会多出 `Discussions` 标签页，代表开启成功

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmE1NTIyNjViYmE3YzIzOTRlMjJhM2ExN2UwYjkwNzdfYWUxZTczZDAxMzI3ZGUyNjZiNzRjYTZlMTM3OWFiYzFfSUQ6NzY1NTUzNDUwODYyODAzNjg0NV8xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)

2. 第二步：安装 Giscus GitHub App 并授权当前仓库: Giscus选择授权仓库

- 打开 Giscus 应用地址：[https://github\.com/apps/giscus](https://link.wtturl.cn/?target=https%3A%2F%2Fgithub.com%2Fapps%2Fgiscus&scene=im&aid=497858&lang=zh)

- 点击右侧绿色 Install 按钮

- 授权账户选择你的账号

- 权限选择 Only select repositories（仅选定仓库）

- 下拉搜索选中你要开启的仓库

- 确认权限：读写 Discussions 权限，点击 Install 完成安装

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWYxYzJhNzIzMjE1NThiMTZhMzFmZWU5ZjQyYTYzZGZfYmQyZmM1NTI2NTU4YTcxNDNhYmIzOTIyYTMxYTMxYjhfSUQ6NzY1NTUzNTI2NzM3MzczMDc5OV8xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)

安装完成在这里可以看到，就按照成功了

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjY5ZGEyNmMzYTVmMGI2ZmU5Mzc4NWI2ZWJiZTZkZDBfYzFkYTBhYzAxMWVmM2JkNTBlOWZhMWRjYTA1MDI2YjdfSUQ6NzY1NTUzNjIyNTE5MTAyMTU0MF8xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTNiOGRhZTMwYmI4MDkwMTYyYTQzMDBjYmE3M2NjZDBfYzI4NzBiYWRmOWU1Y2FkZWJlYWE5ZWJlODA5MmZkYjFfSUQ6NzY1NTUzNTU2MTk4NTg4NzQ2OV8xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)

3. 第三步：Giscus 官网生成嵌入代码（用于 VitePress 文档评论）

打开中文配置页：[https://giscus\.app/zh\-CN](https://link.wtturl.cn/?target=https%3A%2F%2Fgiscus.app%2Fzh-CN&scene=im&aid=497858&lang=zh)

仓库 填写：`leftshiftchina/dailynews` 点击「检查仓库」，提示✅成功即前两步配置无误

页面 ↔ Discussion 映射（推荐默认） 选择：`Discussion 标题包含页面路径 (pathname)`

Discussion 分类 建议选择：`Announcements`（管理员可控，防止随意新建讨论）

下方「功能」按需勾选： 

- ✅ 启用反应（点赞表情）

- 其余默认关闭即可

主题、语言自选（中文填 `zh-CN`）

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Y2E4ZmNhYzY3MmM5ZTQzNjY4Y2E0NGU0OTAxZTBjZGFfMjZjNjI2NTE3M2JjMmNiNWM4YmE5NmNhYzMzMWJhNjVfSUQ6NzY1NTUzNjAzNzIzODg1MjgxM18xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)

滑到最底部，复制完整 `<script>` 代码

根据配置修改\\\.vitepress\\config\.ts配置文件，我是直接发给了codex 让它帮我调整的。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWE2Yzc5ZWIwNzcyYzVhYWQ3MTJhMGVlOGJjYmY4YTFfNTdmMDU1MDBkODkyNTcyMzI4ZGZlODhiN2I3ZTFmNGFfSUQ6NzY1NTUzNjQ3MTUwODY2NzM1OF8xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)



到这里评论区的功能就加好了

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWQ1OTMyODY4NTllOWVkNGJiNGY1NTQ2MjZiYzJhNjRfMDZlYmJmOGFjYTgwNDRiNzhhNDA1OGFkNjU5NmZiZGNfSUQ6NzY1NTU0MTg4MzQ0NzU0NTAxMV8xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)



进阶，添加PWA配置

什么是PWA? 

PWA = Progressive Web App 渐进式网页应用 PWA 配置 = 给你的普通网站（你现在的 VitePress 博客）加两套核心配置，让网页拥有手机 APP 一样的能力\.

简单理解就是点开独立窗口打开，不带浏览器地址栏。

硬性前提：网站必须是 HTTPS（ GitHub Pages 天然满足）

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWNhYzkxMTkwMDg2NWQ1NTI1MjQzODg3Nzk5Yzg5ZTlfY2VmZGExNjYyNWJkOTQ4YTBkYzBlNDE3NmI0ZWYwZGZfSUQ6NzY1NTU0MTc2ODEwMDQwMDM0NF8xNzgyNDQ0OTYyOjE3ODI1MzEzNjJfVjM)



