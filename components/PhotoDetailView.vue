<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  apiCategory: string   // PocketBase category
  catKey: string        // i18n key for photoCategories
  basePath: string      // e.g. '/photography/wildlife'
  label: string         // human label
  showMore?: boolean    // render "more from this collection" gallery
}>();

const { t } = useI18n();
const router = useRouter();
const { imageData, prevImage, nextImage } = useGalleryDetail(props.apiCategory, props.label);

const goto = (id: string) => router.push(`${props.basePath}/${id}`);

const meta = computed(() => ([
  { key: 'location', label: 'Location', value: imageData.value.location },
  { key: 'date', label: 'Captured', value: imageData.value.date },
  { key: 'camera', label: 'Camera', value: imageData.value.camera },
  { key: 'lens', label: 'Lens', value: imageData.value.lens },
  { key: 'settings', label: 'Settings', value: imageData.value.settings },
].filter(r => r.value)));
</script>

<template>
  <div>
    <!-- Page header (sits below the fixed global nav — pt clears it) -->
    <header class="relative z-10 border-b border-amber/10 bg-forest/60 pt-24">
      <div class="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div class="min-w-0">
          <p class="eyebrow text-bone-dim text-[10px]">{{ t(`photoCategories.${catKey}`) }}</p>
          <h1 class="font-condensed uppercase tracking-wide text-lg text-bone truncate">{{ imageData.alt || label }}</h1>
        </div>
        <NuxtLink :to="basePath" class="btn-wild-outline !px-5 !py-2 text-xs shrink-0">
          {{ t('photography.backToCollections') }}
        </NuxtLink>
      </div>
    </header>

    <!-- Hero image, cinematic frame -->
    <section class="relative pt-14 pb-20 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-20 pointer-events-none"></div>
      <div class="orb top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-80 bg-amber/8"></div>

      <div class="container mx-auto px-6 relative z-10">
        <figure class="max-w-5xl mx-auto" v-reveal:scale>
          <div class="relative rounded-2xl overflow-hidden wild-border shadow-2xl shadow-black/60">
            <img v-if="imageData.src" :src="imageData.src" :alt="imageData.alt" class="w-full block" />
          </div>
          <figcaption v-if="imageData.alt" class="text-center mt-6">
            <h2 class="font-display text-3xl md:text-5xl uppercase text-bone">{{ imageData.alt }}</h2>
            <p v-if="imageData.description" class="text-bone-muted mt-3 max-w-2xl mx-auto leading-relaxed">{{ imageData.description }}</p>
          </figcaption>
        </figure>

        <!-- EXIF-style metadata -->
        <div v-if="meta.length" class="max-w-3xl mx-auto mt-12 panel wild-border p-6 md:p-8" v-reveal>
          <p class="eyebrow text-amber/90 mb-5">Frame Details</p>
          <dl class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
            <div v-for="row in meta" :key="row.key">
              <dt class="eyebrow text-[10px] text-bone-dim mb-1">{{ row.label }}</dt>
              <dd class="text-bone font-condensed uppercase tracking-wide text-sm">{{ row.value }}</dd>
            </div>
          </dl>
        </div>

        <!-- Prev / next -->
        <div class="max-w-5xl mx-auto mt-12 flex items-stretch justify-between gap-4" v-reveal>
          <button
            v-if="prevImage"
            @click="goto(prevImage.id)"
            class="prevnext group"
          >
            <span class="thumb"><img v-lazy="prevImage.thumbnail" :alt="prevImage.alt" /></span>
            <span class="text-left">
              <span class="eyebrow text-[10px] text-bone-dim block">← {{ t('common.previous') }}</span>
              <span class="font-condensed uppercase text-sm text-bone group-hover:text-amber transition-colors truncate block max-w-[10rem]">{{ prevImage.alt }}</span>
            </span>
          </button>
          <div v-else></div>

          <button
            v-if="nextImage"
            @click="goto(nextImage.id)"
            class="prevnext group flex-row-reverse text-right"
          >
            <span class="thumb"><img v-lazy="nextImage.thumbnail" :alt="nextImage.alt" /></span>
            <span class="text-right">
              <span class="eyebrow text-[10px] text-bone-dim block">{{ t('common.next') }} →</span>
              <span class="font-condensed uppercase text-sm text-bone group-hover:text-amber transition-colors truncate block max-w-[10rem]">{{ nextImage.alt }}</span>
            </span>
          </button>
          <div v-else></div>
        </div>
      </div>
    </section>

    <!-- More from this collection -->
    <section v-if="showMore" class="relative py-20 bg-forest-100 overflow-hidden border-t border-bone/5">
      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <section-heading :eyebrow="t(`photoCategories.${catKey}`)" :title="t('photography.gallery')" />
        <image-gallery :category="apiCategory" :useDetailPages="true" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.prevnext {
  @apply flex items-center gap-3 p-2 pr-4 rounded-full bg-forest-100/70 border border-bone/10 transition-all duration-300;
}
.prevnext:hover { @apply border-amber/40 -translate-y-0.5; }
.thumb {
  @apply w-14 h-14 rounded-full overflow-hidden border border-amber/30 shrink-0;
}
.thumb img { @apply w-full h-full object-cover; }
</style>
