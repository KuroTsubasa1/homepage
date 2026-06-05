<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  image: string
  eyebrow?: string
}>()
</script>

<template>
  <section class="relative min-h-[78vh] md:min-h-[85vh] overflow-hidden bg-forest flex items-end">
    <!-- Ken Burns photo -->
    <div
      class="absolute inset-0 bg-cover bg-center animate-ken-burns"
      :style="{ backgroundImage: `url('${props.image}')` }"
    ></div>

    <!-- Grading -->
    <div class="absolute inset-0 vignette pointer-events-none"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-forest/20 pointer-events-none"></div>
    <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
    <div class="orb bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-44 bg-amber/10"></div>

    <!-- Content -->
    <div class="relative z-20 container mx-auto px-6 pb-20 pt-32">
      <div class="max-w-3xl" v-reveal>
        <p v-if="eyebrow || true" class="eyebrow mb-5 flex items-center gap-3">
          <span class="inline-block w-10 h-px bg-amber"></span>
          {{ eyebrow || 'Field Notes' }}
        </p>
        <h1 class="display-xl text-bone text-6xl md:text-8xl lg:text-9xl">
          <span class="gradient-text">{{ props.title }}</span>
        </h1>
        <p class="mt-5 text-lg md:text-xl text-bone-muted max-w-2xl leading-relaxed uppercase tracking-wide font-condensed">
          {{ props.description }}
        </p>
      </div>
    </div>

    <!-- Scroll cue -->
    <div class="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2">
      <span class="w-px h-10 bg-gradient-to-b from-amber/70 to-transparent animate-bob"></span>
    </div>
  </section>
</template>
