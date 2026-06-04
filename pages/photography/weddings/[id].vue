<template>
  <div class="container mx-auto px-4 max-w-4xl py-12 space-y-10">

    <!-- TITLE BLOCK -->
    <div class="text-center animate-slide-up">
      <h1 class="text-3xl md:text-4xl font-bold gradient-text mb-4">{{ imageData.alt || 'Wedding Photography' }}</h1>
      <NuxtLink to="/photography/weddings" class="btn-neon-outline inline-block">
        Back to Wedding Gallery
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

    <!-- NAV -->
    <div class="flex justify-between items-center gap-3">
      <NuxtLink v-if="prevImage" :to="`/photography/weddings/${prevImage.id}`" class="btn-neon-outline inline-block">
        ← Previous
      </NuxtLink>
      <div v-else></div>
      <NuxtLink to="/photography/weddings" class="btn-neon inline-block animate-glow-pulse">Back to Gallery</NuxtLink>
      <NuxtLink v-if="nextImage" :to="`/photography/weddings/${nextImage.id}`" class="btn-neon-outline inline-block">
        Next →
      </NuxtLink>
      <div v-else></div>
    </div>

  </div>
</template>

<script setup>
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
</style>
