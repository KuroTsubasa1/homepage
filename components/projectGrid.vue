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
  <div class="mx-10 my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
    <div v-for="project in projectGridTiles" :key="project.title" class="card bordered shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden">
      <figure class="relative">
        <img :src="project.image" class="w-full h-48 object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105">
        <div class="absolute inset-0 bg-black opacity-25 hover:opacity-0 transition-opacity duration-300"></div>
      </figure>
      <div class="card-body p-6">
        <h2 class="card-title text-2xl font-bold text-primary mb-2">{{ project.title }}</h2>
        <p class="text-gray-600 mb-4">{{ project.role }}</p>
        <p class="text-gray-500 mb-6">{{ project.description }}</p>
        <div class="justify-end card-actions">
          <a :href="project.link" class="btn btn-primary btn-outline rounded-full">Open</a>
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

.card {
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-10px);
}

@media (min-width: 600px) {
  .project-div {
    width: 50%;
    height: auto;
  }
}
</style>

/opt/lasseharm/current