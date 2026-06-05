<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title?: string
  subtitle?: string
  align?: 'center' | 'left'
}>()
</script>

<template>
  <div
    v-reveal
    :class="['mb-12', (align === 'left') ? 'text-left' : 'text-center max-w-3xl mx-auto']"
  >
    <p v-if="eyebrow" class="eyebrow mb-3 flex items-center gap-3" :class="(align === 'left') ? '' : 'justify-center'">
      <span class="inline-block w-8 h-px bg-amber/60"></span>
      {{ eyebrow }}
      <span class="inline-block w-8 h-px bg-amber/60"></span>
    </p>
    <h2 v-if="title" class="section-heading" :class="(align === 'left') ? '!text-left !mb-3' : ''">
      <slot name="title">{{ title }}</slot>
    </h2>
    <slot name="title-full" />
    <div v-if="align !== 'left'" class="section-divider !mb-6"></div>
    <p v-if="subtitle" class="text-lg text-bone-muted leading-relaxed" :class="(align === 'left') ? '' : 'mx-auto'">
      {{ subtitle }}
    </p>
    <slot />
  </div>
</template>
