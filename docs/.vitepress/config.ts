import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI 前沿科技 Daily',
  description: '基于 VitePress 与 GitHub Pages 的 AI 前沿科技内容分享站',
  base: '/dailynews/',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#12a67f' }],
    ['link', { rel: 'icon', href: '/dailynews/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'shortcut icon', href: '/dailynews/favicon.svg', type: 'image/svg+xml' }]
  ],
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'AI Frontier Daily',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/overview' },
      { text: 'Daily', link: '/daily/2026-06-23' },
      { text: '部署', link: '/deploy/github-pages' },
      { text: 'GitHub', link: 'https://github.com/' }
    ],
    sidebar: [
      {
        text: '项目导读',
        items: [
          { text: '项目介绍', link: '/' },
          { text: '整体概览', link: '/guide/overview' },
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '自己搭建教程', link: '/guide/build-your-own' }
        ]
      },
      {
        text: 'AI 日报',
        items: [
          { text: '2026-06-23', link: '/daily/2026-06-23' }
        ]
      },
      {
        text: '内容建设',
        items: [
          { text: '内容形态', link: '/chapter1/product-shape' },
          { text: '静态站点结构', link: '/chapter2/frontend-pwa' }
        ]
      },
      {
        text: '部署',
        items: [
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
