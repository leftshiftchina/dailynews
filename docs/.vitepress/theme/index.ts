import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import GiscusComments from './GiscusComments.vue'
import WechatFollow from './WechatFollow.vue'
import './style.css'

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/dailynews/sw.js')
  })
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => [
        h(WechatFollow),
        h(GiscusComments)
      ]
    })
  }
}
