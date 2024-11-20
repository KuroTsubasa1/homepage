import { defineNuxtPlugin } from '#app'
import VueLazyload from 'vue-lazyload'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(VueLazyload, {
        loading: '/_nuxt/public/loading.gif', // path to your loading image
    })
})