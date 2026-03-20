<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const page = computed(() => ({
  title: t('hero.title'),
  hero: { badge: t('hero.badge'), description: t('hero.description') },
  features: {
    title: t('features.title'),
    items: [
      { title: t('features.items.0.title'), description: t('features.items.0.description'), advantage: t('features.items.0.advantage'), color: '#00f5ff', bg: 'rgba(0,245,255,0.08)', border: 'rgba(0,245,255,0.2)' },
      { title: t('features.items.1.title'), description: t('features.items.1.description'), advantage: t('features.items.1.advantage'), color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.2)' },
      { title: t('features.items.2.title'), description: t('features.items.2.description'), advantage: t('features.items.2.advantage'), color: '#00ff88', bg: 'rgba(0,255,136,0.08)', border: 'rgba(0,255,136,0.2)' }
    ]
  },
  advantages: {
    title: t('advantages.title'),
    description: t('advantages.description'),
    items: [
      { label: t('advantages.items.0.label'), description: t('advantages.items.0.description'), color: '#00f5ff' },
      { label: t('advantages.items.1.label'), description: t('advantages.items.1.description'), color: '#a855f7' },
      { label: t('advantages.items.2.label'), description: t('advantages.items.2.description'), color: '#00ff88' },
      { label: t('advantages.items.3.label'), description: t('advantages.items.3.description'), color: '#f472b6' }
    ]
  },
  pricing: {
    title: t('pricing.title'),
    description: t('pricing.description'),
    plans: [
      { name: t('pricing.planMonth'), price: '$4.99', perDay: `$${(Math.floor(4.99/30*100)/100).toFixed(2)} / ${t('pricing.perDay')}`, popular: false },
      { name: t('pricing.planQuarter'), price: '$13.99', perDay: `$${(Math.floor(13.99/90*100)/100).toFixed(2)} / ${t('pricing.perDay')}`, popular: true },
      { name: t('pricing.planYear'), price: '$43.99', perDay: `$${(Math.floor(43.99/365*100)/100).toFixed(2)} / ${t('pricing.perDay')}`, popular: false },
      { name: t('pricing.planThreeYear'), price: '$98.99', perDay: `$${(Math.floor(98.99/(365*3)*100)/100).toFixed(2)} / ${t('pricing.perDay')}`, popular: false }
    ]
  },
  download: { title: t('download.title'), description: t('download.description') }
}))

useSeoMeta({
  title: () => t('seo.title'), ogTitle: () => t('seo.ogTitle'),
  description: () => t('seo.description'), ogDescription: () => t('seo.description'),
  keywords: () => t('seo.keywords'), author: 'BiDi Technology Limited',
  ogImage: '/logo.png', twitterCard: 'summary_large_image'
})

useHead({
  link: [
    { rel: 'canonical', href: '/' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&display=swap' }
  ]
})

const stats = [
  { value: '10,000+', label: '全球服务器' },
  { value: '59+', label: '覆盖国家' },
  { value: '99.9%', label: '在线率' },
  { value: '7天', label: '退款保障' }
]

// Feature SVG icons
const featureIcons = [
  // Lightning bolt - fast connect
  `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="rgba(0,245,255,0.08)" stroke="rgba(0,245,255,0.25)" stroke-width="1"/>
    <path d="M36 12L20 34H30L28 52L44 30H34L36 12Z" fill="url(#lgrad)" stroke="rgba(0,245,255,0.5)" stroke-width="0.5"/>
    <defs><linearGradient id="lgrad" x1="20" y1="12" x2="44" y2="52" gradientUnits="userSpaceOnUse"><stop stop-color="#00f5ff"/><stop offset="1" stop-color="#60a5fa"/></linearGradient></defs>
  </svg>`,
  // Shield lock - encryption
  `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.25)" stroke-width="1"/>
    <path d="M32 14L18 20V32C18 40.84 24.08 49.12 32 51.5C39.92 49.12 46 40.84 46 32V20L32 14Z" fill="url(#sgrad)" fill-opacity="0.6" stroke="rgba(168,85,247,0.6)" stroke-width="1"/>
    <rect x="27" y="30" width="10" height="9" rx="2" fill="rgba(168,85,247,0.8)"/>
    <path d="M29 30V27C29 25.34 30.34 24 32 24C33.66 24 35 25.34 35 27V30" stroke="rgba(168,85,247,0.9)" stroke-width="2" stroke-linecap="round"/>
    <defs><linearGradient id="sgrad" x1="18" y1="14" x2="46" y2="52" gradientUnits="userSpaceOnUse"><stop stop-color="#a855f7"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs>
  </svg>`,
  // Globe network - servers
  `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="rgba(0,255,136,0.08)" stroke="rgba(0,255,136,0.25)" stroke-width="1"/>
    <circle cx="32" cy="32" r="14" stroke="rgba(0,255,136,0.6)" stroke-width="1.5" fill="none"/>
    <ellipse cx="32" cy="32" rx="7" ry="14" stroke="rgba(0,255,136,0.4)" stroke-width="1" fill="none"/>
    <line x1="18" y1="32" x2="46" y2="32" stroke="rgba(0,255,136,0.4)" stroke-width="1"/>
    <line x1="20" y1="25" x2="44" y2="25" stroke="rgba(0,255,136,0.3)" stroke-width="1"/>
    <line x1="20" y1="39" x2="44" y2="39" stroke="rgba(0,255,136,0.3)" stroke-width="1"/>
    <circle cx="32" cy="32" r="2.5" fill="#00ff88"/>
    <circle cx="32" cy="18" r="1.5" fill="rgba(0,255,136,0.8)"/>
    <circle cx="32" cy="46" r="1.5" fill="rgba(0,255,136,0.8)"/>
    <circle cx="18" cy="32" r="1.5" fill="rgba(0,255,136,0.8)"/>
    <circle cx="46" cy="32" r="1.5" fill="rgba(0,255,136,0.8)"/>
  </svg>`
]

// Advantage SVG icons
const advantageIcons = [
  `<svg viewBox="0 0 32 32" fill="none"><path d="M6 16C6 10.48 10.48 6 16 6C21.52 6 26 10.48 26 16" stroke="#00f5ff" stroke-width="2" stroke-linecap="round"/><path d="M16 6V4M6.34 9.66L4.93 8.25M3 16H1" stroke="#00f5ff" stroke-width="1.5" stroke-linecap="round"/><circle cx="16" cy="16" r="4" fill="rgba(0,245,255,0.2)" stroke="#00f5ff" stroke-width="1.5"/><path d="M16 20V26M10 26H22" stroke="#00f5ff" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 32 32" fill="none"><rect x="4" y="14" width="24" height="16" rx="3" stroke="#a855f7" stroke-width="1.5"/><path d="M10 14V10C10 6.69 12.69 4 16 4C19.31 4 22 6.69 22 10V14" stroke="#a855f7" stroke-width="1.5" stroke-linecap="round"/><circle cx="16" cy="22" r="3" fill="rgba(168,85,247,0.3)" stroke="#a855f7" stroke-width="1.5"/></svg>`,
  `<svg viewBox="0 0 32 32" fill="none"><rect x="3" y="5" width="26" height="18" rx="3" stroke="#00ff88" stroke-width="1.5"/><rect x="7" y="8" width="8" height="12" rx="1.5" stroke="#00ff88" stroke-width="1.5" fill="rgba(0,255,136,0.1)"/><rect x="17" y="8" width="8" height="12" rx="1.5" stroke="#00ff88" stroke-width="1.5" fill="rgba(0,255,136,0.1)"/><path d="M11 27H21M16 23V27" stroke="#00ff88" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="11" stroke="#f472b6" stroke-width="1.5"/><path d="M16 10V16L20 18" stroke="#f472b6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16" cy="16" r="2" fill="rgba(244,114,182,0.4)"/></svg>`
]

onMounted(() => {
  const io = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target) } }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach(el => io.observe(el))
})
</script>

<template>
  <div style="background:#030712;">

    <!-- ════════════════════════════════ HERO ════════════════════════════════ -->
    <section id="home" class="relative min-h-screen flex items-center overflow-hidden" style="background: linear-gradient(135deg, #030712 0%, #060d1f 60%, #030712 100%);">
      <div class="hero-grid absolute inset-0 pointer-events-none" />
      <div class="orb orb-1" /><div class="orb orb-2" /><div class="orb orb-3" />
      <div class="scan-line" />

      <!-- Particle dots -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div v-for="i in 20" :key="i" class="absolute rounded-full"
             :style="`width:${2+Math.sin(i)*1.5}px; height:${2+Math.sin(i)*1.5}px; background:rgba(0,245,255,${0.2+Math.cos(i)*0.15}); top:${(i*17+5)%90}%; left:${(i*13+8)%95}%; animation: orb-float ${5+i%4}s ease-in-out infinite; animation-delay:-${i*0.5}s;`" />
      </div>

      <UContainer class="relative z-10 py-28 lg:py-36">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          <!-- Left -->
          <div class="space-y-8 max-w-xl">
            <!-- Badge -->
            <div class="neon-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full animate-fade-up">
              <div class="neon-badge-dot w-2 h-2 rounded-full" />
              <span class="text-[12px] font-bold tracking-widest uppercase">{{ page.hero.badge }}</span>
            </div>

            <!-- Title -->
            <div class="space-y-1">
              <h1 class="text-white font-black leading-[1.08] tracking-tight animate-slide-up" style="font-size: clamp(38px,5.5vw,72px);">快速、安全，</h1>
              <h1 class="text-gradient-aurora font-black leading-[1.08] tracking-tight animate-slide-up delay-200" style="font-size: clamp(38px,5.5vw,72px);">一键连接</h1>
              <h1 class="text-white font-black leading-[1.08] tracking-tight animate-slide-up delay-300" style="font-size: clamp(38px,5.5vw,72px);">更优质的互联网。</h1>
            </div>

            <!-- Desc -->
            <p class="text-white/55 text-base lg:text-[17px] leading-relaxed animate-fade-up delay-500">{{ page.hero.description }}</p>

            <!-- Buttons -->
            <div class="flex flex-wrap gap-4 animate-fade-up delay-700">
              <a href="#" class="btn-aurora inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl text-white text-sm font-semibold">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                {{ t('download.ios') }}
              </a>
              <a href="#" class="btn-glass inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl text-sm font-semibold">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.341l-4.023-4.023 4.023-4.023-1.061-1.061-4.023 4.023-4.023-4.023-1.061 1.061 4.023 4.023-4.023 4.023 1.061 1.061 4.023-4.023 4.023 4.023z"/><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/></svg>
                {{ t('download.android') }}
              </a>
            </div>

            <!-- Guarantee -->
            <p class="flex items-center gap-2 text-sm text-white/35 animate-fade-up delay-900">
              <svg class="w-4 h-4 text-[#00ff88]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
              {{ t('download.guarantee') }}
            </p>

            <!-- Stats -->
            <div class="grid grid-cols-4 gap-4 pt-6 animate-fade-up delay-1100" style="border-top:1px solid rgba(255,255,255,0.06);">
              <div v-for="s in stats" :key="s.label" class="stat-item pb-5">
                <div class="text-gradient-cyan font-black text-xl lg:text-2xl tabular-nums">{{ s.value }}</div>
                <div class="text-white/35 text-xs mt-1.5 leading-tight">{{ s.label }}</div>
              </div>
            </div>
          </div>

          <!-- Right: 3D Globe Visualization -->
          <div class="relative flex items-center justify-center animate-fade-up delay-300">
            <div class="hero-img-wrap w-full max-w-[560px] mx-auto">
              <!-- 3D Globe SVG -->
              <svg viewBox="0 0 560 480" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
                <!-- Outer glow rings -->
                <circle cx="280" cy="240" r="200" stroke="rgba(0,245,255,0.06)" stroke-width="1"/>
                <circle cx="280" cy="240" r="180" stroke="rgba(0,245,255,0.08)" stroke-width="1" stroke-dasharray="4 8"/>
                <circle cx="280" cy="240" r="160" stroke="rgba(124,58,237,0.1)" stroke-width="1"/>

                <!-- Globe base -->
                <circle cx="280" cy="240" r="130" fill="url(#globeGrad)" opacity="0.9"/>
                <circle cx="280" cy="240" r="130" fill="url(#globeOverlay)" opacity="0.4"/>

                <!-- Latitude lines -->
                <ellipse cx="280" cy="240" rx="130" ry="40" stroke="rgba(0,245,255,0.15)" stroke-width="0.8" fill="none"/>
                <ellipse cx="280" cy="200" rx="110" ry="32" stroke="rgba(0,245,255,0.1)" stroke-width="0.8" fill="none"/>
                <ellipse cx="280" cy="280" rx="110" ry="32" stroke="rgba(0,245,255,0.1)" stroke-width="0.8" fill="none"/>
                <line x1="280" y1="110" x2="280" y2="370" stroke="rgba(0,245,255,0.12)" stroke-width="0.8"/>
                <line x1="175" y1="145" x2="385" y2="145" stroke="rgba(0,245,255,0.07)" stroke-width="0.8"/>
                <line x1="155" y1="240" x2="405" y2="240" stroke="rgba(0,245,255,0.12)" stroke-width="0.8"/>
                <line x1="175" y1="335" x2="385" y2="335" stroke="rgba(0,245,255,0.07)" stroke-width="0.8"/>

                <!-- Continent silhouettes (simplified) -->
                <!-- North America -->
                <path d="M185 175 L200 165 L225 160 L240 170 L245 185 L235 200 L215 210 L195 205 L182 192 Z" fill="url(#landGrad)" opacity="0.85"/>
                <!-- South America -->
                <path d="M215 225 L230 220 L240 235 L242 260 L235 280 L220 285 L210 270 L205 250 Z" fill="url(#landGrad)" opacity="0.85"/>
                <!-- Europe -->
                <path d="M275 160 L295 155 L310 165 L308 178 L295 182 L278 178 Z" fill="url(#landGrad)" opacity="0.85"/>
                <!-- Africa -->
                <path d="M278 190 L302 185 L315 200 L318 225 L310 250 L295 260 L278 255 L268 238 L265 215 L270 198 Z" fill="url(#landGrad)" opacity="0.85"/>
                <!-- Asia -->
                <path d="M315 155 L360 148 L390 158 L395 175 L380 190 L355 195 L330 192 L315 180 Z" fill="url(#landGrad)" opacity="0.85"/>
                <!-- Australia -->
                <path d="M355 258 L380 252 L392 265 L388 282 L368 288 L352 278 Z" fill="url(#landGrad)" opacity="0.85"/>

                <!-- Connection lines between nodes -->
                <line x1="213" y1="186" x2="290" y2="168" stroke="rgba(0,245,255,0.5)" stroke-width="0.8" stroke-dasharray="3 5"/>
                <line x1="290" y1="168" x2="355" y2="170" stroke="rgba(0,245,255,0.5)" stroke-width="0.8" stroke-dasharray="3 5"/>
                <line x1="213" y1="186" x2="225" y2="250" stroke="rgba(0,245,255,0.3)" stroke-width="0.8" stroke-dasharray="3 5"/>
                <line x1="290" y1="168" x2="290" y2="220" stroke="rgba(0,245,255,0.35)" stroke-width="0.8" stroke-dasharray="3 5"/>
                <line x1="355" y1="170" x2="368" y2="265" stroke="rgba(0,245,255,0.3)" stroke-width="0.8" stroke-dasharray="3 5"/>
                <line x1="225" y1="250" x2="290" y2="220" stroke="rgba(0,245,255,0.25)" stroke-width="0.8" stroke-dasharray="3 5"/>
                <line x1="290" y1="220" x2="368" y2="265" stroke="rgba(0,245,255,0.25)" stroke-width="0.8" stroke-dasharray="3 5"/>

                <!-- Server nodes (glowing dots) -->
                <g>
                  <circle cx="213" cy="186" r="6" fill="rgba(0,245,255,0.2)" stroke="#00f5ff" stroke-width="1.5"/>
                  <circle cx="213" cy="186" r="3" fill="#00f5ff"/>
                  <circle cx="213" cy="186" r="10" fill="rgba(0,245,255,0.1)"/>
                </g>
                <g>
                  <circle cx="290" cy="168" r="5" fill="rgba(168,85,247,0.2)" stroke="#a855f7" stroke-width="1.5"/>
                  <circle cx="290" cy="168" r="2.5" fill="#a855f7"/>
                </g>
                <g>
                  <circle cx="355" cy="170" r="6" fill="rgba(0,255,136,0.2)" stroke="#00ff88" stroke-width="1.5"/>
                  <circle cx="355" cy="170" r="3" fill="#00ff88"/>
                  <circle cx="355" cy="170" r="11" fill="rgba(0,255,136,0.08)"/>
                </g>
                <g>
                  <circle cx="225" cy="250" r="5" fill="rgba(0,245,255,0.2)" stroke="#00f5ff" stroke-width="1.5"/>
                  <circle cx="225" cy="250" r="2.5" fill="#00f5ff"/>
                </g>
                <g>
                  <circle cx="290" cy="220" r="7" fill="rgba(0,245,255,0.3)" stroke="#00f5ff" stroke-width="2"/>
                  <circle cx="290" cy="220" r="4" fill="#00f5ff"/>
                  <circle cx="290" cy="220" r="14" fill="rgba(0,245,255,0.1)"/>
                </g>
                <g>
                  <circle cx="368" cy="265" r="5" fill="rgba(244,114,182,0.2)" stroke="#f472b6" stroke-width="1.5"/>
                  <circle cx="368" cy="265" r="2.5" fill="#f472b6"/>
                </g>

                <!-- Location pin at center -->
                <path d="M280 192 C280 192 262 217 262 228 C262 238.49 270.06 247 280 247 C289.94 247 298 238.49 298 228 C298 217 280 192 280 192Z" fill="url(#pinGrad)" opacity="0.9"/>
                <circle cx="280" cy="228" r="8" fill="white" opacity="0.9"/>
                <circle cx="280" cy="228" r="5" fill="url(#pinGrad)"/>

                <!-- Speed indicator arcs -->
                <path d="M 200 380 A 90 90 0 0 1 360 380" stroke="rgba(255,255,255,0.05)" stroke-width="8" fill="none" stroke-linecap="round"/>
                <path d="M 200 380 A 90 90 0 0 1 340 380" stroke="url(#speedGrad)" stroke-width="8" fill="none" stroke-linecap="round"/>
                <text x="280" y="405" text-anchor="middle" fill="white" font-size="13" font-weight="700" font-family="Inter,sans-serif">256 Mb/s</text>
                <text x="210" y="388" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="10" font-family="Inter,sans-serif">0</text>
                <text x="350" y="388" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="10" font-family="Inter,sans-serif">500</text>

                <!-- Top label -->
                <rect x="200" y="50" width="160" height="36" rx="18" fill="rgba(0,245,255,0.08)" stroke="rgba(0,245,255,0.2)" stroke-width="1"/>
                <text x="280" y="73" text-anchor="middle" fill="#00f5ff" font-size="13" font-weight="600" font-family="Inter,sans-serif">10,000+ 服务器</text>

                <defs>
                  <radialGradient id="globeGrad" cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stop-color="#0d2051"/>
                    <stop offset="60%" stop-color="#070e2b"/>
                    <stop offset="100%" stop-color="#030712"/>
                  </radialGradient>
                  <radialGradient id="globeOverlay" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="rgba(0,245,255,0.06)"/>
                    <stop offset="100%" stop-color="transparent"/>
                  </radialGradient>
                  <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#1a6b8a"/>
                    <stop offset="100%" stop-color="#0e4060"/>
                  </linearGradient>
                  <linearGradient id="pinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#00f5ff"/>
                    <stop offset="100%" stop-color="#7c3aed"/>
                  </linearGradient>
                  <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#00f5ff"/>
                    <stop offset="60%" stop-color="#a855f7"/>
                    <stop offset="100%" stop-color="#00ff88"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

        </div>
      </UContainer>
      <div class="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style="background:linear-gradient(to bottom, transparent, #030712);" />
    </section>

    <!-- ════════════════════════════════ FEATURES ════════════════════════════════ -->
    <section id="features" class="relative py-24 lg:py-32 overflow-hidden" style="background: linear-gradient(180deg, #030712 0%, #060d1f 50%, #030712 100%);">
      <div class="absolute inset-0 pointer-events-none opacity-40" style="background-image: radial-gradient(rgba(0,245,255,0.04) 1px, transparent 1px); background-size:44px 44px;" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none" style="background:radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 65%); filter:blur(40px);"/>

      <UContainer class="relative z-10">
        <div class="text-center mb-16 reveal">
          <div class="eyebrow mb-4">{{ page.features.title }}</div>
          <h2 class="text-white font-black text-[30px] lg:text-[50px] leading-tight">
            为什么选择 <span class="text-gradient-cyan">BiDi</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div
            v-for="(item, i) in page.features.items"
            :key="i"
            class="glass-card rounded-3xl p-8 lg:p-10 reveal"
            :style="`transition-delay:${i*0.12}s`"
          >
            <!-- Glow corner -->
            <div class="absolute top-0 right-0 w-32 h-32 pointer-events-none rounded-3xl" :style="`background: radial-gradient(circle at top right, ${item.color}15, transparent 60%);`"/>

            <!-- Icon -->
            <div class="feat-icon mb-7" :style="`background:${item.bg}; border:1px solid ${item.border};`">
              <div class="w-8 h-8" v-html="featureIcons[i]" />
            </div>

            <h3 class="text-white text-xl lg:text-2xl font-bold mb-3">{{ item.title }}</h3>
            <p class="text-white/50 text-sm lg:text-[15px] leading-relaxed">{{ item.description }}</p>

            <div v-if="item.advantage" class="mt-6 pt-5 border-t border-white/5">
              <p class="text-[13px] font-semibold" :style="`color:${item.color}`">{{ item.advantage }}</p>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <div class="neon-divider mx-8 lg:mx-24" />

    <!-- ════════════════════════════════ ADVANTAGES ════════════════════════════════ -->
    <section id="advantages" class="relative py-24 lg:py-32 overflow-hidden" style="background:#030712;">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none" style="background:radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 60%); filter:blur(60px);"/>
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none" style="background:radial-gradient(circle, rgba(0,245,255,0.07) 0%, transparent 60%); filter:blur(60px);"/>

      <UContainer class="relative z-10">
        <div class="text-center mb-16 reveal">
          <div class="eyebrow mb-4">{{ page.advantages.title }}</div>
          <h2 class="text-white font-black text-[30px] lg:text-[50px] leading-tight">{{ page.advantages.description }}</h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <!-- Left list -->
          <div class="space-y-5">
            <div
              v-for="(item, i) in page.advantages.items"
              :key="i"
              class="glass-card rounded-2xl p-5 flex items-start gap-4 reveal"
              :style="`transition-delay:${i*0.1}s`"
            >
              <div class="neon-check flex-shrink-0"
                   :style="`background:${item.color}14; border:1px solid ${item.color}40; box-shadow:0 0 12px ${item.color}25;`">
                <div class="w-4 h-4" v-html="advantageIcons[i]" />
              </div>
              <div>
                <h3 class="text-white text-lg font-bold mb-1">{{ item.label }}</h3>
                <p class="text-white/45 text-sm leading-relaxed">{{ item.description }}</p>
              </div>
            </div>
          </div>

          <!-- Right: Security Shield visualization -->
          <div class="reveal flex justify-center" style="transition-delay:0.2s">
            <svg viewBox="0 0 440 460" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[420px]">
              <!-- Outer rings -->
              <circle cx="220" cy="220" r="185" stroke="rgba(0,245,255,0.05)" stroke-width="1" stroke-dasharray="6 10"/>
              <circle cx="220" cy="220" r="160" stroke="rgba(124,58,237,0.08)" stroke-width="1"/>
              <circle cx="220" cy="220" r="135" stroke="rgba(0,245,255,0.07)" stroke-width="1" stroke-dasharray="3 7"/>

              <!-- Shield -->
              <path d="M220 60L110 108V196C110 275.6 155.6 348.4 220 372C284.4 348.4 330 275.6 330 196V108L220 60Z" fill="url(#shieldGrad)" fill-opacity="0.15" stroke="url(#shieldStroke)" stroke-width="1.5"/>
              <!-- Inner shield highlight -->
              <path d="M220 88L135 126V196C135 262.8 170.8 323.6 220 344C269.2 323.6 305 262.8 305 196V126L220 88Z" fill="url(#shieldInner)" fill-opacity="0.3"/>

              <!-- Lock icon in center -->
              <rect x="195" y="198" width="50" height="44" rx="8" fill="url(#lockGrad)" fill-opacity="0.9"/>
              <path d="M205 198V186C205 175.5 214 167 224.5 167C235 167 244 175.5 244 186V198" stroke="#00f5ff" stroke-width="3" stroke-linecap="round"/>
              <circle cx="220" cy="218" r="6" fill="white" fill-opacity="0.9"/>
              <rect x="218.5" y="218" width="3" height="12" rx="1.5" fill="rgba(0,245,255,0.8)"/>

              <!-- Floating tech labels -->
              <rect x="60" y="140" width="100" height="28" rx="14" fill="rgba(0,245,255,0.08)" stroke="rgba(0,245,255,0.2)" stroke-width="1"/>
              <text x="110" y="158" text-anchor="middle" fill="#00f5ff" font-size="11" font-weight="600" font-family="Inter,sans-serif">AES-256加密</text>

              <rect x="278" y="140" width="100" height="28" rx="14" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.2)" stroke-width="1"/>
              <text x="328" y="158" text-anchor="middle" fill="#a855f7" font-size="11" font-weight="600" font-family="Inter,sans-serif">DDoS防护</text>

              <rect x="60" y="300" width="100" height="28" rx="14" fill="rgba(0,255,136,0.08)" stroke="rgba(0,255,136,0.2)" stroke-width="1"/>
              <text x="110" y="318" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="600" font-family="Inter,sans-serif">零日志政策</text>

              <rect x="278" y="300" width="110" height="28" rx="14" fill="rgba(244,114,182,0.08)" stroke="rgba(244,114,182,0.2)" stroke-width="1"/>
              <text x="333" y="318" text-anchor="middle" fill="#f472b6" font-size="11" font-weight="600" font-family="Inter,sans-serif">紧急断网开关</text>

              <!-- Connection lines from labels to shield -->
              <line x1="160" y1="154" x2="190" y2="190" stroke="rgba(0,245,255,0.2)" stroke-width="0.8" stroke-dasharray="3 4"/>
              <line x1="278" y1="154" x2="248" y2="190" stroke="rgba(168,85,247,0.2)" stroke-width="0.8" stroke-dasharray="3 4"/>
              <line x1="160" y1="314" x2="190" y2="260" stroke="rgba(0,255,136,0.2)" stroke-width="0.8" stroke-dasharray="3 4"/>
              <line x1="278" y1="314" x2="248" y2="260" stroke="rgba(244,114,182,0.2)" stroke-width="0.8" stroke-dasharray="3 4"/>

              <!-- Small glowing nodes -->
              <circle cx="110" cy="222" r="4" fill="#00f5ff" fill-opacity="0.6"/>
              <circle cx="330" cy="222" r="4" fill="#a855f7" fill-opacity="0.6"/>
              <circle cx="220" cy="370" r="4" fill="#00ff88" fill-opacity="0.6"/>
              <circle cx="220" cy="80" r="4" fill="#f472b6" fill-opacity="0.6"/>

              <!-- Bottom status bar -->
              <rect x="140" y="400" width="160" height="36" rx="18" fill="rgba(0,255,136,0.08)" stroke="rgba(0,255,136,0.25)" stroke-width="1"/>
              <circle cx="163" cy="418" r="5" fill="#00ff88"/>
              <circle cx="163" cy="418" r="5" fill="#00ff88" fill-opacity="0.4" style="animation: orb-float 2s infinite"/>
              <text x="220" y="422" text-anchor="middle" fill="#00ff88" font-size="12" font-weight="700" font-family="Inter,sans-serif">已连接 · 安全</text>

              <defs>
                <linearGradient id="shieldGrad" x1="110" y1="60" x2="330" y2="372" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#00f5ff"/>
                  <stop offset="100%" stop-color="#7c3aed"/>
                </linearGradient>
                <linearGradient id="shieldStroke" x1="110" y1="60" x2="330" y2="372" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#00f5ff" stop-opacity="0.6"/>
                  <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.4"/>
                </linearGradient>
                <linearGradient id="shieldInner" x1="135" y1="88" x2="305" y2="344" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#00f5ff" stop-opacity="0.2"/>
                  <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.1"/>
                </linearGradient>
                <linearGradient id="lockGrad" x1="195" y1="198" x2="245" y2="242" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#00c8ff"/>
                  <stop offset="100%" stop-color="#7c3aed"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </UContainer>
    </section>

    <div class="neon-divider mx-8 lg:mx-24" />

    <!-- ════════════════════════════════ PRICING ════════════════════════════════ -->
    <section id="price" class="relative py-24 lg:py-32 overflow-hidden" style="background:linear-gradient(180deg,#030712 0%,#060d1f 100%);">
      <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse at 50% 100%, rgba(0,245,255,0.06) 0%, transparent 55%);"/>

      <UContainer class="relative z-10">
        <div class="text-center mb-14 reveal">
          <div class="eyebrow mb-4">{{ page.pricing.title }}</div>
          <h2 class="text-white font-black text-[30px] lg:text-[50px] leading-tight mb-3">
            选择您的<span class="text-gradient-aurora">计划</span>
          </h2>
          <p class="text-white/45 text-base">{{ page.pricing.description }}</p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
          <div v-for="(plan, i) in page.pricing.plans" :key="plan.name" class="relative reveal" :style="`transition-delay:${i*0.1}s`">
            <!-- Popular badge -->
            <div v-if="plan.popular" class="absolute -top-5 left-0 right-0 flex justify-center z-10">
              <span class="text-[11px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase"
                    style="background:linear-gradient(135deg,#7c3aed,#00c8ff); color:white; box-shadow:0 0 25px rgba(0,200,255,0.45);">
                {{ t('pricing.popular') }}
              </span>
            </div>

            <div class="h-full flex flex-col items-center text-center px-5 py-8 lg:py-10"
                 :class="plan.popular ? 'price-card-popular rounded-3xl' : 'price-card'"
                 :style="plan.popular ? 'padding-top:2.5rem;' : ''">

              <!-- Shimmer line at top for popular -->
              <div v-if="plan.popular" class="absolute top-0 left-6 right-6 h-px" style="background:linear-gradient(90deg,transparent,rgba(0,245,255,0.6),transparent);"/>

              <div class="text-white/50 text-sm font-medium mb-4">{{ plan.name }}</div>

              <div class="font-black text-[42px] lg:text-[52px] mb-1.5 tracking-tight leading-none"
                   :style="plan.popular ? 'background:linear-gradient(135deg,#00f5ff,#a855f7); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;' : 'color:white'">
                {{ plan.price }}
              </div>

              <div class="text-white/35 text-xs mb-7">{{ plan.perDay }}</div>

              <a href="#download" class="w-full text-center text-sm font-bold py-3 rounded-xl transition-all duration-300 block"
                 :class="plan.popular ? 'btn-aurora text-white' : 'btn-glass'">
                {{ t('pricing.downloadPlan') }}
              </a>

              <div class="mt-6 pt-5 w-full text-left space-y-2.5" style="border-top:1px solid rgba(255,255,255,0.06);">
                <div v-for="feat in ['全功能无限制','10,000+ 服务器','多设备同时']" :key="feat" class="flex items-center gap-2 text-xs text-white/40">
                  <svg class="w-3.5 h-3.5 text-[#00ff88] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  {{ feat }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ════════════════════════════════ DOWNLOAD ════════════════════════════════ -->
    <section id="download" class="relative py-24 lg:py-32 overflow-hidden download-bg">
      <!-- Rotating rings -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="w-[900px] h-[900px] rounded-full ring-spin" style="border:1px solid rgba(0,245,255,0.04);"/>
        <div class="absolute w-[680px] h-[680px] rounded-full ring-spin-rev" style="border:1px solid rgba(124,58,237,0.06);"/>
        <div class="absolute w-[460px] h-[460px] rounded-full ring-spin-fast" style="border:1px solid rgba(0,245,255,0.05);"/>
        <div class="absolute w-[260px] h-[260px] rounded-full" style="border:1px solid rgba(0,245,255,0.08);"/>
        <!-- Center glow -->
        <div class="absolute w-[200px] h-[200px] rounded-full" style="background:radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%); filter:blur(20px);"/>
      </div>

      <UContainer class="relative z-10">
        <div class="text-center max-w-2xl mx-auto space-y-8">
          <div class="reveal"><div class="eyebrow justify-center">{{ t('nav.download') }}</div></div>

          <h2 class="text-white font-black text-[30px] lg:text-[52px] leading-tight reveal">
            {{ page.download.title }}
          </h2>

          <p class="text-white/45 text-base lg:text-lg leading-relaxed reveal">
            {{ page.download.description }}
          </p>

          <!-- App badges -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 reveal">
            <a href="#" class="app-badge rounded-2xl px-6 py-4 flex items-center gap-4 min-w-[210px] transition-all">
              <svg class="w-10 h-10 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div class="text-left">
                <div class="text-white/40 text-[10px]">Download on the</div>
                <div class="text-white text-[18px] font-bold">App Store</div>
              </div>
            </a>
            <a href="#" class="app-badge rounded-2xl px-6 py-4 flex items-center gap-4 min-w-[210px] transition-all">
              <svg class="w-10 h-10 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M3.18 23.76C2.59 23.4 2.2 22.77 2.2 22V2C2.2 1.23 2.59 0.6 3.18 0.24L13.56 12L3.18 23.76Z" fill="#4CAF50"/>
                <path d="M17.24 15.88L5.4 22.73C5.78 22.91 6.2 23 6.64 23C7.08 23 7.5 22.91 7.88 22.73L21.04 15.2L17.24 15.88Z" fill="#F44336"/>
                <path d="M21.04 8.8L17.24 8.12L5.4 1.27C5.78 1.09 6.2 1 6.64 1C7.08 1 7.5 1.09 7.88 1.27L21.04 8.8Z" fill="#FFEB3B"/>
                <path d="M21.04 8.8L17.24 8.12L13.56 12L17.24 15.88L21.04 15.2C21.63 14.84 22 14.21 22 13.44V10.56C22 9.79 21.63 9.16 21.04 8.8Z" fill="#2196F3"/>
              </svg>
              <div class="text-left">
                <div class="text-white/40 text-[10px]">Get it on</div>
                <div class="text-white text-[18px] font-bold">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </UContainer>
    </section>

  </div>
</template>
