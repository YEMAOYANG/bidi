<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeoMeta({
  title: () => t('legal.privacy.seoTitle'),
  description: () => t('legal.privacy.seoDesc')
})

interface HighlightItem { title: string, description: string }
interface TechItem { title: string, description: string }

interface Section {
  id: string
  icon: string
  title: string
  content: string[]
  highlights?: HighlightItem[]
  afterHighlights?: string[]
  technicalInfo?: TechItem[]
  cookieNote?: string
}

const sectionMeta = [
  { id: 'processing', icon: 'i-lucide-database', key: 'processing' },
  { id: 'minors', icon: 'i-lucide-shield-alert', key: 'minors' },
  { id: 'grounds', icon: 'i-lucide-scale', key: 'grounds' },
  { id: 'rights', icon: 'i-lucide-user-check', key: 'rights' },
  { id: 'retention', icon: 'i-lucide-clock', key: 'retention' },
  { id: 'other', icon: 'i-lucide-file-check', key: 'other' }
]

function resolveArr(val: unknown): string[] {
  if (!Array.isArray(val)) return []
  return val.map(item => rt(item))
}

function resolveObjArr(val: unknown): Record<string, string>[] {
  if (!Array.isArray(val)) return []
  return val.map((item) => {
    const obj = item as Record<string, unknown>
    const result: Record<string, string> = {}
    for (const k in obj) result[k] = rt(obj[k])
    return result
  })
}

const sections = computed<Section[]>(() =>
  sectionMeta.map(({ id, icon, key }) => {
    const base = tm(`legal.privacy.sections.${key}`) as Record<string, unknown>
    return {
      id,
      icon,
      title: rt(base.title),
      content: resolveArr(base.content),
      highlights: base.highlights ? resolveObjArr(base.highlights) as HighlightItem[] : undefined,
      afterHighlights: base.afterHighlights ? resolveArr(base.afterHighlights) : undefined,
      technicalInfo: base.technicalInfo ? resolveObjArr(base.technicalInfo) as TechItem[] : undefined,
      cookieNote: base.cookieNote ? rt(base.cookieNote) : undefined
    }
  })
)

const intro = computed(() => resolveArr(tm('legal.privacy.intro')))

const cards = computed(() => {
  const raw = tm('legal.privacy.cards') as Record<string, unknown>
  const resolve = (key: string) => {
    const card = raw[key] as Record<string, unknown>
    return { title: rt(card.title), desc: rt(card.desc) }
  }
  return {
    noLogs: resolve('noLogs'),
    minimalData: resolve('minimalData'),
    noSharing: resolve('noSharing')
  }
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
    <!-- 顶部 Hero 区域 -->
    <div class="relative overflow-hidden border-b border-[#6366f1]/20">
      <div class="absolute inset-0 bg-linear-to-br from-[#6366f1]/8 via-transparent to-[#8b5cf6]/5 dark:from-[#6366f1]/10 pointer-events-none" />
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18 relative">
        <div class="flex items-center gap-3 mb-4">
          <div class="flex size-10 items-center justify-center rounded-xl bg-[#6366f1]/15 dark:bg-[#6366f1]/20 ring-1 ring-[#6366f1]/40">
            <UIcon name="i-lucide-shield" class="size-5 text-[#6366f1]" />
          </div>
          <UBadge color="primary" variant="soft" size="sm">
            {{ t('legal.common.legalDocument') }}
          </UBadge>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {{ t('legal.privacy.title') }}
        </h1>
        <p class="text-lg text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
          {{ t('legal.privacy.description') }}
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
                class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#6366f1] dark:hover:text-[#6366f1] transition-colors py-1.5 border-l-2 border-transparent hover:border-[#6366f1] pl-3"
              >
                <UIcon :name="section.icon" class="size-3.5 shrink-0" />
                {{ section.title }}
              </a>
            </nav>
          </div>
        </aside>

        <!-- 主内容 -->
        <main class="min-w-0">
          <!-- 摘要卡片 -->
          <div class="mb-10 grid sm:grid-cols-3 gap-4">
            <div class="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-center">
              <UIcon name="i-lucide-lock" class="size-8 text-[#6366f1] mx-auto mb-3" />
              <p class="text-sm font-semibold mb-1">
                {{ cards.noLogs.title }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ cards.noLogs.desc }}
              </p>
            </div>
            <div class="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-center">
              <UIcon name="i-lucide-minimize-2" class="size-8 text-[#6366f1] mx-auto mb-3" />
              <p class="text-sm font-semibold mb-1">
                {{ cards.minimalData.title }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ cards.minimalData.desc }}
              </p>
            </div>
            <div class="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-center">
              <UIcon name="i-lucide-user-x" class="size-8 text-[#6366f1] mx-auto mb-3" />
              <p class="text-sm font-semibold mb-1">
                {{ cards.noSharing.title }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ cards.noSharing.desc }}
              </p>
            </div>
          </div>

          <!-- 前言 -->
          <div class="mb-10 p-6 rounded-2xl bg-[#6366f1]/5 border border-[#6366f1]/20">
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
          <div class="space-y-12">
            <section
              v-for="section in sections"
              :id="section.id"
              :key="section.id"
              class="scroll-mt-8"
            >
              <div class="flex items-center gap-3 mb-6">
                <div class="flex size-9 items-center justify-center rounded-xl bg-[#6366f1]/15 dark:bg-[#6366f1]/20 ring-1 ring-[#6366f1]/30 shrink-0">
                  <UIcon :name="section.icon" class="size-4 text-[#6366f1]" />
                </div>
                <h2 class="text-xl font-bold">
                  {{ section.title }}
                </h2>
              </div>

              <div class="space-y-4 pl-12">
                <p
                  v-for="(para, idx) in section.content"
                  :key="idx"
                  class="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]"
                >
                  {{ para }}
                </p>

                <!-- 数据卡片 -->
                <div v-if="section.highlights" class="grid sm:grid-cols-2 gap-4 my-6">
                  <div
                    v-for="item in section.highlights"
                    :key="item.title"
                    class="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                  >
                    <div class="flex items-center gap-2 mb-2">
                      <UIcon name="i-lucide-check-circle" class="size-4 text-[#6366f1]" />
                      <span class="font-semibold text-sm">{{ item.title }}</span>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {{ item.description }}
                    </p>
                  </div>
                </div>

                <p
                  v-for="(para, idx) in section.afterHighlights"
                  :key="`after-${idx}`"
                  class="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]"
                >
                  {{ para }}
                </p>

                <!-- 技术信息卡片 -->
                <div v-if="section.technicalInfo" class="space-y-3 my-6">
                  <div
                    v-for="item in section.technicalInfo"
                    :key="item.title"
                    class="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                  >
                    <UIcon name="i-lucide-info" class="size-5 text-[#6366f1] shrink-0 mt-0.5" />
                    <div>
                      <p class="font-semibold text-sm mb-1">
                        {{ item.title }}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {{ item.description }}
                      </p>
                    </div>
                  </div>
                </div>

                <p
                  v-if="section.cookieNote"
                  class="text-gray-500 dark:text-gray-400 leading-relaxed text-sm italic border-l-2 border-[#6366f1]/40 pl-4"
                >
                  {{ section.cookieNote }}
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
                to="/membership-service-agreement"
                class="text-sm text-gray-500 dark:text-gray-400 hover:text-[#6366f1] transition-colors"
              >
                {{ t('legal.privacy.navLinks.membershipAgreement') }}
              </NuxtLink>
              <span class="text-gray-300 dark:text-gray-600">·</span>
              <NuxtLink
                to="/terms-of-service"
                class="text-sm text-gray-500 dark:text-gray-400 hover:text-[#6366f1] transition-colors"
              >
                {{ t('legal.privacy.navLinks.termsOfService') }}
              </NuxtLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
