<template>
  <div class="container mx-auto px-4 max-w-4xl py-12 space-y-10">

    <!-- TITLE -->
    <div class="text-center animate-slide-up space-y-4">
      <h1 class="text-3xl md:text-4xl font-bold text-white gradient-text">{{ imageData.alt || 'Portrait Photography' }}</h1>
      <NuxtLink to="/photography/portraits-people" class="btn-neon-outline inline-block text-sm font-pixel">
        Back to Portraits Gallery
      </NuxtLink>
    </div>

    <!-- PHOTO -->
    <div v-if="imageData.src" class="cartridge animate-pixel-in">
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
          <span class="font-pixel text-neon-green">TITLE</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value gb-data-value">{{ imageData.alt }}</span>
        </li>
        <li v-if="imageData.description" class="gb-menu-row">
          <span class="font-pixel text-neon-green">DESC</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value gb-data-value">{{ imageData.description }}</span>
        </li>
        <li v-if="imageData.location" class="gb-menu-row">
          <span class="font-pixel text-neon-green">LOCATION</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value gb-data-value">{{ imageData.location }}</span>
        </li>
        <li v-if="imageData.date" class="gb-menu-row">
          <span class="font-pixel text-neon-green">DATE</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value gb-data-value">{{ imageData.date }}</span>
        </li>
        <li class="gb-menu-row">
          <span class="font-pixel text-neon-green">CATEGORY</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value gb-data-value">Portraits &amp; People</span>
        </li>
      </ul>
    </GbWindow>

    <!-- PREV / NEXT -->
    <div class="flex justify-between">
      <NuxtLink
        v-if="prevImage"
        :to="`/photography/portraits-people/${prevImage.id}`"
        class="btn-neon-outline inline-block text-sm font-pixel"
      >
        ← Previous Image
      </NuxtLink>
      <div v-else></div>

      <NuxtLink
        v-if="nextImage"
        :to="`/photography/portraits-people/${nextImage.id}`"
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
const { imageData, prevImage, nextImage } = useGalleryDetail('people', 'Portrait Photography');
</script>

<style scoped>
/* Readable (non-pixel) value text inside DATA rows; VT323 via inherited body font. */
.gb-data-value {
  text-transform: none;
  text-align: right;
  max-width: 70%;
  white-space: normal;
  font-family: 'VT323', ui-monospace, monospace;
  font-size: 1.05rem;
  color: rgb(var(--c-ink));
}
</style>
