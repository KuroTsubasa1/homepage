<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = withDefaults(defineProps<{
  value: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}>(), { suffix: '', prefix: '', duration: 1600 });

const display = ref(0);
const el = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let started = false;

const run = () => {
  if (started) return;
  started = true;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { display.value = props.value; return; }
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min((now - start) / props.duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    display.value = Math.round(eased * props.value);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

onMounted(() => {
  if (!el.value) return;
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { run(); observer?.disconnect(); }
  }, { threshold: 0.4 });
  observer.observe(el.value);
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div ref="el" class="text-center group">
    <p class="font-display text-5xl md:text-6xl text-amber leading-none tabular-nums transition-transform duration-300 group-hover:scale-105">
      {{ prefix }}{{ display.toLocaleString() }}{{ suffix }}
    </p>
    <p class="eyebrow mt-3 text-bone-muted">{{ label }}</p>
  </div>
</template>
