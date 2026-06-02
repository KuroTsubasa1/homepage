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
      <div v-if="projectData.videos && projectData.videos.length" class="video-container mb-4">
        <video class="w-full h-auto rounded-2xl border border-white/10" controls>
          <source :src="projectData.videos[0]" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Images Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <img v-for="(image, index) in projectData.images" :key="index" :alt="'Image ' + (index + 1)"
             :src="image" class="w-full h-auto rounded-2xl border border-white/10"
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

const route = useRoute();
const { base, fileUrl } = usePocketbase();

// Server-rendered single-record fetch (SEO + no flash).
const { data: projectData } = await useAsyncData(
  () => `drone-project-${route.params.project}`,
  () => $fetch(`${base}/api/collections/portfolio_projects/records/${route.params.project}`),
  {
    default: () => ({}),
    transform: (data) => ({
      title: data.name,
      role: data.role,
      shortDescription: data.short_desc,
      longDescription: data.long_desc,
      logo: data.logo ? fileUrl(data, data.logo) : '',
      images: (data.images || []).map(image => fileUrl(data, image)),
      videos: (data.videos || []).map(video => fileUrl(data, video)),
      fromDate: data.from_date,
      toDate: data.to_date,
      category: data.category,
      link: data.link,
    }),
  },
);

useSeoMeta({
  title: () => `${projectData.value.title || 'Drone Project'} — Lasse Harm`,
  description: () => projectData.value.longDescription || 'FPV drone project by Lasse Harm.',
  ogImage: () => projectData.value.images?.[0] || projectData.value.logo,
});
</script>

<style scoped>

</style>
