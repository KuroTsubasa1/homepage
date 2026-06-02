<template>
  <navigation></navigation>

  <div class="container mx-auto py-16 pt-24">
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">{{ imageData.alt || 'Wildlife Photography' }}</h1>
      <NuxtLink to="/photography/wildlife" class="btn-neon-outline inline-block text-sm">
        Back to Wildlife Gallery
      </NuxtLink>
    </div>

    <div class="max-w-4xl mx-auto px-4">
      <div class="rounded-2xl overflow-hidden border border-white/10 mb-8">
        <img v-if="imageData.src" :src="imageData.src" :alt="imageData.alt" class="w-full" />
      </div>

      <div class="glass-card neon-border p-6 mb-8">
        <h2 class="text-xl font-semibold text-neon-cyan mb-4">Image Details</h2>
        <div class="space-y-3 text-gray-300">
          <p v-if="imageData.alt"><strong class="text-white">Title:</strong> {{ imageData.alt }}</p>
          <p v-if="imageData.description"><strong class="text-white">Description:</strong> {{ imageData.description }}</p>
          <p v-if="imageData.location"><strong class="text-white">Location:</strong> {{ imageData.location }}</p>
          <p v-if="imageData.date"><strong class="text-white">Date:</strong> {{ imageData.date }}</p>
          <p><strong class="text-white">Category:</strong> Wildlife</p>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <NuxtLink v-if="prevImage" :to="`/photography/wildlife/${prevImage.id}`" class="btn-neon-outline inline-block text-sm">
          ← Previous
        </NuxtLink>
        <div v-else></div>
        <NuxtLink to="/photography/wildlife" class="btn-neon inline-block text-sm">Back to Gallery</NuxtLink>
        <NuxtLink v-if="nextImage" :to="`/photography/wildlife/${nextImage.id}`" class="btn-neon-outline inline-block text-sm">
          Next →
        </NuxtLink>
        <div v-else></div>
      </div>
    </div>
  </div>

  <footer-component></footer-component>
</template>

<script setup>
import Navigation from '~/components/navigation.vue';
import FooterComponent from '~/components/footerComponent.vue';

// SSR fetch + SEO meta + prev/next handled by the shared composable.
const { imageData, prevImage, nextImage } = useGalleryDetail('wildlife', 'Wildlife Photography');
</script>
