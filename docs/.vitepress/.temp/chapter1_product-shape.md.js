import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"第一章 产品形态","description":"","frontmatter":{},"headers":[],"relativePath":"chapter1/product-shape.md","filePath":"chapter1/product-shape.md","lastUpdated":null}');
const _sfc_main = { name: "chapter1/product-shape.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="第一章-产品形态" tabindex="-1">第一章 产品形态 <a class="header-anchor" href="#第一章-产品形态" aria-label="Permalink to &quot;第一章 产品形态&quot;">​</a></h1><h2 id="产品定位" tabindex="-1">产品定位 <a class="header-anchor" href="#产品定位" aria-label="Permalink to &quot;产品定位&quot;">​</a></h2><p>每日新技术推送小博客定位为轻量、专注、移动优先的每日技术小报。它不追求复杂的信息流，而是每天稳定交付一篇可读、可回看、可沉淀的技术内容。</p><h2 id="核心页面" tabindex="-1">核心页面 <a class="header-anchor" href="#核心页面" aria-label="Permalink to &quot;核心页面&quot;">​</a></h2><table tabindex="0"><thead><tr><th>页面</th><th>功能</th></tr></thead><tbody><tr><td>今日页</td><td>展示当天标题、摘要、标签、正文、来源和发布时间</td></tr><tr><td>历史页</td><td>按日期倒序展示历史新闻列表</td></tr><tr><td>详情页</td><td>查看某一天的完整内容</td></tr><tr><td>设置页</td><td>展示 PWA 安装引导、通知订阅入口和版本信息</td></tr></tbody></table><h2 id="今日页" tabindex="-1">今日页 <a class="header-anchor" href="#今日页" aria-label="Permalink to &quot;今日页&quot;">​</a></h2><p>今日页是默认入口，建议采用单列阅读布局：</p><ol><li>日期和阅读时间。</li><li>标题。</li><li>一句话摘要。</li><li>标签。</li><li>Markdown 正文。</li><li>来源和更新时间。</li></ol><p>移动端样式建议：</p><table tabindex="0"><thead><tr><th>项</th><th>建议</th></tr></thead><tbody><tr><td>最大内容宽度</td><td><code>720px</code></td></tr><tr><td>左右边距</td><td><code>16px</code></td></tr><tr><td>正文字号</td><td><code>16px</code> 到 <code>17px</code></td></tr><tr><td>正文行高</td><td><code>1.7</code> 到 <code>1.8</code></td></tr><tr><td>标题字号</td><td><code>24px</code> 到 <code>30px</code></td></tr></tbody></table><h2 id="历史页" tabindex="-1">历史页 <a class="header-anchor" href="#历史页" aria-label="Permalink to &quot;历史页&quot;">​</a></h2><p>历史页主要解决回看问题：</p><ul><li>按日期倒序展示。</li><li>每条展示标题、摘要、标签和阅读时间。</li><li>点击后进入详情页。</li><li>第一版使用分页即可，后续可以升级为无限滚动。</li></ul><h2 id="设置页" tabindex="-1">设置页 <a class="header-anchor" href="#设置页" aria-label="Permalink to &quot;设置页&quot;">​</a></h2><p>设置页不需要做得很重，第一版建议包含：</p><ul><li>当前版本。</li><li>PWA 安装状态。</li><li>最近更新时间。</li><li>通知订阅能力检测。</li></ul><p>通知提醒建议放到第二阶段，因为不同浏览器和系统对 Web Push 的支持差异比较明显，特别是 iOS 需要用户把 Web App 添加到主屏幕后才能获得完整体验。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("chapter1/product-shape.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const productShape = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  productShape as default
};
