<template>
  <hero
    title="Abstract & Art"
    description="CREATIVE INTERPRETATIONS AND VISUAL EXPRESSIONS"
    :image="heroImage"
    class="fade-in"
  ></hero>

  <div class="container mx-auto px-4 max-w-5xl py-12 space-y-10">
    <!-- INTEL -->
    <GbWindow title="About Abstract Photography" class="fade-in">
      <div class="space-y-3 text-gray-300 leading-relaxed">
        <p class="pixel-label text-neon-green mb-1">▸ INTEL</p>
        <p>
          Abstract photography breaks free from literal representation to explore shape, form, color,
          pattern, and texture. These images invite viewers to see the world differently, finding beauty
          in unexpected places and challenging conventional perception.
        </p>
        <p>
          My abstract work experiments with unconventional angles, close-ups, motion, light painting,
          and other techniques to transform ordinary subjects into extraordinary visual experiences.
          Each image represents a creative exploration that balances intuition with deliberate artistic choices.
        </p>
      </div>
    </GbWindow>

    <!-- ALBUM — inventory grid of slots -->
    <GbWindow title="Abstract Gallery" class="fade-in">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="image in images"
          :key="image.id"
          class="gb-tile cursor-pointer group"
          @click="openDetail(image.id)"
        >
          <div class="relative">
            <img
              :src="image.thumbnail"
              :alt="image.alt"
              class="w-full h-36 sm:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
              <p class="text-white text-xs">{{ image.alt }}</p>
            </div>
          </div>
        </div>
      </div>
    </GbWindow>

    <div class="text-center fade-in">
      <NuxtLink to="/photography" class="btn-neon-outline inline-block font-pixel">
        Back to Photography Collections
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// SSR fetch (SEO + no content flash).
const { images, heroImage } = useGalleryImages('abstract', 'Abstract & Art Photography');

const openDetail = (id) => navigateTo(`/photography/abstract-art/${id}`);

useSeoMeta({
  title: 'Abstract & Art Photography - Lasse Harm',
  ogTitle: 'Abstract & Art Photography - Lasse Harm',
  description: 'Explore abstract and artistic photography by Lasse Harm, featuring creative interpretations and compositions that challenge perception.',
  ogDescription: 'Explore abstract and artistic photography by Lasse Harm, featuring creative interpretations and compositions that challenge perception.',
  ogImage: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
  twitterCard: 'summary_large_image',
});
</script>

<style scoped>
.fade-in {
  opacity: 0;
  animation: fadeIn 1.2s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}
</style>
