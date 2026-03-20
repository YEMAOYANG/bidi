<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeoMeta({
  title: () => t('legal.membership.seoTitle'),
  description: () => t('legal.membership.seoDesc')
})

interface Section {
  id: string
  title: string
  content: string[]
  list?: string[]
  afterList?: string[]
}

const sectionKeys = [
  'ourServices',
  'noLogs',
  'intellectualProperty',
  'minors',
  'payments',
  'refund',
  'prohibited',
  'userData',
  'disclaimer',
  'liability',
  'indemnification',
  'geographical',
  'electronic',
  'miscellaneous'
]

function resolveArr(val: unknown): string[] {
  if (!Array.isArray(val)) return []
  return val.map(item => rt(item))
}

const sections = computed<Section[]>(() =>
  sectionKeys.map((key) => {
    const base = tm(`legal.membership.sections.${key}`) as Record<string, unknown>
    return {
      id: key.replace(/([A-Z])/g, '-$1').toLowerCase(),
      title: rt(base.title),
      content: resolveArr(base.content),
      list: base.list ? resolveArr(base.list) : undefined,
      afterList: base.afterList ? resolveArr(base.afterList) : undefined
    }
  })
)

const intro = computed(() => resolveArr(tm('legal.membership.intro')))
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
    <!-- 顶部 Hero 区域 -->
    <div class="relative overflow-hidden border-b border-[#6366f1]/20 dark:border-[#6366f1]/20">
      <div class="absolute inset-0 bg-linear-to-br from-[#6366f1]/8 via-transparent to-[#8b5cf6]/5 dark:from-[#6366f1]/10 pointer-events-none" />
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18 relative">
        <div class="flex items-center gap-3 mb-4">
          <div class="flex size-10 items-center justify-center rounded-xl bg-[#6366f1]/15 dark:bg-[#6366f1]/20 ring-1 ring-[#6366f1]/40">
            <UIcon name="i-lucide-file-text" class="size-5 text-[#6366f1]" />
          </div>
          <UBadge color="primary" variant="soft" size="sm">
            {{ t('legal.common.legalDocument') }}
          </UBadge>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {{ t('legal.membership.title') }}
        </h1>
        <p class="text-lg text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
          {{ t('legal.membership.description') }}
        </p>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div class="lg:grid lg:grid-cols-[280px_1fr] lg:gap-14">
        <!-- 侧边导航 -->
        <aside class="hidden lg:block">
          <div class="sticky top-8">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              {{ t('legal.common.onThisPage') }}
            </p>
            <nav class="space-y-0.5">
              <a
                v-for="section in sections"
                :key="section.id"
                :href="`#${section.id}`"
                class="block text-sm text-gray-500 dark:text-gray-400 hover:text-[#6366f1] dark:hover:text-[#6366f1] transition-colors py-1.5 border-l-2 border-transparent hover:border-[#6366f1] pl-3"
              >
                {{ section.title }}
              </a>
            </nav>
          </div>
        </aside>

        <!-- 主内容 -->
        <main class="min-w-0">
          <!-- 前言 -->
          <div class="mb-10 p-6 rounded-2xl bg-[#6366f1]/5 dark:bg-[#6366f1]/5 border border-[#6366f1]/20">
            <p
              v-for="(para, idx) in intro"
              :key="idx"
              class="text-gray-600 dark:text-gray-300 leading-relaxed"
              :class="idx < intro.length - 1 ? 'mb-4' : ''"
            >
              {{ para }}
            </p>
          </div>

          <!-- 各章节 -->
          <div class="space-y-10">
            <section
              v-for="section in sections"
              :id="section.id"
              :key="section.id"
              class="scroll-mt-8"
            >
              <div class="flex items-center gap-3 mb-5">
                <div class="h-px flex-1 bg-linear-to-r from-[#6366f1]/40 to-transparent" />
                <h2 class="text-xl font-bold whitespace-nowrap">
                  {{ section.title }}
                </h2>
                <div class="h-px flex-1 bg-linear-to-l from-[#6366f1]/40 to-transparent" />
              </div>

              <div class="space-y-4">
                <p
                  v-for="(para, idx) in section.content"
                  :key="idx"
                  class="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]"
                  :class="{ 'text-gray-500 dark:text-gray-400 text-sm font-mono bg-gray-100 dark:bg-[#6366f1]/5 rounded-xl p-4 border border-gray-200 dark:border-[#6366f1]/10': para === para.toUpperCase() && para.length > 100 }"
                >
                  {{ para }}
                </p>

                <ol v-if="section.list" class="space-y-3 pl-0">
                  <li
                    v-for="(item, idx) in section.list"
                    :key="idx"
                    class="flex gap-3 text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed"
                  >
                    <span class="shrink-0 flex size-6 items-center justify-center rounded-full bg-[#6366f1]/15 dark:bg-[#6366f1]/20 text-[#6366f1] text-xs font-bold mt-0.5">
                      {{ idx + 1 }}
                    </span>
                    <span>{{ item }}</span>
                  </li>
                </ol>

                <p
                  v-for="(para, idx) in section.afterList"
                  :key="`after-${idx}`"
                  class="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]"
                >
                  {{ para }}
                </p>
              </div>
            </section>
          </div>

          <!-- 底部导航 -->
          <div class="mt-16 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-sm text-gray-400 dark:text-gray-500">
              {{ t('legal.common.lastUpdated') }}
            </p>
            <div class="flex items-center gap-4">
              <NuxtLink
                to="/privacy-policy"
                class="text-sm text-gray-500 dark:text-gray-400 hover:text-[#6366f1] transition-colors"
              >
                {{ t('legal.membership.navLinks.privacyPolicy') }}
              </NuxtLink>
              <span class="text-gray-300 dark:text-gray-600">·</span>
              <NuxtLink
                to="/terms-of-service"
                class="text-sm text-gray-500 dark:text-gray-400 hover:text-[#6366f1] transition-colors"
              >
                {{ t('legal.membership.navLinks.termsOfService') }}
              </NuxtLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
