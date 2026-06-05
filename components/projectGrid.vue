<script lang="ts" setup>
import {useRoute} from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { listUrl, fileUrl } = usePocketbase();

const props = defineProps({
  category: String,
});

const route = useRoute();
const basePath = computed(() => `/${route.path.split('/').filter(Boolean).pop() ?? ''}`);

// Server-rendered for SEO and no content flash.
const { data: projectGridTiles, error } = await useAsyncData(
  () => `projects-${props.category}`,
  () => $fetch(listUrl('portfolio_projects', { filter: `(category='${props.category}')` })),
  {
    watch: [() => props.category],
    default: () => [],
    transform: (data) => data.items.map(item => ({
      title: item.name,
      role: item.role,
      description: item.short_desc,
      image: fileUrl(item, item.logo, 'thumb=900x500'),
      id: item.id,
    })),
  },
);
</script>

<template>
  <p v-if="error" class="text-center text-bone-dim font-condensed uppercase tracking-widest2 py-16 mx-4">
    Couldn't load projects right now. Please try again later.
  </p>

  <div
    v-else
    class="mx-4 md:mx-10 my-12 grid grid-cols-1 md:grid-cols-2 gap-7"
    v-reveal.stagger
  >
    <NuxtLink
      v-for="(project, i) in projectGridTiles"
      :key="project.id"
      :to="`${basePath}/${project.id}`"
      v-tilt="6"
      class="panel wild-border group relative block overflow-hidden rounded-2xl transition-all duration-500 ease-wild hover:-translate-y-2"
    >
      <!-- Imagery -->
      <figure class="relative overflow-hidden">
        <img
          :src="project.image"
          :alt="project.title"
          class="w-full h-52 object-cover object-center img-zoom"
        >
        <!-- forest grade -->
        <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent pointer-events-none"></div>
        <!-- index marker -->
        <span class="absolute top-4 left-4 eyebrow text-amber drop-shadow-[0_2px_6px_rgba(13,15,12,0.8)]">
          {{ String(i + 1).padStart(2, '0') }}
        </span>
      </figure>

      <!-- Body -->
      <div class="relative p-7">
        <h2 class="font-display text-2xl md:text-3xl uppercase text-bone mb-2 leading-none group-hover:text-amber transition-colors duration-300">
          {{ project.title }}
        </h2>
        <p v-if="project.role" class="eyebrow text-moss-light mb-3">{{ project.role }}</p>
        <p class="text-sm text-bone-muted leading-relaxed mb-5">{{ project.description }}</p>

        <span class="btn-ghost-wild text-xs">
          {{ t('common.viewProject') }}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </span>
      </div>
    </NuxtLink>
  </div>
</template>
