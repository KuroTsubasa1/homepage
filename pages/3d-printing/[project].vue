<template>
  <div class="relative overflow-hidden">
    <!-- Ambient backdrop -->
    <div class="absolute inset-0 bg-topo opacity-20 pointer-events-none"></div>
    <div class="orb top-32 -left-20 w-96 h-96 bg-amber/10"></div>
    <div class="orb top-1/2 -right-20 w-96 h-96 bg-moss/10"></div>

    <section class="relative z-10 container mx-auto px-6 pt-32 pb-24">
      <!-- Title header -->
      <header class="max-w-3xl mb-14" v-reveal>
        <p class="eyebrow mb-4 flex items-center gap-3">
          <span class="inline-block w-10 h-px bg-amber"></span>
          3D Printing &amp; Making
        </p>
        <h1 class="display-xl text-bone text-5xl md:text-7xl lg:text-8xl leading-[0.92]">
          <span class="gradient-text">{{ projectData.title }}</span>
        </h1>
        <p v-if="projectData.role" class="mt-5 font-condensed uppercase tracking-wide text-lg text-bone-muted">
          {{ projectData.role }}
        </p>
      </header>

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Media column -->
        <div class="space-y-6">
          <!-- Video Section -->
          <div v-if="projectData.videos && projectData.videos.length" v-reveal:scale class="rounded-2xl overflow-hidden wild-border">
            <video class="w-full h-auto block" controls>
              <source :src="`${projectData.videos[0]}`" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>

          <!-- Images Section -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5" v-reveal.stagger>
            <div
              v-for="(image, index) in projectData.images"
              :key="index"
              v-tilt="6"
              class="group rounded-2xl overflow-hidden wild-border"
            >
              <img
                :alt="'Image ' + (index + 1)"
                :src="`${image}`"
                class="w-full h-full object-cover img-zoom"
                loading="lazy"
              >
            </div>
          </div>
        </div>

        <!-- Info column -->
        <div class="lg:sticky lg:top-28 self-start space-y-8">
          <!-- Info Card -->
          <div v-reveal:right class="panel rounded-2xl p-7 wild-border">
            <p class="eyebrow mb-5 text-amber">Project Information</p>
            <ul class="divide-y divide-bone/10">
              <li class="flex items-baseline justify-between gap-4 py-3">
                <span class="font-condensed uppercase tracking-wide text-sm text-bone-dim">Role</span>
                <span class="text-bone text-right">{{ projectData.role }}</span>
              </li>
              <li class="flex items-baseline justify-between gap-4 py-3">
                <span class="font-condensed uppercase tracking-wide text-sm text-bone-dim">Duration</span>
                <span class="text-bone text-right">{{ projectData.fromDate }} &mdash; {{ projectData.toDate }}</span>
              </li>
              <li class="flex items-baseline justify-between gap-4 py-3">
                <span class="font-condensed uppercase tracking-wide text-sm text-bone-dim">From</span>
                <span class="text-bone text-right">{{ projectData.fromDate }}</span>
              </li>
              <li class="flex items-baseline justify-between gap-4 py-3">
                <span class="font-condensed uppercase tracking-wide text-sm text-bone-dim">To</span>
                <span class="text-bone text-right">{{ projectData.toDate }}</span>
              </li>
            </ul>
          </div>

          <!-- Description -->
          <div v-reveal:right class="text-lg text-bone-muted leading-relaxed">
            <p>{{ projectData.longDescription }}</p>
          </div>

          <!-- Link -->
          <div v-if="projectData.link" v-reveal>
            <a :href="projectData.link" target="_blank" rel="noopener noreferrer" class="btn-wild inline-block">
              View Project
            </a>
          </div>
        </div>
      </div>
    </section>
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
