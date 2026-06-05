<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  apiCategory: string   // PocketBase category, e.g. 'nature'
  catKey: string        // i18n key, e.g. 'landscape'
  basePath: string      // e.g. '/photography/landscape-nature'
  label: string         // human label for fetch + alt fallback
  tagline: string       // hero subtitle
  seoDescription: string
}>();

const { t } = useI18n();
const { images, heroImage } = useGalleryImages(props.apiCategory, props.label);

const title = computed(() => t(`photoCategories.${props.catKey}`));
const openDetail = (id: string) => navigateTo(`${props.basePath}/${id}`);

useSeoMeta({
  title: () => `${title.value} Photography — Lasse Harm`,
  ogTitle: () => `${title.value} Photography — Lasse Harm`,
  description: () => props.seoDescription,
  ogDescription: () => props.seoDescription,
  ogImage: () => heroImage.value,
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <div>
    <hero :title="title" :description="tagline" :image="heroImage" eyebrow="Collection" />

    <!-- Intro -->
    <section class="relative py-24 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb top-0 right-1/4 w-80 h-80 bg-moss/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-3xl" v-reveal>
          <p class="eyebrow mb-4">{{ t('photography.aboutPhotography') }}</p>
          <h2 class="display-xl text-3xl md:text-5xl text-bone mb-6 text-balance">
            {{ t(`photography.categories.${catKey}.title`) }}
          </h2>
          <p class="text-lg text-bone-muted leading-relaxed mb-4">
            {{ t(`photography.categories.${catKey}.description`) }}
          </p>
          <p class="text-lg text-bone-muted leading-relaxed">
            {{ t('photography.about.p2') }}
          </p>
          <p class="eyebrow mt-8 text-amber/80">{{ images.length }} frames</p>
        </div>
      </div>
    </section>

    <!-- Masonry gallery -->
    <section class="relative pb-24 overflow-hidden">
      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="masonry-cols">
          <button
            v-for="(image, i) in images"
            :key="image.id"
            @click="openDetail(image.id)"
            class="masonry-cell group block w-full text-left"
            :style="{ transitionDelay: Math.min(i * 45, 360) + 'ms' }"
            v-reveal
          >
            <div class="relative overflow-hidden rounded-xl wild-border">
              <img
                :src="image.thumbnail"
                :alt="image.alt"
                loading="lazy"
                class="w-full block img-zoom"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-forest/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p class="font-condensed uppercase tracking-wide text-sm text-bone translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{{ image.alt }}</p>
              </div>
              <div class="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber/90 text-forest flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4" d="M7 17L17 7m0 0H7m10 0v10" /></svg>
              </div>
            </div>
          </button>
        </div>

        <div class="flex justify-center mt-16" v-reveal>
          <NuxtLink to="/photography" class="btn-wild-outline">{{ t('photography.backToCollections') }}</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.masonry-cols {
  columns: 1;
  column-gap: 1.25rem;
}
@media (min-width: 640px) { .masonry-cols { columns: 2; } }
@media (min-width: 1024px) { .masonry-cols { columns: 3; } }
@media (min-width: 1536px) { .masonry-cols { columns: 4; } }

.masonry-cell {
  break-inside: avoid;
  margin-bottom: 1.25rem;
}
</style>
