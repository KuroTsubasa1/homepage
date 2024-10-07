<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';

// props
const props = defineProps({
  category: String,
});

// data for the project grid tiles
const projectGridTiles = ref([]);

const route = useRoute();

onMounted(async () => {
  const response = await fetch(`https://pocket.lasseharm.space/api/collections/portfolio_projects/records?filter=(category='${props.category}')`);
  const data = await response.json();
  const routePathSegments = route.path.split('/');
  const lastRouteSegment = routePathSegments[routePathSegments.length - 1];
  projectGridTiles.value = data.items.map(item => ({
    title: item.name,
    role: item.role,
    description: item.short_desc,
    image: `https://pocket.lasseharm.space/api/files/${item.collectionId}/${item.id}/${item.logo}?thumb=900x500`,
    link: `${lastRouteSegment}/${item.id}`
  }));
});
</script>

<template>
  <div class="mx-10 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div v-for="project in projectGridTiles" :key="project.title" class="card bordered">
      <figure>
        <img :src="project.image">
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ project.title }}</h2>
        <p>{{ project.role }}</p>
        <div class="justify-end card-actions">
          <a :href="project.link" class="btn">Open</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-div {
  width: 100%;
  height: auto;
}

@media (min-width: 600px) {
  .project-div {
    width: 50%;
    height: auto;
  }
}
</style>