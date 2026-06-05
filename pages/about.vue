<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm, rt } = useI18n();

const portrait = 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/q8dewf7gwhbqpk2/20240319_182201_N85s671DEL.jpg';

const bioParts = ['part1', 'part2', 'part3', 'part4', 'part5'];

// about.journey is an array of { date, description } — resolve via tm()/rt()
const journey = computed(() =>
  (tm('about.journey') as Array<{ date: unknown; description: unknown }>).map((step) => ({
    date: rt(step.date as any),
    description: rt(step.description as any),
  }))
);

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

<template>
  <div>
    <!-- ① Cinematic portrait hero -->
    <section class="relative min-h-[78vh] md:min-h-[88vh] overflow-hidden bg-forest flex items-end">
      <div
        class="absolute inset-0 bg-cover bg-center animate-ken-burns"
        :style="{ backgroundImage: `url('${portrait}?thumb=1600x0')` }"
      ></div>
      <div class="absolute inset-0 vignette pointer-events-none"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-forest/30 pointer-events-none"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-forest/80 via-transparent to-transparent pointer-events-none"></div>
      <div class="absolute inset-0 bg-topo opacity-20 pointer-events-none"></div>
      <div class="orb bottom-0 left-1/3 w-[600px] h-44 bg-amber/10"></div>

      <div class="relative z-20 container mx-auto px-6 pb-20 pt-32">
        <div class="max-w-3xl" v-reveal>
          <p class="eyebrow mb-5 flex items-center gap-3">
            <span class="inline-block w-10 h-px bg-amber"></span>
            {{ t('about.subtitle') }}
          </p>
          <h1 class="display-xl text-bone text-6xl md:text-8xl lg:text-9xl">
            <span class="gradient-text">{{ t('about.title') }}</span>
          </h1>
          <p class="mt-6 text-lg md:text-xl text-bone-muted max-w-2xl leading-relaxed">
            {{ t('about.tagline') }}
          </p>
        </div>
      </div>

      <div class="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2">
        <span class="w-px h-10 bg-gradient-to-b from-amber/70 to-transparent animate-bob"></span>
      </div>
    </section>

    <!-- ② Editorial bio + portrait -->
    <section class="relative py-28 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb top-0 right-0 w-96 h-96 bg-moss/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-12 gap-14 items-start">
          <!-- Portrait -->
          <div class="lg:col-span-5 lg:sticky lg:top-28" v-reveal:left>
            <div v-tilt="6" class="relative rounded-2xl overflow-hidden wild-border group">
              <img
                v-parallax="0.08"
                :src="`${portrait}?thumb=900x0`"
                :alt="t('about.title')"
                class="w-full h-full object-cover img-zoom"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent pointer-events-none"></div>
            </div>
            <p class="eyebrow text-bone-dim mt-5 flex items-center gap-3">
              <span class="inline-block w-8 h-px bg-amber/60"></span>
              {{ t('about.subtitle') }}
            </p>
          </div>

          <!-- Bio -->
          <div class="lg:col-span-7">
            <p class="eyebrow mb-4">{{ t('about.aboutMeTitle') }}</p>
            <h2 class="display-xl text-4xl md:text-6xl text-bone mb-8 text-balance">
              {{ t('about.aboutMeTitle') }}
            </h2>
            <div class="section-divider !mb-8 !ml-0"></div>
            <div class="space-y-6 max-w-2xl" v-reveal.stagger>
              <p
                v-for="part in bioParts"
                :key="part"
                class="text-lg text-bone-muted leading-relaxed"
              >
                {{ t(`about.bio.${part}`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ③ Animated vertical timeline -->
    <section class="relative py-28 bg-forest-100 overflow-hidden">
      <div class="absolute inset-0 bg-grid opacity-50 pointer-events-none"></div>
      <div class="orb bottom-0 left-1/4 w-96 h-96 bg-amber/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading :eyebrow="t('about.aboutMeTitle')" :title="t('about.journeyTitle')" />

        <div class="relative max-w-3xl mx-auto mt-6">
          <!-- spine -->
          <div class="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-amber/10 via-amber/40 to-amber/10 md:-translate-x-1/2 pointer-events-none"></div>

          <ol class="space-y-12 md:space-y-16">
            <li
              v-for="(step, i) in journey"
              :key="i"
              v-reveal="{ delay: i * 80 }"
              class="relative pl-14 md:pl-0"
              :class="(i % 2 === 0) ? 'md:pr-[calc(50%+3rem)] md:text-right' : 'md:pl-[calc(50%+3rem)]'"
            >
              <!-- amber node -->
              <span
                class="absolute left-4 md:left-1/2 top-1.5 w-4 h-4 -translate-x-1/2 rounded-full bg-amber ring-4 ring-amber/15 shadow-[0_0_16px_rgba(217,138,61,0.6)] animate-glow-pulse"
              ></span>
              <div
                v-tilt="4"
                class="panel rounded-2xl p-6 transition-all duration-500 hover:border-amber/40 hover:-translate-y-1"
              >
                <span class="font-display text-3xl md:text-4xl uppercase gradient-text">{{ step.date }}</span>
                <p class="text-bone-muted leading-relaxed mt-2">{{ step.description }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ④ CV CTA -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-amber/10 via-forest to-moss/10"></div>
      <div class="absolute inset-0 bg-topo opacity-30 pointer-events-none"></div>
      <div class="orb top-0 left-0 w-72 h-72 bg-amber/10"></div>
      <div class="orb bottom-0 right-0 w-72 h-72 bg-clay/10"></div>
      <div class="container mx-auto px-6 text-center relative z-10" v-reveal:scale>
        <p class="eyebrow mb-4">{{ t('about.journeyTitle') }}</p>
        <h2 class="display-xl text-4xl md:text-6xl text-bone mb-6 text-balance max-w-3xl mx-auto">
          <span class="gradient-text">{{ t('about.cta.question') }}</span>
        </h2>
        <div class="flex flex-wrap justify-center gap-4 mt-10">
          <NuxtLink to="/reel-web-projects#career" class="btn-wild-outline inline-block">{{ t('about.cta.viewJourney') }}</NuxtLink>
          <NuxtLink to="/cv" class="btn-wild inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            {{ t('about.cta.viewCv') }}
          </NuxtLink>
          <a href="/cv.pdf" target="_blank" rel="noopener" class="btn-wild-outline inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M4 6h16M4 6a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2" /></svg>
            {{ t('about.cta.downloadCv') }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
