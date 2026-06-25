<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

type GiscusConfig = {
  repo?: string
  repoId?: string
  category?: string
  categoryId?: string
}

const route = useRoute()
const { isDark, theme } = useData()
const container = ref<HTMLElement | null>(null)
const expanded = ref(false)

const comments = computed<GiscusConfig>(() => theme.value.comments ?? {})
const enabled = computed(() => Boolean(
  comments.value.repo &&
  comments.value.repoId &&
  comments.value.category &&
  comments.value.categoryId
))

const themeName = computed(() => isDark.value ? 'dark' : 'light')

function clearComments() {
  if (container.value) {
    container.value.innerHTML = ''
  }
}

async function loadComments() {
  clearComments()

  if (!expanded.value || !enabled.value) {
    return
  }

  await nextTick()

  if (!container.value) {
    return
  }

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-repo', comments.value.repo!)
  script.setAttribute('data-repo-id', comments.value.repoId!)
  script.setAttribute('data-category', comments.value.category!)
  script.setAttribute('data-category-id', comments.value.categoryId!)
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', themeName.value)
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')

  container.value.appendChild(script)
}

function updateTheme() {
  const frame = container.value?.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  frame?.contentWindow?.postMessage(
    {
      giscus: {
        setConfig: {
          theme: themeName.value
        }
      }
    },
    'https://giscus.app'
  )
}

function toggleExpanded() {
  expanded.value = !expanded.value
}

onMounted(loadComments)
onBeforeUnmount(clearComments)

watch(() => route.path, () => {
  expanded.value = false
  clearComments()
})

watch(expanded, loadComments)
watch(themeName, updateTheme)
</script>

<template>
  <section class="giscus-comments" aria-label="讨论与提问">
    <button
      class="giscus-comments__toggle"
      type="button"
      :aria-expanded="expanded"
      @click="toggleExpanded"
    >
      <span class="giscus-comments__title">
        <span class="giscus-comments__icon" aria-hidden="true" />
        讨论与提问
      </span>
      <span class="giscus-comments__hint">点击展开/收起</span>
      <span class="giscus-comments__arrow" aria-hidden="true">{{ expanded ? '▲' : '▼' }}</span>
    </button>

    <div v-if="expanded" class="giscus-comments__body">
      <div v-if="enabled" ref="container" class="giscus-comments__frame" />
      <div v-else class="giscus-comments__empty">
        <strong>评论区待配置</strong>
        <p>
          请先在 GitHub 仓库启用 Discussions，安装 Giscus App，
          然后把 repoId 和 categoryId 填入 <code>docs/.vitepress/config.ts</code>。
        </p>
      </div>
    </div>
  </section>
</template>
