import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"静态站点结构","description":"","frontmatter":{},"headers":[],"relativePath":"chapter2/frontend-pwa.md","filePath":"chapter2/frontend-pwa.md","lastUpdated":1782302430000}');
const _sfc_main = { name: "chapter2/frontend-pwa.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="静态站点结构" tabindex="-1">静态站点结构 <a class="header-anchor" href="#静态站点结构" aria-label="Permalink to &quot;静态站点结构&quot;">​</a></h1><h2 id="技术选型" tabindex="-1">技术选型 <a class="header-anchor" href="#技术选型" aria-label="Permalink to &quot;技术选型&quot;">​</a></h2><p>当前站点只保留静态内容发布能力，技术栈非常轻：</p><ul><li>VitePress：把 Markdown 构建成静态站点。</li><li>Markdown：编写项目说明、教程和 Daily 内容。</li><li>GitHub Actions：自动构建。</li><li>GitHub Pages：托管构建产物。</li></ul><p>不需要后端服务、数据库、接口网关或独立前端应用。</p><h2 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docs/</span></span>
<span class="line"><span>  index.md</span></span>
<span class="line"><span>  guide/</span></span>
<span class="line"><span>    overview.md</span></span>
<span class="line"><span>    getting-started.md</span></span>
<span class="line"><span>    build-your-own.md</span></span>
<span class="line"><span>  chapter1/</span></span>
<span class="line"><span>    product-shape.md</span></span>
<span class="line"><span>  chapter2/</span></span>
<span class="line"><span>    frontend-pwa.md</span></span>
<span class="line"><span>  daily/</span></span>
<span class="line"><span>    2026-06-23.md</span></span>
<span class="line"><span>  deploy/</span></span>
<span class="line"><span>    github-pages.md</span></span>
<span class="line"><span>  public/</span></span>
<span class="line"><span>    favicon.svg</span></span>
<span class="line"><span>  .vitepress/</span></span>
<span class="line"><span>    config.ts</span></span>
<span class="line"><span>    theme/</span></span></code></pre></div><h2 id="路由规则" tabindex="-1">路由规则 <a class="header-anchor" href="#路由规则" aria-label="Permalink to &quot;路由规则&quot;">​</a></h2><p>VitePress 会根据 Markdown 文件路径生成页面路由：</p><table tabindex="0"><thead><tr><th>文件</th><th>页面</th></tr></thead><tbody><tr><td><code>docs/index.md</code></td><td><code>/</code></td></tr><tr><td><code>docs/guide/overview.md</code></td><td><code>/guide/overview</code></td></tr><tr><td><code>docs/daily/2026-06-23.md</code></td><td><code>/daily/2026-06-23</code></td></tr><tr><td><code>docs/deploy/github-pages.md</code></td><td><code>/deploy/github-pages</code></td></tr></tbody></table><p>因为当前开启了 <code>cleanUrls: true</code>，线上地址会隐藏 <code>.html</code> 后缀。</p><h2 id="导航配置" tabindex="-1">导航配置 <a class="header-anchor" href="#导航配置" aria-label="Permalink to &quot;导航配置&quot;">​</a></h2><p>站点导航集中在：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docs/.vitepress/config.ts</span></span></code></pre></div><p>常用配置包括：</p><table tabindex="0"><thead><tr><th>配置</th><th>作用</th></tr></thead><tbody><tr><td><code>title</code></td><td>浏览器标题</td></tr><tr><td><code>description</code></td><td>站点描述</td></tr><tr><td><code>base</code></td><td>GitHub Pages 仓库名前缀</td></tr><tr><td><code>themeConfig.nav</code></td><td>顶部导航</td></tr><tr><td><code>themeConfig.sidebar</code></td><td>左侧目录</td></tr></tbody></table><p>新增页面后，记得把它加入 <code>sidebar</code> 或首页导航表中，否则用户只能通过直接链接或搜索访问。</p><h2 id="资源管理" tabindex="-1">资源管理 <a class="header-anchor" href="#资源管理" aria-label="Permalink to &quot;资源管理&quot;">​</a></h2><p>静态资源放在：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docs/public/</span></span></code></pre></div><p>例如 <code>docs/public/favicon.svg</code> 会在站点中以 <code>/favicon.svg</code> 访问。部署到 GitHub Pages 仓库站点时，VitePress 会结合 <code>base</code> 自动处理最终路径。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("chapter2/frontend-pwa.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const frontendPwa = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  frontendPwa as default
};
