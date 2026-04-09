<template>
  <navigation></navigation>

  <div class="container mx-auto pt-24 py-16">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-white mb-4">{{ imageData.alt || 'Portrait Photography' }}</h1>
      <NuxtLink to="/photography/portraits-people" class="btn-neon-outline inline-block text-sm">
        Back to Portraits Gallery
      </NuxtLink>
    </div>

    <div class="max-w-4xl mx-auto px-4">
      <img
        v-if="imageData.src"
        :src="imageData.src"
        :alt="imageData.alt"
        class="w-full rounded-2xl border border-white/10 mb-8"
      />

      <div class="glass-card neon-border p-6 mb-8">
        <h2 class="text-2xl font-semibold text-neon-cyan mb-4">Image Details</h2>
        <div class="space-y-3 text-gray-300">
          <p v-if="imageData.alt"><strong class="text-white">Title:</strong> {{ imageData.alt }}</p>
          <p v-if="imageData.description"><strong class="text-white">Description:</strong> {{ imageData.description }}</p>
          <p v-if="imageData.location"><strong class="text-white">Location:</strong> {{ imageData.location }}</p>
          <p v-if="imageData.date"><strong class="text-white">Date:</strong> {{ imageData.date }}</p>
          <p><strong class="text-white">Category:</strong> Portraits & People</p>
        </div>
      </div>

      <div class="flex justify-between">
        <a
          v-if="prevImage"
          :href="`/photography/portraits-people/${prevImage.id}`"
          class="btn-neon-outline inline-block text-sm"
        >
          ← Previous Image
        </a>
        <div v-else></div>

        <a
          v-if="nextImage"
          :href="`/photography/portraits-people/${nextImage.id}`"
          class="btn-neon-outline inline-block text-sm"
        >
          Next Image →
        </a>
        <div v-else></div>
      </div>
    </div>
  </div>

  <footer-component></footer-component>
</template>

<script setup>
import Navigation from '~/components/navigation.vue';
import FooterComponent from '~/components/footerComponent.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const imageData = ref({});
const allImages = ref([]);
const prevImage = ref(null);
const nextImage = ref(null);

const route = useRoute();

onMounted(async () => {
  console.log('Portraits detail page mounted, All route params:', route.params);
  const id = route.params.id || '';
  console.log('Portraits detail - Using ID:', id);

  try {
    // Fetch all people images to build navigation
    const allImagesResponse = await fetch(`https://pocket.lasseharm.space/api/collections/portfolio_images/records?filter=(category='people')&perPage=1000`);
    const allImagesData = await allImagesResponse.json();

    allImages.value = allImagesData.items.map(item => ({
      id: item.id,
      thumbnail: `https://pocket.lasseharm.space/api/files/${item.collectionId}/${item.id}/${item.image}?thumb=300x0`,
      src: `https://pocket.lasseharm.space/api/files/${item.collectionId}/${item.id}/${item.image}`,
      alt: item.alt || 'Portrait Photography',
      description: item.description || '',
      location: item.location || '',
      date: item.date || '',
    }));

    // Find current image
    const currentIndex = allImages.value.findIndex(img => img.id === id);
    console.log('Current index:', currentIndex);

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
    }
  } catch (error) {
    console.error('Error fetching image data:', error);
  }
});
</script>
