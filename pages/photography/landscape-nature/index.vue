<template>
  <hero
    title="Landscape & Nature" 
    description="BREATHTAKING VIEWS AND INTIMATE DETAILS OF THE NATURAL WORLD" 
    :image="heroImage"
    class="fade-in"
  ></hero>

  <div class="container mx-auto py-16 fade-in">
    <div class="max-w-3xl mx-auto px-4 mb-16">
      <h2 class="text-3xl font-semibold mb-6 gradient-text">About Landscape & Nature Photography</h2>
      <p class="text-lg text-gray-300 mb-4">
        From expansive mountain ranges to delicate wildflowers, landscape and nature photography 
        captures the beauty of our world in both grand vistas and intimate details. These images 
        invite viewers to appreciate the quiet majesty of natural scenes and recognize the importance 
        of preserving these environments.
      </p>
      <p class="text-lg text-gray-300">
        My approach emphasizes finding the perfect light, composition, and perspective to showcase 
        the unique character of each location, whether it's a dramatic sunset over rolling hills or 
        the intricate patterns in leaves and flowers.
      </p>
    </div>
  </div>

  <!-- Gallery Grid -->
  <div class="container mx-auto px-4 mb-16 fade-in">
    <h2 class="text-3xl font-semibold text-white mb-8 text-center">Landscape & Nature Gallery</h2>
    
    <div class="masonry-gallery">
      <div 
        v-for="image in images" 
        :key="image.id" 
        class="masonry-item cartridge cursor-pointer overflow-hidden rounded-xl border border-white/10 hover:border-neon-green/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(155,188,15,0.18)]"
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
      <NuxtLink to="/photography" class="btn-neon-outline inline-block font-pixel text-xs">
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