<script setup lang="ts">
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

const heroImage = 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=1920x1080';

// Workshop printers — labels live in the v-html copy; these drive the card layout.
const printers = [
  { name: 'Bambulab X1C', tag: 'CoreXY · AMS', body: 'workshop.p1', accent: 'moss' },
  { name: 'Bambulab P1S', tag: 'Enclosed', body: 'workshop.p2', accent: 'moss' },
  { name: 'Snapmaker U1', tag: 'Print · Laser · CNC', body: 'workshop.p3', accent: 'amber' },
  { name: 'Anycubic Kobra Max 3', tag: 'Large format', body: 'workshop.p4', accent: 'clay' },
];
</script>

<template>
  <div>
    <!-- ① Cinematic hero -->
    <section class="relative min-h-[82vh] flex items-end overflow-hidden bg-forest">
      <div
        class="absolute inset-0 bg-cover bg-center animate-ken-burns"
        :style="{ backgroundImage: `url('${heroImage}')` }"
      ></div>
      <div class="absolute inset-0 vignette pointer-events-none"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-forest/20 pointer-events-none"></div>
      <div class="absolute inset-0 bg-topo opacity-20 pointer-events-none"></div>
      <div class="orb bottom-0 left-1/4 w-[520px] h-44 bg-amber/10"></div>

      <div class="relative z-20 container mx-auto px-6 pb-20 pt-32">
        <div class="max-w-3xl" v-reveal>
          <p class="eyebrow mb-5 flex items-center gap-3">
            <span class="inline-block w-10 h-px bg-amber"></span>
            {{ t('printing.hero.title2') }}
          </p>
          <h1 class="display-xl text-bone text-6xl md:text-8xl lg:text-9xl leading-[0.9]">
            <span class="text-bone">{{ t('printing.hero.title1') }}</span>
            <span class="gradient-text block">{{ t('printing.hero.title2') }}</span>
          </h1>
          <p class="mt-6 text-lg md:text-xl text-bone-muted max-w-2xl leading-relaxed uppercase tracking-wide font-condensed">
            {{ t('printing.hero.subtitle') }}
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <a href="https://3dps.space/" target="_blank" rel="noopener noreferrer" class="btn-wild">{{ t('printing.hero.visit') }}</a>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2">
        <span class="w-px h-10 bg-gradient-to-b from-amber/70 to-transparent animate-bob"></span>
      </div>
    </section>

    <!-- ② Why I print — text left, parallax photo right -->
    <section class="relative py-28 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb top-0 right-0 w-96 h-96 bg-moss/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-14 items-center">
          <div v-reveal:left>
            <p class="eyebrow mb-5">{{ t('printing.hero.title2') }}</p>
            <h2 class="display-xl text-4xl md:text-6xl text-bone mb-7 text-balance">
              {{ t('printing.why.title') }}
            </h2>
            <div class="space-y-5 text-lg text-bone-muted leading-relaxed">
              <p>{{ t('printing.why.p1') }}</p>
              <p>{{ t('printing.why.p2') }}</p>
              <p v-html="t('printing.why.p3')"></p>
            </div>
          </div>

          <div v-reveal:right class="relative h-[460px] hidden lg:block">
            <div v-parallax="-0.06" class="absolute top-0 right-0 w-2/3 h-72 rounded-2xl overflow-hidden wild-border group" v-tilt="6">
              <img :src="heroImage" alt="" class="w-full h-full object-cover img-zoom" />
            </div>
            <div v-parallax="0.1" class="absolute bottom-0 left-0 w-2/3 h-72 rounded-2xl overflow-hidden wild-border group shadow-2xl shadow-black/50" v-tilt="6">
              <img :src="heroImage" alt="" class="w-full h-full object-cover img-zoom" />
              <div class="absolute inset-0 bg-gradient-to-tr from-forest/40 via-transparent to-amber/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ③ Designing in 3D — alternated, photo left -->
    <section class="relative py-28 bg-forest-100 overflow-hidden">
      <div class="absolute inset-0 bg-grid opacity-60 pointer-events-none"></div>
      <div class="orb bottom-0 left-0 w-96 h-96 bg-clay/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-14 items-center">
          <div v-reveal:left class="relative order-last lg:order-first">
            <div v-tilt="5" class="relative rounded-2xl overflow-hidden wild-border group">
              <img :src="heroImage" alt="" class="w-full h-[440px] object-cover img-zoom" />
              <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 flex gap-3" v-reveal.stagger>
                <span class="px-3 py-1 text-xs font-condensed uppercase tracking-widest2 rounded-full border border-clay/40 text-clay bg-forest/60">Blender</span>
                <span class="px-3 py-1 text-xs font-condensed uppercase tracking-widest2 rounded-full border border-amber/40 text-amber bg-forest/60">Plasticity</span>
              </div>
            </div>
          </div>

          <div v-reveal:right>
            <p class="eyebrow mb-5">CAD &amp; Modeling</p>
            <h2 class="display-xl text-4xl md:text-6xl text-bone mb-7 text-balance">
              {{ t('printing.cad.title') }}
            </h2>
            <div class="space-y-5 text-lg text-bone-muted leading-relaxed">
              <p v-html="t('printing.cad.p1')"></p>
              <p v-html="t('printing.cad.p2')"></p>
              <p>{{ t('printing.cad.p3') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ④ The workshop — printer cards -->
    <section class="relative py-28 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb top-1/4 right-1/4 w-96 h-96 bg-amber/10 animate-drift"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading eyebrow="The Fleet" :title="t('printing.workshop.title')" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" v-reveal.stagger>
          <div
            v-for="(p, i) in printers"
            :key="p.name"
            v-tilt="6"
            class="printer-card group"
          >
            <div class="flex items-start justify-between mb-4">
              <span class="font-display text-5xl leading-none text-bone/15 group-hover:text-amber/30 transition-colors duration-500">{{ String(i + 1).padStart(2, '0') }}</span>
              <span
                class="px-3 py-1 text-[10px] font-condensed uppercase tracking-widest2 rounded-full border"
                :class="{
                  'border-moss/30 text-moss-light bg-moss/10': p.accent === 'moss',
                  'border-amber/30 text-amber bg-amber/10': p.accent === 'amber',
                  'border-clay/30 text-clay bg-clay/10': p.accent === 'clay',
                }"
              >{{ p.tag }}</span>
            </div>
            <h3 class="font-display text-2xl md:text-3xl uppercase text-bone mb-3 group-hover:text-amber transition-colors duration-300">{{ p.name }}</h3>
            <p class="text-bone-muted leading-relaxed" v-html="t(`printing.${p.body}`)"></p>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑤ Multi-color — text right, ambient panel left -->
    <section class="relative py-28 bg-forest-100 overflow-hidden">
      <div class="absolute inset-0 bg-grid opacity-50 pointer-events-none"></div>
      <div class="orb top-0 left-1/4 w-96 h-96 bg-moss/10"></div>
      <div class="orb bottom-0 right-1/4 w-72 h-72 bg-clay/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-14 items-center">
          <div v-reveal:left>
            <p class="eyebrow mb-5">AMS · Up to 16 colors</p>
            <h2 class="display-xl text-4xl md:text-6xl text-bone mb-7 text-balance">
              {{ t('printing.multicolor.title') }}
            </h2>
            <div class="space-y-5 text-lg text-bone-muted leading-relaxed">
              <p>{{ t('printing.multicolor.p1') }}</p>
              <p>{{ t('printing.multicolor.p2') }}</p>
              <p>{{ t('printing.multicolor.p3') }}</p>
            </div>
          </div>

          <div v-reveal:right class="relative">
            <div v-tilt="4" class="panel rounded-2xl p-8 wild-border relative overflow-hidden">
              <div class="orb -top-10 -right-10 w-44 h-44 bg-amber/15 animate-breathe"></div>
              <div class="relative z-10 grid grid-cols-4 gap-3">
                <span
                  v-for="n in 16"
                  :key="n"
                  class="aspect-square rounded-lg animate-breathe"
                  :class="[
                    n % 4 === 1 ? 'bg-amber/70' : n % 4 === 2 ? 'bg-moss/70' : n % 4 === 3 ? 'bg-clay/70' : 'bg-bone/40',
                  ]"
                  :style="{ animationDelay: `${n * 90}ms` }"
                ></span>
              </div>
              <p class="relative z-10 mt-6 text-center font-condensed uppercase tracking-widest2 text-sm text-bone-dim">Automatic Material System</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑥ Prints showcase -->
    <section class="relative py-28 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-amber/5"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading eyebrow="From the build plate" :title="t('printing.prints.title')" />
        <div v-reveal>
          <project-grid category="3d"></project-grid>
        </div>
      </div>
    </section>

    <!-- ⑦ CTA -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-amber/10 via-forest to-moss/10"></div>
      <div class="absolute inset-0 bg-topo opacity-30 pointer-events-none"></div>
      <div class="orb top-0 left-0 w-72 h-72 bg-amber/10"></div>
      <div class="orb bottom-0 right-0 w-72 h-72 bg-clay/10"></div>
      <div class="container mx-auto px-6 text-center relative z-10" v-reveal:scale>
        <p class="eyebrow mb-4">{{ t('printing.hero.title2') }}</p>
        <h2 class="display-xl text-5xl md:text-7xl text-bone mb-6 text-balance">
          <span class="gradient-text">{{ t('printing.ctaBlock.title') }}</span>
        </h2>
        <p class="text-lg text-bone-muted mb-10 max-w-2xl mx-auto">{{ t('printing.ctaBlock.subtitle') }}</p>
        <a href="https://3dps.space/" target="_blank" rel="noopener noreferrer" class="btn-wild inline-block">{{ t('printing.hero.visit') }}</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.printer-card {
  @apply relative block p-7 rounded-2xl bg-forest-100/70 border border-bone/10 overflow-hidden transition-all duration-500 ease-wild;
}
.printer-card:hover {
  @apply border-amber/40 -translate-y-1.5;
  box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(217, 138, 61, 0.08);
}
</style>
