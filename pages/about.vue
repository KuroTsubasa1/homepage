<template>
  <navigation></navigation>

  <!-- Hero Section -->
  <section class="hero-about relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-20"></div>
    <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px]"></div>
    <div class="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-[120px]"></div>

    <div class="container mx-auto px-6 relative z-10">
      <h1 class="text-5xl md:text-7xl font-black mb-4">
        <span class="gradient-text">{{ t('about.title') }}</span>
      </h1>
      <h2 class="text-xl md:text-2xl font-semibold text-gray-300">
        {{ t('about.subtitle') }}
      </h2>
      <p class="text-lg mt-4 mx-auto max-w-2xl text-gray-400">
        {{ t('about.tagline') }}
      </p>
    </div>
  </section>

  <!-- About Me Section -->
  <section class="py-24 bg-dark relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="container mx-auto px-6 relative z-10">
      <h2 class="section-heading">{{ t('about.aboutMeTitle') }}</h2>
      <div class="section-divider"></div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="space-y-4">
          <p class="text-gray-300 leading-relaxed">{{ t('about.bio.part1') }}</p>
          <p class="text-gray-300 leading-relaxed">{{ t('about.bio.part2') }}</p>
          <p class="text-gray-300 leading-relaxed">{{ t('about.bio.part3') }}</p>
          <p class="text-gray-300 leading-relaxed">{{ t('about.bio.part4') }}</p>
          <p class="text-gray-300 leading-relaxed">{{ t('about.bio.part5') }}</p>
        </div>
        <div class="flex justify-center">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-neon-green via-neon-purple to-neon-magenta rounded-2xl blur-sm opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
            <img
              class="relative rounded-2xl shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/q8dewf7gwhbqpk2/20240319_182201_N85s671DEL.jpg"
              alt="About Me Image"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA to Web Projects -->
  <section class="py-16 bg-dark-100 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="container mx-auto px-6 text-center relative z-10">
      <p class="text-gray-400 mb-6">{{ t('about.cta.question') }}</p>
      <div class="flex flex-wrap justify-center gap-4">
        <NuxtLink to="/reel-web-projects#career" class="btn-neon-outline inline-block">{{ t('about.cta.viewJourney') }}</NuxtLink>
        <a href="/cv.pdf" target="_blank" rel="noopener" class="btn-neon inline-flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M4 6h16M4 6a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2" /></svg>
          {{ t('about.cta.downloadCv') }}
        </a>
      </div>
    </div>
  </section>

  <footer-component></footer-component>
</template>

<script lang="ts" setup>
import FooterComponent from "~/components/footerComponent.vue";
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

useSeoMeta({
  title: `${t('about.title')} | ${t('about.subtitle')}`,
  ogTitle: `${t('about.title')} | ${t('about.subtitle')}`,
  description: t('about.tagline'),
  ogDescription: t('about.tagline'),
  ogImage: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/q8dewf7gwhbqpk2/20240319_182201_N85s671DEL.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
  keywords: 'Lasse Harm, web developer, FPV pilot, photographer, Germany, 3D printing',
});
</script>

<style scoped>
.hero-about {
  min-height: 60vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #16161f 50%, #0a0a0f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 80px;
}
</style>
