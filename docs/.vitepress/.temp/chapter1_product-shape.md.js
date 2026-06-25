import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"内容形态","description":"","frontmatter":{},"headers":[],"relativePath":"chapter1/product-shape.md","filePath":"chapter1/product-shape.md","lastUpdated":1782302430000}');
const _sfc_main = { name: "chapter1/product-shape.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="内容形态" tabindex="-1">内容形态 <a class="header-anchor" href="#内容形态" aria-label="Permalink to &quot;内容形态&quot;">​</a></h1><h2 id="站点定位" tabindex="-1">站点定位 <a class="header-anchor" href="#站点定位" aria-label="Permalink to &quot;站点定位&quot;">​</a></h2><p>AI 前沿科技 Daily 定位为轻量、专注、可长期维护的内容分享站。它不追求复杂的信息流，而是把有价值的 AI 科技资讯、工具观察、实现教程和部署经验沉淀成可以反复阅读的文档。</p><h2 id="核心内容" tabindex="-1">核心内容 <a class="header-anchor" href="#核心内容" aria-label="Permalink to &quot;核心内容&quot;">​</a></h2><table tabindex="0"><thead><tr><th>内容</th><th>说明</th></tr></thead><tbody><tr><td>首页</td><td>说明项目定位、阅读入口和主要内容</td></tr><tr><td>项目导读</td><td>介绍架构、目录、快速开始和搭建方式</td></tr><tr><td>Daily</td><td>按日期归档每日 AI 前沿科技内容</td></tr><tr><td>内容建设</td><td>说明栏目规划、写作结构和站点组织方式</td></tr><tr><td>部署手册</td><td>记录 GitHub Pages 发布流程和常见问题</td></tr></tbody></table><h2 id="daily-页面" tabindex="-1">Daily 页面 <a class="header-anchor" href="#daily-页面" aria-label="Permalink to &quot;Daily 页面&quot;">​</a></h2><p>Daily 是这个站点最重要的持续内容。建议每篇日报保持稳定结构：</p><ol><li>日期。</li><li>标题。</li><li>今日要点。</li><li>分主题内容。</li><li>原始来源链接。</li><li>简短点评或后续观察。</li></ol><p>推荐文件命名：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docs/daily/2026-06-23.md</span></span></code></pre></div><p>日期统一使用 <code>YYYY-MM-DD</code>，这样在侧边栏、搜索和后续归档中都更清晰。</p><h2 id="专题页面" tabindex="-1">专题页面 <a class="header-anchor" href="#专题页面" aria-label="Permalink to &quot;专题页面&quot;">​</a></h2><p>当某个方向值得持续跟踪时，可以把多篇 Daily 内容整理成专题，例如：</p><ul><li>AI Agent 工具链。</li><li>多模态模型进展。</li><li>开源模型与推理框架。</li><li>AI 编程与软件工程。</li><li>企业 AI 应用案例。</li></ul><p>专题页适合放在新的目录中，例如：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docs/topics/agent-tools.md</span></span>
<span class="line"><span>docs/topics/open-models.md</span></span></code></pre></div><h2 id="教程页面" tabindex="-1">教程页面 <a class="header-anchor" href="#教程页面" aria-label="Permalink to &quot;教程页面&quot;">​</a></h2><p>教程页面适合记录可复用的实现过程。建议采用：</p><ul><li>背景：为什么要做。</li><li>准备：需要什么环境。</li><li>步骤：一步一步完成。</li><li>验证：如何确认成功。</li><li>常见问题：容易踩坑的位置。</li></ul><p>这个仓库中的 <a href="/dailynews/guide/build-your-own">自己搭建教程</a> 就是一个基础示例。</p></div>`);
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
