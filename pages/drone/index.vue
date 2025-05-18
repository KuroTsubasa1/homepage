<script setup lang="ts">
import Navigation from "~/components/navigation.vue";
import FooterComponent from "~/components/footerComponent.vue";
import ProjectGrid from "~/components/projectGrid.vue";
import { ref } from 'vue';

useSeoMeta({
  title: 'Drone Photography & Videography - Lasse Harm',
  ogTitle: 'Drone Photography & Videography - Lasse Harm',
  description: 'Professional drone photography and videography services by Lasse Harm. Aerial footage for real estate, events, and creative projects.',
  ogDescription: 'Professional drone photography and videography services by Lasse Harm. Aerial footage for real estate, events, and creative projects.',
  ogImage: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
});

const drones = ref([
  { 
    name: 'DJI Air 2S', 
    description: 'Professional 1-inch sensor, 5.4K video, MasterShots intelligent shooting modes. Perfect for real estate and landscape photography.',
    image: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg?thumb=300x300',
    features: ['5.4K Video', '1" CMOS Sensor', '12km Range', '31min Flight Time'] 
  },
  { 
    name: '5" Freestyle FPV', 
    description: 'Custom-built for dynamic and cinematic movements. Ideal for creative filmmaking and dynamic aerial footage.',
    image: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg?thumb=300x300',
    features: ['HD Digital Video', 'Manual Mode', 'Custom Build', 'GoPro Mount'] 
  },
  { 
    name: 'Cinewhoop FPV', 
    description: 'Protected design for indoor flying. Perfect for immersive interior real estate tours and event coverage.',
    image: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg?thumb=300x300',
    features: ['Protected Props', 'HD Video', 'Interior Safe', 'Smooth Movement'] 
  }
]);

const services = ref([
  {
    title: 'Real Estate Aerial Photography',
    description: 'Showcase properties from their best angle with stunning aerial photography. Perfect for highlighting large properties, land plots, and scenic surroundings.',
    icon: 'fa-solid-home'
  },
  {
    title: 'Property Video Tours',
    description: 'Immersive property tours combining aerial footage with smooth interior fly-throughs. Create a comprehensive viewing experience that sets your listings apart.',
    icon: 'fa-solid-video'
  },
  {
    title: 'Event Coverage',
    description: 'Capture weddings, festivals, sports events, and corporate gatherings from unique perspectives that ground-based photography can\'t achieve.',
    icon: 'fa-solid-calendar'
  },
  {
    title: 'Industrial Inspections',
    description: 'Safe and cost-effective inspections of roofs, buildings, towers, and other hard-to-reach structures. High-resolution imagery for detailed assessment.',
    icon: 'fa-solid-cog'
  }
]);
</script>

<template>
  <navigation></navigation>

  <!-- Hero Section -->
  <section class="relative h-screen">
    <div class="absolute inset-0 bg-black opacity-50 z-10"></div>
    <div class="absolute inset-0 z-0">
      <video class="w-full h-full object-cover" autoplay muted loop>
        <source src="https://pocket.lasseharm.space/api/files/video-placeholder.mp4" type="video/mp4">
        <!-- Fallback image if video can't load -->
        <img src="https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg" alt="Drone aerial view" class="w-full h-full object-cover">
      </video>
    </div>
    <div class="absolute inset-0 flex items-center justify-center z-20">
      <div class="text-center text-white px-4">
        <h1 class="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">Aerial Photography & Videography</h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Capturing breathtaking perspectives from above</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#services" class="btn btn-primary px-6 py-3 rounded-full text-lg">View Services</a>
          <a href="/contact" class="btn bg-white text-primary px-6 py-3 rounded-full text-lg hover:bg-gray-100">Get a Quote</a>
        </div>
      </div>
    </div>
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
      <div class="animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>

  <!-- Equipment Section -->
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-4">Professional Drone Fleet</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">Equipped with the latest technology to capture stunning aerial imagery for any project</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(drone, index) in drones" :key="index" class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
          <img :src="drone.image" :alt="drone.name" class="w-full h-56 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-bold text-primary mb-2">{{ drone.name }}</h3>
            <p class="text-gray-600 mb-4">{{ drone.description }}</p>
            <div class="grid grid-cols-2 gap-2">
              <div v-for="(feature, fidx) in drone.features" :key="fidx" class="bg-gray-100 px-3 py-1 rounded text-sm text-gray-700">
                {{ feature }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-4">Drone Services</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">Specialized aerial photography and videography services for various applications</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="(service, index) in services" :key="index" class="bg-white p-8 rounded-lg shadow-lg border-l-4 border-primary transition-all duration-300 hover:shadow-xl">
          <h3 class="text-2xl font-bold text-primary mb-4">{{ service.title }}</h3>
          <p class="text-gray-600 mb-6">{{ service.description }}</p>
          <a href="/contact" class="text-primary font-semibold flex items-center hover:underline">
            Get a Quote
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Sample Work -->
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-4">Featured Drone Projects</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">Browse through a selection of our best aerial photography and videography work</p>
      </div>
      
      <project-grid category="drone"></project-grid>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-16 bg-gradient-to-r from-primary to-secondary text-white text-center">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-6">Ready to elevate your perspective?</h2>
      <p class="text-xl mb-8 max-w-3xl mx-auto">Contact me today to discuss your drone photography and videography needs</p>
      <a href="/contact" class="btn px-8 py-3 font-bold bg-white text-primary rounded-full text-lg hover:bg-gray-100 transition-transform inline-block">
        Get in Touch
      </a>
    </div>
  </section>

  <footer-component></footer-component>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>