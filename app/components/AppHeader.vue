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

const HEADER_OFFSET = 80

function handleNavClick(e: MouseEvent) {
  const anchor = (e.target as HTMLElement).closest('a')
  if (!anchor) {
    return
  }
  const href = anchor.getAttribute('href')
  if (!href) {
    return
  }
  const hashIndex = href.indexOf('#')
  if (hashIndex === -1) {
    return
  }

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
  link: 'text-black dark:text-white hover:text-black dark:hover:text-white'
}

// 移动端菜单样式
const mobileNavigationMenuUi = {
  link: 'text-black dark:text-white hover:text-black dark:hover:text-white'
}
</script>

<template>
  <UHeader
    :title="title"
    mode="slideover"
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-none',
      'bg-white dark:bg-gray-950/80 backdrop-blur-lg shadow-lg'
    ]"
    :ui="{
      toggle: 'text-[#090D16] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
      body: 'text-[#090D16] dark:text-white'
    }"
  >
    <template #left>
      <NuxtLink
        to="/"
        :aria-label="title"
        class="flex items-center shrink-0 transition-colors duration-300 text-black dark:text-white"
      >
        <AppLogo class="w-auto h-6" />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      :ui="navMenuUi"
      class="transition-colors duration-300"
      @click.capture="handleNavClick"
    />

    <template #right>
      <ULocaleSelect
        :model-value="locale"
        :locales="localeOptions"
        class="transition-colors duration-300"
        @update:model-value="setLocale(($event as 'zh-CN' | 'en'))"
      />
      <UColorModeButton class="transition-colors duration-300" />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        variant="link"
        :ui="mobileNavigationMenuUi"
        class="-mx-2.5"
        @click.capture="handleNavClick"
      />
    </template>
  </UHeader>
</template>
