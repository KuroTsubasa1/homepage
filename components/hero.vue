<script setup lang="ts">

const props = defineProps<{
  title: string
  description: string
  image: string
}>()

</script>

<template>
  <!-- Game Boy TITLE SCREEN banner -->
  <div class="relative min-h-[60vh] w-full overflow-hidden flex items-center justify-center px-4 py-12">
    <!-- Background image (dimmed + dithered behind the plaque) -->
    <div class="hero-bg absolute inset-0" :style="{ backgroundImage: `url('${props.image}')` }"></div>
    <div class="absolute inset-0 bg-dark/70 z-10"></div>
    <div class="absolute inset-0 dither z-10 opacity-60"></div>
    <div class="absolute inset-0 bg-grid z-10 opacity-20"></div>

    <!-- Title plaque -->
    <div class="gb-titlecard relative z-20 animate-pixel-in">
      <!-- Sprite thumbnail -->
      <div class="flex justify-center mb-5">
        <div class="gb-tile w-28 h-28" style="box-shadow: 5px 5px 0 rgba(0,0,0,0.5);">
          <img
            :alt="props.title"
            class="w-full h-full object-cover"
            loading="lazy"
            :src="props.image"
          >
        </div>
      </div>

      <!-- Wordmark -->
      <h1 class="text-4xl md:text-6xl font-black mb-3 uppercase">
        <span class="gradient-text">{{ props.title }}</span>
      </h1>
      <p class="text-gray-300 text-lg leading-relaxed">{{ props.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.hero-bg {
  background-size: cover;
  background-position: center;
  transform: scale(1.05);
  transition: transform 8s ease;
}

.hero-bg:hover {
  transform: scale(1.12);
}
</style>
