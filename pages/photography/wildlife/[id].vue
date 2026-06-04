<template>
  <div class="container mx-auto px-4 max-w-4xl py-12 space-y-10">

    <!-- TITLE BLOCK -->
    <div class="text-center animate-slide-up">
      <h1 class="text-3xl md:text-4xl font-bold gradient-text mb-4">{{ imageData.alt || 'Wildlife Photography' }}</h1>
      <NuxtLink to="/photography/wildlife" class="btn-neon-outline inline-block">
        Back to Wildlife Gallery
      </NuxtLink>
    </div>

    <!-- PHOTO -->
    <div v-if="imageData.src" class="cartridge overflow-hidden animate-pixel-in">
      <img :src="imageData.src" :alt="imageData.alt" class="w-full" />
    </div>

    <!-- DATA -->
    <GbWindow title="DATA" class="animate-slide-up">
      <ul class="gb-menu-list">
        <li v-if="imageData.alt" class="gb-menu-row">
          <span class="gb-menu-label">Title</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value gb-menu-value-text">{{ imageData.alt }}</span>
        </li>
        <li v-if="imageData.location" class="gb-menu-row">
          <span class="gb-menu-label">Location</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value gb-menu-value-text">{{ imageData.location }}</span>
        </li>
        <li v-if="imageData.date" class="gb-menu-row">
          <span class="gb-menu-label">Date</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value gb-menu-value-text">{{ imageData.date }}</span>
        </li>
        <li v-if="imageData.camera" class="gb-menu-row">
          <span class="gb-menu-label">Camera</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value gb-menu-value-text">{{ imageData.camera }}</span>
        </li>
        <li v-if="imageData.lens" class="gb-menu-row">
          <span class="gb-menu-label">Lens</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value gb-menu-value-text">{{ imageData.lens }}</span>
        </li>
        <li v-if="imageData.settings" class="gb-menu-row">
          <span class="gb-menu-label">Settings</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value gb-menu-value-text">{{ imageData.settings }}</span>
        </li>
        <li class="gb-menu-row">
          <span class="gb-menu-label">Category</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-chip">Wildlife</span>
        </li>
      </ul>

      <p v-if="imageData.description" class="gb-row-desc text-gray-300 leading-relaxed mt-4">
        {{ imageData.description }}
      </p>
    </GbWindow>

    <!-- NAV -->
    <div class="flex justify-between items-center gap-3">
      <NuxtLink v-if="prevImage" :to="`/photography/wildlife/${prevImage.id}`" class="btn-neon-outline inline-block">
        ← Previous
      </NuxtLink>
      <div v-else></div>
      <NuxtLink to="/photography/wildlife" class="btn-neon inline-block animate-glow-pulse">Back to Gallery</NuxtLink>
      <NuxtLink v-if="nextImage" :to="`/photography/wildlife/${nextImage.id}`" class="btn-neon-outline inline-block">
        Next →
      </NuxtLink>
      <div v-else></div>
    </div>

  </div>
</template>

<script setup>
// SSR fetch + SEO meta + prev/next handled by the shared composable.
const { imageData, prevImage, nextImage } = useGalleryDetail('wildlife', 'Wildlife Photography');
</script>

<style scoped>
/* Labels inherit the row's pixel chrome; values stay short. */
.gb-menu-label { flex-shrink: 0; }
/* Longer free-text values read better in the body font, not pixel. */
.gb-menu-value-text {
  font-family: 'VT323', monospace;
  font-size: 1rem;
  letter-spacing: 0;
}
.gb-row-desc {
  font-family: 'VT323', monospace;
  font-size: 1.05rem;
}
</style>
