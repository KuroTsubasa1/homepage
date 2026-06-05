<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { listUrl, fileUrl } = usePocketbase();

useSeoMeta({
  title: 'Photography Portfolio | Lasse Harm | Professional Photographer',
  ogTitle: 'Photography Portfolio | Lasse Harm | Professional Photographer',
  description: 'Photography by Lasse Harm — wildlife, landscapes, portraits, abstract art, and weddings. Mostly a hobby, always a passion.',
  ogDescription: 'Photography by Lasse Harm — wildlife, landscapes, portraits, abstract art, and weddings. Mostly a hobby, always a passion.',
  ogImage: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
  twitterCard: 'summary_large_image',
  keywords: 'photography, Lasse Harm, wildlife, landscape, portrait, wedding photography, Germany',
});

const photographyCategories = ref([
  {
    i18nKey: 'wildlife',
    path: '/photography/wildlife',
    apiCategory: 'wildlife',
    image: '',
    icon: 'cat',
    featured: true
  },
  {
    i18nKey: 'landscape',
    path: '/photography/landscape-nature',
    apiCategory: 'nature',
    image: '',
    icon: 'mountain',
    featured: true
  },
  {
    i18nKey: 'portraits',
    path: '/photography/portraits-people',
    apiCategory: 'people',
    image: '',
    icon: 'user',
    featured: false
  },
  {
    i18nKey: 'abstract',
    path: '/photography/abstract-art',
    apiCategory: 'abstract',
    image: '',
    icon: 'palette',
    featured: false
  },
  {
    i18nKey: 'weddings',
    path: '/photography/weddings',
    apiCategory: 'weddings',
    image: '',
    icon: 'heart',
    featured: true
  },
]);

// Fetch a cover image for each category from PocketBase, server-side and in parallel.
const { data: covers } = await useAsyncData('photography-covers', async () => {
  const results = await Promise.all(
    photographyCategories.value.map(async (cat) => {
      try {
        const data: any = await $fetch(listUrl('portfolio_images', {
          filter: `(category='${cat.apiCategory}')`,
          perPage: 1,
        }));
        const item = data.items?.[0];
        return item
          ? { key: cat.apiCategory, i18nKey: cat.i18nKey, src: fileUrl(item, item.image, 'thumb=960x0') }
          : null;
      } catch (e) {
        return null;
      }
    }),
  );
  return results.filter(Boolean);
}, { default: () => [] });

// Apply the fetched cover to each category tile.
watchEffect(() => {
  for (const c of covers.value) {
    const cat = photographyCategories.value.find(x => x.apiCategory === c.key);
    if (cat) cat.image = c.src;
  }
});

const introImages = computed(() =>
  covers.value.slice(0, 4).map(c => ({
    src: c.src,
    alt: t(`photography.categories.${c.i18nKey}.title`),
  })),
);
</script>

<template>
  <div>
    <!-- ① Cinematic hero — Ken Burns intro images + giant Anton title -->
    <section class="relative min-h-[82vh] md:min-h-[92vh] overflow-hidden bg-forest flex items-end">
      <!-- Cross-fading Ken Burns slides -->
      <div class="absolute inset-0">
        <div
          v-for="(image, index) in introImages"
          :key="index"
          class="hero-slide absolute inset-0 bg-cover bg-center opacity-0"
          :style="{ backgroundImage: `url(${image.src})`, animationDelay: `${index * 5}s` }"
        ></div>
        <!-- fallback canvas when no covers loaded -->
        <div v-if="!introImages.length" class="absolute inset-0 bg-gradient-to-br from-forest-200 to-forest"></div>
      </div>

      <!-- Cinematic grading -->
      <div class="absolute inset-0 vignette pointer-events-none"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-forest/20 pointer-events-none"></div>
      <div class="absolute inset-0 bg-topo opacity-20 pointer-events-none"></div>
      <div class="orb top-24 left-10 w-96 h-96 bg-amber/10 animate-drift pointer-events-none"></div>
      <div class="orb bottom-0 right-1/4 w-[28rem] h-64 bg-moss/10 animate-drift-slow pointer-events-none"></div>

      <!-- Content -->
      <div class="relative z-20 container mx-auto px-6 pb-24 pt-36">
        <div class="max-w-4xl" v-reveal>
          <p class="eyebrow mb-5 flex items-center gap-3">
            <span class="inline-block w-10 h-px bg-amber"></span>
            {{ t('photography.hero.subtitle') }}
          </p>
          <h1 class="display-xl text-bone text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.92] mb-8">
            {{ t('photography.hero.titlePrefix') }}
            <span class="gradient-text-anim block">{{ t('photography.hero.titleHighlight') }}</span>
          </h1>
          <a href="#collections" class="btn-wild">
            {{ t('photography.hero.browse') }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </a>
        </div>
      </div>

      <!-- Scroll cue -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2">
        <span class="eyebrow text-bone-dim text-[10px]">Scroll</span>
        <span class="w-px h-12 bg-gradient-to-b from-amber/80 to-transparent animate-bob"></span>
      </div>
    </section>

    <!-- ② Species marquee -->
    <species-marquee />

    <!-- ③ Intro — parallax collage + editorial copy -->
    <section class="relative py-28 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb top-0 right-0 w-96 h-96 bg-moss/10 pointer-events-none"></div>
      <div class="orb bottom-10 left-0 w-80 h-80 bg-clay/10 pointer-events-none"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div v-reveal:left>
            <p class="eyebrow mb-5">{{ t('photography.collections.subtitle') }}</p>
            <h2 class="display-xl text-4xl md:text-6xl text-bone mb-7 text-balance">
              {{ t('photography.about.title') }}
            </h2>
            <div class="section-divider !mx-0 !mb-7"></div>
            <p class="text-lg text-bone-muted leading-relaxed mb-5">{{ t('photography.about.p1') }}</p>
            <p class="text-lg text-bone-muted leading-relaxed mb-8">{{ t('photography.about.p2') }}</p>
            <NuxtLink to="/about" class="btn-ghost-wild">
              {{ t('photography.about.learnMore') }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </NuxtLink>
          </div>

          <!-- parallax photo collage -->
          <div v-reveal:right class="relative grid grid-cols-2 gap-5 h-[540px]">
            <div class="flex flex-col gap-5">
              <div v-parallax="-0.05" class="rounded-2xl overflow-hidden wild-border group h-72">
                <img v-if="introImages[0]" :src="introImages[0].src" :alt="introImages[0].alt" class="w-full h-full object-cover img-zoom" />
                <div v-else class="w-full h-full bg-gradient-to-br from-forest-200 to-forest-300"></div>
              </div>
              <div v-parallax="0.08" class="rounded-2xl overflow-hidden wild-border group h-52">
                <img v-if="introImages[1]" :src="introImages[1].src" :alt="introImages[1].alt" class="w-full h-full object-cover img-zoom" />
                <div v-else class="w-full h-full bg-gradient-to-br from-forest-200 to-forest-300"></div>
              </div>
            </div>
            <div class="flex flex-col gap-5 pt-12">
              <div v-parallax="0.1" class="rounded-2xl overflow-hidden wild-border group h-52">
                <img v-if="introImages[2]" :src="introImages[2].src" :alt="introImages[2].alt" class="w-full h-full object-cover img-zoom" />
                <div v-else class="w-full h-full bg-gradient-to-br from-forest-200 to-forest-300"></div>
              </div>
              <div v-parallax="-0.07" class="rounded-2xl overflow-hidden wild-border group h-72">
                <img v-if="introImages[3]" :src="introImages[3].src" :alt="introImages[3].alt" class="w-full h-full object-cover img-zoom" />
                <div v-else class="w-full h-full bg-gradient-to-br from-forest-200 to-forest-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ④ Collections grid — asymmetric, big featured first tile -->
    <section id="collections" class="relative py-28 bg-forest-100 overflow-hidden scroll-mt-24">
      <div class="absolute inset-0 bg-grid opacity-50 pointer-events-none"></div>
      <div class="orb top-20 right-1/4 w-96 h-96 bg-amber/10 pointer-events-none"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading
          :eyebrow="t('photography.hero.subtitle')"
          :title="t('photography.collections.title')"
          :subtitle="t('photography.collections.subtitle')"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" v-reveal.stagger>
          <NuxtLink
            v-for="(category, i) in photographyCategories"
            :key="category.i18nKey"
            :to="category.path"
            v-tilt="6"
            :class="['group relative overflow-hidden rounded-2xl wild-border block',
                     (i === 0) ? 'sm:col-span-2 lg:row-span-2 h-72 lg:h-[544px]' : 'h-72']"
          >
            <img
              v-if="category.image"
              :src="category.image"
              :alt="t(`photography.categories.${category.i18nKey}.title`)"
              class="absolute inset-0 w-full h-full object-cover img-zoom"
            />
            <div v-else class="absolute inset-0 bg-gradient-to-br from-forest-200 to-forest-300"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <span class="eyebrow text-amber">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 :class="['font-display uppercase text-bone mt-1 group-hover:text-amber transition-colors duration-300',
                           (i === 0) ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl']">
                {{ t(`photography.categories.${category.i18nKey}.title`) }}
              </h3>
              <p class="text-sm text-bone-muted mt-1 max-h-0 opacity-0 group-hover:max-h-28 group-hover:opacity-100 overflow-hidden transition-all duration-500">
                {{ t(`photography.categories.${category.i18nKey}.description`) }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ⑤ Wedding feature — the one bookable service -->
    <section class="relative py-28 overflow-hidden">
      <div
        class="absolute inset-0 opacity-[0.07] pointer-events-none bg-cover bg-center"
        :style="photographyCategories[4]?.image ? { backgroundImage: `url(${photographyCategories[4].image})` } : {}"
      ></div>
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb top-10 right-20 w-96 h-96 bg-clay/10 pointer-events-none"></div>
      <div class="orb bottom-10 left-20 w-80 h-80 bg-amber/10 pointer-events-none"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading
          :eyebrow="t('photography.weddingSection.seeGallery')"
          :title="t('photography.weddingSection.title')"
          :subtitle="t('photography.weddingSection.subtitle')"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14" v-reveal.stagger>
          <div v-tilt="4" class="wedding-feature panel rounded-2xl p-8 text-center">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="font-display text-2xl uppercase text-bone mb-3">{{ t('photography.weddingSection.features.engagement.title') }}</h3>
            <p class="text-bone-muted leading-relaxed">{{ t('photography.weddingSection.features.engagement.description') }}</p>
          </div>

          <div v-tilt="4" class="wedding-feature panel rounded-2xl p-8 text-center">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="font-display text-2xl uppercase text-bone mb-3">{{ t('photography.weddingSection.features.fullDay.title') }}</h3>
            <p class="text-bone-muted leading-relaxed">{{ t('photography.weddingSection.features.fullDay.description') }}</p>
          </div>

          <div v-tilt="4" class="wedding-feature panel rounded-2xl p-8 text-center">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="font-display text-2xl uppercase text-bone mb-3">{{ t('photography.weddingSection.features.albums.title') }}</h3>
            <p class="text-bone-muted leading-relaxed">{{ t('photography.weddingSection.features.albums.description') }}</p>
          </div>
        </div>

        <div class="text-center" v-reveal>
          <NuxtLink to="/photography/weddings" class="btn-wild-outline">
            {{ t('photography.weddingSection.seeGallery') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ⑥ Closing CTA -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-amber/10 via-forest to-moss/10"></div>
      <div class="absolute inset-0 bg-topo opacity-30 pointer-events-none"></div>
      <div class="orb top-0 left-0 w-72 h-72 bg-amber/10 pointer-events-none"></div>
      <div class="orb bottom-0 right-0 w-72 h-72 bg-clay/10 pointer-events-none"></div>
      <div class="container mx-auto px-6 text-center relative z-10" v-reveal:scale>
        <p class="eyebrow mb-4">{{ t('photography.hero.titleHighlight') }}</p>
        <h2 class="display-xl text-5xl md:text-7xl text-bone mb-6 text-balance">
          <span class="gradient-text">{{ t('photography.ctaBlock.title') }}</span>
        </h2>
        <p class="text-lg text-bone-muted mb-10 max-w-2xl mx-auto">{{ t('photography.ctaBlock.subtitle') }}</p>
        <NuxtLink to="/contact" class="btn-wild">{{ t('photography.ctaBlock.button') }}</NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Cross-fading Ken Burns hero slides */
.hero-slide {
  animation: heroSlideFade 20s infinite;
}
.hero-slide:nth-child(1) { animation-delay: 0s; }
.hero-slide:nth-child(2) { animation-delay: 5s; }
.hero-slide:nth-child(3) { animation-delay: 10s; }
.hero-slide:nth-child(4) { animation-delay: 15s; }

@keyframes heroSlideFade {
  0%, 15%, 100% { opacity: 0; transform: scale(1.05); }
  20%, 35% { opacity: 1; transform: scale(1.12); }
}

.wedding-feature {
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
}
.wedding-feature:hover {
  border-color: rgba(217, 138, 61, 0.4);
  box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(217, 138, 61, 0.1);
}
.feature-icon {
  @apply w-16 h-16 rounded-full bg-amber/10 border border-amber/30 text-amber flex items-center justify-center mx-auto mb-5 transition-all duration-300;
}
.wedding-feature:hover .feature-icon {
  @apply bg-amber/20 scale-110;
}

@media (prefers-reduced-motion: reduce) {
  .hero-slide {
    animation: none;
  }
  .hero-slide:first-child {
    opacity: 1;
  }
}
</style>
