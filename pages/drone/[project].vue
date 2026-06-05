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

<template>
  <div>
    <!-- ① Cinematic title header (clears fixed navbar) -->
    <section class="relative pt-40 pb-20 overflow-hidden">
      <!-- decorative cover wash -->
      <div v-if="projectData.images?.[0] || projectData.logo" class="absolute inset-0 z-0">
        <img
          :src="projectData.images?.[0] || projectData.logo"
          alt=""
          class="w-full h-full object-cover opacity-25"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/85 to-forest"></div>
      </div>
      <div class="absolute inset-0 bg-topo opacity-30 pointer-events-none"></div>
      <div class="orb top-10 right-1/4 w-96 h-96 bg-amber/10 animate-drift"></div>

      <div class="container mx-auto px-6 relative z-10">
        <button
          @click="$router.go(-1)"
          v-reveal:left
          class="btn-ghost-wild mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
          Go Back
        </button>

        <div v-reveal class="max-w-3xl">
          <p class="eyebrow mb-4">FPV Project</p>
          <h1 class="display-xl text-5xl md:text-7xl text-bone text-balance">
            <span class="gradient-text">{{ projectData.title }}</span>
          </h1>
          <p v-if="projectData.role" class="mt-5 text-lg text-bone-muted font-condensed uppercase tracking-wide">
            {{ projectData.role }}
          </p>
        </div>
      </div>
    </section>

    <!-- ② Media + info -->
    <section class="relative py-20 bg-forest-100 overflow-hidden">
      <div class="absolute inset-0 bg-grid opacity-50 pointer-events-none"></div>
      <div class="orb bottom-0 left-1/4 w-96 h-96 bg-moss/10"></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-3 gap-10">
          <!-- Media column -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Video Section -->
            <div v-if="projectData.videos && projectData.videos.length" v-reveal class="rounded-2xl overflow-hidden wild-border">
              <video class="w-full h-auto" controls>
                <source :src="projectData.videos[0]" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>

            <!-- Images Section -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5" v-reveal.stagger>
              <div
                v-for="(image, index) in projectData.images"
                :key="index"
                v-tilt="5"
                class="group relative rounded-2xl overflow-hidden wild-border"
              >
                <img
                  :alt="'Image ' + (index + 1)"
                  :src="image"
                  class="w-full h-full object-cover img-zoom"
                  loading="lazy"
                >
                <div class="absolute inset-0 vignette pointer-events-none"></div>
              </div>
            </div>
          </div>

          <!-- Info Card -->
          <aside class="lg:col-span-1">
            <div v-reveal:right class="panel rounded-2xl p-7 lg:sticky lg:top-28">
              <p class="eyebrow text-amber mb-5">Project Information</p>
              <dl class="space-y-4 text-bone-muted">
                <div v-if="projectData.role">
                  <dt class="font-condensed uppercase tracking-widest2 text-xs text-bone-dim">Role</dt>
                  <dd class="text-bone mt-1">{{ projectData.role }}</dd>
                </div>
                <div class="section-divider !my-0 !mx-0"></div>
                <div>
                  <dt class="font-condensed uppercase tracking-widest2 text-xs text-bone-dim">Duration</dt>
                  <dd class="text-bone mt-1">{{ projectData.fromDate }} – {{ projectData.toDate }}</dd>
                </div>
                <div class="section-divider !my-0 !mx-0"></div>
                <div>
                  <dt class="font-condensed uppercase tracking-widest2 text-xs text-bone-dim">From</dt>
                  <dd class="text-bone mt-1">{{ projectData.fromDate }}</dd>
                </div>
                <div class="section-divider !my-0 !mx-0"></div>
                <div>
                  <dt class="font-condensed uppercase tracking-widest2 text-xs text-bone-dim">To</dt>
                  <dd class="text-bone mt-1">{{ projectData.toDate }}</dd>
                </div>
              </dl>

              <a v-if="projectData.link" :href="projectData.link" class="btn-wild w-full mt-7">
                View Project
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ③ Description -->
    <section v-if="projectData.longDescription" class="relative py-24 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb top-0 right-1/4 w-96 h-96 bg-clay/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div v-reveal class="max-w-3xl mx-auto">
          <p class="eyebrow mb-5">The Story</p>
          <p class="text-lg text-bone-muted leading-relaxed">
            {{ projectData.longDescription }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>
