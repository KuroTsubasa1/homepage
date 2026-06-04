<template>
  <div class="container mx-auto px-4 max-w-4xl py-12 space-y-10">

    <!-- TITLE BLOCK -->
    <div class="text-center animate-slide-up">
      <h1 class="text-3xl md:text-4xl font-bold gradient-text mb-4">{{ imageData.alt || 'Abstract & Art Photography' }}</h1>
      <NuxtLink to="/photography/abstract-art" class="btn-neon-outline inline-block text-sm font-pixel">
        Back to Abstract Gallery
      </NuxtLink>
    </div>

    <!-- PHOTO -->
    <div v-if="imageData.src" class="cartridge overflow-hidden animate-pixel-in">
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
        <p class="flex items-center gap-2">
          <strong class="text-white">Category:</strong>
          <span class="gb-chip">Abstract & Art</span>
        </p>
      </div>
    </GbWindow>

    <!-- PREV / NEXT -->
    <div class="flex justify-between items-center">
      <NuxtLink
        v-if="prevImage"
        :to="`/photography/abstract-art/${prevImage.id}`"
        class="btn-neon-outline inline-block text-sm font-pixel"
      >
        ← Previous Image
      </NuxtLink>
      <div v-else></div>

      <NuxtLink
        v-if="nextImage"
        :to="`/photography/abstract-art/${nextImage.id}`"
        class="btn-neon-outline inline-block text-sm font-pixel"
      >
        Next Image →
      </NuxtLink>
      <div v-else></div>
    </div>

  </div>
</template>

<script setup>
// SSR fetch + SEO meta + prev/next handled by the shared composable.
const { imageData, prevImage, nextImage } = useGalleryDetail('abstract', 'Abstract & Art Photography');
</script>
