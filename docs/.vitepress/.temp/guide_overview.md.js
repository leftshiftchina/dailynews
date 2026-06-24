import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"整体概览","description":"","frontmatter":{},"headers":[],"relativePath":"guide/overview.md","filePath":"guide/overview.md","lastUpdated":null}');
const _sfc_main = { name: "guide/overview.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="整体概览" tabindex="-1">整体概览 <a class="header-anchor" href="#整体概览" aria-label="Permalink to &quot;整体概览&quot;">​</a></h1><h2 id="项目目标" tabindex="-1">项目目标 <a class="header-anchor" href="#项目目标" aria-label="Permalink to &quot;项目目标&quot;">​</a></h2><p>本项目的目标是搭建一个面向移动端阅读的每日技术资讯系统，并配套一个清晰的在线文档站。</p><p>第一阶段关注内容链路和阅读体验：</p><ul><li>Coze 每天生成一篇技术新闻或技术趋势内容。</li><li>Coze 通过 HTTP 接口把结构化 JSON 推送到后端。</li><li>后端保存每日内容，并提供今日内容和历史内容接口。</li><li>前端以移动优先方式展示今日内容、历史列表和详情页。</li><li>文档站记录产品设计、接口设计、部署方式和后续迭代计划。</li></ul><h2 id="总体架构" tabindex="-1">总体架构 <a class="header-anchor" href="#总体架构" aria-label="Permalink to &quot;总体架构&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Coze 定时工作流</span></span>
<span class="line"><span>  |</span></span>
<span class="line"><span>  | HTTP POST /api/news</span></span>
<span class="line"><span>  v</span></span>
<span class="line"><span>Node.js / Express 后端</span></span>
<span class="line"><span>  |</span></span>
<span class="line"><span>  | 保存每日内容</span></span>
<span class="line"><span>  v</span></span>
<span class="line"><span>SQLite 或云数据库</span></span>
<span class="line"><span>  |</span></span>
<span class="line"><span>  | GET /api/news/today</span></span>
<span class="line"><span>  | GET /api/news</span></span>
<span class="line"><span>  v</span></span>
<span class="line"><span>移动端 PWA 网页</span></span></code></pre></div><h2 id="文档站架构" tabindex="-1">文档站架构 <a class="header-anchor" href="#文档站架构" aria-label="Permalink to &quot;文档站架构&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>news-new/</span></span>
<span class="line"><span>  docs/</span></span>
<span class="line"><span>    index.md</span></span>
<span class="line"><span>    guide/</span></span>
<span class="line"><span>    chapter1/</span></span>
<span class="line"><span>    chapter2/</span></span>
<span class="line"><span>    api/</span></span>
<span class="line"><span>    deploy/</span></span>
<span class="line"><span>    .vitepress/</span></span>
<span class="line"><span>      config.ts</span></span>
<span class="line"><span>      theme/</span></span>
<span class="line"><span>  .github/</span></span>
<span class="line"><span>    workflows/</span></span>
<span class="line"><span>      deploy.yml</span></span>
<span class="line"><span>  package.json</span></span></code></pre></div><h2 id="为什么使用-vitepress" tabindex="-1">为什么使用 VitePress <a class="header-anchor" href="#为什么使用-vitepress" aria-label="Permalink to &quot;为什么使用 VitePress&quot;">​</a></h2><p>VitePress 适合这个场景的原因很直接：</p><ul><li>Markdown 写作成本低，适合持续维护教程和 API 文档。</li><li>自动生成侧边栏、页内目录、搜索、上一页和下一页。</li><li>构建结果是静态文件，适合部署到 GitHub Pages。</li><li>后续可以继续添加自定义 Vue 组件，承载更丰富的示例。</li></ul><h2 id="站点路由说明" tabindex="-1">站点路由说明 <a class="header-anchor" href="#站点路由说明" aria-label="Permalink to &quot;站点路由说明&quot;">​</a></h2><p>你给的参考站点使用的是 <code>#/./chapter8/...</code> 这种哈希路由，看起来更像 Docsify 的运行时渲染方式。</p><p>VitePress 默认是构建期生成静态页面，因此路由通常是：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/guide/overview</span></span>
<span class="line"><span>/chapter1/product-shape</span></span>
<span class="line"><span>/api/news</span></span></code></pre></div><p>部署到 GitHub Pages 仓库站点时，还需要带上仓库名前缀，例如：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>https://&lt;owner&gt;.github.io/news-new/guide/overview</span></span></code></pre></div><p>页面内的小标题锚点仍然支持，例如：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>https://&lt;owner&gt;.github.io/news-new/chapter1/coze-flow#coze-输出建议</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/overview.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const overview = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  overview as default
};
