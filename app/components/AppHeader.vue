<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const title = 'BiDi'
const { t, locale, setLocale } = useI18n()
const route = useRoute()

const localeOptions = [
  { code: 'zh-CN', label: '中文' },
  { code: 'en', label: 'EN' }
]

const items = computed(() => [
  { label: t('nav.home'), to: '/#home' },
  { label: t('nav.features'), to: '/#features' },
  { label: t('nav.advantages'), to: '/#advantages' },
  { label: t('nav.price'), to: '/#price' },
  { label: t('nav.download'), to: '/#download' }
])

const scrolled = ref(false)
const mobileMenuOpen = ref(false)

onMounted(() => {
  const handleScroll = () => { scrolled.value = window.scrollY > 40 }
  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

const HEADER_OFFSET = 80

async function scrollToSection(hash: string) {
  mobileMenuOpen.value = false
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

const currentLocaleLabel = computed(() =>
  locale.value === 'zh-CN' ? '中文' : 'EN'
)

function toggleLocale() {
  setLocale(locale.value === 'zh-CN' ? 'en' : 'zh-CN')
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50"
    :style="{
      background: scrolled ? 'rgba(5, 11, 24, 0.92)' : 'rgba(5, 11, 24, 0.5)',
      backdropFilter: `blur(${scrolled ? '24px' : '12px'})`,
      WebkitBackdropFilter: `blur(${scrolled ? '24px' : '12px'})`,
      borderBottom: scrolled ? '1px solid var(--border-glow)' : '1px solid transparent',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 shrink-0">
          <AppLogo class="w-auto h-6" />
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-1" @click.capture="handleNavClick">
          <NuxtLink
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
            style="color: var(--text-secondary);"
            @mouseenter="($event.target as HTMLElement).style.color = 'var(--text-white)'; ($event.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)'"
            @mouseleave="($event.target as HTMLElement).style.color = 'var(--text-secondary)'; ($event.target as HTMLElement).style.background = 'transparent'"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Right actions -->
        <div class="flex items-center gap-3">
          <!-- Download CTA -->
          <a
            href="#download"
            class="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300"
            style="background: var(--gradient-btn); color: var(--bg-void); border-radius: var(--radius-md); box-shadow: var(--shadow-glow-btn);"
            @click.prevent="scrollToSection('#download')"
            @mouseenter="($event.target as HTMLElement).style.boxShadow = '0 0 30px rgba(0,245,255,0.4), 0 6px 20px rgba(0,0,0,0.4)'; ($event.target as HTMLElement).style.transform = 'translateY(-1px)'"
            @mouseleave="($event.target as HTMLElement).style.boxShadow = 'var(--shadow-glow-btn)'; ($event.target as HTMLElement).style.transform = 'none'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {{ t('nav.download') }}
          </a>

          <!-- Language toggle -->
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-all duration-200"
            style="color: var(--text-secondary); border: 1px solid var(--border-default); border-radius: var(--radius-sm);"
            @click="toggleLocale"
            @mouseenter="($event.target as HTMLElement).style.color = 'var(--text-white)'; ($event.target as HTMLElement).style.borderColor = 'var(--border-hover)'"
            @mouseleave="($event.target as HTMLElement).style.color = 'var(--text-secondary)'; ($event.target as HTMLElement).style.borderColor = 'var(--border-default)'"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            {{ currentLocaleLabel }}
          </button>

          <!-- Mobile hamburger -->
          <button
            class="lg:hidden p-2 rounded-lg transition-all"
            style="color: var(--text-secondary);"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg v-if="!mobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden py-4"
        style="border-top: 1px solid var(--border-subtle);"
      >
        <div class="flex flex-col gap-1" @click.capture="handleNavClick">
          <NuxtLink
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            class="px-4 py-3 text-sm rounded-lg transition-all"
            style="color: var(--text-secondary);"
            @click="mobileMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
        <div class="mt-4 pt-4 flex gap-3" style="border-top: 1px solid var(--border-subtle);">
          <a
            href="#download"
            class="flex-1 text-center py-2.5 text-sm font-semibold"
            style="background: var(--gradient-btn); color: var(--bg-void); border-radius: var(--radius-md);"
            @click.prevent="scrollToSection('#download'); mobileMenuOpen = false"
          >
            {{ t('nav.download') }}
          </a>
          <button
            class="px-4 py-2.5 text-sm font-medium"
            style="border: 1px solid var(--border-default); border-radius: var(--radius-md); color: var(--text-secondary);"
            @click="toggleLocale"
          >
            {{ currentLocaleLabel }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
