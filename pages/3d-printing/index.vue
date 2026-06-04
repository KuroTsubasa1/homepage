<script setup lang="ts">
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
  <div class="container mx-auto px-4 max-w-4xl py-12 space-y-10">

    <!-- HERO -->
    <GbWindow title="3D PRINTING" class="animate-slide-up">
      <div class="gb-tile mb-6">
        <img
          src="https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=1920x1080"
          alt="3D printing"
          class="w-full object-cover h-48 sm:h-64"
        >
      </div>
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-black mb-3">
          <span class="text-white">{{ t('printing.hero.title1') }}</span>
          <span class="gradient-text">{{ t('printing.hero.title2') }}</span>
        </h1>
        <p class="text-gray-300 text-lg leading-relaxed mb-5 max-w-xl mx-auto">{{ t('printing.hero.subtitle') }}</p>
        <a href="https://3dps.space/" target="_blank" rel="noopener noreferrer" class="btn-neon inline-block">{{ t('printing.hero.visit') }}</a>
      </div>
    </GbWindow>

    <!-- The joy -->
    <GbWindow :title="t('printing.why.title')" class="animate-slide-up">
      <div class="space-y-4 text-gray-300 leading-relaxed">
        <p>{{ t('printing.why.p1') }}</p>
        <p>{{ t('printing.why.p2') }}</p>
        <p v-html="t('printing.why.p3')"></p>
      </div>
    </GbWindow>

    <!-- CAD & Modeling -->
    <GbWindow :title="t('printing.cad.title')" class="animate-slide-up">
      <div class="space-y-4 text-gray-300 leading-relaxed">
        <p v-html="t('printing.cad.p1')"></p>
        <p v-html="t('printing.cad.p2')"></p>
        <p>{{ t('printing.cad.p3') }}</p>
      </div>
    </GbWindow>

    <!-- My machines -->
    <GbWindow :title="t('printing.workshop.title')" class="animate-slide-up">
      <div class="space-y-4 text-gray-300 leading-relaxed">
        <p v-html="t('printing.workshop.p1')"></p>
        <p v-html="t('printing.workshop.p2')"></p>
        <p v-html="t('printing.workshop.p3')"></p>
        <p v-html="t('printing.workshop.p4')"></p>
      </div>
    </GbWindow>

    <!-- Multi-color -->
    <GbWindow :title="t('printing.multicolor.title')" class="animate-slide-up">
      <div class="space-y-4 text-gray-300 leading-relaxed">
        <p>{{ t('printing.multicolor.p1') }}</p>
        <p>{{ t('printing.multicolor.p2') }}</p>
        <p>{{ t('printing.multicolor.p3') }}</p>
      </div>
    </GbWindow>

    <!-- Prints showcase -->
    <GbWindow :title="t('printing.prints.title')" class="animate-slide-up">
      <project-grid category="3d"></project-grid>
    </GbWindow>

    <!-- CTA -->
    <GbWindow class="animate-slide-up">
      <div class="text-center py-2">
        <h2 class="text-2xl md:text-4xl font-black mb-4">
          <span class="gradient-text">{{ t('printing.ctaBlock.title') }}</span>
        </h2>
        <p class="text-gray-400 text-lg mb-7 max-w-2xl mx-auto">{{ t('printing.ctaBlock.subtitle') }}</p>
        <a href="https://3dps.space/" target="_blank" rel="noopener noreferrer" class="btn-neon font-pixel inline-block animate-glow-pulse">{{ t('printing.hero.visit') }}</a>
      </div>
    </GbWindow>

  </div>
</template>
