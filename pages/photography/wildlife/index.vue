<template>
  <hero
    :title="$t('photoCategories.wildlife') + ' ' + $t('nav.photography')"
    description="CAPTURING THE BEAUTY OF ANIMALS IN THEIR NATURAL HABITATS"
    :image="heroImage"
    class="fade-in"
  ></hero>

  <div class="container mx-auto py-16 fade-in">
    <div class="max-w-3xl mx-auto px-4 mb-16 animate-slide-up">
      <h2 class="text-3xl font-semibold gradient-text mb-6">{{ $t('photography.aboutPhotography') }}</h2>
      <p class="text-lg text-gray-300 mb-4">
        Wildlife photography requires patience, technical skill, and a deep appreciation for nature.
        Each image represents hours of waiting for the perfect moment, understanding animal behavior,
        and respecting their natural environment.
      </p>
      <p class="text-lg text-gray-300">
        My wildlife photography aims to showcase the beauty, behaviors, and habitats of animals
        while raising awareness about conservation efforts and the importance of protecting these incredible creatures.
      </p>
    </div>
  </div>

  <!-- Gallery Grid -->
  <div class="container mx-auto px-4 mb-16 fade-in">
    <h2 class="text-3xl font-semibold text-white mb-8 text-center">{{ $t('photoCategories.wildlife') }} {{ $t('photography.gallery') }}</h2>

    <div class="masonry-gallery">
      <div
        v-for="image in images"
        :key="image.id"
        class="masonry-item cartridge cursor-pointer overflow-hidden hover:border-neon-green/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(155,188,15,0.18)]"
        @click="openDetail(image.id)"
      >
        <div class="relative">
          <img
            :src="image.thumbnail"
            :alt="image.alt"
            class="w-full transition-transform duration-500 hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p class="text-white text-sm font-medium">{{ image.alt }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container mx-auto pb-16 fade-in">
    <div class="flex justify-center mb-8">
      <NuxtLink to="/photography" class="btn-neon-outline font-pixel inline-block">
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
  animation: fadeIn 2s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.masonry-gallery {
  columns: 1;
  column-gap: 1.5rem;
}

.masonry-item {
  display: inline-block;
  margin-bottom: 1.5rem;
  width: 100%;
  break-inside: avoid;
}

/* Responsive columns */
@media (min-width: 640px) {
  .masonry-gallery {
    columns: 2;
  }
}

@media (min-width: 768px) {
  .masonry-gallery {
    columns: 3;
  }
}

@media (min-width: 1024px) {
  .masonry-gallery {
    columns: 4;
  }
}
</style>