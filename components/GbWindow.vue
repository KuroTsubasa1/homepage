<script setup lang="ts">
/*
 * GbWindow — a Game Boy "window box" container with a solid title bar.
 * Use it to wrap a page section so it reads like an in-game menu/window.
 *   <GbWindow :title="$t('home.services')">…content…</GbWindow>
 *   <GbWindow :title="t('contact.hero.title')" accent="velvet">…</GbWindow>
 */
withDefaults(defineProps<{
  title?: string
  accent?: 'green' | 'velvet'
  bodyClass?: string
}>(), { accent: 'green' })
</script>

<template>
  <section class="gb-window">
    <div v-if="title" class="gb-window-title" :class="{ 'is-velvet': accent === 'velvet' }">
      <span aria-hidden="true">▚</span>
      <span>{{ title }}</span>
    </div>
    <div class="gb-window-body" :class="bodyClass">
      <slot />
    </div>
  </section>
</template>
