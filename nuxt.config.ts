// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@vesp/nuxt-fontawesome',
    '@nuxtjs/sitemap',
  ],
  fontawesome: {
    icons: {
      solid: ['dollar-sign', 'cog', 'circle', 'check', 'calendar'],
      regular: ['user'],
      brands: ['github', 'twitter', 'facebook', 'linkedin', 'laravel', 'vuejs'],
    }
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },

  plugins: [
    '~/plugins/vue-lazyload.js'
  ],

  ssr: true, // Changed to true for better SEO

  runtimeConfig: {
    public: {
      // PocketBase backend base URL. Override at runtime with NUXT_PUBLIC_API_BASE.
      apiBase: 'https://pocket.lasseharm.space',
    },
  },

  server: {
    port: 3666, // Change this to your desired port
  },


  sitemap: {
    hostname: 'https://lasseharm.space',
    gzip: true,
    exclude: [
      '/404'
    ],
    routes: [
      // Photography routes
      '/photography',
      '/photography/wildlife',
      '/photography/landscape',
      '/photography/portrait',
      '/photography/abstract',
      '/photography/wedding',
      // Drone routes
      '/drone',
      // 3D Printing routes
      '/3d-printing',
      // About and Contact
      '/about',
      '/contact',
      '/cv',
      // Web Projects
      '/reel-web-projects'
    ]
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'author', content: 'Lasse Harm' },
        { name: 'theme-color', content: '#0d1609' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // Game Boy theme fonts: pixel display + VT323 terminal body
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap' }
      ]
    }
  },

  compatibilityDate: '2024-11-20',
})