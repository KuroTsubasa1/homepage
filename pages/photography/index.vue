<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { listUrl, fileUrl } = usePocketbase();
const { sfx } = useGameboy();

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
    <!-- TITLE SCREEN -->
    <section class="hero relative overflow-hidden">
      <div class="hero-slider absolute inset-0">
        <div v-for="(image, index) in introImages" :key="index" class="hero-slide absolute inset-0 opacity-0"
             :style="{ backgroundImage: `url(${image.src})`, animationDelay: `${index * 5}s` }">
          <div class="absolute inset-0 bg-black/60"></div>
        </div>
      </div>
      <div class="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
      <div class="container mx-auto px-4 h-full flex items-center relative z-10">
        <div class="gb-titlecard animate-slide-up">
          <h1 class="text-4xl md:text-6xl font-black mb-5 uppercase">
            {{ t('photography.hero.titlePrefix') }} <span class="gradient-text">{{ t('photography.hero.titleHighlight') }}</span>
          </h1>
          <p class="text-lg text-gray-300 mb-6">{{ t('photography.hero.subtitle') }}</p>
          <a href="#categories" class="btn-neon font-pixel animate-glow-pulse inline-block">{{ t('photography.hero.browse') }}</a>
          <p class="gb-prompt animate-blink mt-6">PRESS START</p>
        </div>
      </div>
    </section>

    <!-- MENU SCREENS -->
    <div class="container mx-auto px-4 max-w-5xl py-12 space-y-10">

      <!-- INTEL — about photography -->
      <GbWindow :title="t('photography.about.title')" class="animate-slide-up">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div class="space-y-4 text-gray-300 leading-relaxed">
            <p class="pixel-label text-neon-green mb-1">&#9656; INTEL</p>
            <p>{{ t('photography.about.p1') }}</p>
            <p>{{ t('photography.about.p2') }}</p>
            <a href="/about" class="inline-flex items-center text-neon-green font-semibold hover:drop-shadow-[0_0_8px_rgba(155,188,15,0.5)] transition-all">
              <span>{{ t('photography.about.learnMore') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              <div class="cartridge overflow-hidden transform translate-y-8">
                <img v-if="introImages[0]" :src="introImages[0].src" :alt="introImages[0].alt" loading="lazy"
                     class="w-full h-64 object-cover hover:scale-110 transition-transform duration-700">
                <div v-else class="w-full h-64 bg-dark-200"></div>
              </div>
              <div class="cartridge overflow-hidden">
                <img v-if="introImages[1]" :src="introImages[1].src" :alt="introImages[1].alt" loading="lazy"
                     class="w-full h-48 object-cover hover:scale-110 transition-transform duration-700">
                <div v-else class="w-full h-48 bg-dark-200"></div>
              </div>
            </div>
            <div class="space-y-4">
              <div class="cartridge overflow-hidden">
                <img v-if="introImages[2]" :src="introImages[2].src" :alt="introImages[2].alt" loading="lazy"
                     class="w-full h-48 object-cover hover:scale-110 transition-transform duration-700">
                <div v-else class="w-full h-48 bg-dark-200"></div>
              </div>
              <div class="cartridge overflow-hidden transform translate-y-8">
                <img v-if="introImages[3]" :src="introImages[3].src" :alt="introImages[3].alt" loading="lazy"
                     class="w-full h-64 object-cover hover:scale-110 transition-transform duration-700">
                <div v-else class="w-full h-64 bg-dark-200"></div>
              </div>
            </div>
          </div>
        </div>
      </GbWindow>

      <!-- ALBUM — category select grid -->
      <GbWindow id="categories" :title="t('photography.collections.title')" class="animate-slide-up">
        <p class="gb-row-desc text-gray-400 mb-6">{{ t('photography.collections.subtitle') }}</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a v-for="category in photographyCategories"
             :key="category.i18nKey"
             :href="category.path"
             class="gb-tile group block"
             @mouseenter="sfx.hover()" @click="sfx.select()">
            <div class="relative">
              <img v-if="category.image" :src="category.image" :alt="t(`photography.categories.${category.i18nKey}.title`)" loading="lazy" class="w-full h-36 sm:h-40 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div v-else class="w-full h-36 sm:h-40 bg-dark-200 dither"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                <p class="text-gray-300 text-sm">{{ t(`photography.categories.${category.i18nKey}.description`) }}</p>
              </div>
            </div>
            <div class="gb-tile-label">{{ t(`photography.categories.${category.i18nKey}.title`) }}</div>
          </a>
        </div>
      </GbWindow>

      <!-- QUEST — wedding feature -->
      <GbWindow :title="t('photography.weddingSection.title')" accent="velvet" class="animate-slide-up">
        <p class="gb-row-desc text-gray-400 mb-6">{{ t('photography.weddingSection.subtitle') }}</p>

        <ul class="gb-menu-list mb-8">
          <li>
            <a href="/photography/weddings" class="gb-menu-row !items-start" @mouseenter="sfx.hover()" @click="sfx.select()">
              <span class="flex items-start gap-3 flex-1 min-w-0">
                <span class="w-10 h-10 flex items-center justify-center flex-shrink-0 text-neon-green">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                <span class="flex-1 min-w-0">
                  <span class="block">{{ t('photography.weddingSection.features.engagement.title') }}</span>
                  <span class="block mt-1 gb-row-desc">{{ t('photography.weddingSection.features.engagement.description') }}</span>
                </span>
              </span>
            </a>
          </li>
          <li>
            <a href="/photography/weddings" class="gb-menu-row !items-start" @mouseenter="sfx.hover()" @click="sfx.select()">
              <span class="flex items-start gap-3 flex-1 min-w-0">
                <span class="w-10 h-10 flex items-center justify-center flex-shrink-0 text-neon-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span class="flex-1 min-w-0">
                  <span class="block">{{ t('photography.weddingSection.features.fullDay.title') }}</span>
                  <span class="block mt-1 gb-row-desc">{{ t('photography.weddingSection.features.fullDay.description') }}</span>
                </span>
              </span>
            </a>
          </li>
          <li>
            <a href="/photography/weddings" class="gb-menu-row !items-start" @mouseenter="sfx.hover()" @click="sfx.select()">
              <span class="flex items-start gap-3 flex-1 min-w-0">
                <span class="w-10 h-10 flex items-center justify-center flex-shrink-0 text-neon-purple">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                <span class="flex-1 min-w-0">
                  <span class="block">{{ t('photography.weddingSection.features.albums.title') }}</span>
                  <span class="block mt-1 gb-row-desc">{{ t('photography.weddingSection.features.albums.description') }}</span>
                </span>
              </span>
            </a>
          </li>
        </ul>

        <div class="text-center">
          <a href="/photography/weddings" class="btn-neon inline-block">
            {{ t('photography.weddingSection.seeGallery') }}
          </a>
        </div>
      </GbWindow>

      <!-- CTA -->
      <GbWindow class="animate-slide-up">
        <div class="text-center py-2">
          <h2 class="text-2xl md:text-4xl font-black mb-4">
            <span class="gradient-text">{{ t('photography.ctaBlock.title') }}</span>
          </h2>
          <p class="text-gray-300 text-lg mb-7 max-w-2xl mx-auto">{{ t('photography.ctaBlock.subtitle') }}</p>
          <p class="gb-prompt animate-blink mb-5">NEW GAME?</p>
          <a href="/contact" class="btn-neon font-pixel animate-glow-pulse inline-block">
            {{ t('photography.ctaBlock.button') }}
          </a>
        </div>
      </GbWindow>

    </div>
  </div>
</template>

<style scoped>
/* Title-screen slider background */
.hero {
  min-height: calc(100vh - 13rem);
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  background-color: rgb(var(--c-bg));
}

.hero-slide {
  background-size: cover;
  background-position: center;
  animation: slideFade 20s infinite;
}

.hero-slide:nth-child(1) { animation-delay: 0s; }
.hero-slide:nth-child(2) { animation-delay: 5s; }
.hero-slide:nth-child(3) { animation-delay: 10s; }
.hero-slide:nth-child(4) { animation-delay: 15s; }

@keyframes slideFade {
  0%, 15%, 100% { opacity: 0; }
  20%, 35% { opacity: 1; }
}

/* Flavour text (readable VT323, not pixel font) */
.gb-row-desc {
  font-family: 'VT323', ui-monospace, monospace;
  font-size: 1.05rem;
  line-height: 1.3;
  letter-spacing: 0.01em;
  text-transform: none;
  color: rgb(var(--c-ink-2));
}
</style>
