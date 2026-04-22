<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  category: String,
});

const projectGridTiles = ref([]);
const route = useRoute();

onMounted(async () => {
  try {
    const response = await fetch(`https://pocket.lasseharm.space/api/collections/portfolio_projects/records?filter=(category='${props.category}')`);
    const data = await response.json();
    const routePathSegments = route.path.split('/');
    const lastRouteSegment = routePathSegments[routePathSegments.length - 1];

    projectGridTiles.value = data.items.map(item => ({
      title: item.name,
      role: item.role,
      description: item.short_desc,
      image: `https://pocket.lasseharm.space/api/files/${item.collectionId}/${item.id}/${item.logo}?thumb=900x500`,
      link: `/${lastRouteSegment}/${item.id}`,
      id: item.id
    }));
  } catch (error) {
    console.error('Error loading projects:', error);
  }
});
</script>

<template>
  <div class="mx-4 md:mx-10 my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
    <a v-for="project in projectGridTiles" :key="project.id" :href="project.link" class="project-card glass-card neon-border overflow-hidden group block">
      <figure class="relative overflow-hidden">
        <img :src="project.image" class="w-full h-48 object-cover object-center transition-transform duration-500 group-hover:scale-105">
        <div class="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
      </figure>
      <div class="p-6">
        <h2 class="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors duration-300">{{ project.title }}</h2>
        <p class="text-neon-cyan/70 text-sm mb-2">{{ project.role }}</p>
        <p class="text-gray-400 text-sm mb-4">{{ project.description }}</p>
        <span class="text-neon-cyan text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {{ t('common.viewProject') }}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.project-card {
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 240, 255, 0.4);
}
</style>
