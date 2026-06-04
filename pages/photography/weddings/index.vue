<template>
  <hero
    :title="$t('wedding.title')" 
    :description="$t('photography.capturing').toUpperCase()" 
    :image="heroImage"
    class="fade-in"
  ></hero>

  <div class="container mx-auto py-16 fade-in">
    <div class="max-w-3xl mx-auto px-4 mb-16">
      <h2 class="text-3xl font-semibold text-neon-cyan mb-6">{{ $t('photography.aboutPhotography') }}</h2>
      <p class="text-lg text-gray-300 mb-4">
        Wedding photography is the art of documenting one of life's most significant celebrations. 
        It combines elements of portraiture, documentary, and artistic photography to create a 
        comprehensive visual story of the couple's special day.
      </p>
      <p class="text-lg text-gray-300">
        My approach to wedding photography balances carefully composed formal portraits with 
        candid, unscripted moments that capture genuine emotions and interactions. I work 
        unobtrusively to document the day as it unfolds naturally, while also providing gentle 
        direction when needed to create beautiful, timeless images.
      </p>
      <p class="text-lg mt-4">
        From the nervous anticipation before the ceremony to the joy of the first dance, I aim to 
        preserve all the meaningful moments and details that together tell the unique story of 
        each wedding celebration.
      </p>
    </div>
  </div>

  <!-- Gallery Masonry -->
  <div class="container mx-auto px-4 mb-16 fade-in">
    <h2 class="text-3xl font-semibold text-white mb-8 text-center">{{ $t('wedding.portfolio') }}</h2>
    
    <div class="masonry-gallery">
      <div 
        v-for="image in images" 
        :key="image.id" 
        class="masonry-item cartridge cursor-pointer overflow-hidden hover:border-neon-cyan/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(155,188,15,0.18)]"
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
        {{ $t('photography.backToCollections') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// SSR fetch (SEO + no content flash).
const { images, heroImage } = useGalleryImages('weddings', 'Wedding Photography');

const openDetail = (id) => navigateTo(`/photography/weddings/${id}`);

useSeoMeta({
  title: 'Wedding Photography - Lasse Harm',
  ogTitle: 'Wedding Photography - Lasse Harm',
  description: 'Explore wedding photography by Lasse Harm, capturing the magic, emotions, and precious moments of wedding celebrations.',
  ogDescription: 'Explore wedding photography by Lasse Harm, capturing the magic, emotions, and precious moments of wedding celebrations.',
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