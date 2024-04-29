<script lang="ts" setup>
const route = useRoute();
// props
 const  props = defineProps({
  category: String,
})


// data for the project grid tiles
const projectGridTiles = ref([])


onMounted(async () => {
  const response = await fetch(`https://pocket.lasseharm.space/api/collections/portfolio_projects/records?filter=(category='${props.category}')`);
  const data = await response.json();
  const routePathSegments = route.path.split('/');
  const lastRouteSegment = routePathSegments[routePathSegments.length - 1];
  projectGridTiles.value = data.items.map(item => ({
    title: item.name,
    role: item.role,
    description: item.short_desc,
    image: `https://pocket.lasseharm.space/api/files/${item.collectionId}/${item.id}/${item.logo}`,
    link: `${lastRouteSegment}/${item.id}`
  }));
});

</script>

<template>
  <div class="w-full flex flex-wrap justify-center">
    <div class="w-1/2 flex flex-wrap">

      <!-- tile -->

      <div v-for="project in projectGridTiles" :key="project.title" class="w-full md:w-1/2 p-3 group group-hover:visible">
        <a :href="(project.link)" class="group-hover:visible">
          <div class="bg-white shadow-lg rounded-lg group-hover:visible">

            <div :style="{ backgroundImage: 'url(' + project.image + ')' }"
                 class="overlay bg-cover bg-center p-4 h-full min-h-[300px] flex justify-center items-center  relative">
              <div class=" absolute inset-0 bg-black opacity-0 transition-opacity"></div>

              <div class="p-4 text-center text-primary invisible group-hover:visible">

                <div class="bg-[#fff] p-3 rounded ">
                  <p class="uppercase text-3xl tracking-wide font-bold">
                    {{ project.title }}
                  </p>
                  <p class="text-lg font-bold text-primary-content/40">
                    {{ project.role }}
                  </p>
                  <p class="mt-2 ">
                    {{ project.description }}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </a>
      </div>


    </div>

  </div>
</template>

<style scoped>
.group:hover .overlay  {
  opacity: 0.5;
}
</style>