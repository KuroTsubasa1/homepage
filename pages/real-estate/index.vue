<script setup lang="ts">
import Navigation from "~/components/navigation.vue";
import FooterComponent from "~/components/footerComponent.vue";
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
  <navigation></navigation>

  <!-- Hero Section -->
  <section class="relative bg-cover bg-center h-screen" style="background-image: url('https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=1920x1080')">
    <div class="absolute inset-0 bg-black opacity-40"></div>
    <div class="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
      <div class="max-w-4xl">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">Professional Real Estate Photography</h1>
        <p class="text-xl md:text-2xl mb-8">Showcase properties at their absolute best with stunning photography that sells</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#services" class="btn btn-primary px-6 py-3 rounded-full text-lg">View Services</a>
          <a href="#pricing" class="btn bg-white text-primary px-6 py-3 rounded-full text-lg hover:bg-gray-100">See Pricing</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-4">Real Estate Photography Services</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">Comprehensive photography services designed to make your properties stand out in a competitive market</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div v-for="(service, index) in services" :key="index" class="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <img :src="service.image" :alt="service.title" class="w-full h-64 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-bold text-primary mb-3">{{ service.title }}</h3>
            <p class="text-gray-600 mb-4">{{ service.description }}</p>
            <ul class="mb-6">
              <li v-for="(feature, fidx) in service.features" :key="fidx" class="flex items-center mb-2">
                <svg class="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-600">{{ feature }}</span>
              </li>
            </ul>
            <a href="/contact" class="btn btn-primary rounded-full px-6 py-2 inline-block">Get a Quote</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Portfolio Section -->
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-primary mb-4">Portfolio</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">Browse through samples of our real estate photography work</p>
      </div>
      
      <!-- Filter Buttons -->
      <div class="flex flex-wrap justify-center mb-10 gap-4">
        <button 
          @click="setFilter('all')" 
          class="px-6 py-2 rounded-full transition-colors"
          :class="activeFilter === 'all' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-100'"
        >
          All Photos
        </button>
        <button 
          @click="setFilter('interior')" 
          class="px-6 py-2 rounded-full transition-colors"
          :class="activeFilter === 'interior' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-100'"
        >
          Interior
        </button>
        <button 
          @click="setFilter('aerial')" 
          class="px-6 py-2 rounded-full transition-colors"
          :class="activeFilter === 'aerial' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-100'"
        >
          Aerial
        </button>
        <button 
          @click="setFilter('twilight')" 
          class="px-6 py-2 rounded-full transition-colors"
          :class="activeFilter === 'twilight' ? 'bg-primary text-white' : 'bg-white hover:bg-gray-100'"
        >
          Twilight
        </button>
      </div>
      
      <!-- Image Gallery -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(image, index) in filteredImages" :key="index" class="overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg group">
          <div class="relative">
            <img :src="image.src" :alt="image.alt" class="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <p class="text-white p-4">{{ image.alt }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-4">Transparent Pricing</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">Choose the package that best fits your property's needs</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(plan, index) in pricing" :key="index" 
          class="relative rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          :class="plan.recommended ? 'border-4 border-primary shadow-lg' : 'bg-white shadow-md'"
        >
          <div v-if="plan.recommended" class="bg-primary text-white text-center py-2">
            <span class="font-semibold">Most Popular</span>
          </div>
          <div class="p-8">
            <h3 class="text-2xl font-bold text-primary mb-2">{{ plan.name }}</h3>
            <div class="text-4xl font-bold mb-6">{{ plan.price }}</div>
            <ul class="mb-8">
              <li v-for="(feature, fidx) in plan.features" :key="fidx" class="flex items-center mb-3">
                <svg class="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-600">{{ feature }}</span>
              </li>
            </ul>
            <a href="/contact" class="btn btn-block py-3 text-center block font-semibold rounded-full" 
              :class="plan.recommended ? 'btn-primary' : 'btn-outline-primary'">
              Choose Plan
            </a>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-10 text-gray-600">
        <p>Not sure which package is right for you? <a href="/contact" class="text-primary font-medium hover:underline">Contact us</a> for a custom quote.</p>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-4">What Clients Say</h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">Don't just take our word for it - hear from real estate professionals who've seen results</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="bg-white p-8 rounded-lg shadow-lg">
          <div class="flex items-center mb-6">
            <img :src="testimonial.image" :alt="testimonial.name" class="w-16 h-16 rounded-full mr-4">
            <div>
              <h3 class="font-bold text-lg">{{ testimonial.name }}</h3>
              <p class="text-gray-600">{{ testimonial.company }}</p>
            </div>
          </div>
          <p class="text-gray-600 italic">"{{ testimonial.text }}"</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-16 bg-gradient-to-r from-primary to-secondary text-white text-center">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-6">Ready to showcase your properties at their best?</h2>
      <p class="text-xl mb-8 max-w-3xl mx-auto">Contact me today to discuss your real estate photography needs</p>
      <a href="/contact" class="btn px-8 py-3 font-bold bg-white text-primary rounded-full text-lg hover:bg-gray-100 transition-transform inline-block">
        Get Started
      </a>
    </div>
  </section>

  <footer-component></footer-component>
</template>

<style scoped>
.btn-outline-primary {
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  background: transparent;
}

.btn-outline-primary:hover {
  background: var(--primary-color);
  color: white;
}

.btn-block {
  display: block;
  width: 100%;
}
</style>