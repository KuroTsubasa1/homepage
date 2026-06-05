<script lang="ts" setup>
defineProps<{
  image?: string
  title?: string
  badge?: string
  description?: string
  tags?: string[]
}>()
</script>

<template>
  <div
    v-reveal:scale
    v-tilt="6"
    class="panel wild-border group relative w-96 max-w-full mx-5 overflow-hidden rounded-2xl transition-all duration-500 ease-wild hover:-translate-y-2"
  >
    <figure class="relative overflow-hidden">
      <img
        :alt="title ?? 'Card image'"
        :src="image ?? 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'"
        class="w-full h-56 object-cover object-center img-zoom"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent pointer-events-none"></div>
      <span
        v-if="badge"
        class="absolute top-4 right-4 eyebrow text-[10px] px-2.5 py-1 rounded-full bg-amber/15 text-amber border border-amber/30 backdrop-blur-sm"
      >
        {{ badge }}
      </span>
    </figure>

    <div class="relative p-7">
      <h2 class="font-display text-2xl md:text-3xl uppercase text-bone mb-2 leading-none group-hover:text-amber transition-colors duration-300">
        {{ title ?? 'Shoes!' }}
      </h2>
      <p class="text-sm text-bone-muted leading-relaxed mb-5">
        {{ description ?? 'If a dog chews shoes whose shoes does he choose?' }}
      </p>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in (tags ?? ['Fashion', 'Products'])"
          :key="tag"
          class="px-3 py-1 text-xs font-condensed uppercase tracking-wide rounded-full border border-bone/10 text-bone-dim group-hover:border-amber/40 group-hover:text-amber transition-all duration-300"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
