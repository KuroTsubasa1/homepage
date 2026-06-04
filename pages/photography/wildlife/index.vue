<template>
  <hero
    :title="$t('photoCategories.wildlife') + ' ' + $t('nav.photography')"
    description="CAPTURING THE BEAUTY OF ANIMALS IN THEIR NATURAL HABITATS"
    :image="heroImage"
    class="fade-in"
  ></hero>

  <div class="container mx-auto px-4 max-w-5xl py-12 space-y-10">
    <!-- INTEL -->
    <GbWindow :title="$t('photography.aboutPhotography')" class="fade-in">
      <div class="space-y-3 text-gray-300 leading-relaxed">
        <p class="pixel-label text-neon-green mb-1">▸ INTEL</p>
        <p>
          Wildlife photography requires patience, technical skill, and a deep appreciation for nature.
          Each image represents hours of waiting for the perfect moment, understanding animal behavior,
          and respecting their natural environment.
        </p>
        <p>
          My wildlife photography aims to showcase the beauty, behaviors, and habitats of animals
          while raising awareness about conservation efforts and the importance of protecting these incredible creatures.
        </p>
      </div>
    </GbWindow>

    <!-- ALBUM — inventory grid of slots -->
    <GbWindow :title="$t('photoCategories.wildlife') + ' ' + $t('photography.gallery')" class="fade-in">
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
        {{ $t('photography.backToCollections') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// SSR fetch (SEO + no content flash).
const { images, heroImage } = useGalleryImages('wildlife', 'Wildlife Photography');

const openDetail = (id) => navigateTo(`/photography/wildlife/${id}`);

useSeoMeta({
  title: 'Wildlife Photography - Lasse Harm',
  ogTitle: 'Wildlife Photography - Lasse Harm',
  description: 'Explore wildlife photography by Lasse Harm, capturing the beauty and behavior of animals in their natural habitats.',
  ogDescription: 'Explore wildlife photography by Lasse Harm, capturing the beauty and behavior of animals in their natural habitats.',
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
