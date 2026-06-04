<template>
  <!-- Sticky Header -->
  <header class="sticky top-0 bg-dark/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-neon-green/5 z-10">
    <div class="container mx-auto flex justify-between items-center px-4 py-3">
      <h1 class="text-2xl font-bold text-white">{{ imageData.alt || 'Portraits & People Photography' }}</h1>
      <button
          class="btn-neon-outline text-sm font-pixel"
          @click="$router.push('/photography/portraits-people')"
      >
        Back to Portraits Gallery
      </button>
    </div>
  </header>

  <!-- Main Image Section -->
  <section class="image-section py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto animate-slide-up">
        <div v-if="imageData.src" class="cartridge mb-8">
          <img
            :src="imageData.src"
            :alt="imageData.alt"
            class="w-full"
          />
        </div>

        <div class="glass-card neon-border p-6">
          <h2 class="text-2xl font-semibold text-neon-green mb-4">Image Details</h2>
          <div class="space-y-3 text-gray-300">
            <p v-if="imageData.alt"><strong class="text-white">Title:</strong> {{ imageData.alt }}</p>
            <p v-if="imageData.description"><strong class="text-white">Description:</strong> {{ imageData.description }}</p>
            <p v-if="imageData.location"><strong class="text-white">Location:</strong> {{ imageData.location }}</p>
            <p v-if="imageData.date"><strong class="text-white">Date:</strong> {{ imageData.date }}</p>
            <p v-if="imageData.camera"><strong class="text-white">Camera:</strong> {{ imageData.camera }}</p>
            <p v-if="imageData.lens"><strong class="text-white">Lens:</strong> {{ imageData.lens }}</p>
            <p v-if="imageData.settings"><strong class="text-white">Settings:</strong> {{ imageData.settings }}</p>
            <p><strong class="text-white">Category:</strong> Portraits & People</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- More Images Section -->
  <section class="related-images-section py-16 bg-dark-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-white mb-8 text-center">More Portrait Photography</h2>
      <div class="more-images-container">
        <image-gallery category="people" :useDetailPages="false" class="fade-in"></image-gallery>
      </div>
    </div>
  </section>

  <!-- Navigation for Images -->
  <section class="image-navigation py-8">
    <div class="container mx-auto px-4">
      <div class="flex justify-between">
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
  </section>
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
