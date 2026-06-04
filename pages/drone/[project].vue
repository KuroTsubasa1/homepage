<template>
  <div class="container mx-auto px-4 max-w-5xl py-12 space-y-10">

    <!-- Back -->
    <div class="flex justify-center">
      <button @click="$router.go(-1)" class="btn-neon-outline text-sm font-pixel">
        Go Back
      </button>
    </div>

    <!-- TITLE -->
    <div class="gb-titlecard animate-slide-up">
      <p class="pixel-label text-neon-green mb-3">▸ DRONE PROJECT</p>
      <h1 class="font-semibold text-4xl md:text-5xl">
        <span class="gradient-text">{{ projectData.title }}</span>
      </h1>
      <p v-if="projectData.shortDescription" class="text-gray-400 text-lg mt-3">
        {{ projectData.shortDescription }}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

      <!-- MEDIA -->
      <div class="lg:col-span-2 space-y-6">

        <!-- Video Section -->
        <GbWindow v-if="projectData.videos && projectData.videos.length" title="FOOTAGE" class="animate-slide-up">
          <div class="cartridge">
            <video class="w-full h-auto" controls>
              <source :src="projectData.videos[0]" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </GbWindow>

        <!-- Images Section -->
        <GbWindow v-if="projectData.images && projectData.images.length" title="GALLERY" class="animate-slide-up">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="(image, index) in projectData.images" :key="index" class="gb-tile">
              <img :alt="'Image ' + (index + 1)"
                   :src="image" class="w-full h-36 sm:h-40 object-cover"
                   loading="lazy">
            </div>
          </div>
        </GbWindow>

      </div>

      <!-- DATA -->
      <GbWindow title="DATA" accent="velvet" class="animate-slide-up">
        <ul class="gb-menu-list">
          <li>
            <div class="gb-menu-row">
              <span class="gb-menu-label">Role</span>
              <span class="gb-menu-leader"></span>
              <span class="gb-menu-value">{{ projectData.role }}</span>
            </div>
          </li>
          <li>
            <div class="gb-menu-row">
              <span class="gb-menu-label">From</span>
              <span class="gb-menu-leader"></span>
              <span class="gb-menu-value">{{ projectData.fromDate }}</span>
            </div>
          </li>
          <li>
            <div class="gb-menu-row">
              <span class="gb-menu-label">To</span>
              <span class="gb-menu-leader"></span>
              <span class="gb-menu-value">{{ projectData.toDate }}</span>
            </div>
          </li>
        </ul>
        <div v-if="projectData.category" class="mt-4 flex flex-wrap gap-2">
          <span class="gb-chip">{{ projectData.category }}</span>
        </div>
      </GbWindow>

    </div>

    <!-- BRIEFING -->
    <GbWindow v-if="projectData.longDescription" title="BRIEFING" class="animate-slide-up">
      <p class="text-lg text-gray-300 leading-relaxed">
        {{ projectData.longDescription }}
      </p>
    </GbWindow>

    <!-- Link -->
    <div v-if="projectData.link" class="flex justify-center">
      <a :href="projectData.link" class="btn-neon text-sm font-pixel animate-glow-pulse">
        View Project
      </a>
    </div>

  </div>
</template>

<script setup>
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
.gb-menu-label {
  flex-shrink: 0;
  color: rgb(var(--c-ink));
}
</style>
