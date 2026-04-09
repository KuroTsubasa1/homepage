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
        { name: 'theme-color', content: '#0a0a0f' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  compatibilityDate: '2024-11-20',
})