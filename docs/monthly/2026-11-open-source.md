---
title: 2026 年 11 月 AI 开源项目精选
description: 五个本月新建仓库或进入公开预览的 AI 项目，涵盖网站评测、Office 文档、表格、数据看板和推理部署。
---

# 2026 年 11 月 AI 开源项目精选

by@leftshift · 截至 11 月 24 日

想看编程 Agent 能否做出真正可用的网站，可以从 WebsiteBench 的单个任务开始。想让它改一份现成文件，可以试 MR Office。下面五个项目按用途排列，日期注明了本月发生的是仓库创建还是公开预览。

| 想做什么 | 项目 | 本月记录 | 代码许可证 |
| --- | --- | --- | --- |
| 评测 Agent 做出的网页能不能用 | WebsiteBench | 11 月 4 日建仓 | Apache-2.0 |
| 让 Agent 读取并修改 Office 文件 | MR Office | 11 月 10 日建仓 | AGPL-3.0 |
| 在 Windows 上批量整理中文表格 | 格知 AI | 11 月 9 日建仓 | MIT |
| 用一句话生成可刷新的数据看板 | OpenDashboards | 11 月 6 日建仓 | MIT |
| 在 AWS Trainium 上部署推理服务 | SGLang-Neuron | 11 月 12 日公开预览 | Apache-2.0 |

## 🌐 WebsiteBench：检验页面外观和交互

这个基准让 Agent 通过浏览器探索参考网站，再重建它的前后端。70 个网站对应 46,916 个隐藏用例。以表单为例，按钮位置正确只是第一步，提交后的页面状态也要符合预期。项目把功能检查和视觉检查放在同一个用例里，两者都通过才计分。

**怎么上手。** 先看任务清单。装好 Docker 和项目指定版本的 Harbor 后，用下列命令在一个任务上运行参考实现，熟悉评分输出，再换成自己的 Agent。任务名 `medium` 指的是 Medium 网站。[GitHub 仓库](https://github.com/TIGER-AI-Lab/WebsiteBench) · [任务清单](https://github.com/TIGER-AI-Lab/WebsiteBench/blob/main/docs/tasks.md)

```sh
harbor run --task websitebench/medium@v1 --agent oracle
```

## 📄 MR Office：让 Agent 直接修改文件里的对象

如果需求是“把第 3 页标题改短，保留原排版”，直接修改幻灯片对象比重新生成整份文件更合适。MR Office 仓库公开了浏览器编辑器源码；它的 MCP 接口把创建、读取、修改、渲染和导出等操作提供给编程助手。

**怎么上手。** 使用 Codex 时可以按下方官方示例接入 MCP。先让它创建一份两列表格，再改一个单元格，最后读回并导出文件，就能核对整个修改过程。仓库的开源范围是编辑器等组件，项目另有托管产品和配额。[GitHub 仓库](https://github.com/XinaTian/MROffice) · [MCP 接入文档](https://mroffice.ai/en/developers/mcp)

```sh
codex mcp add mroffice -- npx -y mroffice-mcp
```

## 📊 格知 AI：把客户原话整理成可筛选的两列

给它一列客户反馈，可以要求“提取需求类别和一句话摘要，预算没提到就留空”。工作台先展示每行原文、建议值和写入位置，确认后才新增列，还可以撤销。对于需要回查原文的表格，这一步比直接覆盖单元格更实用。

**怎么上手。** 在 Windows 上准备 Node.js 22.13 或更新版本，克隆仓库后依次执行 `npm ci` 和 `npm run dev`。打开本机工作台，配置模型和 API Key，加载自带的反馈示例，再选三行试做分类。程序在本机运行，模型调用走所配置的服务。[GitHub 仓库](https://github.com/beiwocaishijia/gezhi-sheets) · [使用指南](https://github.com/beiwocaishijia/gezhi-sheets/blob/master/docs/USER-GUIDE.md)

## 📈 OpenDashboards：把数据库里的变化带到看板上

连接 PostgreSQL 等数据源后，可以直接问“本月每天新增多少用户，哪些渠道增长最快？”生成的图表会继续查询数据源，支持筛选和下钻。某张图的统计粒度需要调整时，可以单独修改那一张。

**怎么上手。** 想先看交互，可以从项目主页的演示看板入手。自行运行需要 Node.js 20.9 或更新版本、pnpm、Docker 和 Thesys API Key。第一轮用只读账号连接测试库，再拿一条已知结果的查询对照图表，最容易发现聚合或时间范围上的偏差。[GitHub 仓库](https://github.com/thesysdev/opendashboards) · [项目主页](https://opendashboards.com)

## ⚙️ SGLang-Neuron：在 AWS Trainium 上沿用 SGLang 的服务接口

11 月 12 日，SGLang 团队与 AWS 发布了 v0.1.0 公开预览。插件负责把设备、注意力计算和缓存管理接到 NeuronCores 上，应用侧仍可使用熟悉的 SGLang 启动器和接口。它适合已经在用 Trainium、想评估另一套模型服务方案的团队。

**怎么上手。** 先在官方预览说明中核对支持的实例和模型，再按仓库示例准备对应环境，通过 `SGLANG_PLATFORM=neuron` 选用插件。跑通示例后，用自己的请求长度和并发量测延迟，才方便和现有服务比较。[GitHub 仓库](https://github.com/sgl-project/sglang-neuron) · [团队发布说明](https://www.lmsys.org/blog/2026-11-12-sglang-neuron-v0.1.0)
