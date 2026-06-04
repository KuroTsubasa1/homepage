<template>
  <div class="container mx-auto px-4 max-w-5xl py-12 space-y-10">

    <!-- TITLE -->
    <div class="text-center animate-slide-up space-y-4">
      <h1 class="text-3xl md:text-5xl font-black">
        <span class="gradient-text">{{ imageData.alt || 'Portraits & People Photography' }}</span>
      </h1>
      <button
        class="btn-neon-outline text-sm font-pixel inline-flex"
        @click="$router.push('/photography/portraits-people')"
      >
        Back to Portraits Gallery
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
      <div class="space-y-3 text-gray-300">
        <p v-if="imageData.alt"><strong class="text-white">Title:</strong> {{ imageData.alt }}</p>
        <p v-if="imageData.description"><strong class="text-white">Description:</strong> {{ imageData.description }}</p>
        <p v-if="imageData.location"><strong class="text-white">Location:</strong> {{ imageData.location }}</p>
        <p v-if="imageData.date"><strong class="text-white">Date:</strong> {{ imageData.date }}</p>
        <p v-if="imageData.camera"><strong class="text-white">Camera:</strong> {{ imageData.camera }}</p>
        <p v-if="imageData.lens"><strong class="text-white">Lens:</strong> {{ imageData.lens }}</p>
        <p v-if="imageData.settings"><strong class="text-white">Settings:</strong> {{ imageData.settings }}</p>
        <p><strong class="text-white">Category:</strong> <span class="gb-chip">Portraits & People</span></p>
      </div>
    </GbWindow>

    <!-- MORE PORTRAITS -->
    <GbWindow title="More Portrait Photography" class="animate-slide-up">
      <div class="more-images-container">
        <image-gallery category="people" :useDetailPages="false" class="fade-in"></image-gallery>
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
        @click="$router.push('/photography/portraits-people')"
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
const navigateToImage = (id) => router.push(`/photography/portraits-people/${id}`);

// SSR fetch + SEO meta + prev/next handled by the shared composable.
const { imageData, prevImage, nextImage } = useGalleryDetail('people', 'Portrait Photography');
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
