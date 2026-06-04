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
  <div class="container mx-auto px-4 max-w-5xl py-12 space-y-10">

    <!-- TITLE SCREEN -->
    <div class="gb-titlecard animate-slide-up">
      <p class="font-pixel text-xs text-neon-green mb-4 tracking-widest">Real Estate</p>
      <h1 class="text-4xl md:text-6xl font-black mb-5 leading-tight">
        <span class="gradient-text">Professional Real Estate Photography</span>
      </h1>
      <p class="text-lg md:text-xl mb-7 text-gray-300 max-w-2xl mx-auto">Showcase properties at their absolute best with stunning photography that sells</p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="#services" class="btn-neon animate-glow-pulse inline-block">View Services</a>
        <a href="#pricing" class="btn-neon-outline inline-block">See Pricing</a>
      </div>
    </div>

    <!-- SERVICES -->
    <GbWindow id="services" title="Real Estate Photography Services" class="animate-slide-up">
      <p class="pixel-label text-neon-green mb-1">▸ SERVICES</p>
      <p class="text-gray-400 mb-6">Comprehensive photography services designed to make your properties stand out in a competitive market</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(service, index) in services" :key="index" class="gb-tile group">
          <div class="overflow-hidden">
            <img :src="service.image" :alt="service.title" class="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105">
          </div>
          <span class="gb-tile-label">{{ service.title }}</span>
          <div class="p-4 space-y-3">
            <p class="gb-row-desc">{{ service.description }}</p>
            <ul class="gb-menu-list">
              <li v-for="(feature, fidx) in service.features" :key="fidx">
                <span class="gb-menu-row !cursor-default">
                  <span class="text-neon-green">+</span>
                  <span class="gb-row-desc">{{ feature }}</span>
                </span>
              </li>
            </ul>
            <a href="/contact" class="btn-neon inline-block">Get a Quote</a>
          </div>
        </div>
      </div>
    </GbWindow>

    <!-- PORTFOLIO -->
    <GbWindow title="Portfolio" class="animate-slide-up">
      <p class="pixel-label text-neon-green mb-1">▸ ALBUM</p>
      <p class="text-gray-400 mb-5">Browse through samples of our real estate photography work</p>

      <!-- Filter Buttons -->
      <ul class="gb-menu-list flex flex-wrap gap-x-6 mb-6">
        <li>
          <button @click="setFilter('all')" class="gb-menu-row" :class="{ 'is-active': activeFilter === 'all' }">
            <span>All Photos</span>
          </button>
        </li>
        <li>
          <button @click="setFilter('interior')" class="gb-menu-row" :class="{ 'is-active': activeFilter === 'interior' }">
            <span>Interior</span>
          </button>
        </li>
        <li>
          <button @click="setFilter('aerial')" class="gb-menu-row" :class="{ 'is-active': activeFilter === 'aerial' }">
            <span>Aerial</span>
          </button>
        </li>
        <li>
          <button @click="setFilter('twilight')" class="gb-menu-row" :class="{ 'is-active': activeFilter === 'twilight' }">
            <span>Twilight</span>
          </button>
        </li>
      </ul>

      <!-- Inventory grid of slots -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div v-for="(image, index) in filteredImages" :key="index" class="gb-tile group">
          <div class="relative">
            <img :src="image.src" :alt="image.alt" class="w-full h-36 sm:h-40 object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
              <p class="text-white text-xs">{{ image.alt }}</p>
            </div>
          </div>
        </div>
      </div>
    </GbWindow>

    <!-- PRICING -->
    <GbWindow id="pricing" title="Transparent Pricing" class="animate-slide-up">
      <p class="pixel-label text-neon-green mb-1">▸ SHOP</p>
      <p class="text-gray-400 mb-6">Choose the package that best fits your property's needs</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(plan, index) in pricing" :key="index"
          class="gb-tile flex flex-col"
          :class="{ 'is-recommended': plan.recommended }"
        >
          <div v-if="plan.recommended" class="gb-tile-label !relative !w-full text-center">Most Popular</div>
          <div class="p-5 flex flex-col flex-1">
            <h3 class="text-2xl font-bold text-neon-green mb-1">{{ plan.name }}</h3>
            <div class="text-4xl font-bold text-white mb-5">{{ plan.price }}</div>
            <ul class="gb-menu-list mb-6 flex-1">
              <li v-for="(feature, fidx) in plan.features" :key="fidx">
                <span class="gb-menu-row !cursor-default">
                  <span class="text-neon-green">+</span>
                  <span class="gb-row-desc">{{ feature }}</span>
                </span>
              </li>
            </ul>
            <a href="/contact" class="block text-center mt-auto"
              :class="plan.recommended ? 'btn-neon' : 'btn-neon-outline'">
              Choose Plan
            </a>
          </div>
        </div>
      </div>

      <p class="text-center mt-8 text-gray-400">Not sure which package is right for you? <a href="/contact" class="text-neon-green font-medium link-glow">Contact us</a> for a custom quote.</p>
    </GbWindow>

    <!-- TESTIMONIALS -->
    <GbWindow title="What Clients Say" class="animate-slide-up">
      <p class="pixel-label text-neon-green mb-1">▸ GUILD</p>
      <p class="text-gray-400 mb-6">Don't just take our word for it - hear from real estate professionals who've seen results</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="gb-tile p-5">
          <div class="flex items-center mb-4">
            <img :src="testimonial.image" :alt="testimonial.name" class="w-14 h-14 mr-3 border-2 border-neon-green/40">
            <div>
              <h3 class="font-bold text-lg text-white">{{ testimonial.name }}</h3>
              <p class="text-gray-400 text-sm">{{ testimonial.company }}</p>
            </div>
          </div>
          <p class="gb-row-desc italic">"{{ testimonial.text }}"</p>
        </div>
      </div>
    </GbWindow>

    <!-- CTA -->
    <GbWindow class="animate-slide-up">
      <div class="text-center py-2">
        <h2 class="text-2xl md:text-4xl font-black mb-4">
          <span class="gradient-text">Ready to showcase your properties at their best?</span>
        </h2>
        <p class="text-gray-400 text-lg mb-7 max-w-2xl mx-auto">Contact me today to discuss your real estate photography needs</p>
        <p class="gb-prompt animate-blink mb-5">PRESS START</p>
        <a href="/contact" class="btn-neon animate-glow-pulse inline-block">Get Started</a>
      </div>
    </GbWindow>

  </div>
</template>

<style scoped>
/* Flavour/body text inside windows (readable VT323, not pixel font) */
.gb-row-desc {
  font-family: 'VT323', ui-monospace, monospace;
  font-size: 1.05rem;
  line-height: 1.3;
  letter-spacing: 0.01em;
  text-transform: none;
  color: rgb(var(--c-ink-2));
}

</style>
