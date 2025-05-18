<script setup lang="ts">
import FooterComponent from "~/components/footerComponent.vue";
import { ref, onMounted } from 'vue';

useSeoMeta({
  title: 'Photography Portfolio | Lasse Harm | Professional Photographer',
  ogTitle: 'Photography Portfolio | Lasse Harm | Professional Photographer',
  description: 'Explore Lasse Harm\'s professional photography portfolio featuring wildlife, landscapes, portraits, abstract art, and weddings. Available for bookings in Copenhagen.',
  ogDescription: 'Explore Lasse Harm\'s professional photography portfolio featuring wildlife, landscapes, portraits, abstract art, and weddings. Available for bookings in Copenhagen.',
  ogImage: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
  twitterCard: 'summary_large_image',
  keywords: 'photography portfolio, professional photographer, wildlife photography, landscape photography, portrait photography, wedding photography, Copenhagen photographer',
});

const photographyCategories = ref([
  {
    title: 'Wildlife',
    description: 'Capturing the beauty and behavior of animals in their natural habitats.',
    path: '/photography/wildlife',
    image: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
    icon: 'cat',
    featured: true
  },
  {
    title: 'Landscape & Nature',
    description: 'Breathtaking views of natural landscapes and close-ups of nature\'s wonders.',
    path: '/photography/landscape-nature',
    image: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
    icon: 'mountain',
    featured: true
  },
  {
    title: 'Portraits & People',
    description: 'Authentic portraits and candid moments capturing human emotions and stories.',
    path: '/photography/portraits-people',
    image: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
    icon: 'user',
    featured: false
  },
  {
    title: 'Abstract & Art',
    description: 'Creative interpretations and artistic compositions that challenge perception.',
    path: '/photography/abstract-art',
    image: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
    icon: 'palette',
    featured: false
  },
  {
    title: 'Weddings',
    description: 'Capturing the magic, emotions, and precious moments of wedding celebrations.',
    path: '/photography/weddings',
    image: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
    icon: 'heart',
    featured: true
  },
  {
    title: 'Real Estate',
    description: 'Professional photography that showcases properties in their best light.',
    path: '/real-estate',
    image: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
    icon: 'home',
    featured: false
  }
]);

const featuredImages = ref([
  {
    src: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
    alt: 'Wildlife Photography Sample',
    category: 'Wildlife'
  },
  {
    src: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
    alt: 'Landscape Photography Sample',
    category: 'Landscape'
  },
  {
    src: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg?thumb=960x0',
    alt: 'Drone Photography Sample',
    category: 'Drone'
  },
  {
    src: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
    alt: 'Wedding Photography Sample',
    category: 'Wedding'
  }
]);

const testimonials = ref([
  {
    name: "Marie & Anders Jensen",
    text: "Lasse captured the magic of our wedding day perfectly. The candid moments he caught are priceless, and his calm presence made everyone feel comfortable.",
    category: "wedding",
    image: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=100x100"
  },
  {
    name: "Copenhagen Naturalists Society",
    text: "Lasse's wildlife photography for our annual publication was outstanding. His patience and eye for detail resulted in truly remarkable images.",
    category: "wildlife",
    image: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=100x100"
  },
  {
    name: "Emma Nielsen",
    text: "The family portraits Lasse took have become our most treasured possessions. He has a gift for capturing personality in every shot.",
    category: "portrait",
    image: "https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=100x100"
  }
]);

const currentTestimonialIndex = ref(0);
const testimonialInterval = ref(null);

const nextTestimonial = () => {
  currentTestimonialIndex.value = (currentTestimonialIndex.value + 1) % testimonials.value.length;
};

const prevTestimonial = () => {
  currentTestimonialIndex.value = (currentTestimonialIndex.value - 1 + testimonials.value.length) % testimonials.value.length;
};

onMounted(() => {
  testimonialInterval.value = setInterval(nextTestimonial, 6000);
});

const packages = ref([
  {
    name: "Essential",
    price: "3,000 kr",
    description: "Perfect for small events and portrait sessions",
    features: [
      "2-hour photo session",
      "25+ edited digital photos",
      "Online gallery for easy sharing",
      "5 professional prints (13x18cm)",
      "Personal usage rights"
    ]
  },
  {
    name: "Professional",
    price: "7,500 kr",
    description: "Ideal for weddings and larger events",
    features: [
      "6-hour photography coverage",
      "100+ edited digital photos",
      "Online gallery with download option",
      "Custom photo album (20 pages)",
      "10 professional prints (up to 20x30cm)",
      "Personal usage rights"
    ],
    featured: true
  },
  {
    name: "Premium",
    price: "12,000 kr",
    description: "Complete coverage for special occasions",
    features: [
      "Full-day photography coverage (10+ hours)",
      "250+ edited digital photos",
      "Online gallery with download option",
      "Luxury photo album (30 pages)",
      "20 professional prints (up to 30x45cm)",
      "Engagement/pre-event photoshoot",
      "Personal usage rights",
      "Express delivery option"
    ]
  }
]);

// For the category display with animation
const hoverCategory = ref(null);

const setHoverCategory = (index) => {
  hoverCategory.value = index;
};

const clearHoverCategory = () => {
  hoverCategory.value = null;
};
</script>

<template>
  <navigation></navigation>

  <!-- Hero Section -->
  <section class="hero relative overflow-hidden">
    <div class="hero-slider absolute inset-0">
      <div v-for="(image, index) in featuredImages" :key="index" class="hero-slide absolute inset-0 opacity-0"
           :style="{ backgroundImage: `url(${image.src})`, animationDelay: `${index * 5}s` }">
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
    </div>
    <div class="container mx-auto px-4 h-full flex items-center relative z-10">
      <div class="text-center mx-auto max-w-3xl">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 hero-title">
          Capturing <span class="text-primary">Moments</span><br>
          Creating <span class="text-primary">Memories</span>
        </h1>
        <p class="text-xl text-white mb-8">Professional photography services in Copenhagen and beyond</p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#categories" class="btn-primary">Explore Portfolio</a>
          <a href="/contact" class="btn-secondary">Book a Session</a>
        </div>
      </div>
    </div>
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2">
      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <div class="arrows">
          <span class="arrow-down"></span>
          <span class="arrow-down"></span>
        </div>
      </div>
    </div>
  </section>

  <!-- Introduction Section -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 class="text-3xl font-bold text-gray-800 mb-6">About My Photography</h2>
          <p class="text-lg text-gray-700 mb-4">
            With a passion for capturing the beauty in both natural landscapes and human emotions,
            I strive to create images that tell stories and evoke feelings.
          </p>
          <p class="text-lg text-gray-700 mb-6">
            Whether I'm photographing wildlife in their natural habitat, documenting the joy of a wedding day,
            or creating captivating landscapes, my goal is to produce images that stand the test of time.
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="/about" class="inline-flex items-center text-primary font-semibold hover:underline">
              <span>Learn more about me</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#pricing" class="inline-flex items-center text-primary font-semibold hover:underline">
              <span>View pricing</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-4">
            <div class="overflow-hidden rounded-lg shadow-lg transform translate-y-8">
              <img src="https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=400x600"
                   alt="Photography sample 1"
                   class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
            </div>
            <div class="overflow-hidden rounded-lg shadow-lg">
              <img src="https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=400x300"
                   alt="Photography sample 2"
                   class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
            </div>
          </div>
          <div class="space-y-4">
            <div class="overflow-hidden rounded-lg shadow-lg">
              <img src="https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=400x300"
                   alt="Photography sample 3"
                   class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
            </div>
            <div class="overflow-hidden rounded-lg shadow-lg transform translate-y-8">
              <img src="https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg?thumb=400x600"
                   alt="Photography sample 4"
                   class="w-full h-full object-cover hover:scale-110 transition-transform duration-700">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Categories Section -->
  <section id="categories" class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Photography Collections</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore my diverse photography portfolio spanning from wildlife to weddings
        </p>
      </div>

      <!-- Featured Categories -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div v-for="category in photographyCategories.filter(c => c.featured)"
             :key="category.title"
             class="category-card relative overflow-hidden rounded-lg shadow-xl group">
          <img :src="category.image"
               :alt="category.title"
               class="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <div class="text-white">
              <font-awesome-icon :icon="category.icon" class="text-3xl mb-4 text-primary" />
              <h3 class="text-2xl font-bold mb-2">{{ category.title }}</h3>
              <p class="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {{ category.description }}
              </p>
              <a :href="category.path" class="inline-block px-5 py-2 bg-primary text-white rounded-full transform -translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                View Gallery
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- All Categories Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div v-for="(category, index) in photographyCategories"
             :key="category.title"
             @mouseenter="setHoverCategory(index)"
             @mouseleave="clearHoverCategory"
             class="category-pill relative overflow-hidden rounded-full bg-white shadow-md p-4 flex items-center justify-center transition-all duration-300"
             :class="{ 'scale-110 shadow-xl': hoverCategory === index }">
          <a :href="category.path" class="flex flex-col items-center w-full h-full">
            <font-awesome-icon :icon="category.icon" class="text-2xl mb-2 text-primary" />
            <span class="font-medium text-gray-800">{{ category.title }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Client Testimonials</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          What people are saying about my photography services
        </p>
      </div>

      <div class="max-w-4xl mx-auto relative">
        <div class="testimonial-slider py-8">
          <div class="testimonial-slide bg-gray-50 rounded-lg shadow-lg p-8 relative">
            <div class="quote-mark absolute top-4 right-6 text-6xl text-gray-200 font-serif">"</div>
            <p class="text-lg text-gray-700 italic mb-6 relative z-10">
              {{ testimonials[currentTestimonialIndex].text }}
            </p>
            <div class="flex items-center">
              <img :src="testimonials[currentTestimonialIndex].image"
                   :alt="testimonials[currentTestimonialIndex].name"
                   class="w-16 h-16 rounded-full object-cover border-2 border-primary mr-4">
              <div>
                <h4 class="font-bold text-gray-800">{{ testimonials[currentTestimonialIndex].name }}</h4>
                <p class="text-gray-600">{{ testimonials[currentTestimonialIndex].category }} client</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button @click="prevTestimonial" class="absolute top-1/2 -left-4 md:-left-10 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button @click="nextTestimonial" class="absolute top-1/2 -right-4 md:-right-10 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Indicators -->
        <div class="flex justify-center mt-6">
          <span v-for="(_, index) in testimonials"
                :key="index"
                @click="currentTestimonialIndex = index"
                class="h-2 w-2 mx-1 rounded-full cursor-pointer transition-colors"
                :class="currentTestimonialIndex === index ? 'bg-primary' : 'bg-gray-300'"></span>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Photography Packages</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Select the perfect package for your photography needs
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(pkg, index) in packages"
             :key="index"
             class="pricing-card bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
             :class="{ 'border-2 border-primary': pkg.featured }">
          <div v-if="pkg.featured" class="bg-primary text-white py-2 px-4 text-center">
            <span class="font-bold">Most Popular</span>
          </div>
          <div class="p-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ pkg.name }}</h3>
            <div class="text-3xl font-bold text-primary mb-4">{{ pkg.price }}</div>
            <p class="text-gray-600 mb-6">{{ pkg.description }}</p>
            <ul class="mb-8 space-y-3">
              <li v-for="(feature, fidx) in pkg.features" :key="fidx" class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ feature }}</span>
              </li>
            </ul>
            <a href="/contact" class="block text-center py-3 px-6 rounded-lg transition-colors"
               :class="pkg.featured ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'">
              Book Now
            </a>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <p class="text-gray-600 mb-6">Need a custom photography package? I offer personalized solutions for specific needs.</p>
        <a href="/contact" class="inline-flex items-center text-primary font-semibold hover:underline">
          <span>Contact me for custom packages</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </section>

  <!-- Wedding Photography Feature Section -->
  <section class="py-20 bg-white relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10"
         style="background-image: url('https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=1920x1080')"></div>
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-10">
        <span class="inline-block px-4 py-1 rounded-full bg-primary bg-opacity-10 text-primary text-sm font-semibold mb-4">FEATURED SERVICE</span>
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Wedding Photography</h2>
        <div class="w-24 h-1 bg-primary mx-auto mb-6"></div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Your special day deserves to be captured with artistry and care
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div class="wedding-feature bg-gray-50 rounded-lg p-6 text-center shadow-md">
          <div class="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Engagement Sessions</h3>
          <p class="text-gray-600">Pre-wedding photoshoots to capture your love story and create beautiful save-the-date announcements.</p>
        </div>

        <div class="wedding-feature bg-gray-50 rounded-lg p-6 text-center shadow-md">
          <div class="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Full Day Coverage</h3>
          <p class="text-gray-600">Comprehensive documentation from getting ready to the last dance, ensuring no precious moment is missed.</p>
        </div>

        <div class="wedding-feature bg-gray-50 rounded-lg p-6 text-center shadow-md">
          <div class="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Luxury Albums</h3>
          <p class="text-gray-600">Handcrafted, high-quality wedding albums that tell the story of your day with elegance and style.</p>
        </div>
      </div>

      <div class="text-center">
        <a href="/photography/weddings" class="btn-primary">
          Explore Wedding Services
        </a>
      </div>
    </div>
  </section>

  <!-- Call to Action Section -->
  <section class="py-20 bg-gradient-to-r from-primary to-secondary text-white text-center">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold mb-6">Ready to capture your special moments?</h2>
      <p class="text-xl mb-10 max-w-3xl mx-auto">
        Let's discuss your photography needs and create memories that will last a lifetime.
      </p>
      <a href="/contact" class="btn-white">
        Get in Touch
      </a>
    </div>
  </section>

  <footer-component></footer-component>
</template>

<style scoped>
/* Hero section styles */
.hero {
  height: 100vh;
  min-height: 600px;
  position: relative;
  display: flex;
  align-items: center;
  color: white;
}

.hero-slide {
  background-size: cover;
  background-position: center;
  animation: slideFade 20s infinite;
}

.hero-slide:nth-child(1) { animation-delay: 0s; }
.hero-slide:nth-child(2) { animation-delay: 5s; }
.hero-slide:nth-child(3) { animation-delay: 10s; }
.hero-slide:nth-child(4) { animation-delay: 15s; }

@keyframes slideFade {
  0%, 15%, 100% { opacity: 0; }
  20%, 35% { opacity: 1; }
}

.hero-title {
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

/* Buttons */
.btn-primary {
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  border: 2px solid white;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-secondary:hover {
  background-color: white;
  color: var(--primary-color);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.btn-white {
  background-color: white;
  color: var(--primary-color);
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-white:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.3);
}

/* Scroll indicator */
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mouse {
  width: 30px;
  height: 50px;
  border: 2px solid white;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.wheel {
  width: 4px;
  height: 8px;
  background: white;
  border-radius: 2px;
  margin-top: 10px;
  animation: scroll 1.5s infinite;
}

@keyframes scroll {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(15px); opacity: 0; }
}

.arrows {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arrow-down {
  width: 10px;
  height: 10px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
  margin: 0 0 3px 0;
  animation: arrow 1.5s infinite;
}

.arrow-down:nth-child(2) {
  animation-delay: 0.3s;
}

@keyframes arrow {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

/* Testimonial Slider */
.testimonial-slide {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

/* Category cards animation */
.category-pill {
  cursor: pointer;
}

/* Wedding feature animations */
.wedding-feature {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.wedding-feature:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.wedding-feature .w-16 {
  transition: transform 0.3s ease;
}

.wedding-feature:hover .w-16 {
  transform: scale(1.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero {
    min-height: 500px;
  }

  .hero-title {
    font-size: 2.5rem;
  }
}
</style>