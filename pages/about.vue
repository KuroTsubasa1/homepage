<template>
  <div class="container mx-auto px-4 max-w-4xl py-12 space-y-10">

    <!-- PLAYER PROFILE -->
    <GbWindow title="PLAYER PROFILE" class="animate-slide-up">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-black mb-2">
          <span class="gradient-text">{{ t('about.title') }}</span>
        </h1>
        <p class="pixel-label text-lcd-dim mb-4">{{ t('about.subtitle') }}</p>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">{{ t('about.tagline') }}</p>
      </div>
    </GbWindow>

    <!-- ABOUT ME -->
    <GbWindow :title="t('about.aboutMeTitle')" class="animate-slide-up">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div class="order-1 md:order-2">
          <div class="gb-tile">
            <img
              class="w-full"
              src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/q8dewf7gwhbqpk2/20240319_182201_N85s671DEL.jpg"
              alt="About Me Image"
            />
            <span class="gb-tile-label">LASSE HARM</span>
          </div>
        </div>
        <div class="order-2 md:order-1 space-y-3 text-gray-300 leading-relaxed">
          <p class="pixel-label text-neon-green mb-1">▸ LASSE</p>
          <p>{{ t('about.bio.part1') }}</p>
          <p>{{ t('about.bio.part2') }}</p>
          <p>{{ t('about.bio.part3') }}</p>
          <p>{{ t('about.bio.part4') }}</p>
          <p>{{ t('about.bio.part5') }}</p>
        </div>
      </div>
    </GbWindow>

    <!-- CTA -->
    <GbWindow class="animate-slide-up">
      <div class="text-center">
        <p class="text-gray-300 text-lg mb-6">{{ t('about.cta.question') }}</p>
        <div class="flex flex-wrap justify-center gap-3">
          <NuxtLink to="/reel-web-projects#career" class="btn-neon-outline inline-block">{{ t('about.cta.viewJourney') }}</NuxtLink>
          <NuxtLink to="/cv" class="btn-neon inline-flex items-center gap-2 animate-glow-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            {{ t('about.cta.viewCv') }}
          </NuxtLink>
          <a href="/cv.pdf" target="_blank" rel="noopener" class="btn-neon-outline inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M4 6h16M4 6a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2" /></svg>
            {{ t('about.cta.downloadCv') }}
          </a>
        </div>
      </div>
    </GbWindow>

  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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
