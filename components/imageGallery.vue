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
  <div class="flex justify-center">
    <div class="w-3/4">
      <div :class="masonryClass">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="break-inside cursor-pointer mb-5 flex justify-center group"
          @click="handleImageClick(image, index)"
        >
          <div class="cartridge relative overflow-hidden rounded-xl border border-white/10 transition-all duration-300 group-hover:border-neon-green/40 group-hover:shadow-[0_0_20px_rgba(155,188,15,0.18)]">
            <div v-if="image.loading" class="loading-container">
              <img v-lazy="image.thumbnail" :alt="image.alt" class="loading-image" @load="handleImageLoad(image)">
            </div>
            <img
              v-else
              v-lazy="image.thumbnail"
              :alt="image.alt"
              class="transition-transform duration-500 group-hover:scale-105"
              @load="handleImageLoad(image)"
            >
          </div>
        </div>
      </div>

      <p v-if="hasError && !images.length" class="text-center text-gray-400 py-12">
        Couldn't load images right now. Please try again later.
      </p>

      <div v-if="canLoadMore || (hasError && images.length)" class="flex justify-center mt-8">
        <button
          class="btn-neon-outline text-sm"
          :disabled="loadingMore"
          @click="loadMore"
        >
          {{ loadingMore ? 'Loading…' : (hasError ? 'Retry' : 'Load more') }}
        </button>
      </div>
    </div>
  </div>

  <teleport to="body">
    <div v-if="selectedImage" class="lightbox" @click.self="closeLightbox">
      <button class="close-button" @click="closeLightbox">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <button class="arrow left-arrow" @click="navigate(-1)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <img v-lazy="selectedImage.src" :alt="selectedImage.alt" class="max-w-full max-h-full object-contain rounded-lg">
      <button class="arrow right-arrow" @click="navigate(1)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  </teleport>
</template>

<style scoped>
.break-inside {
  break-inside: avoid;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 999;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: color 0.3s;
}
.close-button:hover {
  color: rgb(var(--c-green-2));
}

.arrow {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.3s;
}
.arrow:hover {
  color: rgb(var(--c-green-2));
}

.left-arrow {
  position: absolute;
  left: 20px;
}

.right-arrow {
  position: absolute;
  right: 20px;
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

.no-scroll {
  overflow: hidden;
}
</style>
