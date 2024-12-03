<script lang="ts" setup>

// Define the prop
const props = defineProps({
  category: String
});

const images = ref([]);
const loading = ref(true);

onMounted(async () => {
  // Use the category prop as a query parameter
  const response = await fetch(`https://pocket.lasseharm.space/api/collections/portfolio_images/records?filter=(category='${props.category}')&perPage=1000`);
  const data = await response.json();

  // Map the data to the images array
  images.value = data.items.map(item => ({
    id: item.id,
    thumbnail: `https://pocket.lasseharm.space/api/files/${item.collectionId}/${item.id}/${item.image}?thumb=300x0`,
    src: `https://pocket.lasseharm.space/api/files/${item.collectionId}/${item.id}/${item.image}`,
    alt: item.alt,
    loading: true,
  }));

  loading.value = false;
});
const handleImageLoad = (image) => {
  image.loading = false;
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
  if (event.key === 'ArrowRight') {
    navigate(1);
  } else if (event.key === 'ArrowLeft') {
    navigate(-1);
  }
};

const openLightbox = (image, index) => {
  selectedImage.value = image;
  selectedIndex.value = index;
  document.body.classList.add('no-scroll'); // Add class to disable scrolling
};

const closeLightbox = () => {
  selectedImage.value = null;
  document.body.classList.remove('no-scroll'); // Remove class to re-enable scrolling
};


onMounted(() => {
  if (process.client) {

    window.addEventListener('resize', updateMasonryClass);
    window.addEventListener('keyup', handleKeyup);
    updateMasonryClass(); // Initial update on client mount
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
    <div class="w-3/4 ">
      <div :class="masonryClass">
        <!-- Image grid -->
        <div
            v-for="(image, index) in images"
            :key="image.id"
            class="break-inside cursor-pointer mb-5 flex justify-center"
            @click="openLightbox(image, index)"
        >
          <div v-if="image.loading" class="loading-container">
            <img
                v-lazy="image.thumbnail"
                :alt="image.alt"
                class="loading-image"
                @load="handleImageLoad(image)"
            >
          </div>
          <img
              v-else
              v-lazy="image.thumbnail"
              :alt="image.alt"
              @load="handleImageLoad(image)"
          >
        </div>
      </div>
    </div>
  </div>

  <!-- Use teleport to render the lightbox at the root of the document -->
  <teleport to="body">
    <div v-if="selectedImage" class="lightbox">
      <!-- Close Button -->
      <button class="close-button" @click="closeLightbox">✖</button>
      <!-- Left arrow -->
      <button class="arrow left-arrow" @click="navigate(-1)">←</button>
      <!-- Image display -->
      <img v-lazy="selectedImage.src" :alt="selectedImage.alt" class="max-w-full max-h-full object-contain">
      <!-- Right arrow -->
      <button class="arrow right-arrow" @click="navigate(1)">→</button>
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
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 999; /* Set z-index to 999 */
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.arrow {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
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