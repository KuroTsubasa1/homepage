<script setup lang="ts">

const props = defineProps<{
  title: string
  description: string
  image: string
}>()

</script>

<template>

  <div class="hero min-h-screen" v-bind:style='{ backgroundImage: `url("${props.image}")` }'>
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold uppercase">{{props.title}}</h1>
        <p class="mb-5">{{props.description}}</p>
      </div>
    </div>
  </div>

</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: inherit;
  background-size: cover;
  background-position: center;
  transform: scale(1);
  transition: transform 5s ease;
  z-index: -1;
}

.hero:hover::before {
  transform: scale(1.1);
}

.hero-content h1, .hero-content p {
  transition: text-shadow 0.3s ease;
}

.hero-content h1:hover, .hero-content p:hover {
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.7);
}
</style>