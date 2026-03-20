<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
const brandName = 'BiDi'

const socialLinks = [
  { name: 'YouTube', icon: 'i-simple-icons-youtube', href: '#' },
  { name: 'X', icon: 'i-simple-icons-x', href: '#' },
  { name: 'Instagram', icon: 'i-simple-icons-instagram', href: '#' },
  { name: 'LinkedIn', icon: 'i-simple-icons-linkedin', href: '#' },
  { name: 'Facebook', icon: 'i-simple-icons-facebook', href: '#' }
]

const legalLinks = [
  { key: 'footer.privacyPolicy', to: '/privacy-policy' },
  { key: 'footer.termsOfService', to: '/terms-of-service' },
  { key: 'footer.membershipAgreement', to: '/membership-service-agreement' }
]
</script>

<template>
  <footer
    class="relative"
    style="background: #030712; border-top: 1px solid rgba(0,245,255,0.06);"
  >
    <!-- Top glow line -->
    <div class="absolute top-0 left-0 right-0 h-px"
         style="background: linear-gradient(90deg, transparent, rgba(0,245,255,0.3), rgba(124,58,237,0.3), transparent);" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">

        <!-- Left: copyright + legal -->
        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm text-white/30">
          <span>© {{ currentYear }} {{ brandName }}. {{ t('footer.allRightsReserved') }}</span>
          <template v-for="link in legalLinks" :key="link.key">
            <span class="text-white/10">|</span>
            <NuxtLink
              :to="link.to"
              class="hover:text-[#00f5ff] transition-colors duration-200"
            >
              {{ t(link.key) }}
            </NuxtLink>
          </template>
          <span class="text-white/10">|</span>
          <a
            href="mailto:support@bidivpn.com"
            class="hover:text-[#00f5ff] transition-colors duration-200"
          >
            {{ t('footer.contact') }}: support@bidivpn.com
          </a>
        </div>

        <!-- Right: social icons -->
        <div class="flex items-center gap-4">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.href"
            :aria-label="social.name"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-[#00f5ff] transition-all duration-200"
            style="border: 1px solid rgba(255,255,255,0.06);"
          >
            <UIcon :name="social.icon" class="size-4" />
          </a>
        </div>

      </div>
    </div>
  </footer>
</template>
