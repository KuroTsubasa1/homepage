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
  <section class="relative py-28 bg-forest-100 overflow-hidden">
    <!-- Ambient decoration -->
    <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
    <div class="orb top-0 right-1/4 w-96 h-96 bg-moss/10"></div>
    <div class="orb bottom-0 left-1/4 w-[28rem] h-72 bg-amber/5"></div>

    <div class="container mx-auto px-6 relative z-10">
      <section-heading eyebrow="From the Field" :title="t('testimonials.title')" />

      <div
        v-if="filteredTestimonials.length > 0"
        v-reveal:scale
        class="relative max-w-4xl mx-auto"
      >
        <!-- Cinematic quote panel -->
        <div
          v-tilt="3"
          class="panel wild-border relative px-8 py-14 md:px-16 md:py-20 overflow-hidden"
        >
          <!-- Oversized amber quotation mark -->
          <span
            class="pointer-events-none select-none absolute -top-6 left-6 md:-top-10 md:left-10 font-display text-[9rem] md:text-[14rem] leading-none text-amber/15 z-0"
            aria-hidden="true"
          >&ldquo;</span>

          <div class="relative z-10">
            <Transition name="quote-fade" mode="out-in">
              <blockquote
                :key="filteredTestimonials[currentTestimonialIndex].id"
                class="text-center"
              >
                <!-- The quote -->
                <p class="font-sans italic text-xl md:text-3xl text-bone leading-relaxed text-balance max-w-3xl mx-auto">
                  {{ t(`testimonials.clients.${filteredTestimonials[currentTestimonialIndex].clientKey}.text`) }}
                </p>

                <!-- Hairline divider -->
                <span class="inline-block w-12 h-px bg-amber/60 my-9"></span>

                <!-- Attribution -->
                <footer class="flex flex-col items-center gap-4">
                  <div class="w-16 h-16 rounded-full overflow-hidden wild-border flex-shrink-0">
                    <img
                      :src="filteredTestimonials[currentTestimonialIndex].avatar || '/images/testimonials/default-avatar.svg'"
                      alt="Client avatar"
                      class="w-full h-full object-cover"
                      @error="$event.target.src = '/images/testimonials/default-avatar.svg'"
                    >
                  </div>
                  <div>
                    <p class="font-display uppercase text-xl md:text-2xl text-bone tracking-wide">
                      {{ t(`testimonials.clients.${filteredTestimonials[currentTestimonialIndex].clientKey}.name`) }}
                    </p>
                    <p class="font-condensed uppercase tracking-widest2 text-sm text-moss-light mt-1">
                      {{ t(`testimonials.clients.${filteredTestimonials[currentTestimonialIndex].clientKey}.role`) }}
                      {{ t('testimonials.at') }}
                      {{ t(`testimonials.clients.${filteredTestimonials[currentTestimonialIndex].clientKey}.company`) }}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </Transition>
          </div>
        </div>

        <!-- Navigation arrows -->
        <template v-if="filteredTestimonials.length > 1">
          <button
            @click="prevTestimonial"
            aria-label="Previous"
            class="absolute top-1/2 -left-3 md:-left-7 -translate-y-1/2 w-12 h-12 rounded-full bg-forest-200 border border-bone/10 flex items-center justify-center text-bone-muted hover:text-amber hover:border-amber/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,138,61,0.2)] hover:-translate-y-[calc(50%+2px)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="nextTestimonial"
            aria-label="Next"
            class="absolute top-1/2 -right-3 md:-right-7 -translate-y-1/2 w-12 h-12 rounded-full bg-forest-200 border border-bone/10 flex items-center justify-center text-bone-muted hover:text-amber hover:border-amber/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,138,61,0.2)] hover:-translate-y-[calc(50%+2px)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </template>

        <!-- Dots -->
        <div v-if="filteredTestimonials.length > 1" class="flex justify-center mt-10 gap-2.5">
          <button
            v-for="(_, index) in filteredTestimonials"
            :key="index"
            @click="currentTestimonialIndex = index"
            aria-label="Go to testimonial"
            class="h-2 rounded-full transition-all duration-300 ease-wild"
            :class="currentTestimonialIndex === index
              ? 'bg-amber w-7 shadow-[0_0_12px_rgba(217,138,61,0.6)]'
              : 'bg-forest-300 w-2 hover:bg-forest-400'"
          ></button>
        </div>
      </div>

      <div v-else class="text-center text-bone-dim py-12">
        {{ t('testimonials.noTestimonials') }}
      </div>
    </div>
  </section>
</template>

<style scoped>
.quote-fade-enter-active,
.quote-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.quote-fade-enter-from {
  opacity: 0;
  transform: translateY(14px);
}
.quote-fade-leave-to {
  opacity: 0;
  transform: translateY(-14px);
}
@media (prefers-reduced-motion: reduce) {
  .quote-fade-enter-active,
  .quote-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .quote-fade-enter-from,
  .quote-fade-leave-to {
    transform: none;
  }
}
</style>
