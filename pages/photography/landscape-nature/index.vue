<template>
  <hero
    title="Landscape & Nature"
    description="BREATHTAKING VIEWS AND INTIMATE DETAILS OF THE NATURAL WORLD"
    :image="heroImage"
    class="fade-in"
  ></hero>

  <div class="container mx-auto px-4 max-w-5xl py-12 space-y-10">
    <!-- INTEL -->
    <GbWindow title="About Landscape &amp; Nature Photography" class="fade-in">
      <div class="space-y-3 text-gray-300 leading-relaxed">
        <p class="pixel-label text-neon-green mb-1">▸ INTEL</p>
        <p>
          From expansive mountain ranges to delicate wildflowers, landscape and nature photography
          captures the beauty of our world in both grand vistas and intimate details. These images
          invite viewers to appreciate the quiet majesty of natural scenes and recognize the importance
          of preserving these environments.
        </p>
        <p>
          My approach emphasizes finding the perfect light, composition, and perspective to showcase
          the unique character of each location, whether it's a dramatic sunset over rolling hills or
          the intricate patterns in leaves and flowers.
        </p>
      </div>
    </GbWindow>

    <!-- ALBUM — inventory grid of slots -->
    <GbWindow title="Landscape &amp; Nature Gallery" class="fade-in">
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
      <NuxtLink to="/photography" class="btn-neon-outline inline-block">
        Back to Photography Collections
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// SSR fetch (SEO + no content flash).
const { images, heroImage } = useGalleryImages('nature', 'Landscape & Nature Photography');

const openDetail = (id) => navigateTo(`/photography/landscape-nature/${id}`);

useSeoMeta({
  title: 'Landscape & Nature Photography - Lasse Harm',
  ogTitle: 'Landscape & Nature Photography - Lasse Harm',
  description: 'Explore landscape and nature photography by Lasse Harm, featuring breathtaking views and close-ups of nature\'s wonders.',
  ogDescription: 'Explore landscape and nature photography by Lasse Harm, featuring breathtaking views and close-ups of nature\'s wonders.',
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
