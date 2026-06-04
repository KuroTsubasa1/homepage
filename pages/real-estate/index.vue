<script setup lang="ts">
import { ref } from 'vue';

useSeoMeta({
  title: "Real Estate Photography Services - Lasse Harm",
  ogTitle: "Real Estate Photography Services - Lasse Harm",
  description: "Professional real estate photography services in Denmark. Interior, exterior, aerial drone photography, and virtual tours for property listings.",
  ogDescription: "Professional real estate photography services in Denmark. Interior, exterior, aerial drone photography, and virtual tours for property listings.",
  ogImage: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0",
  twitterCard: "summary_large_image",
});

const testimonials = ref([
  {
    name: "Sarah Johnson",
    company: "Elite Real Estate",
    text: "Lasse's photography completely transformed our property listings. The quality and attention to detail is outstanding, and our properties are selling faster than ever.",
    image: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=100x100"
  },
  {
    name: "Michael Peters",
    company: "Coastal Properties",
    text: "The aerial drone photography gave our luxury listings the edge we needed in a competitive market. Highly professional service from start to finish.",
    image: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=100x100"
  },
  {
    name: "Emma Nielsen",
    company: "Copenhagen Homes",
    text: "Working with Lasse has been game-changing for our agency. The virtual tours and professional photography have significantly increased engagement on our listings.",
    image: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=100x100"
  }
]);

const services = ref([
  {
    title: "Interior Photography",
    description: "Professional interior photography with expert composition, balanced lighting, and wide-angle perspectives that showcase your property at its absolute best.",
    features: ["High-resolution images", "Professional lighting", "Color correction", "Wide-angle lenses", "Same-day delivery options"],
    image: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=400x300"
  },
  {
    title: "Aerial Drone Photography",
    description: "Stunning aerial perspectives that highlight your property's location, surroundings, and key features. Perfect for showcasing large properties and land parcels.",
    features: ["Aerial property photos", "Neighborhood context", "Bird's eye views", "Licensed drone pilot", "HD video options"],
    image: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg?thumb=400x300"
  },
  {
    title: "Virtual Tours",
    description: "Immersive 3D virtual tours that allow potential buyers to explore properties from anywhere, at any time. Significantly increases engagement and qualification of leads.",
    features: ["360° room views", "Interactive exploration", "Embedded in listings", "Mobile-friendly", "Detailed floor plans"],
    image: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=400x300"
  },
  {
    title: "Twilight Photography",
    description: "Capture your property in the magical \"blue hour\" just after sunset. Creates a warm, inviting atmosphere that makes luxury properties truly stand out.",
    features: ["Dramatic lighting", "Enhanced curb appeal", "Luxury property focus", "Interior/exterior balance", "Professional editing"],
    image: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=400x300"
  }
]);

const portfolioImages = ref([
  { src: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=400x300", alt: "Luxury living room with ocean view", type: "interior" },
  { src: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg?thumb=400x300", alt: "Aerial view of estate property", type: "aerial" },
  { src: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=400x300", alt: "Modern kitchen interior", type: "interior" },
  { src: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg?thumb=400x300", alt: "Twilight exterior of luxury home", type: "twilight" },
  { src: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=400x300", alt: "Elegant master bedroom", type: "interior" },
  { src: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg?thumb=400x300", alt: "Aerial view of property and surroundings", type: "aerial" },
]);

const activeFilter = ref("all");

const filteredImages = computed(() => {
  if (activeFilter.value === "all") {
    return portfolioImages.value;
  }
  return portfolioImages.value.filter(img => img.type === activeFilter.value);
});

const setFilter = (filter) => {
  activeFilter.value = filter;
};

const pricing = ref([
  {
    name: "Standard Package",
    price: "2,500 kr",
    features: [
      "Up to 15 high-resolution photos",
      "Professional editing & color correction",
      "Basic virtual tour",
      "Next business day delivery",
      "Commercial usage rights"
    ],
    recommended: false
  },
  {
    name: "Premium Package",
    price: "4,000 kr",
    features: [
      "Up to 25 high-resolution photos",
      "Professional editing & color correction",
      "Full 3D virtual tour",
      "Aerial drone photography (5 images)",
      "Same-day rush delivery available",
      "Commercial usage rights"
    ],
    recommended: true
  },
  {
    name: "Luxury Package",
    price: "6,500 kr",
    features: [
      "Unlimited high-resolution photos",
      "Professional editing & color correction",
      "Premium 3D virtual tour with floor plan",
      "Comprehensive aerial drone photos & video",
      "Twilight exterior photography",
      "Same-day rush delivery available",
      "Commercial usage rights",
      "Social media content optimization"
    ],
    recommended: false
  }
]);
</script>

<template>
  <!-- Hero Section -->
  <section class="relative bg-cover bg-center min-h-[calc(100vh-13rem)]" style="background-image: url('https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=1920x1080')">
    <div class="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark"></div>
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px]"></div>
    <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/8 rounded-full blur-[100px]"></div>
    <div class="relative z-10 min-h-[calc(100vh-13rem)] flex items-center justify-center text-center px-4">
      <div class="max-w-4xl animate-slide-up">
        <p class="font-pixel text-xs text-neon-green mb-4 tracking-widest">Real Estate</p>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
          <span class="gradient-text">Professional Real Estate Photography</span>
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-gray-300">Showcase properties at their absolute best with stunning photography that sells</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#services" class="btn-neon font-pixel text-lg animate-glow-pulse">View Services</a>
          <a href="#pricing" class="btn-neon-outline font-pixel text-lg">See Pricing</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-24 bg-dark relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="absolute top-0 right-0 w-80 h-80 bg-neon-purple/5 rounded-full blur-[100px]"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-neon-green/5 rounded-full blur-[120px]"></div>
    <div class="container mx-auto px-4 relative z-10">
      <h2 class="section-heading">Real Estate Photography Services</h2>
      <div class="section-divider"></div>
      <p class="text-lg text-gray-400 max-w-3xl mx-auto text-center mb-16">Comprehensive photography services designed to make your properties stand out in a competitive market</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div v-for="(service, index) in services" :key="index" class="glass-card neon-border overflow-hidden transition-all duration-300 group">
          <div class="cartridge relative overflow-hidden">
            <img :src="service.image" :alt="service.title" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-bold text-neon-green mb-3">{{ service.title }}</h3>
            <p class="text-gray-400 mb-4">{{ service.description }}</p>
            <ul class="mb-6">
              <li v-for="(feature, fidx) in service.features" :key="fidx" class="flex items-center mb-2">
                <svg class="h-5 w-5 text-neon-green mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-300">{{ feature }}</span>
              </li>
            </ul>
            <a href="/contact" class="btn-neon font-pixel inline-block">Get a Quote</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Portfolio Section -->
  <section class="py-24 bg-dark-100 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="absolute top-1/3 right-0 w-72 h-72 bg-neon-purple/5 rounded-full blur-[100px]"></div>
    <div class="container mx-auto px-4 relative z-10">
      <h2 class="section-heading">Portfolio</h2>
      <div class="section-divider"></div>
      <p class="text-lg text-gray-400 max-w-3xl mx-auto text-center mb-12">Browse through samples of our real estate photography work</p>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap justify-center mb-10 gap-4">
        <button
          @click="setFilter('all')"
          class="px-6 py-2 rounded-full transition-all duration-300 font-pixel text-xs"
          :class="activeFilter === 'all' ? 'bg-neon-green/20 text-neon-green border border-neon-green/40' : 'bg-dark-200 text-gray-400 border border-white/10 hover:border-white/20 hover:text-gray-300'"
        >
          All Photos
        </button>
        <button
          @click="setFilter('interior')"
          class="px-6 py-2 rounded-full transition-all duration-300 font-pixel text-xs"
          :class="activeFilter === 'interior' ? 'bg-neon-green/20 text-neon-green border border-neon-green/40' : 'bg-dark-200 text-gray-400 border border-white/10 hover:border-white/20 hover:text-gray-300'"
        >
          Interior
        </button>
        <button
          @click="setFilter('aerial')"
          class="px-6 py-2 rounded-full transition-all duration-300 font-pixel text-xs"
          :class="activeFilter === 'aerial' ? 'bg-neon-green/20 text-neon-green border border-neon-green/40' : 'bg-dark-200 text-gray-400 border border-white/10 hover:border-white/20 hover:text-gray-300'"
        >
          Aerial
        </button>
        <button
          @click="setFilter('twilight')"
          class="px-6 py-2 rounded-full transition-all duration-300 font-pixel text-xs"
          :class="activeFilter === 'twilight' ? 'bg-neon-green/20 text-neon-green border border-neon-green/40' : 'bg-dark-200 text-gray-400 border border-white/10 hover:border-white/20 hover:text-gray-300'"
        >
          Twilight
        </button>
      </div>

      <!-- Image Gallery -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(image, index) in filteredImages" :key="index" class="cartridge glass-card neon-border overflow-hidden transition-all duration-300 group">
          <div class="relative">
            <img :src="image.src" :alt="image.alt" class="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <p class="text-gray-200 p-4 font-medium">{{ image.alt }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-24 bg-dark relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[120px]"></div>
    <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-neon-purple/5 rounded-full blur-[100px]"></div>
    <div class="container mx-auto px-4 relative z-10">
      <h2 class="section-heading">Transparent Pricing</h2>
      <div class="section-divider"></div>
      <p class="text-lg text-gray-400 max-w-3xl mx-auto text-center mb-16">Choose the package that best fits your property's needs</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(plan, index) in pricing" :key="index"
          class="glass-card overflow-hidden transition-all duration-300 hover:-translate-y-2"
          :class="plan.recommended ? 'neon-border border-neon-green/60' : 'neon-border'"
        >
          <div v-if="plan.recommended" class="bg-neon-green text-dark text-center py-2">
            <span class="font-pixel text-xs">Most Popular</span>
          </div>
          <div class="p-8">
            <h3 class="text-2xl font-bold text-neon-green mb-2">{{ plan.name }}</h3>
            <div class="text-4xl font-bold text-white mb-6">{{ plan.price }}</div>
            <ul class="mb-8">
              <li v-for="(feature, fidx) in plan.features" :key="fidx" class="flex items-center mb-3">
                <svg class="h-5 w-5 text-neon-green mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-300">{{ feature }}</span>
              </li>
            </ul>
            <a href="/contact" class="block text-center font-pixel w-full"
              :class="plan.recommended ? 'btn-neon' : 'btn-neon-outline'">
              Choose Plan
            </a>
          </div>
        </div>
      </div>

      <div class="text-center mt-10 text-gray-400">
        <p>Not sure which package is right for you? <a href="/contact" class="text-neon-green font-medium link-glow">Contact us</a> for a custom quote.</p>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="py-24 bg-dark-100 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]"></div>
    <div class="container mx-auto px-4 relative z-10">
      <h2 class="section-heading">What Clients Say</h2>
      <div class="section-divider"></div>
      <p class="text-lg text-gray-400 max-w-3xl mx-auto text-center mb-16">Don't just take our word for it - hear from real estate professionals who've seen results</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="glass-card neon-border p-8">
          <div class="flex items-center mb-6">
            <img :src="testimonial.image" :alt="testimonial.name" class="w-16 h-16 rounded-full mr-4 border-2 border-neon-green/40">
            <div>
              <h3 class="font-bold text-lg text-white">{{ testimonial.name }}</h3>
              <p class="text-gray-400">{{ testimonial.company }}</p>
            </div>
          </div>
          <p class="text-gray-300 italic">"{{ testimonial.text }}"</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-dark relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-neon-green/10 via-neon-purple/10 to-neon-cyan/10"></div>
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[150px]"></div>
    <div class="container mx-auto px-4 text-center relative z-10">
      <h2 class="text-3xl md:text-4xl font-black mb-6">
        <span class="gradient-text">Ready to showcase your properties at their best?</span>
      </h2>
      <p class="text-xl mb-8 max-w-3xl mx-auto text-gray-300">Contact me today to discuss your real estate photography needs</p>
      <a href="/contact" class="btn-neon font-pixel text-lg inline-block animate-glow-pulse">
        Get Started
      </a>
    </div>
  </section>
</template>

<style scoped>
</style>
