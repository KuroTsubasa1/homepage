<script setup lang="ts">
import ProjectGrid from "~/components/projectGrid.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useSeoMeta({
  title: 'FPV Drones - Lasse Harm',
  ogTitle: 'FPV Drones - Lasse Harm',
  description: 'FPV freestyle, cinematic flying, drone racing, and building custom quads. A look into my passion for first-person-view drones.',
  ogDescription: 'FPV freestyle, cinematic flying, drone racing, and building custom quads.',
  ogImage: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <div class="container mx-auto px-4 max-w-4xl py-12 space-y-10">

    <!-- HERO -->
    <GbWindow title="FPV DRONES" class="animate-slide-up">
      <div class="gb-tile mb-6">
        <img
          src="https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg"
          alt="FPV drone"
          class="w-full object-cover h-48 sm:h-64"
        >
      </div>
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-black mb-3">
          <span class="gradient-text">FPV Drones</span>
        </h1>
        <p class="text-gray-300 text-lg max-w-xl mx-auto">{{ t('drone.hero.subtitle') }}</p>
      </div>
    </GbWindow>

    <!-- WHAT FPV FEELS LIKE -->
    <GbWindow :title="t('drone.feeling.title')" class="animate-slide-up">
      <div class="text-gray-300 leading-relaxed space-y-4">
        <p>{{ t('drone.feeling.p1') }}</p>
        <p v-html="t('drone.feeling.p2')"></p>
        <p>{{ t('drone.feeling.p3') }}</p>
      </div>
    </GbWindow>

    <!-- BUILDING -->
    <GbWindow :title="t('drone.building.title')" class="animate-slide-up">
      <div class="text-gray-300 leading-relaxed space-y-4">
        <p>{{ t('drone.building.p1') }}</p>
        <p>{{ t('drone.building.p2') }}</p>
        <p>{{ t('drone.building.p3') }}</p>
      </div>
    </GbWindow>

    <!-- SIMS -->
    <GbWindow :title="t('drone.sim.title')" class="animate-slide-up">
      <div class="text-gray-300 leading-relaxed space-y-4">
        <p>{{ t('drone.sim.p1') }}</p>
        <p v-html="t('drone.sim.p2')"></p>
        <p>{{ t('drone.sim.p3') }}</p>
      </div>
    </GbWindow>

    <!-- RACING -->
    <GbWindow :title="t('drone.racing.title')" class="animate-slide-up">
      <div class="text-gray-300 leading-relaxed space-y-4">
        <p>{{ t('drone.racing.p1') }}</p>
        <p>{{ t('drone.racing.p2') }}</p>
      </div>
    </GbWindow>

    <!-- MY FLEET -->
    <GbWindow :title="t('drone.fleet.title')" class="animate-slide-up">
      <div class="text-gray-300 leading-relaxed space-y-4">
        <p v-html="t('drone.fleet.p1')"></p>
        <p v-html="t('drone.fleet.p2')"></p>
        <p v-html="t('drone.fleet.p3')"></p>
      </div>
    </GbWindow>

    <!-- FOOTAGE -->
    <GbWindow :title="t('drone.footage.title')" class="animate-slide-up">
      <project-grid category="drone"></project-grid>
    </GbWindow>

  </div>
</template>
