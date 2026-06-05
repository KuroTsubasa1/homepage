<script setup lang="ts">
// Endless scrolling strip of species / keywords — expedition-poster energy.
const props = withDefaults(defineProps<{
  items?: string[]
  reverse?: boolean
}>(), {
  items: () => ['Red Fox', 'White-tailed Eagle', 'Roe Deer', 'Common Crane', 'Grey Seal', 'Kingfisher', 'Red Squirrel', 'Hare', 'Heron', 'Owl'],
  reverse: false,
})

// duplicate the list so the -50% translate loops seamlessly
const loop = [...props.items, ...props.items]
</script>

<template>
  <div class="relative overflow-hidden py-5 border-y border-bone/10 bg-forest-100/40">
    <!-- edge fades -->
    <div class="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-forest to-transparent pointer-events-none"></div>
    <div class="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-forest to-transparent pointer-events-none"></div>

    <div class="flex w-max gap-10" :class="reverse ? 'animate-marquee-rev' : 'animate-marquee'">
      <div v-for="(word, i) in loop" :key="i" class="flex items-center gap-10 shrink-0">
        <span class="font-display text-2xl md:text-3xl uppercase tracking-wide text-bone/30 hover:text-amber transition-colors duration-300 whitespace-nowrap">
          {{ word }}
        </span>
        <span class="text-amber/50 text-xl">✦</span>
      </div>
    </div>
  </div>
</template>
