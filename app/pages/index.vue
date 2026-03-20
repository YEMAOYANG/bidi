<script setup lang="ts">
import { useI18n } from 'vue-i18n'

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
  { value: '59+',     label: t('stats.countries') },
  { value: '99.9%',   label: t('stats.uptime') },
  { value: '7',       label: t('stats.guarantee') }
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
  if (!container) return
  const card = container.children[index] as HTMLElement
  if (!card) return
  const offset = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2
  container.scrollTo({ left: offset, behavior: 'smooth' })
  pricingActive.value = index
}

function onPricingScroll() {
  const container = pricingScroll.value
  if (!container) return
  const center = container.scrollLeft + container.clientWidth / 2
  let closest = 0
  let minDist = Infinity
  Array.from(container.children).forEach((child, i) => {
    const el = child as HTMLElement
    const elCenter = el.offsetLeft + el.offsetWidth / 2
    const dist = Math.abs(center - elCenter)
    if (dist < minDist) { minDist = dist; closest = i }
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
      if (!el) return
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
  <div style="background: var(--bg-void);">
    <!-- ═══════════════════ HERO ═══════════════════ -->
    <section
      id="home"
      class="relative min-h-screen flex items-center overflow-hidden"
      style="background: var(--bg-deep);"
    >
      <!-- Background layers -->
      <div class="hero-grid absolute inset-0 pointer-events-none" />
      <div class="hero-glow hero-glow--cyan" />
      <div class="hero-glow hero-glow--purple" />

      <UContainer class="relative z-10 py-28 lg:py-36">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <!-- Left content -->
          <div class="space-y-6 max-w-xl">
            <!-- Badge -->
            <div class="hero-badge anim-fade-up">
              <span class="badge-dot" />
              <span>{{ page.hero.badge }}</span>
            </div>

            <!-- Title -->
            <h1 class="hero-title anim-fade-up anim-delay-100" style="--anim-y: 30px;">
              快速、安全，<br>
              <span class="gradient-text">一键连接</span><br>
              更优质的互联网。
            </h1>

            <!-- Description -->
            <p class="text-lg leading-relaxed anim-fade anim-delay-400" style="color: var(--text-secondary); max-width: 480px;">
              {{ page.hero.description }}
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-4 anim-fade-up anim-delay-500">
              <a href="#download" class="btn-primary btn-lg">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                {{ t('download.ios') }}
              </a>
              <a href="#download" class="btn-secondary btn-lg">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76C2.59 23.4 2.2 22.77 2.2 22V2c0-.77.39-1.4.98-1.76L13.56 12 3.18 23.76z" /><path d="M17.24 15.88L5.4 22.73c.38.18.8.27 1.24.27s.86-.09 1.24-.27l13.16-7.53-3.8.68z" /><path d="M21.04 8.8l-3.8-.68L5.4 1.27C5.78 1.09 6.2 1 6.64 1s.86.09 1.24.27L21.04 8.8z" /><path d="M21.04 8.8l-3.8-.68-3.68 3.88 3.68 3.88 3.8-.68c.59-.36.96-.99.96-1.76v-2.88c0-.77-.37-1.4-.96-1.76z" /></svg>
                {{ t('download.android') }}
              </a>
            </div>

            <!-- Trust line -->
            <p class="flex items-center gap-2 text-sm anim-fade anim-delay-600" style="color: var(--text-tertiary);">
              <svg class="w-4 h-4" style="color: var(--success);" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
              {{ t('download.guarantee') }}
            </p>
          </div>

          <!-- Right: Data Flow Sphere SVG (§12) -->
          <div class="relative flex items-center justify-center anim-scale anim-delay-200">
            <div class="hero-vis-wrap w-full max-w-[560px] mx-auto">
              <svg viewBox="0 0 560 560" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
                <defs>
                  <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#00f5ff" stop-opacity="0.25" />
                    <stop offset="40%" stop-color="#00f5ff" stop-opacity="0.08" />
                    <stop offset="100%" stop-color="#00f5ff" stop-opacity="0" />
                  </radialGradient>
                  <radialGradient id="sphereEdge" cx="50%" cy="50%" r="50%">
                    <stop offset="70%" stop-color="transparent" />
                    <stop offset="95%" stop-color="#00f5ff" stop-opacity="0.15" />
                    <stop offset="100%" stop-color="#00f5ff" stop-opacity="0" />
                  </radialGradient>
                  <radialGradient id="particleGlow">
                    <stop offset="0%" stop-color="#00f5ff" stop-opacity="0.9" />
                    <stop offset="100%" stop-color="#00f5ff" stop-opacity="0" />
                  </radialGradient>
                </defs>

                <!-- Layer 1: Outer ring (rotating) -->
                <circle
                  cx="280" cy="280" r="240"
                  fill="none" stroke="rgba(0,245,255,0.1)" stroke-width="1"
                  stroke-dasharray="8 12"
                  style="transform-origin: 280px 280px; animation: ring-spin 30s linear infinite;"
                />

                <!-- Layer 2: Core glow -->
                <circle cx="280" cy="280" r="240" fill="url(#coreGlow)" />
                <circle cx="280" cy="280" r="220" fill="url(#sphereEdge)" />

                <!-- Layer 3: Orbit lines -->
                <ellipse cx="280" cy="280" rx="220" ry="50" fill="none" stroke="rgba(0,245,255,0.08)" stroke-width="1" />
                <ellipse cx="280" cy="280" rx="210" ry="130" fill="none" stroke="rgba(0,245,255,0.06)" stroke-width="1" transform="rotate(-30, 280, 280)" />
                <ellipse cx="280" cy="280" rx="200" ry="180" fill="none" stroke="rgba(124,58,237,0.06)" stroke-width="1" transform="rotate(20, 280, 280)" />
                <ellipse cx="280" cy="280" rx="60" ry="220" fill="none" stroke="rgba(0,245,255,0.05)" stroke-width="1" transform="rotate(15, 280, 280)" />
                <ellipse cx="280" cy="280" rx="40" ry="220" fill="none" stroke="rgba(124,58,237,0.04)" stroke-width="1" transform="rotate(-20, 280, 280)" />

                <!-- Layer 4: Connection lines -->
                <line x1="180" y1="160" x2="350" y2="200" stroke="rgba(0,245,255,0.08)" stroke-width="1" />
                <line x1="320" y1="140" x2="220" y2="380" stroke="rgba(124,58,237,0.06)" stroke-width="1" />
                <line x1="150" y1="300" x2="400" y2="260" stroke="rgba(0,245,255,0.06)" stroke-width="1" />
                <line x1="200" y1="180" x2="380" y2="340" stroke="rgba(0,245,255,0.05)" stroke-width="1" />
                <line x1="340" y1="160" x2="180" y2="350" stroke="rgba(124,58,237,0.05)" stroke-width="1" />

                <!-- Node dots -->
                <circle cx="180" cy="160" r="3" fill="rgba(0,245,255,0.4)" />
                <circle cx="350" cy="200" r="4" fill="rgba(0,245,255,0.6)" />
                <circle cx="320" cy="140" r="2.5" fill="rgba(124,58,237,0.4)" />
                <circle cx="220" cy="380" r="3" fill="rgba(124,58,237,0.5)" />
                <circle cx="400" cy="260" r="3.5" fill="rgba(0,245,255,0.5)" />
                <circle cx="150" cy="300" r="2" fill="rgba(0,245,255,0.3)" />
                <circle cx="380" cy="340" r="3" fill="rgba(0,245,255,0.35)" />
                <circle cx="180" cy="350" r="2.5" fill="rgba(124,58,237,0.35)" />

                <!-- Layer 4: Orbital particles (animated via JS) -->
                <circle id="op-eq-1" r="4" fill="url(#particleGlow)" />
                <circle id="op-eq-2" r="3" fill="url(#particleGlow)" />
                <circle id="op-eq-3" r="2.5" fill="url(#particleGlow)" />
                <circle id="op-30-1" r="3.5" fill="url(#particleGlow)" />
                <circle id="op-30-2" r="2" fill="url(#particleGlow)" />
                <circle id="op-60-1" r="3" fill="rgba(168,85,247,0.8)" />
                <circle id="op-60-2" r="2.5" fill="rgba(168,85,247,0.6)" />

                <!-- Layer 5: Foreground glow particles -->
                <circle cx="340" cy="180" r="6" fill="rgba(0,245,255,0.15)" style="filter: blur(3px);" />
                <circle cx="200" cy="350" r="8" fill="rgba(124,58,237,0.1)" style="filter: blur(4px);" />
                <circle cx="380" cy="310" r="5" fill="rgba(0,245,255,0.12)" style="filter: blur(3px);" />

                <!-- Center lock icon (security) -->
                <g transform="translate(260, 256)" opacity="0.6">
                  <rect x="4" y="18" width="32" height="24" rx="4" fill="none" stroke="#00f5ff" stroke-width="2" />
                  <path d="M12 18V12A8 8 0 0128 12V18" fill="none" stroke="#00f5ff" stroke-width="2" stroke-linecap="round" />
                  <circle cx="20" cy="30" r="3" fill="#00f5ff" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        <!-- Stats Bar -->
        <div class="stats-bar anim-fade-up anim-delay-800">
          <div v-for="s in stats" :key="s.label" class="stat-cell">
            <div class="stat-number">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </UContainer>

      <!-- Bottom fade -->
      <div class="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style="background: linear-gradient(to bottom, transparent, var(--bg-void));" />
    </section>

    <div class="section-divider" />

    <!-- ═══════════════════ FEATURES ═══════════════════ -->
    <section id="features" class="relative py-24 lg:py-32 overflow-hidden" style="background: var(--bg-void);">
      <!-- Top gradient transition from hero -->
      <div class="absolute top-0 left-0 right-0 h-[200px] pointer-events-none" style="background: linear-gradient(to bottom, var(--bg-deep), var(--bg-void));" />
      <!-- Ambient dot pattern -->
      <div class="absolute inset-0 pointer-events-none opacity-40" style="background-image: radial-gradient(rgba(0,245,255,0.04) 1px, transparent 1px); background-size: 44px 44px;" />

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
            <div class="feature-icon" style="background: rgba(0,245,255,0.1); border: 1px solid rgba(0,245,255,0.2);">
              <svg class="w-7 h-7" viewBox="0 0 28 28" fill="none">
                <path d="M15.5 3L5 16h7l-1.5 9L22 12h-7l1.5-9z" fill="none" stroke="#00f5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3" style="color: var(--text-white);">{{ page.features.items[0].title }}</h3>
            <p class="text-base leading-relaxed" style="color: var(--text-secondary);">{{ page.features.items[0].description }}</p>
            <div v-if="page.features.items[0].advantage" class="feature-link">
              <span>{{ page.features.items[0].advantage }}</span>
              <svg viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </div>
          </div>

          <!-- Secure -->
          <div class="glass-card feature-card feature-card--secure reveal">
            <div class="feature-icon" style="background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.2);">
              <svg class="w-7 h-7" viewBox="0 0 28 28" fill="none">
                <path d="M14 3L4 7v6c0 6.63 4.28 12.82 10 14.5 5.72-1.68 10-7.87 10-14.5V7L14 3z" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <rect x="10" y="13" width="8" height="6" rx="1.5" fill="none" stroke="#a855f7" stroke-width="1.5" />
                <path d="M11.5 13v-2a2.5 2.5 0 015 0v2" fill="none" stroke="#a855f7" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3" style="color: var(--text-white);">{{ page.features.items[1].title }}</h3>
            <p class="text-base leading-relaxed" style="color: var(--text-secondary);">{{ page.features.items[1].description }}</p>
            <div v-if="page.features.items[1].advantage" class="feature-link" style="color: var(--purple-400);">
              <span>{{ page.features.items[1].advantage }}</span>
              <svg viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </div>
          </div>

          <!-- Global -->
          <div class="glass-card feature-card feature-card--global reveal">
            <div class="feature-icon" style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2);">
              <svg class="w-7 h-7" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="10" stroke="#3b82f6" stroke-width="2" fill="none" />
                <ellipse cx="14" cy="14" rx="5" ry="10" stroke="#3b82f6" stroke-width="1.5" fill="none" />
                <line x1="4" y1="14" x2="24" y2="14" stroke="#3b82f6" stroke-width="1.5" />
                <line x1="6" y1="9" x2="22" y2="9" stroke="#3b82f6" stroke-width="1" opacity="0.5" />
                <line x1="6" y1="19" x2="22" y2="19" stroke="#3b82f6" stroke-width="1" opacity="0.5" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3" style="color: var(--text-white);">{{ page.features.items[2].title }}</h3>
            <p class="text-base leading-relaxed" style="color: var(--text-secondary);">{{ page.features.items[2].description }}</p>
            <div v-if="page.features.items[2].advantage" class="feature-link" style="color: var(--blue-400);">
              <span>{{ page.features.items[2].advantage }}</span>
              <svg viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <div class="section-divider" />

    <!-- ═══════════════════ ADVANTAGES ═══════════════════ -->
    <section
      id="advantages"
      class="relative py-24 lg:py-32 overflow-hidden"
      style="background: linear-gradient(180deg, var(--bg-void) 0%, rgba(10,22,40,0.8) 20%, rgba(10,22,40,0.8) 80%, var(--bg-void) 100%);"
    >
      <!-- Central purple glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none" style="background: radial-gradient(circle, var(--purple-glow) 0%, transparent 60%); filter: blur(100px);" />

      <UContainer class="relative z-10">
        <div class="text-center mb-16 reveal">
          <span class="section-tag">{{ page.advantages.title }}</span>
          <h2 class="section-title">{{ page.advantages.description }}</h2>
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
                <svg class="w-4 h-4" style="color: var(--cyan-500);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold mb-1" style="color: var(--text-white);">{{ item.label }}</h3>
                <p class="text-base leading-relaxed" style="color: var(--text-secondary);">{{ item.description }}</p>
              </div>
            </div>
          </div>

          <!-- Right: Shield visualization -->
          <div class="reveal flex justify-center">
            <svg viewBox="0 0 440 460" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[400px]">
              <defs>
                <linearGradient id="shieldGrad" x1="110" y1="60" x2="330" y2="372" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#00f5ff" /><stop offset="100%" stop-color="#7c3aed" />
                </linearGradient>
                <linearGradient id="shieldStroke" x1="110" y1="60" x2="330" y2="372" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#00f5ff" stop-opacity="0.6" /><stop offset="100%" stop-color="#7c3aed" stop-opacity="0.4" />
                </linearGradient>
                <linearGradient id="lockGrad" x1="195" y1="198" x2="245" y2="242" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#00c8ff" /><stop offset="100%" stop-color="#7c3aed" />
                </linearGradient>
              </defs>

              <!-- Rings -->
              <circle cx="220" cy="220" r="185" stroke="rgba(0,245,255,0.05)" stroke-width="1" stroke-dasharray="6 10" />
              <circle cx="220" cy="220" r="160" stroke="rgba(124,58,237,0.08)" stroke-width="1" />

              <!-- Shield -->
              <path d="M220 60L110 108V196C110 275.6 155.6 348.4 220 372C284.4 348.4 330 275.6 330 196V108L220 60Z" fill="url(#shieldGrad)" fill-opacity="0.15" stroke="url(#shieldStroke)" stroke-width="1.5" />
              <path d="M220 88L135 126V196C135 262.8 170.8 323.6 220 344C269.2 323.6 305 262.8 305 196V126L220 88Z" fill="url(#shieldGrad)" fill-opacity="0.08" />

              <!-- Lock -->
              <rect x="195" y="198" width="50" height="44" rx="8" fill="url(#lockGrad)" fill-opacity="0.9" />
              <path d="M205 198V186C205 175.5 214 167 224.5 167C235 167 244 175.5 244 186V198" stroke="#00f5ff" stroke-width="3" stroke-linecap="round" />
              <circle cx="220" cy="218" r="6" fill="white" fill-opacity="0.9" />
              <rect x="218.5" y="218" width="3" height="12" rx="1.5" fill="rgba(0,245,255,0.8)" />

              <!-- Tech labels -->
              <rect x="60" y="140" width="100" height="28" rx="14" fill="rgba(0,245,255,0.08)" stroke="rgba(0,245,255,0.2)" stroke-width="1" />
              <text x="110" y="158" text-anchor="middle" fill="#00f5ff" font-size="11" font-weight="600" font-family="Inter,sans-serif">AES-256加密</text>

              <rect x="278" y="140" width="100" height="28" rx="14" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.2)" stroke-width="1" />
              <text x="328" y="158" text-anchor="middle" fill="#a855f7" font-size="11" font-weight="600" font-family="Inter,sans-serif">DDoS防护</text>

              <rect x="60" y="300" width="100" height="28" rx="14" fill="rgba(0,255,136,0.08)" stroke="rgba(0,255,136,0.2)" stroke-width="1" />
              <text x="110" y="318" text-anchor="middle" fill="#10b981" font-size="11" font-weight="600" font-family="Inter,sans-serif">零日志政策</text>

              <rect x="278" y="300" width="110" height="28" rx="14" fill="rgba(244,114,182,0.08)" stroke="rgba(244,114,182,0.2)" stroke-width="1" />
              <text x="333" y="318" text-anchor="middle" fill="#f472b6" font-size="11" font-weight="600" font-family="Inter,sans-serif">紧急断网开关</text>

              <!-- Connection lines -->
              <line x1="160" y1="154" x2="190" y2="190" stroke="rgba(0,245,255,0.15)" stroke-width="0.8" stroke-dasharray="3 4" />
              <line x1="278" y1="154" x2="248" y2="190" stroke="rgba(168,85,247,0.15)" stroke-width="0.8" stroke-dasharray="3 4" />
              <line x1="160" y1="314" x2="190" y2="260" stroke="rgba(0,255,136,0.15)" stroke-width="0.8" stroke-dasharray="3 4" />
              <line x1="278" y1="314" x2="248" y2="260" stroke="rgba(244,114,182,0.15)" stroke-width="0.8" stroke-dasharray="3 4" />

              <!-- Status -->
              <rect x="140" y="400" width="160" height="36" rx="18" fill="rgba(0,255,136,0.08)" stroke="rgba(0,255,136,0.25)" stroke-width="1" />
              <circle cx="163" cy="418" r="5" fill="#10b981" />
              <text x="225" y="422" text-anchor="middle" fill="#10b981" font-size="12" font-weight="700" font-family="Inter,sans-serif">已连接 · 安全</text>
            </svg>
          </div>
        </div>
      </UContainer>
    </section>

    <div class="section-divider" />

    <!-- ═══════════════════ PRICING ═══════════════════ -->
    <section id="price" class="relative py-24 lg:py-32 overflow-hidden" style="background: #030712;">
      <UContainer class="relative z-10">
        <!-- Header -->
        <div class="text-center mb-10 reveal">
          <UBadge color="primary" variant="subtle" size="xs" class="section-tag mb-4">
            {{ page.pricing.title }}
          </UBadge>
          <h2 class="section-title mb-3">
            选择您的<span class="gradient-text">计划</span>
          </h2>
          <p class="section-subtitle">{{ page.pricing.description }}</p>
        </div>

        <!-- Snap scroll (mobile) / Grid (tablet+desktop) -->
        <div ref="pricingScroll" class="pricing-scroll reveal">
          <UCard
            v-for="(plan, i) in page.pricing.plans"
            :key="plan.name"
            :ui="{
              root: 'relative',
              header: '',
              body: 'p-0',
              footer: '',
            }"
            :class="['pricing-card', { 'pricing-card--hot': plan.popular }]"
          >
            <!-- Hot badge — 自定义 div, 不用 UBadge -->
            <div v-if="plan.popular" class="pricing-badge">
              {{ t('pricing.popular') }}
            </div>

            <!-- Plan period -->
            <p class="plan-period">{{ plan.name }}</p>

            <!-- Price -->
            <div class="plan-price">
              <span class="plan-currency">$</span>
              <span class="plan-value">{{ plan.price.replace('$', '') }}</span>
            </div>
            <p class="plan-per">{{ plan.perDay }}</p>

            <!-- Save badge -->
            <UBadge
              v-if="plan.save"
              color="emerald"
              variant="subtle"
              size="xs"
              class="plan-save"
            >
              {{ plan.save }}
            </UBadge>

            <!-- Divider -->
            <div class="plan-divider" />

            <!-- Features -->
            <ul class="plan-features">
              <li v-for="feat in pricingFeatures" :key="feat">
                <UIcon name="i-heroicons-check-circle-solid" class="plan-check" />
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
          />
        </div>
      </UContainer>
    </section>

    <!-- ═══════════════════ DOWNLOAD CTA ═══════════════════ -->
    <section id="download" class="relative py-24 lg:py-32 overflow-hidden" style="background: var(--bg-deep);">
      <!-- Ambient glow layers -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none" style="background: radial-gradient(ellipse, var(--cyan-glow-strong) 0%, transparent 60%); filter: blur(80px);" />
      <div class="absolute top-[30%] right-[10%] w-[300px] h-[300px] pointer-events-none" style="background: radial-gradient(circle, var(--purple-glow) 0%, transparent 70%); filter: blur(80px);" />

      <!-- SVG ring decoration -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="w-[700px] h-[700px] rounded-full" style="border: 1px solid rgba(0,245,255,0.04); animation: ring-spin 20s linear infinite;" />
        <div class="absolute w-[500px] h-[500px] rounded-full" style="border: 1px solid rgba(124,58,237,0.06); animation: ring-spin-rev 15s linear infinite;" />
        <div class="absolute w-[300px] h-[300px] rounded-full" style="border: 1px solid rgba(0,245,255,0.05); animation: ring-spin 10s linear infinite;" />
      </div>

      <UContainer class="relative z-10">
        <div class="text-center max-w-2xl mx-auto space-y-8">
          <div class="reveal">
            <span class="section-tag">{{ t('nav.download') }}</span>
          </div>

          <h2 class="section-title reveal" style="font-size: clamp(1.875rem, 5vw, 3rem);">
            {{ page.download.title }}
          </h2>

          <p class="text-lg leading-relaxed reveal" style="color: var(--text-secondary);">
            {{ page.download.description }}
          </p>

          <!-- Store buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 reveal">
            <a href="#" class="store-btn">
              <svg class="w-8 h-8" style="color: var(--text-white);" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div class="text-left">
                <div class="text-[10px]" style="color: var(--text-tertiary);">Download on the</div>
                <div class="text-lg font-bold" style="color: var(--text-white);">App Store</div>
              </div>
            </a>
            <a href="#" class="store-btn">
              <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M3.18 23.76C2.59 23.4 2.2 22.77 2.2 22V2c0-.77.39-1.4.98-1.76L13.56 12 3.18 23.76z" fill="#4CAF50" />
                <path d="M17.24 15.88L5.4 22.73c.38.18.8.27 1.24.27s.86-.09 1.24-.27l13.16-7.53-3.8.68z" fill="#F44336" />
                <path d="M21.04 8.8l-3.8-.68L5.4 1.27C5.78 1.09 6.2 1 6.64 1s.86.09 1.24.27L21.04 8.8z" fill="#FFEB3B" />
                <path d="M21.04 8.8l-3.8-.68-3.68 3.88 3.68 3.88 3.8-.68c.59-.36.96-.99.96-1.76v-2.88c0-.77-.37-1.4-.96-1.76z" fill="#2196F3" />
              </svg>
              <div class="text-left">
                <div class="text-[10px]" style="color: var(--text-tertiary);">Get it on</div>
                <div class="text-lg font-bold" style="color: var(--text-white);">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
