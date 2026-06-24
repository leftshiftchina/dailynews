import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"每日新技术推送小博客","text":"Coze 工作流驱动的技术资讯文档站","tagline":"用 VitePress + GitHub Pages 承载项目说明、实现教程、API 文档和部署手册。","image":{"src":"/favicon.svg","alt":"Daily Tech News"},"actions":[{"theme":"brand","text":"开始阅读","link":"/guide/overview"},{"theme":"alt","text":"快速开始","link":"/guide/getting-started"}]},"features":[{"title":"文档式阅读","details":"使用 VitePress 的章节、侧边栏、页内目录和本地搜索组织内容，适合长期维护。"},{"title":"GitHub Pages 部署","details":"内置 GitHub Actions 工作流，推送到 main 或 master 分支即可自动构建发布。"},{"title":"面向项目落地","details":"文档围绕 Coze 内容生成、后端接收、前端阅读和 PWA 能力展开。"}]},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":null}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="项目介绍" tabindex="-1">项目介绍 <a class="header-anchor" href="#项目介绍" aria-label="Permalink to &quot;项目介绍&quot;">​</a></h2><p>每日新技术推送小博客是一个轻量的技术资讯阅读项目：每天由 Coze 工作流生成一篇技术新闻或技术趋势内容，再通过 HTTP 接口推送到服务端保存，最后在移动端网页或 PWA 中阅读。</p><p>这个仓库现在采用 VitePress 作为在线文档站方案，适合放在 GitHub Pages 上公开访问。文档结构参考书籍式阅读体验：左侧是章节目录，正文使用 Markdown 编写，每个页面自动生成页内目录和标题锚点。</p><h2 id="你将获得什么" tabindex="-1">你将获得什么 <a class="header-anchor" href="#你将获得什么" aria-label="Permalink to &quot;你将获得什么&quot;">​</a></h2><table tabindex="0"><thead><tr><th>模块</th><th>内容</th><th>状态</th></tr></thead><tbody><tr><td>项目导读</td><td>项目背景、使用场景、整体链路</td><td>已完成</td></tr><tr><td>产品与内容链路</td><td>页面形态、Coze 输出、每日内容流转</td><td>已完成</td></tr><tr><td>工程实现</td><td>前端 PWA、后端 API、SQLite 存储</td><td>已完成</td></tr><tr><td>API 文档</td><td>新闻写入、今日新闻、历史列表、健康检查</td><td>已完成</td></tr><tr><td>部署说明</td><td>VitePress 构建与 GitHub Pages 发布</td><td>已完成</td></tr></tbody></table><h2 id="内容导航" tabindex="-1">内容导航 <a class="header-anchor" href="#内容导航" aria-label="Permalink to &quot;内容导航&quot;">​</a></h2><table tabindex="0"><thead><tr><th>章节</th><th>关键内容</th><th>链接</th></tr></thead><tbody><tr><td>整体概览</td><td>项目目标、架构和阅读路线</td><td><a href="/news-new/guide/overview">进入</a></td></tr><tr><td>快速开始</td><td>本地安装、预览和构建</td><td><a href="/news-new/guide/getting-started">进入</a></td></tr><tr><td>第一章 产品形态</td><td>今日页、历史页、详情页、设置页</td><td><a href="/news-new/chapter1/product-shape">进入</a></td></tr><tr><td>第二章 Coze 内容流</td><td>JSON 输出、入库规则、内容校验</td><td><a href="/news-new/chapter1/coze-flow">进入</a></td></tr><tr><td>第三章 前端与 PWA</td><td>Vite、移动端阅读、离线缓存</td><td><a href="/news-new/chapter2/frontend-pwa">进入</a></td></tr><tr><td>第四章 后端与存储</td><td>Express、SQLite、接口边界</td><td><a href="/news-new/chapter2/backend-storage">进入</a></td></tr><tr><td>新闻 API</td><td>接口定义和请求示例</td><td><a href="/news-new/api/news">进入</a></td></tr><tr><td>GitHub Pages</td><td>自动构建和发布配置</td><td><a href="/news-new/deploy/github-pages">进入</a></td></tr></tbody></table><h2 id="阅读建议" tabindex="-1">阅读建议 <a class="header-anchor" href="#阅读建议" aria-label="Permalink to &quot;阅读建议&quot;">​</a></h2><p>如果你只是想把文档站跑起来，先读 <a href="/news-new/guide/getting-started">快速开始</a> 和 <a href="/news-new/deploy/github-pages">GitHub Pages</a>。</p><p>如果你想继续完善原来的每日新闻项目，建议按照章节顺序阅读：先确定产品页面，再稳定 Coze 输出结构，然后实现后端接收和前端阅读体验。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
