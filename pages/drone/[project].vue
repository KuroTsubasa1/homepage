<template>

  <navigation>

  </navigation>

  <!-- Back Button -->
  <div class="w-1/2 flex justify-center mx-auto pt-20 my-10">
    <button @click="$router.go(-1)" class="btn-neon-outline text-sm">
      Go Back
    </button>
  </div>

  <h2 class="font-semibold text-5xl my-10 text-center">
    <span class="gradient-text">{{ projectData.title }}</span>
  </h2>

  <div class="w-3/4 mx-auto p-4 flex justify-center">

    <div class="w-1/2">
      <!-- Video Section -->
      <div v-if="projectData.videos" class="video-container mb-4">
        <video class="w-full h-auto rounded-2xl border border-white/10" controls>
          <source
              :src="`https://pocket.lasseharm.space/api/files/${projectData.collectionId}/${projectData.videos[0]}`"
              type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Images Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <img v-for="(image, index) in projectData.images" :key="index" :alt="'Image ' + (index + 1)"
             :src="`https://pocket.lasseharm.space/api/files/${projectData.collectionId}/${image}`" class="w-full h-auto rounded-2xl border border-white/10"
             loading="lazy">
      </div>

    </div>

    <div class="w-1/4  flex flex-wrap justify-end">
      <!-- Info Card Section -->
      <div class="glass-card neon-border p-4 w-3/4">
        <h2 class="text-xl font-bold mb-2 text-neon-cyan">Project Information</h2>
        <ul class="text-gray-300">
          <li><strong class="text-white">Role:</strong> {{ projectData.role }}</li>
          <div class="divider divider-neutral"></div>
          <li><strong class="text-white">Duration:</strong> {{ projectData.fromDate }} - {{ projectData.toDate }}</li>
          <div class="divider divider-neutral"></div>
          <li><strong class="text-white">From:</strong> {{ projectData.fromDate }}</li>
          <div class="divider divider-neutral"></div>
          <li><strong class="text-white">To:</strong> {{ projectData.toDate }}</li>
          <!-- Add more info as needed -->
        </ul>

      </div>
    </div>

  </div>

  <!-- Description Section -->
  <div class="w-1/2 flex justify-center mx-auto my-10">
    <div class="mb-4">
      <p class="text-lg text-gray-300">
        {{ projectData.longDescription }}
      </p>
    </div>
  </div>

  <!-- Link Section -->
  <div class="w-1/2 flex justify-center mx-auto my-10">
    <a :href="projectData.link" class="btn-neon text-sm">
      View Project
    </a>
  </div>


  <footer-component>

  </footer-component>

</template>

<script setup>
import Navigation from '~/components/navigation.vue';
import FooterComponent from '~/components/footerComponent.vue';

// data for the project
const projectData = ref({});

const route = useRoute();

onMounted(async () => {
  const id = route.params.project;
  const response = await fetch(`https://pocket.lasseharm.space/api/collections/portfolio_projects/records/${id}`);
  const data = await response.json();

  projectData.value = {
    title: data.name,
    role: data.role,
    shortDescription: data.short_desc,
    longDescription: data.long_desc,
    logo: `https://pocket.lasseharm.space/api/files/${data.collectionId}/${data.logo}`,
    images: data.images.map(image => `https://pocket.lasseharm.space/api/files/${data.collectionId}/${image}`),
    videos: data.videos.map(video => `https://pocket.lasseharm.space/api/files/${data.collectionId}/${video}`),
    fromDate: data.from_date,
    toDate: data.to_date,
    category: data.category,
    link: data.link
  };


});
</script>

<style scoped>

</style>
