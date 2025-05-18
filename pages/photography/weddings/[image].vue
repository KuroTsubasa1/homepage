<template>
  <navigation></navigation>

  <!-- Sticky Header -->
  <header class="sticky top-0 bg-white shadow-md z-10">
    <div class="container mx-auto flex justify-between items-center px-4 py-3">
      <h1 class="text-2xl font-bold text-primary">{{ imageData.alt || 'Wedding Photography' }}</h1>
      <button
          class="btn px-4 py-2 text-white bg-primary rounded hover:bg-primary-dark"
          @click="$router.push('/photography/weddings')"
      >
        Back to Wedding Gallery
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
          class="w-full rounded-lg shadow-xl mb-8"
        />

        <div class="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold text-primary mb-4">Image Details</h2>
          <div class="space-y-3">
            <p v-if="imageData.alt"><strong>Title:</strong> {{ imageData.alt }}</p>
            <p v-if="imageData.description"><strong>Description:</strong> {{ imageData.description }}</p>
            <p v-if="imageData.location"><strong>Location:</strong> {{ imageData.location }}</p>
            <p v-if="imageData.date"><strong>Date:</strong> {{ imageData.date }}</p>
            <p v-if="imageData.camera"><strong>Camera:</strong> {{ imageData.camera }}</p>
            <p v-if="imageData.lens"><strong>Lens:</strong> {{ imageData.lens }}</p>
            <p v-if="imageData.settings"><strong>Settings:</strong> {{ imageData.settings }}</p>
            <p><strong>Category:</strong> Wedding Photography</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- More Images Section -->
  <section class="related-images-section py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-primary mb-8 text-center">More Wedding Photography</h2>
      <div class="more-images-container">
        <image-gallery category="weddings" :useDetailPages="false" class="fade-in"></image-gallery>
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
          class="btn btn-outline btn-primary"
        >
          ← Previous Image
        </button>
        <div v-else></div>
        
        <button 
          @click="$router.push('/photography/weddings')" 
          class="btn btn-primary"
        >
          Back to Gallery
        </button>
        
        <button 
          v-if="nextImage" 
          @click="navigateToImage(nextImage.id)" 
          class="btn btn-outline btn-primary"
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
  router.push(`/photography/weddings/${id}`);
};

onMounted(async () => {
  const id = route.params.image;
  
  // Fetch all wedding images to build navigation
  const allImagesResponse = await fetch(`https://pocket.lasseharm.space/api/collections/portfolio_images/records?filter=(category='weddings')&perPage=1000`);
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
    router.push('/photography/weddings');
  }
  
  // Set SEO metadata
  useSeoMeta({
    title: `${imageData.value.alt || 'Wedding Photography'} - Lasse Harm`,
    description: imageData.value.description || 'Detailed view of wedding photography by Lasse Harm.',
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

.container {
  max-width: 1200px;
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