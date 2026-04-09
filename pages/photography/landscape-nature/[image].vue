<template>
  <navigation></navigation>

  <!-- Sticky Header -->
  <header class="sticky top-0 bg-dark/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-neon-cyan/5 z-10">
    <div class="container mx-auto flex justify-between items-center px-4 py-3">
      <h1 class="text-2xl font-bold text-white">{{ imageData.alt || 'Landscape & Nature Photography' }}</h1>
      <button
          class="btn-neon-outline text-sm"
          @click="$router.push('/photography/landscape-nature')"
      >
        Back to Landscape Gallery
      </button>
    </div>
  </header>

  <!-- Main Image Section -->
  <section class="image-section py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <img
          v-if="imageData.src"
          :src="imageData.src"
          :alt="imageData.alt"
          class="w-full rounded-2xl border border-white/10 mb-8"
        />

        <div class="glass-card neon-border p-6">
          <h2 class="text-2xl font-semibold text-neon-cyan mb-4">Image Details</h2>
          <div class="space-y-3 text-gray-300">
            <p v-if="imageData.alt"><strong class="text-white">Title:</strong> {{ imageData.alt }}</p>
            <p v-if="imageData.description"><strong class="text-white">Description:</strong> {{ imageData.description }}</p>
            <p v-if="imageData.location"><strong class="text-white">Location:</strong> {{ imageData.location }}</p>
            <p v-if="imageData.date"><strong class="text-white">Date:</strong> {{ imageData.date }}</p>
            <p v-if="imageData.camera"><strong class="text-white">Camera:</strong> {{ imageData.camera }}</p>
            <p v-if="imageData.lens"><strong class="text-white">Lens:</strong> {{ imageData.lens }}</p>
            <p v-if="imageData.settings"><strong class="text-white">Settings:</strong> {{ imageData.settings }}</p>
            <p><strong class="text-white">Category:</strong> Landscape & Nature</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- More Images Section -->
  <section class="related-images-section py-16 bg-dark-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-white mb-8 text-center">More Landscape & Nature Photography</h2>
      <div class="more-images-container">
        <image-gallery category="nature" :useDetailPages="false" class="fade-in"></image-gallery>
      </div>
    </div>
  </section>

  <!-- Navigation for Images -->
  <section class="image-navigation py-8">
    <div class="container mx-auto px-4">
      <div class="flex justify-between">
        <button
          v-if="prevImage"
          @click="navigateToImage(prevImage.id)"
          class="btn-neon-outline text-sm"
        >
          ← Previous Image
        </button>
        <div v-else></div>

        <button
          @click="$router.push('/photography/landscape-nature')"
          class="btn-neon text-sm"
        >
          Back to Gallery
        </button>

        <button
          v-if="nextImage"
          @click="navigateToImage(nextImage.id)"
          class="btn-neon-outline text-sm"
        >
          Next Image →
        </button>
        <div v-else></div>
      </div>
    </div>
  </section>

  <footer-component></footer-component>
</template>

<script setup>
import Navigation from '~/components/navigation.vue';
import FooterComponent from '~/components/footerComponent.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const imageData = ref({});
const allImages = ref([]);
const prevImage = ref(null);
const nextImage = ref(null);

const route = useRoute();
const router = useRouter();

const navigateToImage = (id) => {
  router.push(`/photography/landscape-nature/${id}`);
};

onMounted(async () => {
  const id = route.params.image;

  // Fetch all nature images to build navigation
  const allImagesResponse = await fetch(`https://pocket.lasseharm.space/api/collections/portfolio_images/records?filter=(category='nature')&perPage=1000`);
  const allImagesData = await allImagesResponse.json();

  allImages.value = allImagesData.items.map(item => ({
    id: item.id,
    thumbnail: `https://pocket.lasseharm.space/api/files/${item.collectionId}/${item.id}/${item.image}?thumb=300x0`,
    src: `https://pocket.lasseharm.space/api/files/${item.collectionId}/${item.id}/${item.image}`,
    alt: item.alt,
    description: item.description || '',
    location: item.location || '',
    date: item.date || '',
    camera: item.camera || '',
    lens: item.lens || '',
    settings: item.settings || '',
  }));

  // Find current image
  const currentIndex = allImages.value.findIndex(img => img.id === id);

  if (currentIndex > -1) {
    imageData.value = allImages.value[currentIndex];

    // Set previous image
    if (currentIndex > 0) {
      prevImage.value = allImages.value[currentIndex - 1];
    }

    // Set next image
    if (currentIndex < allImages.value.length - 1) {
      nextImage.value = allImages.value[currentIndex + 1];
    }
  } else {
    // Image not found, redirect to gallery
    router.push('/photography/landscape-nature');
  }

  // Set SEO metadata
  useSeoMeta({
    title: `${imageData.value.alt || 'Landscape & Nature Photography'} - Lasse Harm`,
    description: imageData.value.description || 'Detailed view of landscape and nature photography by Lasse Harm.',
    ogImage: imageData.value.src,
  });
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

.more-images-container {
  /* Hide the current image from the gallery */
  :deep(.masonry-sm > div),
  :deep(.masonry-md > div) {
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  :deep(.masonry-sm > div:hover),
  :deep(.masonry-md > div:hover) {
    opacity: 1;
  }
}
</style>
