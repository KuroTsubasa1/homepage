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

</style>