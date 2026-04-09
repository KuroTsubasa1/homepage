<template>
  <navigation></navigation>

  <hero 
    title="Abstract & Art" 
    description="CREATIVE INTERPRETATIONS AND VISUAL EXPRESSIONS" 
    :image="heroImage"
    class="fade-in"
  ></hero>

  <div class="container mx-auto py-16 fade-in">
    <div class="max-w-3xl mx-auto px-4 mb-16">
      <h2 class="text-3xl font-semibold text-neon-cyan mb-6">About Abstract Photography</h2>
      <p class="text-lg text-gray-300 mb-4">
        Abstract photography breaks free from literal representation to explore shape, form, color, 
        pattern, and texture. These images invite viewers to see the world differently, finding beauty 
        in unexpected places and challenging conventional perception.
      </p>
      <p class="text-lg text-gray-300">
        My abstract work experiments with unconventional angles, close-ups, motion, light painting, 
        and other techniques to transform ordinary subjects into extraordinary visual experiences. 
        Each image represents a creative exploration that balances intuition with deliberate artistic choices.
      </p>
    </div>
  </div>

  <!-- Gallery Grid -->
  <div class="container mx-auto px-4 mb-16 fade-in">
    <h2 class="text-3xl font-semibold text-white mb-8 text-center">Abstract Gallery</h2>
    
    <div class="masonry-gallery">
      <div 
        v-for="image in images" 
        :key="image.id" 
        class="masonry-item cursor-pointer overflow-hidden rounded-xl border border-white/10 hover:border-neon-cyan/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
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
      <NuxtLink to="/photography" class="btn-neon-outline inline-block">
        Back to Photography Collections
      </NuxtLink>
    </div>
  </div>

  <footer-component></footer-component>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const images = ref([]);
const heroImage = ref('');

onMounted(async () => {
  const response = await fetch(`https://pocket.lasseharm.space/api/collections/portfolio_images/records?filter=(category='abstract')&perPage=1000`);
  const data = await response.json();

  images.value = data.items.map(item => ({
    id: item.id,
    thumbnail: `https://pocket.lasseharm.space/api/files/${item.collectionId}/${item.id}/${item.image}?thumb=300x0`,
    src: `https://pocket.lasseharm.space/api/files/${item.collectionId}/${item.id}/${item.image}`,
    alt: item.alt || 'Abstract & Art Photography',
  }));
  if (images.value.length > 0) heroImage.value = images.value[0].src;
});

const openDetail = (id) => {
  console.log('Opening abstract detail page for:', id);
  // Try direct navigation instead of router.push
  window.location.href = `/photography/abstract-art/${id}`;
};

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