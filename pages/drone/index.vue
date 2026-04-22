<script setup lang="ts">
import Navigation from "~/components/navigation.vue";
import FooterComponent from "~/components/footerComponent.vue";
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
  <navigation></navigation>

  <!-- Hero -->
  <section class="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark z-10"></div>
    <div class="absolute inset-0 bg-grid opacity-20 z-10"></div>
    <div class="absolute inset-0 z-0">
      <img src="https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg" alt="FPV drone" class="w-full h-full object-cover">
    </div>
    <div class="relative z-20 text-center px-4">
      <h1 class="text-5xl md:text-7xl font-black mb-4">
        <span class="gradient-text">FPV Drones</span>
      </h1>
      <p class="text-xl text-gray-300 max-w-xl mx-auto">{{ t('drone.hero.subtitle') }}</p>
    </div>
  </section>

  <!-- Main Content - flowing, personal -->
  <section class="py-20 bg-dark relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="absolute top-0 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px]"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-3xl mx-auto space-y-16">

        <!-- What FPV feels like -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">{{ t('drone.feeling.title') }}</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>{{ t('drone.feeling.p1') }}</p>
            <p v-html="t('drone.feeling.p2')"></p>
            <p>{{ t('drone.feeling.p3') }}</p>
          </div>
        </div>

        <!-- Building -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">{{ t('drone.building.title') }}</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>{{ t('drone.building.p1') }}</p>
            <p>{{ t('drone.building.p2') }}</p>
            <p>{{ t('drone.building.p3') }}</p>
          </div>
        </div>

        <!-- Sims -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">{{ t('drone.sim.title') }}</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>{{ t('drone.sim.p1') }}</p>
            <p v-html="t('drone.sim.p2')"></p>
            <p>{{ t('drone.sim.p3') }}</p>
          </div>
        </div>

        <!-- Racing -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">{{ t('drone.racing.title') }}</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>{{ t('drone.racing.p1') }}</p>
            <p>{{ t('drone.racing.p2') }}</p>
          </div>
        </div>

        <!-- My fleet -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">{{ t('drone.fleet.title') }}</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p v-html="t('drone.fleet.p1')"></p>
            <p v-html="t('drone.fleet.p2')"></p>
            <p v-html="t('drone.fleet.p3')"></p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Footage -->
  <section class="py-20 bg-dark-100 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="container mx-auto px-6 relative z-10">
      <h2 class="section-heading">{{ t('drone.footage.title') }}</h2>
      <div class="section-divider"></div>
      <project-grid category="drone"></project-grid>
    </div>
  </section>

  <footer-component></footer-component>
</template>
