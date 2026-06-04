<template>
  <div class="container mx-auto px-4 max-w-5xl py-12 space-y-10">

    <!-- TITLE PLAQUE -->
    <div class="gb-titlecard animate-slide-up">
      <h1 class="text-3xl md:text-5xl font-black gradient-text mb-3">{{ imageData.alt || 'Landscape & Nature Photography' }}</h1>
      <p class="pixel-label text-lcd-dim">LANDSCAPE &amp; NATURE</p>
    </div>

    <!-- PHOTO -->
    <div v-if="imageData.src" class="cartridge animate-slide-up">
      <img
        :src="imageData.src"
        :alt="imageData.alt"
        class="w-full"
      />
    </div>

    <!-- DATA -->
    <GbWindow title="DATA" class="animate-slide-up">
      <p class="pixel-label text-neon-green mb-4">▸ IMAGE DETAILS</p>
      <dl class="gb-data">
        <template v-if="imageData.alt">
          <dt class="pixel-label text-neon-green">Title</dt>
          <dd class="text-gray-300">{{ imageData.alt }}</dd>
        </template>
        <template v-if="imageData.description">
          <dt class="pixel-label text-neon-green">Description</dt>
          <dd class="text-gray-300">{{ imageData.description }}</dd>
        </template>
        <template v-if="imageData.location">
          <dt class="pixel-label text-neon-green">Location</dt>
          <dd class="text-gray-300">{{ imageData.location }}</dd>
        </template>
        <template v-if="imageData.date">
          <dt class="pixel-label text-neon-green">Date</dt>
          <dd class="text-gray-300">{{ imageData.date }}</dd>
        </template>
        <template v-if="imageData.camera">
          <dt class="pixel-label text-neon-green">Camera</dt>
          <dd class="text-gray-300">{{ imageData.camera }}</dd>
        </template>
        <template v-if="imageData.lens">
          <dt class="pixel-label text-neon-green">Lens</dt>
          <dd class="text-gray-300">{{ imageData.lens }}</dd>
        </template>
        <template v-if="imageData.settings">
          <dt class="pixel-label text-neon-green">Settings</dt>
          <dd class="text-gray-300">{{ imageData.settings }}</dd>
        </template>
        <dt class="pixel-label text-neon-green">Category</dt>
        <dd class="text-gray-300">Landscape &amp; Nature</dd>
      </dl>
    </GbWindow>

    <!-- MORE -->
    <GbWindow title="More Landscape &amp; Nature Photography" class="animate-slide-up">
      <div class="more-images-container">
        <image-gallery category="nature" :useDetailPages="false" class="fade-in"></image-gallery>
      </div>
    </GbWindow>

    <!-- NAVIGATION -->
    <div class="flex flex-wrap justify-between items-center gap-3 animate-slide-up">
      <button
        v-if="prevImage"
        @click="navigateToImage(prevImage.id)"
        class="btn-neon-outline text-sm font-pixel"
      >
        ← Previous Image
      </button>
      <div v-else></div>

      <button
        @click="$router.push('/photography/landscape-nature')"
        class="btn-neon-outline text-sm font-pixel"
      >
        Back to Gallery
      </button>

      <button
        v-if="nextImage"
        @click="navigateToImage(nextImage.id)"
        class="btn-neon-outline text-sm font-pixel"
      >
        Next Image →
      </button>
      <div v-else></div>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const navigateToImage = (id) => router.push(`/photography/landscape-nature/${id}`);

// SSR fetch + SEO meta + prev/next handled by the shared composable.
const { imageData, prevImage, nextImage } = useGalleryDetail('nature', 'Landscape & Nature Photography');
</script>

<style scoped>
.fade-in {
  opacity: 0;
  animation: fadeIn 2s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* DATA window: pixel-font labels, readable VT323 values */
.gb-data {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.5rem 1rem;
  align-items: baseline;
}
.gb-data dt {
  white-space: nowrap;
}
.gb-data dd {
  margin: 0;
}
@media (max-width: 640px) {
  .gb-data {
    grid-template-columns: 1fr;
    gap: 0.15rem 0;
  }
  .gb-data dd {
    margin-bottom: 0.5rem;
  }
}

.more-images-container {
  /* Hide the current image from the gallery */
  :deep(.masonry-sm > div),
  :deep(.masonry-md > div) {
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  :deep(.masonry-sm > div:hover),
  :deep(.masonry-md > div:hover) {
    opacity: 1;
  }
}
</style>
