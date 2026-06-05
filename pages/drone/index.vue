<script setup lang="ts">
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

const heroImage = 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg';

// Fleet cards (decorative — text comes from existing v-html i18n keys)
const fleet = [
  { key: 'p1', tag: 'DJI Air 2S', accent: 'amber' },
  { key: 'p2', tag: '5" Freestyle', accent: 'moss' },
  { key: 'p3', tag: 'Cinewhoop', accent: 'clay' },
];
</script>

<template>
  <div>
    <!-- ① Full-bleed cinematic hero -->
    <hero
      title="FPV Drones"
      :description="t('drone.hero.subtitle')"
      :image="heroImage"
      eyebrow="Eyes in the sky"
    />

    <!-- ② The feeling — text left, parallax photo right -->
    <section class="relative py-28 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-30 pointer-events-none"></div>
      <div class="orb top-10 right-0 w-96 h-96 bg-amber/10 animate-drift"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-14 items-center">
          <div v-reveal:left>
            <p class="eyebrow mb-5">{{ t('drone.hero.subtitle') }}</p>
            <h2 class="display-xl text-4xl md:text-6xl text-bone mb-7 text-balance">
              {{ t('drone.feeling.title') }}
            </h2>
            <div class="text-lg text-bone-muted leading-relaxed space-y-5">
              <p>{{ t('drone.feeling.p1') }}</p>
              <p v-html="t('drone.feeling.p2')"></p>
              <p>{{ t('drone.feeling.p3') }}</p>
            </div>
          </div>

          <!-- stacked parallax photos -->
          <div v-reveal:right class="relative h-[480px] hidden lg:block">
            <div v-parallax="-0.06" v-tilt="6" class="absolute top-0 right-0 w-3/4 h-72 rounded-2xl overflow-hidden wild-border group">
              <img :src="heroImage + '?thumb=900x0'" alt="FPV in flight" class="w-full h-full object-cover img-zoom" />
              <div class="absolute inset-0 vignette pointer-events-none"></div>
            </div>
            <div v-parallax="0.1" class="absolute bottom-0 left-0 w-3/5 h-64 rounded-2xl overflow-hidden wild-border group shadow-2xl shadow-black/50">
              <img :src="heroImage + '?thumb=700x0'" alt="Aerial perspective" class="w-full h-full object-cover img-zoom" />
              <div class="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ③ Stat strip (decorative) -->
    <section class="relative py-20 bg-forest-100 border-y border-bone/5 overflow-hidden">
      <div class="orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-64 bg-amber/5"></div>
      <div class="absolute inset-0 bg-grid opacity-50 pointer-events-none"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10">
          <stat-counter :value="120" suffix=" km/h" label="Top race speed" />
          <stat-counter :value="14" suffix="+" label="Custom builds" />
          <stat-counter :value="900" suffix="+" label="Sim hours" />
          <stat-counter :value="5" suffix='"' label="Freestyle frame" />
        </div>
      </div>
    </section>

    <!-- ④ Building — photo left, text right -->
    <section class="relative py-28 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb bottom-0 left-1/4 w-96 h-96 bg-moss/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-14 items-center">
          <div v-reveal:left class="relative h-[440px] hidden lg:block order-2 lg:order-1">
            <div v-parallax="0.08" v-tilt="6" class="absolute inset-0 rounded-2xl overflow-hidden wild-border group">
              <img :src="heroImage + '?thumb=900x0'" alt="Building a quad" class="w-full h-full object-cover img-zoom" />
              <div class="absolute inset-0 bg-gradient-to-tr from-forest/70 via-transparent to-transparent"></div>
              <span class="absolute bottom-5 left-5 eyebrow text-amber">Soldered & dialed in</span>
            </div>
          </div>
          <div v-reveal:right class="order-1 lg:order-2">
            <p class="eyebrow mb-5">Workshop</p>
            <h2 class="display-xl text-4xl md:text-6xl text-bone mb-7 text-balance">
              {{ t('drone.building.title') }}
            </h2>
            <div class="text-lg text-bone-muted leading-relaxed space-y-5">
              <p>{{ t('drone.building.p1') }}</p>
              <p>{{ t('drone.building.p2') }}</p>
              <p>{{ t('drone.building.p3') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑤ Sim time — centered full-width on panel -->
    <section class="relative py-28 bg-forest-100 overflow-hidden">
      <div class="absolute inset-0 bg-grid opacity-60 pointer-events-none"></div>
      <div class="orb top-0 right-1/4 w-[28rem] h-72 bg-clay/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading eyebrow="Muscle memory" :title="t('drone.sim.title')" />
        <div class="max-w-3xl mx-auto text-lg text-bone-muted leading-relaxed space-y-5 text-center" v-reveal:blur>
          <p>{{ t('drone.sim.p1') }}</p>
          <p v-html="t('drone.sim.p2')"></p>
          <p>{{ t('drone.sim.p3') }}</p>
        </div>
      </div>
    </section>

    <!-- ⑥ Racing — text left, parallax photo right -->
    <section class="relative py-28 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb bottom-10 left-0 w-96 h-96 bg-amber/10 animate-drift-slow"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-14 items-center">
          <div v-reveal:left>
            <p class="eyebrow mb-5">120 km/h through the gates</p>
            <h2 class="display-xl text-4xl md:text-6xl text-bone mb-7 text-balance">
              {{ t('drone.racing.title') }}
            </h2>
            <div class="text-lg text-bone-muted leading-relaxed space-y-5">
              <p>{{ t('drone.racing.p1') }}</p>
              <p>{{ t('drone.racing.p2') }}</p>
            </div>
          </div>
          <div v-reveal:right class="relative h-[440px] hidden lg:block">
            <div v-parallax="-0.08" v-tilt="6" class="absolute inset-0 rounded-2xl overflow-hidden wild-border group">
              <img :src="heroImage + '?thumb=900x0'" alt="Drone racing" class="w-full h-full object-cover img-zoom" />
              <div class="absolute inset-0 vignette pointer-events-none"></div>
              <span class="absolute top-5 right-5 px-3 py-1 text-xs font-condensed uppercase tracking-widest2 rounded-full bg-amber/15 text-amber border border-amber/30">Race day</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑦ The fleet — cards -->
    <section class="relative py-28 bg-forest-100 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb bottom-0 right-1/4 w-96 h-96 bg-moss/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading eyebrow="The hangar" :title="t('drone.fleet.title')" />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6" v-reveal.stagger>
          <div
            v-for="(craft, i) in fleet"
            :key="craft.key"
            v-tilt="6"
            class="fleet-card group"
          >
            <span class="fleet-index">{{ String(i + 1).padStart(2, '0') }}</span>
            <span
              class="fleet-tag"
              :class="{
                'text-amber border-amber/30 bg-amber/10': craft.accent === 'amber',
                'text-moss-light border-moss/30 bg-moss/10': craft.accent === 'moss',
                'text-clay border-clay/30 bg-clay/10': craft.accent === 'clay',
              }"
            >{{ craft.tag }}</span>
            <p class="text-bone-muted leading-relaxed mt-5" v-html="t(`drone.fleet.${craft.key}`)"></p>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑧ Footage -->
    <section class="relative py-28 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-30 pointer-events-none"></div>
      <div class="orb top-0 left-1/4 w-96 h-96 bg-clay/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading eyebrow="Roll the tape" :title="t('drone.footage.title')" />
        <div v-reveal>
          <project-grid category="drone"></project-grid>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fleet-card {
  @apply relative block p-7 rounded-2xl bg-forest-200/60 border border-bone/10 overflow-hidden transition-all duration-500 ease-wild;
}
.fleet-card:hover {
  @apply border-amber/40 -translate-y-1.5;
  box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(217, 138, 61, 0.08);
}
.fleet-index {
  font-family: 'Anton', sans-serif;
  @apply block text-5xl leading-none text-bone/10 mb-4 transition-colors duration-300;
}
.fleet-card:hover .fleet-index {
  @apply text-amber/30;
}
.fleet-tag {
  font-family: 'Oswald', sans-serif;
  @apply inline-block text-[11px] uppercase tracking-widest2 px-3 py-1 rounded-full border;
}
</style>
