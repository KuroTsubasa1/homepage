<script setup lang="ts">
import FooterComponent from "~/components/footerComponent.vue";
import { ref, onMounted } from 'vue';

useSeoMeta({
  title: 'Photography Portfolio | Lasse Harm | Professional Photographer',
  ogTitle: 'Photography Portfolio | Lasse Harm | Professional Photographer',
  description: 'Photography by Lasse Harm — wildlife, landscapes, portraits, abstract art, and weddings. Mostly a hobby, always a passion.',
  ogDescription: 'Photography by Lasse Harm — wildlife, landscapes, portraits, abstract art, and weddings. Mostly a hobby, always a passion.',
  ogImage: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
  twitterCard: 'summary_large_image',
  keywords: 'photography, Lasse Harm, wildlife, landscape, portrait, wedding photography, Germany',
});

const photographyCategories = ref([
  {
    title: 'Wildlife',
    description: 'Capturing the beauty and behavior of animals in their natural habitats.',
    path: '/photography/wildlife',
    apiCategory: 'wildlife',
    image: '',
    icon: 'cat',
    featured: true
  },
  {
    title: 'Landscape & Nature',
    description: 'Breathtaking views of natural landscapes and close-ups of nature\'s wonders.',
    path: '/photography/landscape-nature',
    apiCategory: 'nature',
    image: '',
    icon: 'mountain',
    featured: true
  },
  {
    title: 'Portraits & People',
    description: 'Authentic portraits and candid moments capturing human emotions and stories.',
    path: '/photography/portraits-people',
    apiCategory: 'people',
    image: '',
    icon: 'user',
    featured: false
  },
  {
    title: 'Abstract & Art',
    description: 'Creative interpretations and artistic compositions that challenge perception.',
    path: '/photography/abstract-art',
    apiCategory: 'abstract',
    image: '',
    icon: 'palette',
    featured: false
  },
  {
    title: 'Weddings',
    description: 'Capturing the magic, emotions, and precious moments of wedding celebrations.',
    path: '/photography/weddings',
    apiCategory: 'weddings',
    image: '',
    icon: 'heart',
    featured: true
  },
]);

const introImages = ref([]);

// Fetch a cover image for each category from PocketBase
onMounted(async () => {
  const allFetched = [];
  for (const cat of photographyCategories.value) {
    try {
      const res = await fetch(`https://pocket.lasseharm.space/api/collections/portfolio_images/records?filter=(category='${cat.apiCategory}')&perPage=1`);
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        const item = data.items[0];
        cat.image = `https://pocket.lasseharm.space/api/files/${item.collectionId}/${item.id}/${item.image}?thumb=960x0`;
        allFetched.push({ src: cat.image, alt: cat.title });
      }
    } catch (e) {
      // fallback stays empty, will show gradient
    }
  }
  introImages.value = allFetched.slice(0, 4);
});


</script>

<template>
  <navigation></navigation>

  <!-- Hero Section -->
  <section class="hero relative overflow-hidden">
    <div class="hero-slider absolute inset-0">
      <div v-for="(image, index) in introImages" :key="index" class="hero-slide absolute inset-0 opacity-0"
           :style="{ backgroundImage: `url(${image.src})`, animationDelay: `${index * 5}s` }">
        <div class="absolute inset-0 bg-black/60"></div>
      </div>
    </div>
    <!-- Glow orbs in hero -->
    <div class="absolute top-20 left-10 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-neon-magenta/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="container mx-auto px-4 h-full flex items-center relative z-10">
      <div class="text-center mx-auto max-w-3xl">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 hero-title">
          Capturing <span class="gradient-text">Moments</span>
        </h1>
        <p class="text-xl text-gray-300 mb-8">Wildlife, landscapes, portraits, and the occasional wedding</p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#categories" class="btn-neon">Browse Collections</a>
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
  <section class="py-16 bg-dark relative overflow-hidden">
    <!-- Grid overlay -->
    <div class="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
    <!-- Glow orbs -->
    <div class="absolute top-0 right-0 w-80 h-80 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="container mx-auto px-4 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 class="text-3xl font-bold text-white mb-6">About My Photography</h2>
          <p class="text-lg text-gray-300 mb-4">
            With a passion for capturing the beauty in both natural landscapes and human emotions,
            I strive to create images that tell stories and evoke feelings.
          </p>
          <p class="text-lg text-gray-300 mb-6">
            Whether I'm photographing wildlife in their natural habitat, documenting the joy of a wedding day,
            or creating captivating landscapes, my goal is to produce images that stand the test of time.
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="/about" class="inline-flex items-center text-neon-cyan font-semibold hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.5)] transition-all">
              <span>Learn more about me</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-4">
            <div class="overflow-hidden rounded-2xl border border-white/10 transform translate-y-8">
              <img v-if="introImages[0]" :src="introImages[0].src" :alt="introImages[0].alt"
                   class="w-full h-64 object-cover hover:scale-110 transition-transform duration-700">
              <div v-else class="w-full h-64 bg-gradient-to-br from-dark-200 to-dark-300"></div>
            </div>
            <div class="overflow-hidden rounded-2xl border border-white/10">
              <img v-if="introImages[1]" :src="introImages[1].src" :alt="introImages[1].alt"
                   class="w-full h-48 object-cover hover:scale-110 transition-transform duration-700">
              <div v-else class="w-full h-48 bg-gradient-to-br from-dark-200 to-dark-300"></div>
            </div>
          </div>
          <div class="space-y-4">
            <div class="overflow-hidden rounded-2xl border border-white/10">
              <img v-if="introImages[2]" :src="introImages[2].src" :alt="introImages[2].alt"
                   class="w-full h-48 object-cover hover:scale-110 transition-transform duration-700">
              <div v-else class="w-full h-48 bg-gradient-to-br from-dark-200 to-dark-300"></div>
            </div>
            <div class="overflow-hidden rounded-2xl border border-white/10 transform translate-y-8">
              <img v-if="introImages[3]" :src="introImages[3].src" :alt="introImages[3].alt"
                   class="w-full h-64 object-cover hover:scale-110 transition-transform duration-700">
              <div v-else class="w-full h-64 bg-gradient-to-br from-dark-200 to-dark-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Categories Section -->
  <section id="categories" class="py-16 bg-dark-100 relative overflow-hidden">
    <!-- Grid overlay -->
    <div class="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
    <!-- Glow orbs -->
    <div class="absolute top-20 left-20 w-96 h-96 bg-neon-magenta/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-20 right-20 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-12">
        <h2 class="section-heading text-4xl font-bold text-white mb-4">Photography Collections</h2>
        <div class="section-divider mx-auto mb-6"></div>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          Explore my diverse photography portfolio spanning from wildlife to weddings
        </p>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <a v-for="category in photographyCategories"
             :key="category.title"
             :href="category.path"
             class="category-card relative overflow-hidden rounded-2xl border border-white/10 h-64 group transition-all duration-300 block hover:border-neon-green/30">
          <img v-if="category.image" :src="category.image" :alt="category.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div v-else class="absolute inset-0 bg-gradient-to-br from-dark-200 to-dark-400"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-5">
            <h3 class="text-xl font-bold text-white mb-1">{{ category.title }}</h3>
            <p class="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{{ category.description }}</p>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- Wedding Photography Feature Section -->
  <section class="py-20 bg-dark relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full opacity-5" :style="photographyCategories[4]?.image ? { backgroundImage: `url(${photographyCategories[4].image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"></div>
    <!-- Grid overlay -->
    <div class="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
    <!-- Glow orbs -->
    <div class="absolute top-10 right-20 w-96 h-96 bg-neon-magenta/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-10 left-20 w-96 h-96 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-10">
        <h2 class="section-heading text-4xl font-bold text-white mb-4">Wedding Photography</h2>
        <div class="section-divider mx-auto mb-6"></div>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
          The one area where I do take bookings — because weddings deserve someone who genuinely cares about the story.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div class="wedding-feature glass-card neon-border rounded-2xl p-6 text-center">
          <div class="w-16 h-16 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Engagement Sessions</h3>
          <p class="text-gray-400">Pre-wedding photoshoots to capture your love story and create beautiful save-the-date announcements.</p>
        </div>

        <div class="wedding-feature glass-card neon-border rounded-2xl p-6 text-center">
          <div class="w-16 h-16 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-neon-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Full Day Coverage</h3>
          <p class="text-gray-400">Comprehensive documentation from getting ready to the last dance, ensuring no precious moment is missed.</p>
        </div>

        <div class="wedding-feature glass-card neon-border rounded-2xl p-6 text-center">
          <div class="w-16 h-16 rounded-full bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Luxury Albums</h3>
          <p class="text-gray-400">Handcrafted, high-quality wedding albums that tell the story of your day with elegance and style.</p>
        </div>
      </div>

      <div class="text-center">
        <a href="/photography/weddings" class="btn-neon">
          See Wedding Gallery
        </a>
      </div>
    </div>
  </section>

  <!-- Call to Action Section -->
  <section class="py-20 bg-gradient-to-br from-neon-cyan/10 via-dark to-neon-magenta/10 text-white text-center relative overflow-hidden">
    <!-- Grid overlay -->
    <div class="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
    <!-- Glow orbs -->
    <div class="absolute top-10 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-10 right-1/4 w-96 h-96 bg-neon-magenta/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="container mx-auto px-4 relative z-10">
      <h2 class="text-4xl font-bold mb-6 gradient-text">Like what you see?</h2>
      <p class="text-xl mb-10 max-w-3xl mx-auto text-gray-300">
        If you're interested in wedding photography or just want to chat about cameras, feel free to reach out.
      </p>
      <a href="/contact" class="btn-neon">
        Say Hi
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
  background-color: #0a0a0f;
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

/* Dark theme backgrounds */
.bg-dark {
  background-color: #0a0a0f;
}

.bg-dark-100 {
  background-color: #16161f;
}

/* Grid pattern overlay */
.bg-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Glass card */
.glass-card {
  background: rgba(22, 22, 31, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}

/* Neon border glow */
.neon-border {
  border: 1px solid rgba(0, 240, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.05), inset 0 0 15px rgba(0, 240, 255, 0.02);
}

/* Section heading */
.section-heading {
  color: white;
  text-align: center;
  font-weight: bold;
}

/* Section divider - gradient line */
.section-divider {
  width: 6rem;
  height: 3px;
  background: linear-gradient(to right, #00f0ff, #8b5cf6, #ff00aa);
  border-radius: 2px;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(to right, #00f0ff, #8b5cf6, #ff00aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Neon accent colors */
.text-neon-cyan { color: #00f0ff; }
.text-neon-magenta { color: #ff00aa; }
.text-neon-purple { color: #8b5cf6; }
.text-neon-green { color: #39ff14; }

/* Buttons */
.btn-neon {
  background-color: #00f0ff;
  color: #0a0a0f;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
  display: inline-block;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1);
}

.btn-neon:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.5), 0 0 60px rgba(0, 240, 255, 0.2);
  background-color: #33f3ff;
}

.btn-neon-outline {
  background-color: transparent;
  color: #00f0ff;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  border: 2px solid #00f0ff;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-neon-outline:hover {
  background-color: rgba(0, 240, 255, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1);
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
  border: 2px solid rgba(0, 240, 255, 0.5);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.wheel {
  width: 4px;
  height: 8px;
  background: #00f0ff;
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
  border-right: 2px solid rgba(0, 240, 255, 0.5);
  border-bottom: 2px solid rgba(0, 240, 255, 0.5);
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
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.wedding-feature:hover {
  transform: translateY(-10px);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.1);
  border-color: rgba(0, 240, 255, 0.3);
}

.wedding-feature .w-16 {
  transition: transform 0.3s ease;
}

.wedding-feature:hover .w-16 {
  transform: scale(1.1);
}

/* Pricing card hover */
.pricing-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.pricing-card:hover {
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.1);
  border-color: rgba(0, 240, 255, 0.3);
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
