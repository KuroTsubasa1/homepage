<template>
  <main class="flex flex-col md:flex-row gap-10 p-10 pt-20">
    <div class="w-full md:w-1/2 animate-slide-up">
      <!-- Video Section -->
      <div v-if="projectData.videos" class="video-container mb-4 cartridge">
        <video class="w-full h-auto" controls>
          <source :src="`${projectData.videos[0]}`" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Images Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div v-for="(image, index) in projectData.images" :key="index" class="cartridge">
          <img :alt="'Image ' + (index + 1)" :src="`${image}`" class="w-full h-auto" loading="lazy">
        </div>
      </div>
    </div>

    <div class="w-full md:w-1/2 animate-slide-up">
      <h2 class="font-semibold text-5xl my-10 text-center">
        <span class="gradient-text">{{ projectData.title }}</span>
      </h2>

      <!-- Info Card Section -->
      <div class="glass-card neon-border p-4 w-full">
        <h2 class="text-xl font-bold mb-2 text-neon-cyan font-pixel">Project Information</h2>
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

      <!-- Description Section -->
      <div class="mt-10">
        <p class="text-lg text-gray-300">{{ projectData.longDescription }}</p>
      </div>

      <!-- Link Section -->
      <div class="mt-10">
        <a :href="projectData.link" class="btn-neon text-sm font-pixel animate-glow-pulse">
          View Project
        </a>
      </div>
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const { base, fileUrl } = usePocketbase();

// Server-rendered single-record fetch (SEO + no flash).
const { data: projectData } = await useAsyncData(
  () => `printing-project-${route.params.project}`,
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
  title: () => `${projectData.value.title || '3D Printing Project'} — Lasse Harm`,
  description: () => projectData.value.longDescription || '3D printing project by Lasse Harm.',
  ogImage: () => projectData.value.images?.[0] || projectData.value.logo,
});
</script>

<style scoped>

</style>
