<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const page = computed(() => ({
  title: t('hero.title'),
  hero: {
    badge: t('hero.badge'),
    description: t('hero.description'),
  },
  features: {
    title: t('features.title'),
    items: [
      {
        icon: 'gn01.png',
        iconGlow: 'rgba(0, 245, 255, 0.6)',
        title: t('features.items.0.title'),
        description: t('features.items.0.description'),
        advantage: t('features.items.0.advantage')
      },
      {
        icon: 'gn02.png',
        iconGlow: 'rgba(124, 58, 237, 0.6)',
        title: t('features.items.1.title'),
        description: t('features.items.1.description'),
        advantage: t('features.items.1.advantage')
      },
      {
        icon: 'gn03.png',
        iconGlow: 'rgba(0, 255, 136, 0.6)',
        title: t('features.items.2.title'),
        description: t('features.items.2.description'),
        advantage: t('features.items.2.advantage')
      }
    ]
  },
  advantages: {
    title: t('advantages.title'),
    description: t('advantages.description'),
    items: [
      { label: t('advantages.items.0.label'), description: t('advantages.items.0.description'), color: '#00f5ff' },
      { label: t('advantages.items.1.label'), description: t('advantages.items.1.description'), color: '#7c3aed' },
      { label: t('advantages.items.2.label'), description: t('advantages.items.2.description'), color: '#00ff88' },
      { label: t('advantages.items.3.label'), description: t('advantages.items.3.description'), color: '#f472b6' }
    ]
  },
  pricing: {
    title: t('pricing.title'),
    description: t('pricing.description'),
    plans: [
      { name: t('pricing.planMonth'), price: '$4.99', perDay: `$${(Math.floor(4.99 / 30 * 100) / 100).toFixed(2)} / ${t('pricing.perDay')}`, popular: false },
      { name: t('pricing.planQuarter'), price: '$13.99', perDay: `$${(Math.floor(13.99 / 90 * 100) / 100).toFixed(2)} / ${t('pricing.perDay')}`, popular: true },
      { name: t('pricing.planYear'), price: '$43.99', perDay: `$${(Math.floor(43.99 / 365 * 100) / 100).toFixed(2)} / ${t('pricing.perDay')}`, popular: false },
      { name: t('pricing.planThreeYear'), price: '$98.99', perDay: `$${(Math.floor(98.99 / (365 * 3) * 100) / 100).toFixed(2)} / ${t('pricing.perDay')}`, popular: false }
    ]
  },
  download: {
    title: t('download.title'),
    description: t('download.description')
  }
}))

const seoTitle = computed(() => t('seo.title'))
const seoOgTitle = computed(() => t('seo.ogTitle'))
const seoDescription = computed(() => t('seo.description'))
const seoKeywords = computed(() => t('seo.keywords'))

useSeoMeta({
  title: seoTitle,
  ogTitle: seoOgTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  keywords: seoKeywords,
  author: 'BiDi Technology Limited',
  ogImage: '/logo.png',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    { rel: 'canonical', href: '/' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' }
  ]
})

// Stats for hero
const stats = [
  { value: '10,000+', label: '全球服务器' },
  { value: '59+', label: '覆盖国家' },
  { value: '99.9%', label: '在线率' },
  { value: '7天', label: '退款保障' }
]

// Scroll reveal
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <div style="background: #030712;">

    <!-- ═══════════════════════════════════════════ -->
    <!-- HERO SECTION -->
    <!-- ═══════════════════════════════════════════ -->
    <section
      id="home"
      class="relative min-h-screen flex items-center overflow-hidden"
      style="background: linear-gradient(135deg, #030712 0%, #050b1a 50%, #030712 100%);"
    >
      <!-- Animated Grid -->
      <div class="hero-grid absolute inset-0 pointer-events-none" />

      <!-- Floating Orbs -->
      <div class="orb orb-1" />
      <div class="orb orb-2" />
      <div class="orb orb-3" />

      <!-- Scan Line Effect -->
      <div class="scan-line" />

      <UContainer class="relative z-10 py-28 lg:py-36">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <!-- Left Content -->
          <div class="space-y-8">

            <!-- Neon Badge -->
            <div class="hero-fade-in hero-fade-in-1 inline-flex">
              <div class="neon-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full">
                <div class="neon-badge-dot w-2 h-2 rounded-full" />
                <span class="text-[13px] font-semibold tracking-wider uppercase">
                  {{ page.hero.badge }}
                </span>
              </div>
            </div>

            <!-- Title -->
            <div class="space-y-2">
              <div class="hero-title-line">
                <h1 class="hero-title-inner text-white font-black leading-[1.1] tracking-tight"
                    style="font-size: clamp(36px, 5vw, 68px);">
                  快速、安全，
                </h1>
              </div>
              <div class="hero-title-line">
                <h1 class="hero-title-inner text-gradient-aurora font-black leading-[1.1] tracking-tight"
                    style="font-size: clamp(36px, 5vw, 68px); animation-delay: 0.15s;">
                  一键连接
                </h1>
              </div>
              <div class="hero-title-line">
                <h1 class="hero-title-inner text-white font-black leading-[1.1] tracking-tight"
                    style="font-size: clamp(36px, 5vw, 68px); animation-delay: 0.3s;">
                  更优质的互联网。
                </h1>
              </div>
            </div>

            <!-- Description -->
            <p class="hero-fade-in hero-fade-in-2 text-white/60 text-base lg:text-lg leading-relaxed max-w-lg">
              {{ page.hero.description }}
            </p>

            <!-- Download Buttons -->
            <div class="hero-fade-in hero-fade-in-3 flex flex-wrap gap-4 pt-2">
              <a
                href="#"
                class="btn-aurora inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl text-white text-sm font-semibold"
              >
                <NuxtImg src="apple.png" alt="Apple" class="w-5 h-5" />
                {{ t('download.ios') }}
              </a>
              <a
                href="#"
                class="btn-outline-glow inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl text-sm font-semibold"
              >
                <NuxtImg src="android.png" alt="Android" class="w-5 h-5" />
                {{ t('download.android') }}
              </a>
            </div>

            <!-- Guarantee -->
            <p class="hero-fade-in hero-fade-in-3 flex items-center gap-2 text-sm text-white/40" style="animation-delay: 1.1s;">
              <svg class="w-4 h-4 text-[#00ff88]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              {{ t('download.guarantee') }}
            </p>

            <!-- Stats -->
            <div class="hero-fade-in hero-fade-in-3 grid grid-cols-4 gap-4 pt-4 border-t border-white/5" style="animation-delay: 1.2s;">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="stat-item text-center pb-4"
              >
                <div class="text-[#00f5ff] font-bold text-xl lg:text-2xl stat-number">{{ stat.value }}</div>
                <div class="text-white/40 text-xs mt-1">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- Right: Hero Image with Glow -->
          <div class="hero-fade-in hero-fade-in-2 relative flex justify-center lg:justify-end" style="animation-delay: 0.6s;">
            <div class="relative">
              <!-- Glow behind image -->
              <div class="absolute inset-0 blur-3xl opacity-40"
                   style="background: radial-gradient(circle, rgba(0,245,255,0.4) 0%, rgba(124,58,237,0.3) 50%, transparent 70%); transform: scale(1.2);" />
              <NuxtImg
                src="banner.png"
                :alt="t('common.heroAlt')"
                class="relative w-full max-w-[500px] lg:max-w-[680px] h-auto drop-shadow-2xl"
                style="filter: drop-shadow(0 0 40px rgba(0,245,255,0.2));"
              />
            </div>
          </div>

        </div>
      </UContainer>

      <!-- Bottom fade -->
      <div class="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
           style="background: linear-gradient(to bottom, transparent, #030712);" />
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- FEATURES SECTION -->
    <!-- ═══════════════════════════════════════════ -->
    <section
      id="features"
      class="relative py-24 lg:py-32"
      style="background: linear-gradient(180deg, #030712 0%, #050b1a 50%, #030712 100%);"
    >
      <!-- Subtle grid -->
      <div class="absolute inset-0 pointer-events-none opacity-30"
           style="background-image: radial-gradient(rgba(0,245,255,0.06) 1px, transparent 1px); background-size: 40px 40px;" />

      <UContainer class="relative z-10">
        <!-- Section header -->
        <div class="text-center mb-16 reveal">
          <div class="section-eyebrow mb-4">{{ page.features.title }}</div>
          <h2 class="text-white font-bold text-[32px] lg:text-[48px] leading-tight">
            为什么选择 <span class="text-gradient-blue">BiDi</span>
          </h2>
        </div>

        <!-- Feature Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(item, index) in page.features.items"
            :key="index"
            class="glass-card rounded-3xl p-8 reveal"
            :style="{ transitionDelay: `${index * 0.12}s` }"
          >
            <!-- Icon -->
            <div class="feature-icon-wrap mb-6">
              <NuxtImg
                :src="item.icon"
                :alt="item.title"
                class="w-10 h-10 object-contain"
              />
            </div>

            <!-- Title -->
            <h3 class="text-white text-xl font-bold mb-3">{{ item.title }}</h3>

            <!-- Description -->
            <p class="text-white/50 text-sm leading-relaxed">{{ item.description }}</p>

            <!-- Advantage tag -->
            <div v-if="item.advantage" class="mt-5 pt-4 border-t border-white/5">
              <p class="text-[#00f5ff] text-xs font-medium">{{ item.advantage }}</p>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Section Divider -->
    <div class="section-divider mx-8 lg:mx-24" />

    <!-- ═══════════════════════════════════════════ -->
    <!-- ADVANTAGES SECTION -->
    <!-- ═══════════════════════════════════════════ -->
    <section
      id="advantages"
      class="relative py-24 lg:py-32 overflow-hidden"
      style="background: #030712;"
    >
      <!-- Background orbs -->
      <div class="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
           style="background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 60%); filter: blur(40px);" />
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
           style="background: radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 60%); filter: blur(40px);" />

      <UContainer class="relative z-10">
        <!-- Section header -->
        <div class="text-center mb-16 reveal">
          <div class="section-eyebrow mb-4">{{ page.advantages.title }}</div>
          <h2 class="text-white font-bold text-[32px] lg:text-[48px] leading-tight mb-4">
            {{ page.advantages.description }}
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <!-- Left: Advantages list -->
          <div class="space-y-6">
            <div
              v-for="(item, index) in page.advantages.items"
              :key="index"
              class="glass-card rounded-2xl p-6 flex items-start gap-4 reveal"
              :style="{ transitionDelay: `${index * 0.1}s` }"
            >
              <!-- Neon check -->
              <div
                class="neon-check flex-shrink-0"
                :style="{
                  borderColor: `${item.color}40`,
                  background: `${item.color}12`,
                  boxShadow: `0 0 12px ${item.color}30`
                }"
              >
                <svg class="w-3.5 h-3.5" :style="{ color: item.color }" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 class="text-white text-lg font-bold mb-1.5">{{ item.label }}</h3>
                <p class="text-white/50 text-sm leading-relaxed">{{ item.description }}</p>
              </div>
            </div>
          </div>

          <!-- Right: Why image -->
          <div class="reveal flex justify-center" style="animation-delay: 0.2s;">
            <div class="relative">
              <div class="absolute inset-0 blur-3xl opacity-30"
                   style="background: radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(0,245,255,0.3) 50%, transparent 70%); transform: scale(1.3);" />
              <NuxtImg
                src="why.png"
                :alt="t('common.whyAlt')"
                class="relative w-full max-w-[480px] h-auto"
                style="filter: drop-shadow(0 0 30px rgba(124,58,237,0.3));"
              />
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Section Divider -->
    <div class="section-divider mx-8 lg:mx-24" />

    <!-- ═══════════════════════════════════════════ -->
    <!-- PRICING SECTION -->
    <!-- ═══════════════════════════════════════════ -->
    <section
      id="price"
      class="relative py-24 lg:py-32"
      style="background: linear-gradient(180deg, #030712 0%, #050b1a 100%);"
    >
      <!-- Background glow -->
      <div class="absolute inset-0 pointer-events-none"
           style="background: radial-gradient(ellipse at 50% 100%, rgba(0,245,255,0.06) 0%, transparent 60%);" />

      <UContainer class="relative z-10">
        <!-- Section header -->
        <div class="text-center mb-14 reveal">
          <div class="section-eyebrow mb-4">{{ page.pricing.title }}</div>
          <h2 class="text-white font-bold text-[32px] lg:text-[48px] leading-tight mb-3">
            选择您的<span class="text-gradient-aurora">计划</span>
          </h2>
          <p class="text-white/50 text-base">{{ page.pricing.description }}</p>
        </div>

        <!-- Pricing Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          <div
            v-for="(plan, index) in page.pricing.plans"
            :key="plan.name"
            class="relative reveal"
            :style="{ transitionDelay: `${index * 0.1}s` }"
          >
            <!-- Popular badge -->
            <div
              v-if="plan.popular"
              class="absolute -top-4 left-0 right-0 flex justify-center z-10"
            >
              <span class="text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase"
                    style="background: linear-gradient(135deg, #7c3aed, #00f5ff); color: white; box-shadow: 0 0 20px rgba(0,245,255,0.4);">
                {{ t('pricing.popular') }}
              </span>
            </div>

            <!-- Card -->
            <div
              class="h-full flex flex-col items-center text-center px-5 py-8 rounded-3xl"
              :class="plan.popular ? 'price-card-popular' : 'price-card'"
              :style="plan.popular ? 'padding-top: 2.5rem;' : ''"
            >
              <!-- Plan name -->
              <div class="text-white/60 text-sm font-medium mb-4">{{ plan.name }}</div>

              <!-- Price -->
              <div
                class="font-black text-4xl lg:text-5xl mb-2 tracking-tight"
                :class="plan.popular ? 'text-gradient-aurora' : 'text-white'"
              >
                {{ plan.price }}
              </div>

              <!-- Per day -->
              <div class="text-white/40 text-xs mb-6">{{ plan.perDay }}</div>

              <!-- CTA Button -->
              <a
                href="#download"
                class="w-full text-center text-sm font-semibold py-3 rounded-xl transition-all duration-300 block"
                :class="plan.popular
                  ? 'btn-aurora text-white'
                  : 'btn-outline-glow'"
              >
                {{ t('pricing.downloadPlan') }}
              </a>

              <!-- Included features (all plans) -->
              <div class="mt-6 pt-5 border-t border-white/5 w-full text-left space-y-2">
                <div class="flex items-center gap-2 text-xs text-white/50">
                  <svg class="w-3.5 h-3.5 text-[#00ff88] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  全功能无限制
                </div>
                <div class="flex items-center gap-2 text-xs text-white/50">
                  <svg class="w-3.5 h-3.5 text-[#00ff88] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  10,000+ 服务器
                </div>
                <div class="flex items-center gap-2 text-xs text-white/50">
                  <svg class="w-3.5 h-3.5 text-[#00ff88] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  多设备同时使用
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- DOWNLOAD SECTION -->
    <!-- ═══════════════════════════════════════════ -->
    <section
      id="download"
      class="relative py-24 lg:py-32 overflow-hidden download-bg"
    >
      <!-- Animated ring -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="w-[800px] h-[800px] rounded-full border border-white/3 animate-spin"
             style="animation-duration: 30s;" />
        <div class="absolute w-[600px] h-[600px] rounded-full border border-[#00f5ff]/5 animate-spin"
             style="animation-duration: 20s; animation-direction: reverse;" />
        <div class="absolute w-[400px] h-[400px] rounded-full border border-[#7c3aed]/5 animate-spin"
             style="animation-duration: 15s;" />
      </div>

      <UContainer class="relative z-10">
        <div class="text-center max-w-2xl mx-auto space-y-8">

          <!-- Eyebrow -->
          <div class="reveal">
            <div class="section-eyebrow justify-center">准备好了吗</div>
          </div>

          <!-- Title -->
          <h2 class="text-white font-black text-[32px] lg:text-[52px] leading-tight reveal">
            {{ page.download.title }}
          </h2>

          <!-- Description -->
          <p class="text-white/50 text-base lg:text-lg leading-relaxed reveal">
            {{ page.download.description }}
          </p>

          <!-- App Badges -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 reveal">
            <a href="#" class="app-badge rounded-2xl px-6 py-4 flex items-center gap-4 min-w-[200px]">
              <svg class="w-9 h-9 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div class="text-left">
                <div class="text-white/50 text-[10px]">Download on the</div>
                <div class="text-white text-[17px] font-bold">App Store</div>
              </div>
            </a>

            <a href="#" class="app-badge rounded-2xl px-6 py-4 flex items-center gap-4 min-w-[200px]">
              <NuxtImg src="google-play.png" alt="Google Play" class="w-9 h-9 object-contain flex-shrink-0" />
              <div class="text-left">
                <div class="text-white/50 text-[10px]">Get it on</div>
                <div class="text-white text-[17px] font-bold">Google Play</div>
              </div>
            </a>
          </div>

        </div>
      </UContainer>
    </section>

  </div>
</template>

<style scoped>
/* Ensure dark bg throughout */
:deep(body) {
  background: #030712;
}
</style>
