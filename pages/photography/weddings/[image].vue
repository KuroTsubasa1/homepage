<template>
  <div class="container mx-auto px-4 max-w-5xl py-12 space-y-10">

    <!-- TITLE -->
    <div class="text-center animate-slide-up space-y-4">
      <h1 class="text-3xl md:text-5xl font-black">
        <span class="gradient-text">{{ imageData.alt || 'Wedding Photography' }}</span>
      </h1>
      <button
        class="btn-neon-outline text-sm font-pixel inline-flex"
        @click="$router.push('/photography/weddings')"
      >
        Back to Wedding Gallery
      </button>
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
      <ul class="gb-menu-list">
        <li v-if="imageData.alt" class="gb-menu-row">
          <span class="gb-menu-label">Title</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ imageData.alt }}</span>
        </li>
        <li v-if="imageData.location" class="gb-menu-row">
          <span class="gb-menu-label">Location</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ imageData.location }}</span>
        </li>
        <li v-if="imageData.date" class="gb-menu-row">
          <span class="gb-menu-label">Date</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ imageData.date }}</span>
        </li>
        <li v-if="imageData.camera" class="gb-menu-row">
          <span class="gb-menu-label">Camera</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ imageData.camera }}</span>
        </li>
        <li v-if="imageData.lens" class="gb-menu-row">
          <span class="gb-menu-label">Lens</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ imageData.lens }}</span>
        </li>
        <li v-if="imageData.settings" class="gb-menu-row">
          <span class="gb-menu-label">Settings</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ imageData.settings }}</span>
        </li>
        <li class="gb-menu-row">
          <span class="gb-menu-label">Category</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-chip">Weddings</span>
        </li>
      </ul>

      <p v-if="imageData.description" class="gb-row-desc text-gray-300 leading-relaxed mt-4">
        {{ imageData.description }}
      </p>
    </GbWindow>

    <!-- MORE WEDDINGS -->
    <GbWindow title="More Wedding Photography" class="animate-slide-up">
      <div class="more-images-container">
        <image-gallery category="weddings" :useDetailPages="false" class="fade-in"></image-gallery>
      </div>
    </GbWindow>

    <!-- NAVIGATION -->
    <div class="flex justify-between items-center gap-3 animate-slide-up">
      <button
        v-if="prevImage"
        @click="navigateToImage(prevImage.id)"
        class="btn-neon-outline text-sm font-pixel"
      >
        ← Previous Image
      </button>
      <div v-else></div>

      <button
        @click="$router.push('/photography/weddings')"
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
const navigateToImage = (id) => router.push(`/photography/weddings/${id}`);

// SSR fetch + SEO meta + prev/next handled by the shared composable.
const { imageData, prevImage, nextImage } = useGalleryDetail('weddings', 'Wedding Photography');
</script>

<style scoped>
.gb-menu-label {
  @apply font-pixel uppercase text-xs;
}
.gb-row-desc {
  font-family: 'VT323', monospace;
  font-size: 1.05rem;
}
.gb-menu-value {
  font-family: 'VT323', monospace;
  font-size: 1.05rem;
  color: rgb(var(--c-ink));
  text-align: right;
  white-space: normal;
  flex-shrink: 1;
  min-width: 0;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 2s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
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
