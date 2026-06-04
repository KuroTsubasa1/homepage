<template>
  <div class="container mx-auto px-4 max-w-5xl py-12 space-y-10">

    <!-- TITLE PLAQUE -->
    <div class="gb-titlecard animate-slide-up">
      <p class="pixel-label text-lcd-dim mb-2">3D PRINTING</p>
      <h1 class="font-semibold text-4xl md:text-6xl">
        <span class="gradient-text">{{ projectData.title }}</span>
      </h1>
    </div>

    <!-- MEDIA -->
    <GbWindow title="MEDIA" class="animate-slide-up">
      <!-- Video Section -->
      <div v-if="projectData.videos" class="video-container mb-4 cartridge">
        <video class="w-full h-auto" controls>
          <source :src="`${projectData.videos[0]}`" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Images Section -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="(image, index) in projectData.images" :key="index" class="gb-tile">
          <img :alt="'Image ' + (index + 1)" :src="`${image}`" class="w-full h-36 sm:h-40 object-cover" loading="lazy">
        </div>
      </div>
    </GbWindow>

    <!-- DATA -->
    <GbWindow title="DATA" accent="velvet" class="animate-slide-up">
      <ul class="gb-menu-list">
        <li class="gb-menu-row">
          <span class="text-neon-green">Role</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ projectData.role }}</span>
        </li>
        <li class="gb-menu-row">
          <span class="text-neon-green">Duration</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ projectData.fromDate }} - {{ projectData.toDate }}</span>
        </li>
        <li class="gb-menu-row">
          <span class="text-neon-green">From</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ projectData.fromDate }}</span>
        </li>
        <li class="gb-menu-row">
          <span class="text-neon-green">To</span>
          <span class="gb-menu-leader"></span>
          <span class="gb-menu-value">{{ projectData.toDate }}</span>
        </li>
      </ul>
    </GbWindow>

    <!-- BRIEFING -->
    <GbWindow title="BRIEFING" class="animate-slide-up">
      <p class="text-lg text-gray-300 leading-relaxed">{{ projectData.longDescription }}</p>

      <div class="mt-6 text-center">
        <a :href="projectData.link" class="btn-neon text-sm font-pixel animate-glow-pulse inline-block">
          View Project
        </a>
      </div>
    </GbWindow>

  </div>
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
