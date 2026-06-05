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

const filters = [
  { key: 'all', label: 'All Photos' },
  { key: 'interior', label: 'Interior' },
  { key: 'aerial', label: 'Aerial' },
  { key: 'twilight', label: 'Twilight' },
];
</script>

<template>
  <div>
    <!-- ① Cinematic hero -->
    <section class="relative min-h-[82vh] overflow-hidden bg-forest flex items-end">
      <div
        class="absolute inset-0 bg-cover bg-center animate-ken-burns"
        style="background-image: url('https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=1920x1080')"
      ></div>
      <div class="absolute inset-0 vignette pointer-events-none"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/45 to-forest/20 pointer-events-none"></div>
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb bottom-0 left-1/3 w-[640px] h-48 bg-amber/10"></div>
      <div class="orb top-10 right-1/4 w-96 h-96 bg-moss/10 animate-drift"></div>

      <div class="relative z-20 container mx-auto px-6 pb-20 pt-32">
        <div class="max-w-4xl" v-reveal>
          <p class="eyebrow mb-5 flex items-center gap-3">
            <span class="inline-block w-10 h-px bg-amber"></span>
            Property Stories
          </p>
          <h1 class="display-xl text-bone text-5xl md:text-7xl lg:text-8xl text-balance">
            <span class="gradient-text">Professional Real Estate Photography</span>
          </h1>
          <p class="mt-6 text-lg md:text-xl text-bone-muted max-w-2xl leading-relaxed">
            Showcase properties at their absolute best with stunning photography that sells
          </p>
          <div class="flex flex-col sm:flex-row gap-4 mt-10">
            <a href="#services" class="btn-wild text-lg">View Services</a>
            <a href="#pricing" class="btn-wild-outline text-lg">See Pricing</a>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2">
        <span class="w-px h-10 bg-gradient-to-b from-amber/70 to-transparent animate-bob"></span>
      </div>
    </section>

    <!-- ② Stats strip -->
    <section class="relative py-20 overflow-hidden border-y border-bone/5 bg-forest-100">
      <div class="orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-64 bg-amber/5"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10">
          <stat-counter :value="250" suffix="+" label="Listings Shot" />
          <stat-counter :value="40" suffix="%" label="Faster Sales" />
          <stat-counter :value="24" suffix="h" label="Turnaround" />
          <stat-counter :value="100" suffix="%" label="Happy Agents" />
        </div>
      </div>
    </section>

    <!-- ③ Services -->
    <section id="services" class="relative py-28 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb top-0 right-1/4 w-96 h-96 bg-moss/10"></div>
      <div class="orb bottom-0 left-0 w-80 h-80 bg-amber/8 animate-drift-slow"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading
          eyebrow="What I Offer"
          title="Real Estate Photography Services"
          subtitle="Comprehensive photography services designed to make your properties stand out in a competitive market"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8" v-reveal.stagger>
          <div
            v-for="(service, index) in services"
            :key="index"
            v-tilt="5"
            class="group relative overflow-hidden rounded-2xl wild-border bg-forest-100/70 transition-all duration-500 ease-wild"
          >
            <div class="relative overflow-hidden">
              <img :src="service.image" :alt="service.title" class="w-full h-64 object-cover img-zoom">
              <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent"></div>
              <span class="absolute top-5 left-5 eyebrow text-amber">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <div class="p-7">
              <h3 class="font-display text-2xl md:text-3xl uppercase text-bone mb-3 group-hover:text-amber transition-colors duration-300">{{ service.title }}</h3>
              <p class="text-bone-muted leading-relaxed mb-5">{{ service.description }}</p>
              <ul class="mb-7 space-y-2">
                <li v-for="(feature, fidx) in service.features" :key="fidx" class="flex items-center">
                  <svg class="h-5 w-5 text-moss-light mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-bone-muted">{{ feature }}</span>
                </li>
              </ul>
              <a href="/contact" class="btn-wild inline-block">Get a Quote</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ④ Portfolio -->
    <section class="relative py-28 bg-forest-100 overflow-hidden">
      <div class="absolute inset-0 bg-grid opacity-60 pointer-events-none"></div>
      <div class="orb top-1/3 right-0 w-72 h-72 bg-clay/8"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading
          eyebrow="Selected Work"
          title="Portfolio"
          subtitle="Browse through samples of our real estate photography work"
        />

        <!-- Filter Buttons -->
        <div class="flex flex-wrap justify-center mb-12 gap-3" v-reveal>
          <button
            v-for="f in filters"
            :key="f.key"
            @click="setFilter(f.key)"
            class="px-6 py-2 rounded-full font-condensed uppercase tracking-widest2 text-xs transition-all duration-300 border"
            :class="activeFilter === f.key
              ? 'bg-amber/20 text-amber border-amber/50'
              : 'bg-forest-200 text-bone-dim border-bone/10 hover:border-amber/40 hover:text-amber'"
          >
            {{ f.label }}
          </button>
        </div>

        <!-- Image Gallery -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" v-reveal.stagger>
          <div
            v-for="(image, index) in filteredImages"
            :key="index"
            v-tilt="6"
            class="group relative overflow-hidden rounded-2xl wild-border"
          >
            <img :src="image.src" :alt="image.alt" class="w-full aspect-[4/3] object-cover img-zoom">
            <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
              <p class="text-bone p-5 font-condensed uppercase tracking-wide text-sm">{{ image.alt }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑤ Pricing -->
    <section id="pricing" class="relative py-28 overflow-hidden">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb top-0 left-1/4 w-96 h-96 bg-amber/8"></div>
      <div class="orb bottom-0 right-1/4 w-80 h-80 bg-moss/10 animate-drift"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading
          eyebrow="Packages"
          title="Transparent Pricing"
          subtitle="Choose the package that best fits your property's needs"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start" v-reveal.stagger>
          <div
            v-for="(plan, index) in pricing"
            :key="index"
            v-tilt="4"
            class="relative overflow-hidden rounded-2xl bg-forest-100/70 transition-all duration-500 ease-wild hover:-translate-y-2"
            :class="plan.recommended ? 'wild-border border-amber/60 md:-mt-4' : 'wild-border'"
          >
            <div v-if="plan.recommended" class="bg-amber text-forest text-center py-2">
              <span class="font-condensed uppercase tracking-widest2 text-xs font-semibold">Most Popular</span>
            </div>
            <div class="p-8">
              <h3 class="font-display text-2xl md:text-3xl uppercase text-amber mb-2">{{ plan.name }}</h3>
              <div class="font-display text-5xl text-bone mb-7">{{ plan.price }}</div>
              <ul class="mb-8 space-y-3">
                <li v-for="(feature, fidx) in plan.features" :key="fidx" class="flex items-start">
                  <svg class="h-5 w-5 text-moss-light mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-bone-muted">{{ feature }}</span>
                </li>
              </ul>
              <a href="/contact" class="block text-center w-full"
                :class="plan.recommended ? 'btn-wild' : 'btn-wild-outline'">
                Choose Plan
              </a>
            </div>
          </div>
        </div>

        <div class="text-center mt-12 text-bone-muted" v-reveal>
          <p>Not sure which package is right for you? <a href="/contact" class="link-glow text-amber font-medium">Contact us</a> for a custom quote.</p>
        </div>
      </div>
    </section>

    <!-- ⑥ Testimonials -->
    <section class="relative py-28 bg-forest-100 overflow-hidden">
      <div class="absolute inset-0 bg-grid opacity-60 pointer-events-none"></div>
      <div class="orb bottom-0 left-0 w-96 h-96 bg-clay/8 animate-drift-slow"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading
          eyebrow="Trusted By"
          title="What Clients Say"
          subtitle="Don't just take our word for it - hear from real estate professionals who've seen results"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8" v-reveal.stagger>
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            v-tilt="5"
            class="panel wild-border p-8 transition-all duration-500 ease-wild hover:-translate-y-1.5"
          >
            <svg class="h-9 w-9 text-amber/40 mb-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 6A5.17 5.17 0 002 11.17V18h6.83v-6.83H5.5A1.67 1.67 0 017.17 9.5V6zm9 0A5.17 5.17 0 0011 11.17V18h6.83v-6.83H14.5a1.67 1.67 0 011.67-1.67V6z"/></svg>
            <p class="text-bone-muted italic leading-relaxed mb-7">"{{ testimonial.text }}"</p>
            <div class="flex items-center">
              <img :src="testimonial.image" :alt="testimonial.name" class="w-14 h-14 rounded-full mr-4 border-2 border-amber/40 object-cover">
              <div>
                <h3 class="font-condensed text-lg uppercase tracking-wide text-bone">{{ testimonial.name }}</h3>
                <p class="text-bone-dim text-sm">{{ testimonial.company }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑦ CTA -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-amber/10 via-forest to-moss/10"></div>
      <div class="absolute inset-0 bg-topo opacity-30 pointer-events-none"></div>
      <div class="orb top-0 left-0 w-72 h-72 bg-amber/10"></div>
      <div class="orb bottom-0 right-0 w-72 h-72 bg-clay/10"></div>
      <div class="container mx-auto px-6 text-center relative z-10" v-reveal:scale>
        <p class="eyebrow mb-4">Let's Work Together</p>
        <h2 class="display-xl text-4xl md:text-6xl text-bone mb-6 text-balance">
          <span class="gradient-text">Ready to showcase your properties at their best?</span>
        </h2>
        <p class="text-lg text-bone-muted mb-10 max-w-2xl mx-auto">Contact me today to discuss your real estate photography needs</p>
        <a href="/contact" class="btn-wild text-lg inline-block">Get Started</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>
