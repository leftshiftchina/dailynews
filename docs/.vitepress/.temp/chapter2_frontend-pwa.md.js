import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"第三章 前端与 PWA","description":"","frontmatter":{},"headers":[],"relativePath":"chapter2/frontend-pwa.md","filePath":"chapter2/frontend-pwa.md","lastUpdated":null}');
const _sfc_main = { name: "chapter2/frontend-pwa.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第三章-前端与-pwa" tabindex="-1">第三章 前端与 PWA <a class="header-anchor" href="#第三章-前端与-pwa" aria-label="Permalink to &quot;第三章 前端与 PWA&quot;">​</a></h1><h2 id="技术选型" tabindex="-1">技术选型 <a class="header-anchor" href="#技术选型" aria-label="Permalink to &quot;技术选型&quot;">​</a></h2><p>前端建议使用：</p><ul><li>Vite</li><li>React</li><li>TypeScript</li><li>普通 CSS 或 CSS Modules</li></ul><p>如果只是展示静态内容，纯 HTML/CSS/JavaScript 也能实现。但当你需要历史列表、详情页、PWA 状态、通知订阅和离线缓存时，组件化工程会更容易维护。</p><h2 id="页面结构" tabindex="-1">页面结构 <a class="header-anchor" href="#页面结构" aria-label="Permalink to &quot;页面结构&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>web/</span></span>
<span class="line"><span>  src/</span></span>
<span class="line"><span>    api/</span></span>
<span class="line"><span>      news.ts</span></span>
<span class="line"><span>    components/</span></span>
<span class="line"><span>      NavBar.tsx</span></span>
<span class="line"><span>    pages/</span></span>
<span class="line"><span>      TodayPage.tsx</span></span>
<span class="line"><span>      HistoryPage.tsx</span></span>
<span class="line"><span>      DetailPage.tsx</span></span>
<span class="line"><span>      SettingsPage.tsx</span></span>
<span class="line"><span>    styles/</span></span>
<span class="line"><span>      base.css</span></span></code></pre></div><h2 id="移动端阅读体验" tabindex="-1">移动端阅读体验 <a class="header-anchor" href="#移动端阅读体验" aria-label="Permalink to &quot;移动端阅读体验&quot;">​</a></h2><p>阅读体验优先级高于装饰感。建议：</p><ul><li>主体内容保持单列。</li><li>段落间距略大于普通后台系统。</li><li>不使用过多卡片嵌套。</li><li>底部导航固定今日、历史、设置三个入口。</li><li>错误、空状态和加载状态都需要明确。</li></ul><h2 id="pwa-基础能力" tabindex="-1">PWA 基础能力 <a class="header-anchor" href="#pwa-基础能力" aria-label="Permalink to &quot;PWA 基础能力&quot;">​</a></h2><p>PWA 第一阶段需要：</p><ul><li><code>manifest.webmanifest</code></li><li>Service Worker</li><li>应用图标</li><li>HTTPS 访问</li><li>基础缓存策略</li></ul><p>缓存策略建议：</p><table tabindex="0"><thead><tr><th>资源</th><th>策略</th></tr></thead><tbody><tr><td>HTML/JS/CSS</td><td>Cache First，并通过版本更新</td></tr><tr><td>今日新闻 API</td><td>Network First，失败时读取最近缓存</td></tr><tr><td>历史列表 API</td><td>Network First</td></tr><tr><td>图标和字体</td><td>Cache First</td></tr></tbody></table><h2 id="通知提醒" tabindex="-1">通知提醒 <a class="header-anchor" href="#通知提醒" aria-label="Permalink to &quot;通知提醒&quot;">​</a></h2><p>每日提醒建议放在 PWA 稳定之后再做。原因是 Web Push 需要浏览器支持、用户授权、VAPID 密钥和后端订阅存储。</p><p>交互上应做能力检测：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>当前环境支持通知 -&gt; 显示“开启每日提醒”</span></span>
<span class="line"><span>当前环境不支持通知 -&gt; 显示“添加到主屏幕后可开启提醒”</span></span></code></pre></div></div>`);
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
