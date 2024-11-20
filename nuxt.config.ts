// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@vesp/nuxt-fontawesome',
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

  ssr: false,

  server: {
    port: 3666, // Change this to your desired port
  },

  compatibilityDate: '2024-11-20',
})