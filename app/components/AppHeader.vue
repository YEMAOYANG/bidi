<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { en, zh_cn } from '@nuxt/ui/locale'

const title = 'BiDi'
const { t, locale, setLocale } = useI18n()
const route = useRoute()

const localeOptions = [en, { ...zh_cn, code: 'zh-CN' }]

const items = computed(() => [
  { label: t('nav.home'), to: '/#home' },
  { label: t('nav.features'), to: '/#features' },
  { label: t('nav.advantages'), to: '/#advantages' },
  { label: t('nav.price'), to: '/#price' },
  { label: t('nav.download'), to: '/#download' }
])

const closeMenuRef = ref<(() => void) | null>(null)
const scrolled = ref(false)

onMounted(() => {
  const handleScroll = () => { scrolled.value = window.scrollY > 40 }
  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

const HEADER_OFFSET = 80

function handleNavClick(e: MouseEvent) {
  const anchor = (e.target as HTMLElement).closest('a')
  if (!anchor) return
  const href = anchor.getAttribute('href')
  if (!href) return
  const hashIndex = href.indexOf('#')
  if (hashIndex === -1) return
  e.preventDefault()
  e.stopPropagation()
  scrollToSection(href.substring(hashIndex))
}

async function scrollToSection(hash: string) {
  closeMenuRef.value?.()
  if (route.path !== '/') {
    await navigateTo({ path: '/', hash })
    setTimeout(() => {
      const el = document.querySelector(hash)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 150)
    return
  }
  const el = document.querySelector(hash)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const navMenuUi = {
  link: 'text-white/70 hover:text-white transition-colors duration-200'
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :style="scrolled
      ? 'background: rgba(3,7,18,0.9); backdrop-filter: blur(24px); border-bottom: 1px solid rgba(0,245,255,0.08); box-shadow: 0 4px 30px rgba(0,0,0,0.4);'
      : 'background: transparent;'"
  >
    <UContainer>
      <div class="flex items-center justify-between h-16 lg:h-20">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 shrink-0">
          <AppLogo class="w-auto h-6" />
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-1">
          <NuxtLink
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            class="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 font-medium"
            @click.native="handleNavClick"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Right actions -->
        <div class="flex items-center gap-3">
          <!-- Download CTA -->
          <a
            href="#download"
            class="hidden lg:inline-flex btn-aurora items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
            style="background: linear-gradient(135deg, #00f5ff 0%, #7c3aed 100%); box-shadow: 0 0 20px rgba(0,245,255,0.25);"
            @click.prevent="scrollToSection('#download')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            下载
          </a>

          <!-- Locale -->
          <ULocaleSelect
            :model-value="locale"
            :locales="localeOptions"
            class="text-white/60 hover:text-white"
            @update:model-value="setLocale(($event as 'zh-CN' | 'en'))"
          />

          <!-- Color mode -->
          <UColorModeButton class="text-white/60 hover:text-white" />

          <!-- Mobile menu trigger -->
          <button
            class="lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
            @click="closeMenuRef?.() ?? null"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </UContainer>
  </header>
</template>
