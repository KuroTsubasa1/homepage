<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { listUrl, fileUrl } = usePocketbase();

useSeoMeta({
  title: 'Lasse Harm | Wildlife Photographer, FPV Pilot & Web Developer',
  ogTitle: 'Lasse Harm | Wildlife Photographer, FPV Pilot & Web Developer',
  description: 'Into the wild with Lasse Harm — wildlife & landscape photography, FPV drone flying, 3D printing, and modern web development from Schleswig-Holstein, Germany.',
  ogDescription: 'Into the wild with Lasse Harm — wildlife & landscape photography, FPV drone flying, 3D printing, and modern web development from Schleswig-Holstein, Germany.',
  ogImage: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/o3s31u9eem15ygo/20220929_173927_original_cb7wKgT60N.JPG?thumb=1200x0',
  twitterCard: 'summary_large_image',
  keywords: 'Lasse Harm, wildlife photography, nature, FPV drone pilot, Germany, web developer, Vue, Nuxt, 3D printing',
});

// Featured gallery covers (server-side, parallel)
const featured = [
  { key: 'wildlife', api: 'wildlife', path: '/photography/wildlife' },
  { key: 'landscape', api: 'nature', path: '/photography/landscape-nature' },
  { key: 'portraits', api: 'people', path: '/photography/portraits-people' },
  { key: 'weddings', api: 'weddings', path: '/photography/weddings' },
];

const { data: covers } = await useAsyncData('home-covers', async () => {
  const out: Record<string, string> = {};
  await Promise.all(featured.map(async (c) => {
    try {
      const res: any = await $fetch(listUrl('portfolio_images', { filter: `(category='${c.api}')`, perPage: 1 }));
      const item = res.items?.[0];
      if (item) out[c.key] = fileUrl(item, item.image, 'thumb=900x0');
    } catch (e) { /* ignore */ }
  }));
  return out;
}, { default: () => ({}) });

const techStack = ['Vue.js', 'Nuxt', 'TypeScript', 'PHP', 'Symfony', 'Laravel', 'Tailwind', 'Docker'];
</script>

<template>
  <div>
    <!-- ① Cinematic hero -->
    <background-image-slider />

    <!-- ② Species marquee -->
    <species-marquee />

    <!-- ③ Field note intro -->
    <section class="relative py-28 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-30 pointer-events-none"></div>
      <div class="orb top-0 right-0 w-96 h-96 bg-moss/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-14 items-center">
          <div v-reveal:left>
            <p class="eyebrow mb-5">{{ t('home.intro.eyebrow') }}</p>
            <h2 class="display-xl text-4xl md:text-6xl text-bone mb-7 text-balance">
              {{ t('home.intro.title') }}
            </h2>
            <p class="text-lg text-bone-muted leading-relaxed mb-5">{{ t('home.intro.p1') }}</p>
            <p class="text-lg text-bone-muted leading-relaxed mb-8">{{ t('home.intro.p2') }}</p>
            <NuxtLink to="/about" class="btn-ghost-wild">
              {{ t('home.intro.cta') }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </NuxtLink>
          </div>

          <!-- stacked parallax photos -->
          <div v-reveal:right class="relative h-[460px] hidden lg:block">
            <div v-parallax="-0.06" class="absolute top-0 right-0 w-2/3 h-72 rounded-2xl overflow-hidden wild-border group">
              <img v-if="covers.wildlife" :src="covers.wildlife" alt="Wildlife" class="w-full h-full object-cover img-zoom" />
              <div v-else class="w-full h-full bg-forest-200"></div>
            </div>
            <div v-parallax="0.1" class="absolute bottom-0 left-0 w-2/3 h-72 rounded-2xl overflow-hidden wild-border group shadow-2xl shadow-black/50">
              <img v-if="covers.landscape" :src="covers.landscape" alt="Landscape" class="w-full h-full object-cover img-zoom" />
              <div v-else class="w-full h-full bg-forest-200"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ④ Featured collections -->
    <section class="relative py-24 bg-forest-100 overflow-hidden">
      <div class="absolute inset-0 bg-grid opacity-60 pointer-events-none"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading :eyebrow="t('home.featured.eyebrow')" :title="t('home.featured.title')" :subtitle="t('home.featured.subtitle')" />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" v-reveal.stagger>
          <NuxtLink
            v-for="(c, i) in featured"
            :key="c.key"
            :to="c.path"
            v-tilt="6"
            :class="['group relative overflow-hidden rounded-2xl wild-border block',
                     (i === 0) ? 'lg:col-span-2 lg:row-span-2 h-72 lg:h-[512px]' : 'h-72']"
          >
            <img v-if="covers[c.key]" :src="covers[c.key]" :alt="t(`photography.categories.${c.key}.title`)" class="absolute inset-0 w-full h-full object-cover img-zoom" />
            <div v-else class="absolute inset-0 bg-gradient-to-br from-forest-200 to-forest-300"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <span class="eyebrow text-amber">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="font-display text-2xl md:text-3xl uppercase text-bone mt-1 group-hover:text-amber transition-colors duration-300">
                {{ t(`photography.categories.${c.key}.title`) }}
              </h3>
              <p class="text-sm text-bone-muted mt-1 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 overflow-hidden transition-all duration-500">
                {{ t(`photography.categories.${c.key}.description`) }}
              </p>
            </div>
          </NuxtLink>
        </div>

        <div class="text-center mt-12" v-reveal>
          <NuxtLink to="/photography" class="btn-wild-outline">{{ t('home.featured.viewAll') }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ⑤ Stats -->
    <section class="relative py-20 overflow-hidden border-y border-bone/5">
      <div class="orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-64 bg-amber/5"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10">
          <stat-counter :value="120" suffix="+" :label="t('home.stat.species')" />
          <stat-counter :value="2400" suffix="+" :label="t('home.stat.hours')" />
          <stat-counter :value="38" :label="t('home.stat.km')" />
          <stat-counter :value="11" :label="t('home.stat.years')" />
        </div>
      </div>
    </section>

    <!-- ⑥ What I do -->
    <section class="relative py-28 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb bottom-0 left-1/4 w-96 h-96 bg-moss/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading :eyebrow="t('home.disciplinesEyebrow')" :title="t('home.services')" />

        <!-- Photography — featured -->
        <NuxtLink to="/photography" v-reveal v-tilt="3" class="relative block rounded-3xl overflow-hidden wild-border mb-6 group min-h-[280px]">
          <img v-if="covers.wildlife" :src="covers.wildlife" alt="" class="absolute inset-0 w-full h-full object-cover img-zoom opacity-60" />
          <div class="absolute inset-0 bg-gradient-to-r from-forest via-forest/80 to-forest/30"></div>
          <div class="relative z-10 p-8 md:p-12 max-w-2xl">
            <span class="eyebrow text-amber">{{ t('home.mainFocus') }}</span>
            <h3 class="font-display text-4xl md:text-5xl uppercase text-bone mt-2 mb-4 group-hover:text-amber transition-colors duration-300">{{ t('home.photography.title') }}</h3>
            <p class="text-bone-muted leading-relaxed mb-5">{{ t('home.photography.description') }}</p>
            <span class="btn-ghost-wild">
              {{ t('home.explorePortfolio') }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </div>
        </NuxtLink>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6" v-reveal.stagger>
          <NuxtLink to="/drone" class="discipline-card group">
            <div class="icon-wrap"><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-6.5L15 8" /></svg></div>
            <h3 class="card-title">{{ t('home.drone.title') }}</h3>
            <p class="card-desc">{{ t('home.drone.description') }}</p>
            <span class="card-link">{{ t('home.learnMore') }} →</span>
          </NuxtLink>

          <a href="https://3dps.space/" target="_blank" rel="noopener noreferrer" class="discipline-card group">
            <div class="icon-wrap"><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg></div>
            <h3 class="card-title">{{ t('home.printing.title') }}</h3>
            <p class="card-desc">{{ t('home.printing.description') }}</p>
            <span class="card-link">{{ t('home.exploreServices') }} →</span>
          </a>

          <NuxtLink to="/reel-web-projects" class="discipline-card group">
            <div class="icon-wrap"><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></div>
            <h3 class="card-title">{{ t('home.webDev.title') }}</h3>
            <p class="card-desc">{{ t('home.webDev.description') }}</p>
            <span class="card-link">{{ t('home.viewProjects') }} →</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ⑦ Current work strip -->
    <section class="relative py-16 bg-forest-100 border-y border-bone/5 overflow-hidden">
      <div class="container mx-auto px-6 relative z-10">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-full bg-moss animate-pulse shadow-[0_0_10px_rgba(125,156,107,0.7)]"></span>
            <div>
              <p class="eyebrow text-bone-dim">{{ t('home.currentlyAt') }}</p>
              <p class="font-condensed text-lg text-bone uppercase tracking-wide">DIU MarTech Solutions GmbH</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="tech in techStack" :key="tech" class="px-3 py-1 text-xs font-condensed uppercase tracking-wide rounded-full border border-bone/10 text-bone-dim hover:border-amber/40 hover:text-amber transition-all duration-300">{{ tech }}</span>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-5" v-reveal.stagger>
          <NuxtLink to="/reel-web-projects/suzuki-hit" class="work-card group">
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-condensed text-lg uppercase tracking-wide text-bone group-hover:text-amber transition-colors">Suzuki HIT</h4>
              <span class="tag">{{ t('home.current') }}</span>
            </div>
            <p class="text-sm text-bone-muted">{{ t('home.featuredHitDesc') }}</p>
          </NuxtLink>
          <NuxtLink to="/reel-web-projects/suzuki-ssbp-nxt" class="work-card group">
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-condensed text-lg uppercase tracking-wide text-bone group-hover:text-amber transition-colors">Suzuki SSBP-Nxt</h4>
              <span class="tag">{{ t('home.current') }}</span>
            </div>
            <p class="text-sm text-bone-muted">{{ t('home.featuredSsbpDesc') }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ⑧ CTA -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-amber/10 via-forest to-moss/10"></div>
      <div class="absolute inset-0 bg-topo opacity-30 pointer-events-none"></div>
      <div class="orb top-0 left-0 w-72 h-72 bg-amber/10"></div>
      <div class="orb bottom-0 right-0 w-72 h-72 bg-clay/10"></div>
      <div class="container mx-auto px-6 text-center relative z-10" v-reveal:scale>
        <p class="eyebrow mb-4">{{ t('cta.eyebrow') }}</p>
        <h2 class="display-xl text-5xl md:text-7xl text-bone mb-6 text-balance">
          <span class="gradient-text">{{ t('cta.title') }}</span>
        </h2>
        <p class="text-lg text-bone-muted mb-10 max-w-2xl mx-auto">{{ t('cta.description') }}</p>
        <NuxtLink to="/contact" class="btn-wild">{{ t('cta.button') }}</NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.discipline-card {
  @apply relative block p-7 rounded-2xl bg-forest-100/70 border border-bone/10 overflow-hidden transition-all duration-500 ease-wild;
}
.discipline-card:hover {
  @apply border-amber/40 -translate-y-1.5;
  box-shadow: 0 16px 40px -12px rgba(0,0,0,0.6), 0 0 30px rgba(217,138,61,0.08);
}
.icon-wrap {
  @apply w-14 h-14 rounded-xl bg-amber/10 text-amber flex items-center justify-center mb-5 transition-all duration-300;
}
.discipline-card:hover .icon-wrap {
  @apply bg-amber/20 scale-110 -rotate-6;
}
.card-title {
  font-family: 'Anton', sans-serif;
  @apply text-2xl uppercase text-bone mb-3 transition-colors duration-300;
}
.discipline-card:hover .card-title { @apply text-amber; }
.card-desc { @apply text-sm text-bone-muted leading-relaxed mb-4; }
.card-link {
  font-family: 'Oswald', sans-serif;
  @apply uppercase tracking-widest2 text-xs text-moss-light opacity-0 -translate-x-2 transition-all duration-300;
}
.discipline-card:hover .card-link { @apply opacity-100 translate-x-0; }

.work-card {
  @apply block p-6 rounded-2xl bg-forest-200/60 border border-bone/10 transition-all duration-300;
}
.work-card:hover {
  @apply border-amber/40 -translate-y-1;
}
.tag {
  font-family: 'Oswald', sans-serif;
  @apply text-[10px] uppercase tracking-widest2 px-2.5 py-0.5 rounded-full bg-moss/15 text-moss-light border border-moss/25;
}
</style>
