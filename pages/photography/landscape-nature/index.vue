<template>
  <navigation></navigation>

  <hero 
    title="Landscape & Nature" 
    description="BREATHTAKING VIEWS AND INTIMATE DETAILS OF THE NATURAL WORLD" 
    image="https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0" 
    class="fade-in"
  ></hero>

  <div class="container mx-auto py-16 fade-in">
    <div class="max-w-3xl mx-auto px-4 mb-16">
      <h2 class="text-3xl font-semibold text-primary mb-6">About Landscape & Nature Photography</h2>
      <p class="text-lg mb-4">
        From expansive mountain ranges to delicate wildflowers, landscape and nature photography 
        captures the beauty of our world in both grand vistas and intimate details. These images 
        invite viewers to appreciate the quiet majesty of natural scenes and recognize the importance 
        of preserving these environments.
      </p>
      <p class="text-lg">
        My approach emphasizes finding the perfect light, composition, and perspective to showcase 
        the unique character of each location, whether it's a dramatic sunset over rolling hills or 
        the intricate patterns in leaves and flowers.
      </p>
    </div>
  </div>

  <!-- Gallery Grid -->
  <div class="container mx-auto px-4 mb-16 fade-in">
    <h2 class="text-3xl font-semibold text-primary mb-8 text-center">Landscape & Nature Gallery</h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div 
        v-for="image in images" 
        :key="image.id" 
        class="cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
        @click="openDetail(image.id)"
      >
        <div class="relative aspect-square">
          <img 
            :src="image.thumbnail" 
            :alt="image.alt" 
            class="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
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
      <NuxtLink to="/photography" class="btn btn-primary">
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

onMounted(async () => {
  const response = await fetch(`https://pocket.lasseharm.space/api/collections/portfolio_images/records?filter=(category='nature')&perPage=1000`);
  const data = await response.json();

  images.value = data.items.map(item => ({
    id: item.id,
    thumbnail: `https://pocket.lasseharm.space/api/files/${item.collectionId}/${item.id}/${item.image}?thumb=300x0`,
    src: `https://pocket.lasseharm.space/api/files/${item.collectionId}/${item.id}/${item.image}`,
    alt: item.alt || 'Landscape & Nature Photography',
  }));
});

const openDetail = (id) => {
  console.log('Opening landscape detail page for:', id);
  // Try direct navigation instead of router.push
  window.location.href = `/photography/landscape-nature/${id}`;
};

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
</style>