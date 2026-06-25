import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"整体概览","description":"","frontmatter":{},"headers":[],"relativePath":"guide/overview.md","filePath":"guide/overview.md","lastUpdated":1782354912000}');
const _sfc_main = { name: "guide/overview.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="整体概览" tabindex="-1">整体概览 <a class="header-anchor" href="#整体概览" aria-label="Permalink to &quot;整体概览&quot;">​</a></h1><h2 id="项目目标" tabindex="-1">项目目标 <a class="header-anchor" href="#项目目标" aria-label="Permalink to &quot;项目目标&quot;">​</a></h2><p>本项目的目标是搭建一个 AI 前沿科技内容分享站，用稳定、低成本、易维护的方式沉淀每日资讯、实现教程、项目说明和部署手册。</p><p>第一阶段关注静态内容站本身：</p><ul><li>用 Markdown 编写 AI 科技内容和教程。</li><li>用 VitePress 生成首页、侧边栏、页内目录和搜索。</li><li>用 GitHub Pages 发布静态页面。</li><li>保留 <code>daily</code> 目录，按日期归档每日内容。</li><li>不维护服务端、数据库或特定内容生成平台。</li></ul><h2 id="总体架构" tabindex="-1">总体架构 <a class="header-anchor" href="#总体架构" aria-label="Permalink to &quot;总体架构&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Markdown 内容</span></span>
<span class="line"><span>  |</span></span>
<span class="line"><span>  | docs/**/*.md</span></span>
<span class="line"><span>  v</span></span>
<span class="line"><span>VitePress 构建</span></span>
<span class="line"><span>  |</span></span>
<span class="line"><span>  | docs/.vitepress/dist</span></span>
<span class="line"><span>  v</span></span>
<span class="line"><span>GitHub Pages 托管</span></span>
<span class="line"><span>  |</span></span>
<span class="line"><span>  v</span></span>
<span class="line"><span>公开访问的 AI 前沿科技分享站</span></span></code></pre></div><h2 id="文档站架构" tabindex="-1">文档站架构 <a class="header-anchor" href="#文档站架构" aria-label="Permalink to &quot;文档站架构&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>dailynews/</span></span>
<span class="line"><span>  docs/</span></span>
<span class="line"><span>    index.md</span></span>
<span class="line"><span>    guide/</span></span>
<span class="line"><span>      overview.md</span></span>
<span class="line"><span>      getting-started.md</span></span>
<span class="line"><span>      build-your-own.md</span></span>
<span class="line"><span>    chapter1/</span></span>
<span class="line"><span>      product-shape.md</span></span>
<span class="line"><span>    chapter2/</span></span>
<span class="line"><span>      frontend-pwa.md</span></span>
<span class="line"><span>    daily/</span></span>
<span class="line"><span>      2026-06-23.md</span></span>
<span class="line"><span>    deploy/</span></span>
<span class="line"><span>      github-pages.md</span></span>
<span class="line"><span>    .vitepress/</span></span>
<span class="line"><span>      config.ts</span></span>
<span class="line"><span>      theme/</span></span>
<span class="line"><span>  .github/</span></span>
<span class="line"><span>    workflows/</span></span>
<span class="line"><span>      deploy.yml</span></span>
<span class="line"><span>  package.json</span></span></code></pre></div><h2 id="为什么使用-vitepress" tabindex="-1">为什么使用 VitePress <a class="header-anchor" href="#为什么使用-vitepress" aria-label="Permalink to &quot;为什么使用 VitePress&quot;">​</a></h2><p>VitePress 适合这个场景的原因很直接：</p><ul><li>Markdown 写作成本低，适合持续维护日报、教程和项目说明。</li><li>自动生成侧边栏、页内目录、搜索、上一页和下一页。</li><li>构建结果是静态文件，适合部署到 GitHub Pages。</li><li>后续可以继续添加自定义 Vue 组件，承载更丰富的示例。</li></ul><h2 id="站点路由说明" tabindex="-1">站点路由说明 <a class="header-anchor" href="#站点路由说明" aria-label="Permalink to &quot;站点路由说明&quot;">​</a></h2><p>你给的参考站点使用的是 <code>#/./chapter8/...</code> 这种哈希路由，看起来更像 Docsify 的运行时渲染方式。</p><p>VitePress 默认是构建期生成静态页面，因此路由通常是：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/guide/overview</span></span>
<span class="line"><span>/chapter1/product-shape</span></span>
<span class="line"><span>/daily/2026-06-23</span></span></code></pre></div><p>部署到 GitHub Pages 仓库站点时，还需要带上仓库名前缀，例如：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>https://&lt;owner&gt;.github.io/dailynews/guide/overview</span></span></code></pre></div><p>页面内的小标题锚点仍然支持，例如：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>https://&lt;owner&gt;.github.io/dailynews/daily/2026-06-23#ai-技术新闻</span></span></code></pre></div></div>`);
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
