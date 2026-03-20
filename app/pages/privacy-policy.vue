<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeoMeta({
  title: () => t('legal.privacy.seoTitle'),
  description: () => t('legal.privacy.seoDesc')
})

interface HighlightItem { title: string, description: string }
interface TechItem { title: string, description: string }
interface Section {
  id: string; icon: string; title: string; content: string[]
  highlights?: HighlightItem[]; afterHighlights?: string[]
  technicalInfo?: TechItem[]; cookieNote?: string
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
      id, icon, title: rt(base.title),
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
  return { noLogs: resolve('noLogs'), minimalData: resolve('minimalData'), noSharing: resolve('noSharing') }
})
</script>

<template>
  <div class="min-h-screen" style="background: #030712; color: #fff;">

    <!-- Hero -->
    <div class="relative overflow-hidden pt-24 pb-16" style="background: linear-gradient(180deg, #050b1a 0%, #030712 100%);">
      <div class="absolute inset-0 pointer-events-none"
           style="background-image: linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px); background-size: 60px 60px;" />
      <div class="absolute top-0 right-0 w-96 h-96 pointer-events-none"
           style="background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 60%); filter: blur(40px);" />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="flex items-center gap-3 mb-5">
          <div class="flex w-11 h-11 items-center justify-center rounded-2xl"
               style="background: rgba(0,245,255,0.1); border: 1px solid rgba(0,245,255,0.2);">
            <UIcon name="i-lucide-shield" class="w-5 h-5" style="color: #00f5ff;" />
          </div>
          <span class="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style="background: rgba(0,245,255,0.08); border: 1px solid rgba(0,245,255,0.2); color: #00f5ff;">
            {{ t('legal.common.legalDocument') }}
          </span>
        </div>
        <h1 class="text-4xl lg:text-5xl font-black mb-4 leading-tight">
          {{ t('legal.privacy.title') }}
        </h1>
        <p class="text-lg leading-relaxed max-w-3xl" style="color: rgba(255,255,255,0.5);">
          {{ t('legal.privacy.description') }}
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="lg:grid lg:grid-cols-[260px_1fr] lg:gap-14">

        <!-- Sidebar -->
        <aside class="hidden lg:block">
          <div class="sticky top-24">
            <p class="text-xs font-bold uppercase tracking-widest mb-4" style="color: rgba(255,255,255,0.3);">
              {{ t('legal.common.onThisPage') }}
            </p>
            <nav class="space-y-0.5">
              <a
                v-for="section in sections"
                :key="section.id"
                :href="`#${section.id}`"
                class="flex items-center gap-2 text-sm py-2 px-3 rounded-lg border-l-2 border-transparent transition-all duration-200"
                style="color: rgba(255,255,255,0.4);"
                onmouseover="this.style.color='#00f5ff'; this.style.borderLeftColor='#00f5ff'; this.style.background='rgba(0,245,255,0.05)';"
                onmouseout="this.style.color='rgba(255,255,255,0.4)'; this.style.borderLeftColor='transparent'; this.style.background='transparent';"
              >
                <UIcon :name="section.icon" class="w-3.5 h-3.5 shrink-0" />
                {{ section.title }}
              </a>
            </nav>
          </div>
        </aside>

        <!-- Main -->
        <main class="min-w-0">
          <!-- Summary cards -->
          <div class="mb-10 grid sm:grid-cols-3 gap-4">
            <div
              v-for="(card, key) in cards"
              :key="key"
              class="p-5 rounded-2xl text-center transition-all duration-300"
              style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);"
            >
              <UIcon name="i-lucide-lock" class="w-8 h-8 mx-auto mb-3" style="color: #00f5ff;" />
              <p class="text-sm font-semibold mb-1 text-white">{{ card.title }}</p>
              <p class="text-xs" style="color: rgba(255,255,255,0.4);">{{ card.desc }}</p>
            </div>
          </div>

          <!-- Intro -->
          <div class="mb-10 p-6 rounded-2xl" style="background: rgba(0,245,255,0.04); border: 1px solid rgba(0,245,255,0.12);">
            <p
              v-for="(para, idx) in intro"
              :key="idx"
              class="leading-relaxed"
              :class="idx < intro.length - 1 ? 'mb-4' : ''"
              style="color: rgba(255,255,255,0.65);"
            >
              {{ para }}
            </p>
          </div>

          <!-- Sections -->
          <div class="space-y-12">
            <section
              v-for="section in sections"
              :id="section.id"
              :key="section.id"
              class="scroll-mt-24"
            >
              <div class="flex items-center gap-3 mb-6">
                <div class="flex w-9 h-9 items-center justify-center rounded-xl shrink-0"
                     style="background: rgba(0,245,255,0.08); border: 1px solid rgba(0,245,255,0.2);">
                  <UIcon :name="section.icon" class="w-4 h-4" style="color: #00f5ff;" />
                </div>
                <h2 class="text-xl font-bold text-white">{{ section.title }}</h2>
              </div>

              <div class="space-y-4 pl-12">
                <p
                  v-for="(para, idx) in section.content"
                  :key="idx"
                  class="leading-relaxed text-[15px]"
                  style="color: rgba(255,255,255,0.55);"
                >
                  {{ para }}
                </p>

                <div v-if="section.highlights" class="grid sm:grid-cols-2 gap-4 my-6">
                  <div
                    v-for="item in section.highlights"
                    :key="item.title"
                    class="p-4 rounded-xl"
                    style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);"
                  >
                    <div class="flex items-center gap-2 mb-2">
                      <UIcon name="i-lucide-check-circle" class="w-4 h-4 shrink-0" style="color: #00ff88;" />
                      <span class="font-semibold text-sm text-white">{{ item.title }}</span>
                    </div>
                    <p class="text-sm leading-relaxed" style="color: rgba(255,255,255,0.45);">{{ item.description }}</p>
                  </div>
                </div>

                <p
                  v-for="(para, idx) in section.afterHighlights"
                  :key="`after-${idx}`"
                  class="leading-relaxed text-[15px]"
                  style="color: rgba(255,255,255,0.55);"
                >
                  {{ para }}
                </p>

                <div v-if="section.technicalInfo" class="space-y-3 my-6">
                  <div
                    v-for="item in section.technicalInfo"
                    :key="item.title"
                    class="flex gap-3 p-4 rounded-xl"
                    style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);"
                  >
                    <UIcon name="i-lucide-info" class="w-5 h-5 shrink-0 mt-0.5" style="color: #00f5ff;" />
                    <div>
                      <p class="font-semibold text-sm mb-1 text-white">{{ item.title }}</p>
                      <p class="text-sm leading-relaxed" style="color: rgba(255,255,255,0.45);">{{ item.description }}</p>
                    </div>
                  </div>
                </div>

                <p
                  v-if="section.cookieNote"
                  class="leading-relaxed text-sm italic pl-4"
                  style="color: rgba(255,255,255,0.4); border-left: 2px solid rgba(0,245,255,0.3);"
                >
                  {{ section.cookieNote }}
                </p>
              </div>
            </section>
          </div>

          <!-- Bottom nav -->
          <div class="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
               style="border-top: 1px solid rgba(255,255,255,0.07);">
            <p class="text-sm" style="color: rgba(255,255,255,0.3);">{{ t('legal.common.lastUpdated') }}</p>
            <div class="flex items-center gap-4">
              <NuxtLink to="/membership-service-agreement"
                        class="text-sm transition-colors duration-200"
                        style="color: rgba(255,255,255,0.4);"
                        onmouseover="this.style.color='#00f5ff'"
                        onmouseout="this.style.color='rgba(255,255,255,0.4)'">
                {{ t('legal.privacy.navLinks.membershipAgreement') }}
              </NuxtLink>
              <span style="color: rgba(255,255,255,0.15);">·</span>
              <NuxtLink to="/terms-of-service"
                        class="text-sm transition-colors duration-200"
                        style="color: rgba(255,255,255,0.4);"
                        onmouseover="this.style.color='#00f5ff'"
                        onmouseout="this.style.color='rgba(255,255,255,0.4)'">
                {{ t('legal.privacy.navLinks.termsOfService') }}
              </NuxtLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
