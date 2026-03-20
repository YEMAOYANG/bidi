<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SvgApple from '~/assets/svg/apple.svg'
import SvgGooglePlay from '~/assets/svg/google-play.svg'
import SvgGooglePlayColored from '~/assets/svg/google-play-colored.svg'
import SvgCheckBadge from '~/assets/svg/check-badge.svg'
import SvgHeroDataSphere from '~/assets/svg/hero-data-sphere.svg'
import SvgFeatureSpeed from '~/assets/svg/feature-speed.svg'
import SvgFeatureShield from '~/assets/svg/feature-shield.svg'
import SvgFeatureGlobe from '~/assets/svg/feature-globe.svg'
import SvgArrowRight from '~/assets/svg/arrow-right.svg'
import SvgAdvantageCheck from '~/assets/svg/advantage-check.svg'
import SvgAdvantagesShieldVisual from '~/assets/svg/advantages-shield-visual.svg'

const { t } = useI18n()

/* ── SEO ── */
useSeoMeta({
  title: () => t('seo.title'),
  ogTitle: () => t('seo.ogTitle'),
  description: () => t('seo.description'),
  ogDescription: () => t('seo.description'),
  keywords: () => t('seo.keywords'),
  author: 'BiDi Technology Limited',
  ogImage: '/logo.png',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    { rel: 'canonical', href: '/' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&display=swap' }
  ]
})

/* ── Page Data ── */
const page = computed(() => ({
  hero: {
    badge: t('hero.badge'),
    description: t('hero.description')
  },
  features: {
    title: t('features.title'),
    items: [
      { key: 'speed', title: t('features.items.0.title'), description: t('features.items.0.description'), advantage: t('features.items.0.advantage') },
      { key: 'secure', title: t('features.items.1.title'), description: t('features.items.1.description'), advantage: t('features.items.1.advantage') },
      { key: 'global', title: t('features.items.2.title'), description: t('features.items.2.description'), advantage: t('features.items.2.advantage') }
    ]
  },
  advantages: {
    title: t('advantages.title'),
    description: t('advantages.description'),
    items: [
      { label: t('advantages.items.0.label'), description: t('advantages.items.0.description') },
      { label: t('advantages.items.1.label'), description: t('advantages.items.1.description') },
      { label: t('advantages.items.2.label'), description: t('advantages.items.2.description') },
      { label: t('advantages.items.3.label'), description: t('advantages.items.3.description') }
    ]
  },
  pricing: {
    title: t('pricing.title'),
    description: t('pricing.description'),
    plans: [
      { name: t('pricing.planMonth'), price: '$4.99', perDay: `$${(Math.floor(4.99 / 30 * 100) / 100).toFixed(2)} / ${t('pricing.perDay')}`, popular: false },
      { name: t('pricing.planQuarter'), price: '$13.99', perDay: `$${(Math.floor(13.99 / 90 * 100) / 100).toFixed(2)} / ${t('pricing.perDay')}`, popular: true },
      { name: t('pricing.planYear'), price: '$43.99', perDay: `$${(Math.floor(43.99 / 365 * 100) / 100).toFixed(2)} / ${t('pricing.perDay')}`, popular: false, save: '-63%' },
      { name: t('pricing.planThreeYear'), price: '$98.99', perDay: `$${(Math.floor(98.99 / (365 * 3) * 100) / 100).toFixed(2)} / ${t('pricing.perDay')}`, popular: false, save: '-78%' }
    ]
  },
  download: {
    title: t('download.title'),
    description: t('download.description')
  }
}))

/* ── Stats — 使用 i18n 翻译 key ── */
const stats = computed(() => [
  { value: '10,000+', label: t('stats.servers') },
  { value: '59+', label: t('stats.countries') },
  { value: '99.9%', label: t('stats.uptime') },
  { value: '7', label: t('stats.guarantee') }
])

/* ── Pricing features ── */
const pricingFeatures = computed(() => [
  t('pricing.planMonth') ? '全功能无限制' : 'All Features',
  t('pricing.planMonth') ? '10,000+ 服务器' : '10,000+ Servers',
  t('pricing.planMonth') ? '多设备同时连接' : 'Multi-device'
])

/* ── Pricing Snap Scroll ── */
const pricingScroll = ref<HTMLElement | null>(null)
const pricingActive = ref(1) // default to hot card (quarterly)

function pricingScrollTo(index: number) {
  const container = pricingScroll.value
  if (!container) {
    return
  }
  const card = container.children[index] as HTMLElement
  if (!card) {
    return
  }
  const offset = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2
  container.scrollTo({ left: offset, behavior: 'smooth' })
  pricingActive.value = index
}

function onPricingScroll() {
  const container = pricingScroll.value
  if (!container) {
    return
  }
  const center = container.scrollLeft + container.clientWidth / 2
  let closest = 0
  let minDist = Infinity
  Array.from(container.children).forEach((child, i) => {
    const el = child as HTMLElement
    const elCenter = el.offsetLeft + el.offsetWidth / 2
    const dist = Math.abs(center - elCenter)
    if (dist < minDist) {
      minDist = dist
      closest = i
    }
  })
  pricingActive.value = closest
}

/* ── Scroll Reveal ── */
onMounted(() => {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        io.unobserve(e.target)
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

  // Hero SVG orbital particle animation
  animateParticles()

  // Pricing: scroll to hot card on mobile, attach scroll listener
  nextTick(() => {
    if (pricingScroll.value && window.innerWidth < 768) {
      pricingScrollTo(1)
    }
    pricingScroll.value?.addEventListener('scroll', onPricingScroll, { passive: true })
  })
})

/* ── Orbital Particle Animation (§12.5) ── */
function ellipsePoint(cx: number, cy: number, rx: number, ry: number, angle: number, rotation = 0) {
  const cos = Math.cos
  const sin = Math.sin
  const r = (rotation * Math.PI) / 180
  const x = rx * cos(angle)
  const y = ry * sin(angle)
  return {
    x: cx + x * cos(r) - y * sin(r),
    y: cy + x * sin(r) + y * cos(r)
  }
}

const particleConfigs = [
  { id: 'op-eq-1', cx: 280, cy: 280, rx: 220, ry: 50, rot: 0, speed: 6, offset: 0 },
  { id: 'op-eq-2', cx: 280, cy: 280, rx: 220, ry: 50, rot: 0, speed: 6, offset: 2 },
  { id: 'op-eq-3', cx: 280, cy: 280, rx: 220, ry: 50, rot: 0, speed: 6, offset: 4 },
  { id: 'op-30-1', cx: 280, cy: 280, rx: 210, ry: 130, rot: -30, speed: 8, offset: 0 },
  { id: 'op-30-2', cx: 280, cy: 280, rx: 210, ry: 130, rot: -30, speed: 8, offset: 4 },
  { id: 'op-60-1', cx: 280, cy: 280, rx: 200, ry: 180, rot: 20, speed: 10, offset: 0 },
  { id: 'op-60-2', cx: 280, cy: 280, rx: 200, ry: 180, rot: 20, speed: 10, offset: 5 }
]

function animateParticles() {
  function tick(time: number) {
    const sec = time / 1000
    particleConfigs.forEach((p) => {
      const el = document.getElementById(p.id)
      if (!el) {
        return
      }
      const angle = ((sec + p.offset) / p.speed) * Math.PI * 2
      const pos = ellipsePoint(p.cx, p.cy, p.rx, p.ry, angle, p.rot)
      el.setAttribute('cx', String(pos.x))
      el.setAttribute('cy', String(pos.y))
    })
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
</script>

<template>
  <div class="landing-page-root">
    <!-- ═══════════════════ HERO ═══════════════════ -->
    <section
      id="home"
      class="relative flex min-h-screen items-center overflow-hidden bg-token-deep"
    >
      <!-- Background layers -->
      <div class="hero-grid absolute inset-0 pointer-events-none"></div>
      <div class="hero-glow hero-glow--cyan"></div>
      <div class="hero-glow hero-glow--purple"></div>

      <UContainer class="relative z-10 py-28 lg:py-36">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <!-- Left content -->
          <div class="space-y-6 max-w-xl">
            <!-- Badge -->
            <div class="hero-badge anim-fade-up">
              <span class="badge-dot"></span>
              <span>{{ page.hero.badge }}</span>
            </div>

            <!-- Title -->
            <h1
              class="hero-title hero-anim-y-30 anim-fade-up anim-delay-100"
            >
              快速、安全，<br />
              <span class="gradient-text">一键连接</span><br />
              更优质的互联网。
            </h1>

            <!-- Description -->
            <p
              class="copy-max-w text-lg leading-relaxed text-token-secondary anim-fade anim-delay-400"
            >
              {{ page.hero.description }}
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-4 anim-fade-up anim-delay-500">
              <a
                href="#download"
                class="btn-primary btn-lg"
              >
                <SvgApple
                  class="w-5 h-5"
                  :font-controlled="false"
                />
                {{ t('download.ios') }}
              </a>
              <a
                href="#download"
                class="btn-secondary btn-lg"
              >
                <SvgGooglePlay
                  class="w-5 h-5"
                  :font-controlled="false"
                />
                {{ t('download.android') }}
              </a>
            </div>

            <!-- Trust line -->
            <p
              class="flex items-center gap-2 text-sm text-token-tertiary anim-fade anim-delay-600"
            >
              <SvgCheckBadge
                class="h-4 w-4 text-token-success"
                :font-controlled="false"
              />
              {{ t('download.guarantee') }}
            </p>
          </div>

          <!-- Right: Data Flow Sphere SVG (§12) -->
          <div class="relative flex items-center justify-center anim-scale anim-delay-200">
            <div class="hero-vis-wrap w-full max-w-[560px] mx-auto">
              <SvgHeroDataSphere
                class="w-full h-auto"
                :font-controlled="false"
              />
            </div>
          </div>
        </div>

        <!-- Stats Bar -->
        <div class="stats-bar anim-fade-up anim-delay-800">
          <div
            v-for="s in stats"
            :key="s.label"
            class="stat-cell"
          >
            <div class="stat-number">
              {{ s.value }}
            </div>
            <div class="stat-label">
              {{ s.label }}
            </div>
          </div>
        </div>
      </UContainer>

      <!-- Bottom fade -->
      <div
        class="hero-bottom-fade absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
      ></div>
    </section>

    <div class="section-divider"></div>

    <!-- ═══════════════════ FEATURES ═══════════════════ -->
    <section
      id="features"
      class="relative overflow-hidden bg-token-void py-24 lg:py-32"
    >
      <!-- Top gradient transition from hero -->
      <div
        class="features-top-fade pointer-events-none absolute top-0 right-0 left-0 h-[200px]"
      ></div>
      <!-- Ambient dot pattern -->
      <div
        class="features-dot-pattern pointer-events-none absolute inset-0 opacity-40"
      ></div>

      <UContainer class="relative z-10">
        <!-- Section header -->
        <div class="text-center mb-16 reveal">
          <span class="section-tag">{{ page.features.title }}</span>
          <h2 class="section-title">
            为什么选择 <span class="gradient-text">BiDi</span>
          </h2>
        </div>

        <!-- Feature cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 reveal-stagger">
          <!-- Speed -->
          <div class="glass-card feature-card feature-card--speed reveal">
            <div class="feature-icon feature-icon--speed">
              <SvgFeatureSpeed
                class="w-7 h-7"
                :font-controlled="false"
              />
            </div>
            <h3 class="mb-3 text-xl font-bold text-token-white">
              {{ page.features.items[0].title }}
            </h3>
            <p class="text-base leading-relaxed text-token-secondary">
              {{ page.features.items[0].description }}
            </p>
            <div
              v-if="page.features.items[0].advantage"
              class="feature-link"
            >
              <span>{{ page.features.items[0].advantage }}</span>
              <SvgArrowRight :font-controlled="false" />
            </div>
          </div>

          <!-- Secure -->
          <div class="glass-card feature-card feature-card--secure reveal">
            <div class="feature-icon feature-icon--secure">
              <SvgFeatureShield
                class="w-7 h-7"
                :font-controlled="false"
              />
            </div>
            <h3 class="mb-3 text-xl font-bold text-token-white">
              {{ page.features.items[1].title }}
            </h3>
            <p class="text-base leading-relaxed text-token-secondary">
              {{ page.features.items[1].description }}
            </p>
            <div
              v-if="page.features.items[1].advantage"
              class="feature-link text-token-purple-400"
            >
              <span>{{ page.features.items[1].advantage }}</span>
              <SvgArrowRight :font-controlled="false" />
            </div>
          </div>

          <!-- Global -->
          <div class="glass-card feature-card feature-card--global reveal">
            <div class="feature-icon feature-icon--global">
              <SvgFeatureGlobe
                class="w-7 h-7"
                :font-controlled="false"
              />
            </div>
            <h3 class="mb-3 text-xl font-bold text-token-white">
              {{ page.features.items[2].title }}
            </h3>
            <p class="text-base leading-relaxed text-token-secondary">
              {{ page.features.items[2].description }}
            </p>
            <div
              v-if="page.features.items[2].advantage"
              class="feature-link text-token-blue-400"
            >
              <span>{{ page.features.items[2].advantage }}</span>
              <SvgArrowRight :font-controlled="false" />
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <div class="section-divider"></div>

    <!-- ═══════════════════ ADVANTAGES ═══════════════════ -->
    <section
      id="advantages"
      class="section-advantages relative overflow-hidden py-24 lg:py-32"
    >
      <!-- Central purple glow -->
      <div
        class="advantages-center-glow pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2"
      ></div>

      <UContainer class="relative z-10">
        <div class="text-center mb-16 reveal">
          <span class="section-tag">{{ page.advantages.title }}</span>
          <h2 class="section-title">
            {{ page.advantages.description }}
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <!-- Left: Advantage list -->
          <div class="space-y-4 reveal-stagger">
            <div
              v-for="(item, i) in page.advantages.items"
              :key="i"
              class="advantage-item reveal"
            >
              <div class="advantage-check">
                <SvgAdvantageCheck
                  class="h-4 w-4 text-token-cyan-500"
                  :font-controlled="false"
                />
              </div>
              <div>
                <h3 class="mb-1 text-lg font-bold text-token-white">
                  {{ item.label }}
                </h3>
                <p class="text-base leading-relaxed text-token-secondary">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Right: Shield visualization -->
          <div class="reveal flex justify-center">
            <SvgAdvantagesShieldVisual
              class="w-full max-w-[400px]"
              :font-controlled="false"
            />
          </div>
        </div>
      </UContainer>
    </section>

    <div class="section-divider"></div>

    <!-- ═══════════════════ PRICING ═══════════════════ -->
    <section
      id="price"
      class="relative overflow-hidden bg-token-void py-24 lg:py-32"
    >
      <UContainer class="relative z-10">
        <!-- Header -->
        <div class="text-center mb-10 reveal">
          <UBadge
            color="primary"
            variant="subtle"
            size="xs"
            class="section-tag mb-4"
          >
            {{ page.pricing.title }}
          </UBadge>
          <h2 class="section-title mb-3">
            选择您的<span class="gradient-text">计划</span>
          </h2>
          <p class="section-subtitle">
            {{ page.pricing.description }}
          </p>
        </div>

        <!-- Snap scroll (mobile) / Grid (tablet+desktop) -->
        <div
          ref="pricingScroll"
          class="pricing-scroll reveal"
        >
          <!-- wrapper div 承载 badge，UCard 不再 overflow:hidden 截断 -->
          <div
            v-for="plan in page.pricing.plans"
            :key="plan.name"
            class="pricing-card-wrapper"
            :class="{ 'pricing-card-wrapper--hot': plan.popular }"
          >
            <!-- Hot badge 放在 UCard 外层，不会被截断 -->
            <div
              v-if="plan.popular"
              class="pricing-badge"
            >
              {{ t('pricing.popular') }}
            </div>
            <UCard
              :ui="{
                root: '',
                header: '',
                body: 'p-0',
                footer: ''
              }"
              :class="['pricing-card h-full', { 'pricing-card--hot': plan.popular }]"
            >
              <!-- Plan period -->
              <p class="plan-period">
                {{ plan.name }}
              </p>

              <!-- Price -->
              <div class="plan-price">
                <span class="plan-currency">$</span>
                <span class="plan-value">{{ plan.price.replace('$', '') }}</span>
              </div>
              <p class="plan-per">
                {{ plan.perDay }}
              </p>

              <!-- Save badge -->
              <UBadge
                v-if="plan.save"
                color="success"
                variant="subtle"
                size="xs"
                class="plan-save"
              >
                {{ plan.save }}
              </UBadge>

              <!-- Divider -->
              <div class="plan-divider"></div>

              <!-- Features -->
              <ul class="plan-features">
                <li
                  v-for="feat in pricingFeatures"
                  :key="feat"
                >
                  <UIcon
                    name="i-heroicons-check-circle-solid"
                    class="plan-check"
                  />
                  {{ feat }}
                </li>
              </ul>

              <!-- CTA -->
              <UButton
                :color="plan.popular ? 'primary' : 'neutral'"
                :variant="plan.popular ? 'solid' : 'outline'"
                block
                size="lg"
                :class="['plan-cta', !plan.popular && 'plan-cta--ghost']"
                to="#download"
              >
                {{ t('pricing.downloadPlan') }}
              </UButton>
            </UCard>
          </div>

          <!-- Snap indicators (mobile only) -->
          <div class="pricing-dots">
            <button
              v-for="(plan, i) in page.pricing.plans"
              :key="'dot-' + i"
              class="pricing-dot"
              :class="{ active: pricingActive === i }"
              @click="pricingScrollTo(i)"
            ></button>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ═══════════════════ DOWNLOAD CTA ═══════════════════ -->
    <section
      id="download"
      class="relative overflow-hidden bg-token-deep py-24 lg:py-32"
    >
      <!-- Ambient glow layers -->
      <div
        class="download-glow-cyan pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        class="download-glow-purple pointer-events-none absolute top-[30%] right-[10%] h-[300px] w-[300px]"
      ></div>

      <!-- SVG ring decoration -->
      <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          class="download-ring-1 h-[700px] w-[700px] rounded-full"
        ></div>
        <div
          class="download-ring-2 absolute h-[500px] w-[500px] rounded-full"
        ></div>
        <div
          class="download-ring-3 absolute h-[300px] w-[300px] rounded-full"
        ></div>
      </div>

      <UContainer class="relative z-10">
        <div class="text-center max-w-2xl mx-auto space-y-8">
          <div class="reveal">
            <span class="section-tag">{{ t('nav.download') }}</span>
          </div>

          <h2
            class="section-title reveal download-headline-size"
          >
            {{ page.download.title }}
          </h2>

          <p
            class="reveal text-lg leading-relaxed text-token-secondary"
          >
            {{ page.download.description }}
          </p>

          <!-- Store buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 reveal">
            <a
              href="#"
              class="store-btn"
            >
              <SvgApple
                class="h-8 w-8 text-token-white"
                :font-controlled="false"
              />
              <div class="text-left">
                <div class="store-line-caption text-token-tertiary">Download on the</div>
                <div class="text-lg font-bold text-token-white">App Store</div>
              </div>
            </a>
            <a
              href="#"
              class="store-btn"
            >
              <SvgGooglePlayColored
                class="w-8 h-8"
                :font-controlled="false"
              />
              <div class="text-left">
                <div class="store-line-caption text-token-tertiary">Get it on</div>
                <div class="text-lg font-bold text-token-white">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
