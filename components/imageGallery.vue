<script lang="ts" setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  category: String,
  useDetailPages: {
    type: Boolean,
    default: true
  }
});

const router = useRouter();
const { listUrl, fileUrl } = usePocketbase();

const PER_PAGE = 60;
const images = ref([]);
const page = ref(1);
const totalPages = ref(1);
const loadingMore = ref(false);
const loadError = ref(false);

const mapItems = (items) => items.map(item => ({
  id: item.id,
  thumbnail: fileUrl(item, item.image, 'thumb=300x0'),
  src: fileUrl(item, item.image),
  alt: item.alt,
  loading: true,
}));

const fetchPage = (p) => $fetch(listUrl('portfolio_images', {
  filter: `(category='${props.category}')`,
  page: p,
  perPage: PER_PAGE,
}));

// Server-rendered first page (good for SEO + no content flash).
const { data, error } = await useAsyncData(
  () => `gallery-${props.category}`,
  () => fetchPage(1),
  { watch: [() => props.category] },
);

const syncFromData = () => {
  images.value = data.value ? mapItems(data.value.items) : [];
  totalPages.value = data.value?.totalPages ?? 1;
  page.value = 1;
};
syncFromData();
watch(data, syncFromData);

const hasError = computed(() => !!error.value || loadError.value);
const canLoadMore = computed(() => page.value < totalPages.value);

const loadMore = async () => {
  if (loadingMore.value || !canLoadMore.value) return;
  loadingMore.value = true;
  loadError.value = false;
  try {
    const res = await fetchPage(page.value + 1);
    images.value.push(...mapItems(res.items));
    totalPages.value = res.totalPages;
    page.value += 1;
  } catch (e) {
    loadError.value = true;
  } finally {
    loadingMore.value = false;
  }
};

const handleImageLoad = (image) => {
  image.loading = false;
};

const handleImageClick = (image, index) => {
  if (props.useDetailPages) {
    let basePath = '';
    switch (props.category) {
      case 'wildlife': basePath = '/photography/wildlife/'; break;
      case 'nature': basePath = '/photography/landscape-nature/'; break;
      case 'people': basePath = '/photography/portraits-people/'; break;
      case 'abstract': basePath = '/photography/abstract-art/'; break;
      case 'weddings': basePath = '/photography/weddings/'; break;
      default: basePath = '/photography/';
    }
    router.push(`${basePath}${image.id}`);
  } else {
    openLightbox(image, index);
  }
};

const selectedImage = ref(null);
const selectedIndex = ref(0);
const masonryClass = ref("masonry-sm");

const updateMasonryClass = () => {
  masonryClass.value = window.innerWidth >= 768 ? "masonry-md" : "masonry-sm";
};

const navigate = (direction) => {
  const index = images.value.indexOf(selectedImage.value);
  const nextIndex = (index + direction + images.value.length) % images.value.length;
  selectedImage.value = images.value[nextIndex];
  selectedIndex.value = nextIndex;
};

const handleKeyup = (event) => {
  if (event.key === 'ArrowRight') navigate(1);
  else if (event.key === 'ArrowLeft') navigate(-1);
};

const openLightbox = (image, index) => {
  selectedImage.value = image;
  selectedIndex.value = index;
  document.body.classList.add('no-scroll');
};

const closeLightbox = () => {
  selectedImage.value = null;
  document.body.classList.remove('no-scroll');
};

onMounted(() => {
  if (process.client) {
    window.addEventListener('resize', updateMasonryClass);
    window.addEventListener('keyup', handleKeyup);
    updateMasonryClass();
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('resize', updateMasonryClass);
    window.removeEventListener('keyup', handleKeyup);
  }
});
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- decorative ambience -->
    <div class="absolute inset-0 bg-topo opacity-20 pointer-events-none z-0"></div>
    <div class="orb top-0 right-1/4 w-96 h-96 bg-moss/10 pointer-events-none z-0"></div>
    <div class="orb bottom-1/3 left-0 w-80 h-80 bg-amber/[0.07] pointer-events-none z-0"></div>

    <div class="relative z-10 container mx-auto px-6">
      <!-- masonry grid -->
      <div :class="masonryClass" v-reveal.stagger>
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="break-inside cursor-pointer mb-4 group"
          @click="handleImageClick(image, index)"
        >
          <div class="relative overflow-hidden rounded-2xl wild-border transition-all duration-500 ease-wild">
            <div v-if="image.loading" class="loading-container">
              <img v-lazy="image.thumbnail" :alt="image.alt" class="loading-image" @load="handleImageLoad(image)">
            </div>
            <img
              v-else
              v-lazy="image.thumbnail"
              :alt="image.alt"
              class="block w-full img-zoom"
              @load="handleImageLoad(image)"
            >

            <!-- caption + grading overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <!-- amber expand badge -->
            <div class="absolute top-3 right-3 w-9 h-9 rounded-full bg-forest/70 backdrop-blur-sm border border-amber/40 text-amber flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>

            <!-- caption -->
            <div
              v-if="image.alt"
              class="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
            >
              <p class="font-condensed uppercase tracking-wide text-sm text-bone leading-snug line-clamp-2">{{ image.alt }}</p>
            </div>
          </div>
        </div>
      </div>

      <p v-if="hasError && !images.length" class="text-center text-bone-muted py-16 font-condensed uppercase tracking-wide">
        Couldn't load images right now. Please try again later.
      </p>

      <div v-if="canLoadMore || (hasError && images.length)" class="flex justify-center mt-12" v-reveal>
        <button
          class="btn-wild-outline text-sm"
          :disabled="loadingMore"
          @click="loadMore"
        >
          {{ loadingMore ? 'Loading…' : (hasError ? 'Retry' : 'Load more') }}
        </button>
      </div>
    </div>
  </section>

  <teleport to="body">
    <transition name="lightbox-fade">
      <div v-if="selectedImage" class="lightbox" @click.self="closeLightbox">
        <!-- decorative ambience inside the backdrop -->
        <div class="orb top-0 left-1/4 w-[28rem] h-[28rem] bg-amber/10 pointer-events-none"></div>
        <div class="orb bottom-0 right-1/4 w-96 h-96 bg-moss/10 pointer-events-none"></div>

        <button class="lb-control close-button" aria-label="Close" @click="closeLightbox">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <button class="lb-control arrow left-arrow" aria-label="Previous" @click="navigate(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>

        <figure class="relative z-10 flex flex-col items-center max-w-[90vw] max-h-[88vh]">
          <img v-lazy="selectedImage.src" :alt="selectedImage.alt" class="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl shadow-black/70">
          <figcaption v-if="selectedImage.alt" class="mt-5 px-4 text-center">
            <span class="font-condensed uppercase tracking-widest2 text-sm text-bone-muted">{{ selectedImage.alt }}</span>
          </figcaption>
        </figure>

        <button class="lb-control arrow right-arrow" aria-label="Next" @click="navigate(1)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.break-inside {
  break-inside: avoid;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ---------- Lightbox ---------- */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(13, 15, 12, 0.92);
  backdrop-filter: blur(18px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 999;
  overflow: hidden;
}

/* Shared amber control styling */
.lb-control {
  background: rgba(22, 26, 20, 0.6);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(217, 138, 61, 0.35);
  border-radius: 9999px;
  color: rgba(217, 138, 61, 0.85);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  z-index: 20;
  transition: color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}
.lb-control:hover {
  color: #ecab63;
  border-color: rgba(217, 138, 61, 0.8);
  box-shadow: 0 0 26px rgba(217, 138, 61, 0.3);
  transform: scale(1.08);
}

.close-button {
  position: absolute;
  top: 24px;
  right: 24px;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.arrow:hover {
  transform: translateY(-50%) scale(1.08);
}
.left-arrow {
  left: 24px;
}
.right-arrow {
  right: 24px;
}

.no-scroll {
  overflow: hidden;
}

/* ---------- Lightbox transition ---------- */
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.35s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
.lightbox-fade-enter-active figure,
.lightbox-fade-leave-active figure {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease;
}
.lightbox-fade-enter-from figure,
.lightbox-fade-leave-to figure {
  transform: scale(0.94);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .lightbox-fade-enter-active,
  .lightbox-fade-leave-active,
  .lightbox-fade-enter-active figure,
  .lightbox-fade-leave-active figure {
    transition-duration: 0.001ms;
  }
}
</style>
