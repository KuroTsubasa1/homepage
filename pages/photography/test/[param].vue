<template>
  <div class="container mx-auto py-16 px-4">
    <h1 class="text-3xl font-bold mb-4">Route Parameter Test</h1>
    <div class="bg-gray-100 p-4 rounded mb-4">
      <pre>Route params: {{ JSON.stringify(route.params, null, 2) }}</pre>
    </div>
    <div class="mt-4">
      <NuxtLink to="/photography" class="btn btn-primary">Back to Photography</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
console.log('Route test - params:', route.params);
</script>