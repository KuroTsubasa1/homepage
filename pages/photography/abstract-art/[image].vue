<template>
  <div class="container mx-auto px-4 max-w-5xl py-12 space-y-10">

    <!-- TITLE -->
    <div class="gb-titlecard animate-slide-up">
      <h1 class="text-3xl md:text-5xl font-black gradient-text">{{ imageData.alt || 'Abstract & Art Photography' }}</h1>
      <p class="pixel-label text-lcd-dim mt-2">ABSTRACT &amp; ART</p>
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
      <div class="gb-menu-list">
        <div v-if="imageData.alt" class="gb-data-row">
          <span class="gb-data-key">TITLE</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ imageData.alt }}</span>
        </div>
        <div v-if="imageData.description" class="gb-data-row">
          <span class="gb-data-key">DESCRIPTION</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ imageData.description }}</span>
        </div>
        <div v-if="imageData.location" class="gb-data-row">
          <span class="gb-data-key">LOCATION</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ imageData.location }}</span>
        </div>
        <div v-if="imageData.date" class="gb-data-row">
          <span class="gb-data-key">DATE</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ imageData.date }}</span>
        </div>
        <div v-if="imageData.camera" class="gb-data-row">
          <span class="gb-data-key">CAMERA</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ imageData.camera }}</span>
        </div>
        <div v-if="imageData.lens" class="gb-data-row">
          <span class="gb-data-key">LENS</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ imageData.lens }}</span>
        </div>
        <div v-if="imageData.settings" class="gb-data-row">
          <span class="gb-data-key">SETTINGS</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ imageData.settings }}</span>
        </div>
        <div class="gb-data-row">
          <span class="gb-data-key">CATEGORY</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value"><span class="gb-chip">Abstract &amp; Art</span></span>
        </div>
      </div>
    </GbWindow>

    <!-- ALBUM — more from this collection -->
    <GbWindow title="More Abstract &amp; Art Photography" class="fade-in">
      <div class="more-images-container">
        <image-gallery category="abstract" :useDetailPages="false" class="fade-in"></image-gallery>
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
        @click="$router.push('/photography/abstract-art')"
        class="btn-neon text-sm font-pixel"
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
const navigateToImage = (id) => router.push(`/photography/abstract-art/${id}`);

// SSR fetch + SEO meta + prev/next handled by the shared composable.
const { imageData, prevImage, nextImage } = useGalleryDetail('abstract', 'Abstract & Art Photography');
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

/* DATA rows: pixel label on the left, readable value on the right. */
.gb-data-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.35rem 0;
}

.gb-data-key {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6rem;
  white-space: nowrap;
  color: rgb(var(--c-green));
}

.gb-data-row .gb-menu-value {
  text-align: right;
  font-size: 1rem;
  line-height: 1.4;
  color: rgb(var(--c-ink));
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
