import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'

const dailyDir = path.resolve(__dirname, '../daily')
const dailyItems = fs
  .readdirSync(dailyDir)
  .filter((file) => /^\d{4}-\d{2}-\d{2}\.md$/.test(file))
  .sort()
  .reverse()
  .map((file) => {
    const date = file.replace(/\.md$/, '')
    return {
      text: date,
      link: `/daily/${date}`
    }
  })

const latestDailyLink = dailyItems[0]?.link ?? '/daily/2026-06-23'

export default defineConfig({
  title: 'AI 前沿科技简报',
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
    siteTitle: 'AI Frontier Brief',
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI简报', link: latestDailyLink },
      { text: '搭建同款网站', link: '/build/build-your-own' },
      { text: '部署', link: '/build/github-pages' },
      { text: 'GitHub', link: 'https://github.com/' }
    ],
    sidebar: [
      {
        text: '关于本站',
        items: [
          { text: '项目介绍', link: '/about/' },
          { text: '整体概览', link: '/about/overview' }
        ]
      },
      {
        text: 'AI简报',
        items: dailyItems
      },
      {
        text: '搭建同款网站',
        items: [
          { text: '快速开始', link: '/build/getting-started' },
          { text: '从零搭建', link: '/build/build-your-own' },
          { text: '内容规划', link: '/build/content-shape' },
          { text: '站点结构', link: '/build/static-structure' },
          { text: '简报来源与规范', link: '/build/news-sources' },
          { text: 'GitHub Pages 部署', link: '/build/github-pages' }
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
    comments: {
      repo: 'leftshiftchina/dailynews',
      repoId: 'R_kgDOTDbQ0A',
      category: 'Announcements',
      categoryId: 'DIC_kwDOTDbQ0M4C_2lD'
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

