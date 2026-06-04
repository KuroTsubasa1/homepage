<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  category: {
    type: String,
    default: 'general'
  }
});

const testimonials = ref([
  { id: 1, category: 'photography', clientKey: 'emmaJohnson', avatar: '/images/testimonials/avatar1.jpg' },
  { id: 2, category: 'drone', clientKey: 'thomasNielsen', avatar: '/images/testimonials/avatar2.jpg' },
  { id: 3, category: '3d-printing', clientKey: 'sarahMartinez', avatar: '/images/testimonials/avatar3.jpg' },
  { id: 4, category: 'web', clientKey: 'michaelBerg', avatar: '/images/testimonials/avatar4.jpg' },
  { id: 5, category: 'photography', clientKey: 'lauraHansen', avatar: '/images/testimonials/avatar5.jpg' },
  { id: 6, category: 'drone', clientKey: 'davidAndersen', avatar: '/images/testimonials/avatar6.jpg' }
]);

const filteredTestimonials = computed(() => {
  if (props.category === 'general') return testimonials.value;
  return testimonials.value.filter(t => t.category === props.category);
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
  intervalId.value = setInterval(nextTestimonial, 8000);
};

const stopAutoScroll = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

onMounted(() => {
  if (filteredTestimonials.value.length > 1) startAutoScroll();
});

onUnmounted(() => {
  stopAutoScroll();
});
</script>

<template>
  <section class="py-24 bg-dark-100 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px]"></div>

    <div class="container mx-auto px-4 relative z-10">
      <h2 class="section-heading">{{ t('testimonials.title') }}</h2>
      <div class="section-divider"></div>

      <div v-if="filteredTestimonials.length > 0" class="relative max-w-3xl mx-auto">
        <!-- Testimonial card -->
        <div class="glass-card neon-border p-8 md:p-10 relative animate-slide-up">
          <!-- Quote icon -->
          <div class="absolute -top-4 -left-2 w-10 h-10 bg-neon-green/20 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-neon-green" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>

          <div class="flex flex-col md:flex-row items-start md:items-center mb-6 gap-4">
            <div class="cartridge w-14 h-14 rounded-full overflow-hidden border-2 border-neon-purple/40 flex-shrink-0">
              <img
                :src="filteredTestimonials[currentTestimonialIndex].avatar || '/images/testimonials/default-avatar.svg'"
                alt="Client avatar"
                class="w-full h-full object-cover"
                @error="$event.target.src = '/images/testimonials/default-avatar.svg'"
              >
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">
                {{ t(`testimonials.clients.${filteredTestimonials[currentTestimonialIndex].clientKey}.name`) }}
              </h3>
              <p class="text-sm text-neon-purple font-pixel">
                {{ t(`testimonials.clients.${filteredTestimonials[currentTestimonialIndex].clientKey}.role`) }}
                {{ t('testimonials.at') }}
                {{ t(`testimonials.clients.${filteredTestimonials[currentTestimonialIndex].clientKey}.company`) }}
              </p>
            </div>
          </div>

          <p class="text-gray-300 leading-relaxed italic text-lg">
            "{{ t(`testimonials.clients.${filteredTestimonials[currentTestimonialIndex].clientKey}.text`) }}"
          </p>
        </div>

        <!-- Navigation arrows -->
        <template v-if="filteredTestimonials.length > 1">
          <button
            @click="prevTestimonial"
            class="absolute top-1/2 -left-4 md:-left-6 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-200 border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon-green hover:border-neon-green/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(155,188,15,0.2)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="nextTestimonial"
            class="absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-200 border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon-green hover:border-neon-green/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(155,188,15,0.2)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </template>

        <!-- Dots -->
        <div v-if="filteredTestimonials.length > 1" class="flex justify-center mt-8 gap-2">
          <button
            v-for="(_, index) in filteredTestimonials"
            :key="index"
            @click="currentTestimonialIndex = index"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="currentTestimonialIndex === index
              ? 'bg-neon-green w-6 shadow-[0_0_10px_rgba(155,188,15,0.5)]'
              : 'bg-dark-400 hover:bg-dark-300'"
          ></button>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 py-12">
        {{ t('testimonials.noTestimonials') }}
      </div>
    </div>
  </section>
</template>
