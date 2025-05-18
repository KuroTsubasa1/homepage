<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  category: {
    type: String,
    default: 'general'
  }
});

const testimonials = ref([
  {
    id: 1,
    category: 'photography',
    name: 'Emma Johnson',
    role: 'Marketing Director',
    company: 'Creative Solutions',
    text: "Lasse's photography perfectly captured the essence of our brand. The images are being used across all our marketing materials and have received countless compliments.",
    avatar: '/images/testimonials/avatar1.jpg'
  },
  {
    id: 2,
    category: 'drone',
    name: 'Thomas Nielsen',
    role: 'Real Estate Agent',
    company: 'Premium Properties',
    text: 'The aerial footage provided by Lasse gave our listings an incredible advantage. Properties with his drone shots sold 30% faster than our regular listings.',
    avatar: '/images/testimonials/avatar2.jpg'
  },
  {
    id: 3,
    category: '3d-printing',
    name: 'Sarah Martinez',
    role: 'Product Designer',
    company: 'Innovative Designs',
    text: "The 3D printed prototypes were delivered ahead of schedule and with incredible precision. Lasse's attention to detail helped us finalize our design much faster than expected.",
    avatar: '/images/testimonials/avatar3.jpg'
  },
  {
    id: 4,
    category: 'web',
    name: 'Michael Berg',
    role: 'CEO',
    company: 'TechStart',
    text: 'Our website redesign by Lasse exceeded all expectations. Conversion rates improved by 45% within the first month after launch.',
    avatar: '/images/testimonials/avatar4.jpg'
  },
  {
    id: 5,
    category: 'photography',
    name: 'Laura Hansen',
    role: 'Event Coordinator',
    company: 'Elite Events',
    text: 'Having Lasse photograph our corporate event was one of the best decisions we made. The images perfectly captured the energy and professionalism of our brand.',
    avatar: '/images/testimonials/avatar5.jpg'
  },
  {
    id: 6,
    category: 'drone',
    name: 'David Andersen',
    role: 'Construction Manager',
    company: 'BuildRight',
    text: 'The aerial progress documentation saved us countless hours of site visits and provided valuable insights for our project management team.',
    avatar: '/images/testimonials/avatar6.jpg'
  }
]);

const filteredTestimonials = computed(() => {
  if (props.category === 'general') {
    return testimonials.value;
  }
  return testimonials.value.filter(testimonial => 
    testimonial.category === props.category
  );
});

const currentTestimonialIndex = ref(0);
const intervalId = ref(null);

const nextTestimonial = () => {
  currentTestimonialIndex.value = (currentTestimonialIndex.value + 1) % filteredTestimonials.value.length;
};

const prevTestimonial = () => {
  currentTestimonialIndex.value = (currentTestimonialIndex.value - 1 + filteredTestimonials.value.length) % filteredTestimonials.value.length;
};

const startAutoScroll = () => {
  intervalId.value = setInterval(() => {
    nextTestimonial();
  }, 8000);
};

const stopAutoScroll = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

onMounted(() => {
  if (filteredTestimonials.value.length > 1) {
    startAutoScroll();
  }
});

onUnmounted(() => {
  stopAutoScroll();
});
</script>

<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-2">What Our Clients Say</h2>
      <div class="w-24 h-1 bg-primary mx-auto mb-12"></div>

      <div v-if="filteredTestimonials.length > 0" class="relative">
        <div class="testimonial-carousel relative max-w-4xl mx-auto">
          <div class="testimonial-item bg-white rounded-lg shadow-lg p-8 transition-opacity duration-500">
            <div class="flex flex-col md:flex-row items-start md:items-center mb-6">
              <div class="w-16 h-16 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                <img :src="filteredTestimonials[currentTestimonialIndex].avatar || '/images/testimonials/default-avatar.svg'" 
                     alt="Client avatar" 
                     class="w-full h-full object-cover" 
                     @error="$event.target.src = '/images/testimonials/default-avatar.svg'">
              </div>
              <div>
                <h3 class="text-xl font-semibold">{{ filteredTestimonials[currentTestimonialIndex].name }}</h3>
                <p class="text-gray-600">{{ filteredTestimonials[currentTestimonialIndex].role }} at {{ filteredTestimonials[currentTestimonialIndex].company }}</p>
              </div>
            </div>
            
            <div class="quote relative">
              <svg class="absolute -top-4 -left-2 w-10 h-10 text-gray-200" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zM10 26c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"></path>
                <path d="M16 8c0 0 0 2-2 2-2 0-2-2-2-2s0-2 2-2c2 0 2 2 2 2z"></path>
                <path d="M24 8c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zM24 26c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"></path>
                <path d="M30 8c0 0 0 2-2 2-2 0-2-2-2-2s0-2 2-2c2 0 2 2 2 2z"></path>
              </svg>
              
              <p class="text-lg pl-6 italic text-gray-700">{{ filteredTestimonials[currentTestimonialIndex].text }}</p>
            </div>
          </div>

          <div v-if="filteredTestimonials.length > 1" 
               class="absolute top-1/2 -left-6 transform -translate-y-1/2">
            <button @click="prevTestimonial" class="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div v-if="filteredTestimonials.length > 1" 
               class="absolute top-1/2 -right-6 transform -translate-y-1/2">
            <button @click="nextTestimonial" class="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div v-if="filteredTestimonials.length > 1" class="flex justify-center mt-6">
          <div 
            v-for="(_, index) in filteredTestimonials" 
            :key="index"
            @click="currentTestimonialIndex = index"
            class="w-3 h-3 mx-1 rounded-full cursor-pointer transition-colors"
            :class="currentTestimonialIndex === index ? 'bg-primary' : 'bg-gray-300'"
          ></div>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 py-12">
        No testimonials available for this category yet.
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-item {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.testimonial-item.fade-out {
  opacity: 0;
}
</style>