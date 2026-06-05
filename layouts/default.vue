<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const personSchema = ref(null);
const businessSchema = ref(null);

// ---- global scroll chrome ----
const scrollProgress = ref(0);
const showTop = ref(false);

const onScroll = () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  scrollProgress.value = max > 0 ? (h.scrollTop / max) * 100 : 0;
  showTop.value = h.scrollTop > 700;
};

const toTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(async () => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  try {
    const personResp = await fetch('/schemas/person.json');
    const businessResp = await fetch('/schemas/business.json');
    if (personResp.ok && businessResp.ok) {
      personSchema.value = await personResp.json();
      businessSchema.value = await businessResp.json();
    }
  } catch (error) {
    console.error('Error loading schema:', error);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});

useHead({
  htmlAttrs: [{ 'data-theme': 'mytheme' }],
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => personSchema.value ? JSON.stringify(personSchema.value) : '{}')
    },
    {
      type: 'application/ld+json',
      children: computed(() => businessSchema.value ? JSON.stringify(businessSchema.value) : '{}')
    }
  ]
});
</script>

<template>
  <div class="relative min-h-screen bg-forest text-bone">
    <!-- Scroll progress bar -->
    <div class="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
      <div
        class="h-full bg-gradient-to-r from-amber via-clay to-moss transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(217,138,61,0.6)]"
        :style="{ width: scrollProgress + '%' }"
      ></div>
    </div>

    <navigation />

    <main>
      <slot />
    </main>

    <footer-component />

    <!-- Fixed film-grain over the whole site -->
    <div class="grain fixed inset-0 z-[55] pointer-events-none mix-blend-overlay opacity-60"></div>

    <!-- Back to top -->
    <transition name="page">
      <button
        v-show="showTop"
        @click="toTop"
        aria-label="Back to top"
        class="fixed bottom-6 right-6 z-[58] w-12 h-12 rounded-full bg-forest-100/80 backdrop-blur-md border border-amber/40 text-amber flex items-center justify-center transition-all duration-300 hover:bg-amber hover:text-forest hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(217,138,61,0.45)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </transition>
  </div>
</template>
