<script setup lang="ts">
useSeoMeta({
  title: 'Lasse Harm | Web Development, Drone Photography & 3D Printing',
  ogTitle: 'Lasse Harm | Web Development, Drone Photography & 3D Printing',
  description: 'Professional web development, drone photography, and 3D printing services by Lasse Harm. Certified FPV drone pilot specializing in real estate aerial photography.',
  ogDescription: 'Professional web development, drone photography, and 3D printing services by Lasse Harm. Certified FPV drone pilot specializing in real estate aerial photography.',
  ogImage: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/q8dewf7gwhbqpk2/20240319_182201_N85s671DEL.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
  keywords: 'web development, drone photography, real estate photography, 3D printing, FPV drone, Lasse Harm',
});
</script>

<template>
  <div>
    <background-image-slider></background-image-slider>
    
    <!-- Services Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-2">Professional Services</h2>
        <div class="w-24 h-1 bg-primary mx-auto mb-12"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Web Development -->
          <div class="service-card bg-gray-50 rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105">
            <div class="icon-wrapper mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Web Development</h3>
            <p class="text-gray-600 mb-4">Custom websites and web applications built with modern technologies.</p>
            <NuxtLink to="/reel-web-projects" class="text-primary hover:underline">View projects →</NuxtLink>
          </div>
          
          <!-- Drone Photography -->
          <div class="service-card bg-gray-50 rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105">
            <div class="icon-wrapper mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-6.5L15 8" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Drone Photography</h3>
            <p class="text-gray-600 mb-4">Certified FPV drone pilot specializing in aerial photography and videography.</p>
            <NuxtLink to="/drone" class="text-primary hover:underline">Learn more →</NuxtLink>
          </div>
          
          <!-- Photography -->
          <div class="service-card bg-gray-50 rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105">
            <div class="icon-wrapper mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Photography</h3>
            <p class="text-gray-600 mb-4">Professional photography services for events, real estate, products and more.</p>
            <NuxtLink to="/photography" class="text-primary hover:underline">View portfolio →</NuxtLink>
          </div>
          
          <!-- 3D Printing -->
          <div class="service-card bg-gray-50 rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105">
            <div class="icon-wrapper mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">3D Printing</h3>
            <p class="text-gray-600 mb-4">Custom 3D printing services for prototypes, models, and functional parts.</p>
            <NuxtLink to="/3d-printing" class="text-primary hover:underline">Explore services →</NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <testimonials category="general" />
    
    <!-- CTA Section -->
    <section class="py-20 bg-primary text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">{{ $t('cta.title') }}</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">{{ $t('cta.description') }}</p>
        <NuxtLink to="/contact" class="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
          {{ $t('cta.button') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>