// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 站点配置（用于 sitemap 和 SEO）

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'nuxt-svgo',
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  site: {
    url: '/',
    name: 'BiDi'
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: false
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/css/variables.scss" as *;
            @use "@/assets/css/mixins.scss" as *;
          `
        }
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        // 代码风格配置 - 适合团队协作
        indent: 2, // 使用2个空格缩进
        quotes: 'single', // 使用单引号
        semi: false, // 不使用分号
        commaDangle: 'never', // 不使用尾随逗号
        braceStyle: '1tbs', // 大括号风格
        arrowParens: true // 箭头函数参数总是使用括号
      }
    }
  },

  i18n: {
    locales: [
      { code: 'zh-CN', name: '中文', file: 'zh-CN.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'zh-CN',
    strategy: 'no_prefix'
  },

  image: {
    // 图片格式优化（生产环境）
    format: ['webp', 'jpg', 'png'],
    quality: 80,
    // 响应式断点
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    // 预设配置
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 200,
          height: 200,
          quality: 85
        }
      },
      hero: {
        modifiers: {
          format: 'webp',
          quality: 80,
          fit: 'cover'
        }
      },
      icon: {
        modifiers: {
          format: 'webp',
          width: 80,
          height: 80,
          quality: 85
        }
      },
      banner: {
        modifiers: {
          format: 'webp',
          quality: 75,
          fit: 'cover'
        }
      }
    },
    // 关键配置：指定图片源目录 - Nuxt 4 格式
    dir: 'assets/images',
    // IPX配置（内置优化器）
    provider: 'ipx',
    ipx: {
      // 开发环境优化
      ...(process.env.NODE_ENV === 'development' && {
        modifiers: {
          quality: 95,
          format: 'png'
        }
      })
    }
  },

  // nuxt-svgo 配置
  svgo: {
    // 启用 TypeScript 声明文件生成
    dts: true,
    // 相对 srcDir（Nuxt 4 多为 app/），避免 ~/ 在模块回退路径中解析异常
    autoImportPath: './assets/icons/',
    // 与模板中 <SvgXxx /> 一致（icon 前缀会生成 IconXxx，无法解析 SvgXxx）
    componentPrefix: 'svg',
    // 默认 componentext 会用 NuxtIcon 包一层 SVG，与 @nuxt/icon 的 NuxtIcon 冲突，
    // SSR 会退化成未知标签（如 <svgapple>），客户端却是 <svg>，导致水合失败。
    defaultImport: 'component',
    // SVGO 优化配置
    svgoConfig: {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              // 保留 viewBox，这对响应式很重要
              removeViewBox: false,
              // Hero 球体等依赖固定 id（含 JS getElementById / url(#id)）
              cleanupIds: false,
              // 内联样式优化
              inlineStyles: {
                onlyMatchedOnce: false
              }
            }
          }
        }
      ]
    }
  }
})
