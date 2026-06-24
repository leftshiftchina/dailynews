import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '每日新技术推送小博客',
  description: '基于 Coze 工作流的每日技术资讯文档与实现指南',
  base: '/news-new/',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#12a67f' }],
    ['link', { rel: 'icon', href: '/news-new/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'shortcut icon', href: '/news-new/favicon.svg', type: 'image/svg+xml' }]
  ],
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'Daily Tech News',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/overview' },
      { text: 'API', link: '/api/news' },
      { text: '部署', link: '/deploy/github-pages' },
      { text: 'GitHub', link: 'https://github.com/' }
    ],
    sidebar: [
      {
        text: '项目导读',
        items: [
          { text: '项目介绍', link: '/' },
          { text: '整体概览', link: '/guide/overview' },
          { text: '快速开始', link: '/guide/getting-started' }
        ]
      },
      {
        text: 'AI 日报',
        items: [
          { text: '2026-06-23', link: '/daily/2026-06-23' }
        ]
      },
      {
        text: '第一部分：产品与内容链路',
        items: [
          { text: '第一章 产品形态', link: '/chapter1/product-shape' },
          { text: '第二章 Coze 内容流', link: '/chapter1/coze-flow' }
        ]
      },
      {
        text: '第二部分：工程实现',
        items: [
          { text: '第三章 前端与 PWA', link: '/chapter2/frontend-pwa' },
          { text: '第四章 后端与存储', link: '/chapter2/backend-storage' }
        ]
      },
      {
        text: '接口与部署',
        items: [
          { text: '新闻 API', link: '/api/news' },
          { text: 'GitHub Pages', link: '/deploy/github-pages' }
        ]
      }
    ],
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除搜索',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ]
  },
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
