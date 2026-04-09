<script setup lang="ts">

const props = defineProps<{
  title: string
  description: string
  image: string
}>()

</script>

<template>
  <div class="hero min-h-[70vh] relative overflow-hidden" v-bind:style='{ backgroundImage: `url("${props.image}")` }'>
    <!-- Dark gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark z-10"></div>

    <!-- Grid pattern -->
    <div class="absolute inset-0 bg-grid opacity-20 z-10"></div>

    <!-- Ambient glow -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-neon-green/10 rounded-full blur-[80px] z-10"></div>

    <!-- Content -->
    <div class="relative z-20 flex items-center justify-center min-h-[70vh]">
      <div class="text-center max-w-2xl px-4">
        <h1 class="text-4xl md:text-6xl font-black mb-5 uppercase">
          <span class="gradient-text">{{ props.title }}</span>
        </h1>
        <p class="text-lg text-gray-300 leading-relaxed">{{ props.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background-size: cover;
  background-position: center;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: inherit;
  background-size: cover;
  background-position: center;
  transform: scale(1);
  transition: transform 8s ease;
  z-index: 0;
}

.hero:hover::before {
  transform: scale(1.05);
}
</style>
