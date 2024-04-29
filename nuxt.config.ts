// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxtjs/tailwindcss',
  'nuxt-icon'],
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
})