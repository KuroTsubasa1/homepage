<script setup lang="ts">
import Navigation from "~/components/navigation.vue";
import FooterComponent from "~/components/footerComponent.vue";
import ProjectGrid from "~/components/projectGrid.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useSeoMeta({
  title: '3D Printing & Making - Lasse Harm',
  ogTitle: '3D Printing & Making - Lasse Harm',
  description: 'Exploring 3D printing, CAD modeling in Blender and Plasticity, multi-color prints, and the joy of turning ideas into real objects.',
  ogDescription: 'Exploring 3D printing, CAD modeling in Blender and Plasticity, multi-color prints, and the joy of turning ideas into real objects.',
  ogImage: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <navigation></navigation>

  <!-- Hero -->
  <section class="relative min-h-[70vh] flex items-center overflow-hidden" style="background-image: url('https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=1920x1080'); background-size: cover; background-position: center;">
    <div class="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark z-10"></div>
    <div class="absolute inset-0 bg-grid opacity-20 z-10"></div>
    <div class="relative z-20 container mx-auto px-6 py-20">
      <div class="max-w-2xl">
        <h1 class="text-5xl md:text-7xl font-black mb-4">
          <span class="text-white">{{ t('printing.hero.title1') }}</span><br>
          <span class="gradient-text">{{ t('printing.hero.title2') }}</span>
        </h1>
        <p class="text-lg text-gray-300 mb-8">{{ t('printing.hero.subtitle') }}</p>
        <div class="flex flex-wrap gap-4">
          <a href="https://3dps.space/" target="_blank" rel="noopener noreferrer" class="btn-neon inline-block">{{ t('printing.hero.visit') }}</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Main Content - flowing, personal -->
  <section class="py-20 bg-dark relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="absolute top-0 left-0 w-96 h-96 bg-neon-green/5 rounded-full blur-[100px]"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-3xl mx-auto space-y-16">

        <!-- The joy -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">{{ t('printing.why.title') }}</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>{{ t('printing.why.p1') }}</p>
            <p>{{ t('printing.why.p2') }}</p>
            <p v-html="t('printing.why.p3')"></p>
          </div>
        </div>

        <!-- CAD & Modeling -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">{{ t('printing.cad.title') }}</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p v-html="t('printing.cad.p1')"></p>
            <p v-html="t('printing.cad.p2')"></p>
            <p>{{ t('printing.cad.p3') }}</p>
          </div>
        </div>

        <!-- My machines -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">{{ t('printing.workshop.title') }}</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p v-html="t('printing.workshop.p1')"></p>
            <p v-html="t('printing.workshop.p2')"></p>
            <p v-html="t('printing.workshop.p3')"></p>
            <p v-html="t('printing.workshop.p4')"></p>
          </div>
        </div>

        <!-- Multi-color -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">{{ t('printing.multicolor.title') }}</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>{{ t('printing.multicolor.p1') }}</p>
            <p>{{ t('printing.multicolor.p2') }}</p>
            <p>{{ t('printing.multicolor.p3') }}</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Prints showcase -->
  <section class="py-20 bg-dark-100 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="container mx-auto px-6 relative z-10">
      <h2 class="section-heading">{{ t('printing.prints.title') }}</h2>
      <div class="section-divider"></div>
      <project-grid category="3d"></project-grid>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-dark to-neon-cyan/10"></div>
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="container mx-auto px-6 text-center relative z-10">
      <h2 class="text-3xl md:text-4xl font-black mb-6"><span class="gradient-text">{{ t('printing.ctaBlock.title') }}</span></h2>
      <p class="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">{{ t('printing.ctaBlock.subtitle') }}</p>
      <a href="https://3dps.space/" target="_blank" rel="noopener noreferrer" class="btn-neon inline-block">{{ t('printing.hero.visit') }}</a>
    </div>
  </section>

  <footer-component></footer-component>
</template>
