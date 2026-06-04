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
  <div>
    <GbWindow :title="t('testimonials.title')" class="animate-slide-up">

      <div v-if="filteredTestimonials.length > 0">
        <!-- Testimonial card -->
        <div class="gb-tile dither">
          <div class="p-6 md:p-8">
            <div class="flex flex-col md:flex-row items-start md:items-center mb-6 gap-4">
              <div class="cartridge w-14 h-14 overflow-hidden flex-shrink-0">
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
                <p class="pixel-label text-neon-purple">
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
        </div>

        <!-- Navigation + position -->
        <div v-if="filteredTestimonials.length > 1" class="flex items-center justify-between gap-3 mt-6">
          <button
            @click="prevTestimonial"
            class="btn-neon-outline inline-flex items-center gap-2"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span aria-hidden="true">◄</span>
          </button>

          <!-- Position chips -->
          <div class="flex flex-wrap justify-center gap-2">
            <button
              v-for="(_, index) in filteredTestimonials"
              :key="index"
              @click="currentTestimonialIndex = index"
              class="gb-chip"
              :class="currentTestimonialIndex === index ? 'is-active' : ''"
              :aria-label="`Testimonial ${index + 1}`"
            >{{ index + 1 }}</button>
          </div>

          <button
            @click="nextTestimonial"
            class="btn-neon-outline inline-flex items-center gap-2"
            aria-label="Next"
          >
            <span aria-hidden="true">►</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 py-12">
        {{ t('testimonials.noTestimonials') }}
      </div>

    </GbWindow>
  </div>
</template>

<style scoped>
/* Active position chip uses the green fill to read like a selected slot */
.gb-chip.is-active {
  background: rgb(var(--c-green));
  color: rgb(var(--c-bg));
  border-color: rgb(var(--c-green));
  box-shadow: 0 0 10px rgba(155, 188, 15, 0.5);
}
</style>
