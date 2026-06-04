<template>
  <div class="container mx-auto pt-24 py-16 animate-slide-up">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold gradient-text mb-4">{{ imageData.alt || 'Abstract & Art Photography' }}</h1>
      <NuxtLink to="/photography/abstract-art" class="btn-neon-outline inline-block text-sm font-pixel">
        Back to Abstract Gallery
      </NuxtLink>
    </div>

    <div class="max-w-4xl mx-auto px-4">
      <div v-if="imageData.src" class="cartridge mb-8">
        <img
          :src="imageData.src"
          :alt="imageData.alt"
          class="w-full"
        />
      </div>

      <div class="glass-card neon-border p-6 mb-8">
        <h2 class="text-2xl font-semibold text-neon-cyan mb-4">Image Details</h2>
        <div class="space-y-3 text-gray-300">
          <p v-if="imageData.alt"><strong class="text-white">Title:</strong> {{ imageData.alt }}</p>
          <p v-if="imageData.description"><strong class="text-white">Description:</strong> {{ imageData.description }}</p>
          <p v-if="imageData.location"><strong class="text-white">Location:</strong> {{ imageData.location }}</p>
          <p v-if="imageData.date"><strong class="text-white">Date:</strong> {{ imageData.date }}</p>
          <p><strong class="text-white">Category:</strong> Abstract & Art</p>
        </div>
      </div>

      <div class="flex justify-between">
        <NuxtLink
          v-if="prevImage"
          :to="`/photography/abstract-art/${prevImage.id}`"
          class="btn-neon-outline inline-block text-sm"
        >
          ← Previous Image
        </NuxtLink>
        <div v-else></div>

        <NuxtLink
          v-if="nextImage"
          :to="`/photography/abstract-art/${nextImage.id}`"
          class="btn-neon-outline inline-block text-sm"
        >
          Next Image →
        </NuxtLink>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// SSR fetch + SEO meta + prev/next handled by the shared composable.
const { imageData, prevImage, nextImage } = useGalleryDetail('abstract', 'Abstract & Art Photography');
</script>
