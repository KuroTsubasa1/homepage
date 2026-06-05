<template>
  <section class="relative min-h-screen pt-32 pb-24 overflow-hidden bg-forest">
    <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
    <div class="orb top-0 right-1/4 w-96 h-96 bg-amber/10"></div>
    <div class="orb bottom-0 left-1/4 w-96 h-96 bg-moss/10"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-2xl mx-auto" v-reveal>
        <p class="eyebrow mb-4 flex items-center gap-3">
          <span class="inline-block w-8 h-px bg-amber/60"></span>
          Diagnostics
        </p>
        <h1 class="display-xl text-4xl md:text-6xl text-bone mb-8">
          <span class="gradient-text">Route Parameter Test</span>
        </h1>

        <div class="panel rounded-2xl wild-border p-6 mb-10" v-tilt="4">
          <pre class="font-condensed text-sm text-bone-muted whitespace-pre-wrap break-words">{{ JSON.stringify(route.params, null, 2) }}</pre>
        </div>

        <NuxtLink to="/photography" class="btn-wild-outline">
          Back to Photography
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
console.log('Route test - params:', route.params);
</script>
