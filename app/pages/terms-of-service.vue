<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeoMeta({
  title: () => t('legal.terms.seoTitle'),
  description: () => t('legal.terms.seoDesc')
})

interface Section {
  id: string; title: string; content: string[]
  list?: string[]; afterList?: string[]
}

const sectionKeys = [
  'ourServices','noLogs','intellectualProperty','minors','payments',
  'refund','prohibited','userData','disclaimer','liability',
  'indemnification','geographical','electronic','miscellaneous'
]

function resolveArr(val: unknown): string[] {
  if (!Array.isArray(val)) return []
  return val.map(item => rt(item))
}

const sections = computed<Section[]>(() =>
  sectionKeys.map((key) => {
    const base = tm(`legal.terms.sections.${key}`) as Record<string, unknown>
    return {
      id: key.replace(/([A-Z])/g, '-$1').toLowerCase(),
      title: rt(base.title),
      content: resolveArr(base.content),
      list: base.list ? resolveArr(base.list) : undefined,
      afterList: base.afterList ? resolveArr(base.afterList) : undefined
    }
  })
)

const intro = computed(() => resolveArr(tm('legal.terms.intro')))
</script>

<template>
  <div class="min-h-screen" style="background: #030712; color: #fff;">

    <!-- Hero -->
    <div class="relative overflow-hidden pt-24 pb-16" style="background: linear-gradient(180deg, #050b1a 0%, #030712 100%);">
      <div class="absolute inset-0 pointer-events-none"
           style="background-image: linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px); background-size: 60px 60px;" />
      <div class="absolute top-0 left-1/3 w-96 h-96 pointer-events-none"
           style="background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 60%); filter: blur(40px);" />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="flex items-center gap-3 mb-5">
          <div class="flex w-11 h-11 items-center justify-center rounded-2xl"
               style="background: rgba(0,245,255,0.1); border: 1px solid rgba(0,245,255,0.2);">
            <UIcon name="i-lucide-scroll-text" class="w-5 h-5" style="color: #00f5ff;" />
          </div>
          <span class="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style="background: rgba(0,245,255,0.08); border: 1px solid rgba(0,245,255,0.2); color: #00f5ff;">
            {{ t('legal.common.legalDocument') }}
          </span>
        </div>
        <h1 class="text-4xl lg:text-5xl font-black mb-4 leading-tight">
          {{ t('legal.terms.title') }}
        </h1>
        <p class="text-lg leading-relaxed max-w-3xl" style="color: rgba(255,255,255,0.5);">
          {{ t('legal.terms.description') }}
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
                class="block text-sm py-1.5 px-3 rounded-lg border-l-2 border-transparent transition-all duration-200 hover:bg-white/5"
                style="color: rgba(255,255,255,0.4);"
                onmouseover="this.style.color='#00f5ff'; this.style.borderLeftColor='#00f5ff';"
                onmouseout="this.style.color='rgba(255,255,255,0.4)'; this.style.borderLeftColor='transparent';"
              >
                {{ section.title }}
              </a>
            </nav>
          </div>
        </aside>

        <!-- Main -->
        <main class="min-w-0">
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
          <div class="space-y-10">
            <section
              v-for="section in sections"
              :id="section.id"
              :key="section.id"
              class="scroll-mt-24"
            >
              <!-- Section title with neon line -->
              <div class="flex items-center gap-4 mb-5">
                <div class="h-px flex-1" style="background: linear-gradient(to right, rgba(0,245,255,0.3), transparent);" />
                <h2 class="text-xl font-bold text-white whitespace-nowrap">{{ section.title }}</h2>
                <div class="h-px flex-1" style="background: linear-gradient(to left, rgba(0,245,255,0.3), transparent);" />
              </div>

              <div class="space-y-4">
                <p
                  v-for="(para, idx) in section.content"
                  :key="idx"
                  class="leading-relaxed text-[15px]"
                  style="color: rgba(255,255,255,0.55);"
                >
                  {{ para }}
                </p>

                <ol v-if="section.list" class="space-y-3 mt-4">
                  <li
                    v-for="(item, idx) in section.list"
                    :key="idx"
                    class="flex gap-3 text-[15px] leading-relaxed"
                    style="color: rgba(255,255,255,0.55);"
                  >
                    <span class="shrink-0 flex w-6 h-6 items-center justify-center rounded-full text-xs font-bold mt-0.5"
                          style="background: rgba(0,245,255,0.1); border: 1px solid rgba(0,245,255,0.25); color: #00f5ff;">
                      {{ idx + 1 }}
                    </span>
                    <span>{{ item }}</span>
                  </li>
                </ol>

                <p
                  v-for="(para, idx) in section.afterList"
                  :key="`after-${idx}`"
                  class="leading-relaxed text-[15px]"
                  style="color: rgba(255,255,255,0.55);"
                >
                  {{ para }}
                </p>
              </div>
            </section>
          </div>

          <!-- Bottom nav -->
          <div class="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
               style="border-top: 1px solid rgba(255,255,255,0.07);">
            <p class="text-sm" style="color: rgba(255,255,255,0.3);">{{ t('legal.common.lastUpdated') }}</p>
            <div class="flex items-center gap-4">
              <NuxtLink to="/privacy-policy"
                        class="text-sm transition-colors"
                        style="color: rgba(255,255,255,0.4);"
                        onmouseover="this.style.color='#00f5ff'"
                        onmouseout="this.style.color='rgba(255,255,255,0.4)'">
                {{ t('legal.terms.navLinks.privacyPolicy') }}
              </NuxtLink>
              <span style="color: rgba(255,255,255,0.15);">·</span>
              <NuxtLink to="/membership-service-agreement"
                        class="text-sm transition-colors"
                        style="color: rgba(255,255,255,0.4);"
                        onmouseover="this.style.color='#00f5ff'"
                        onmouseout="this.style.color='rgba(255,255,255,0.4)'">
                {{ t('legal.terms.navLinks.membershipAgreement') }}
              </NuxtLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
