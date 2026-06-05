<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const images = ref([
  'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/o3s31u9eem15ygo/20220929_173927_original_cb7wKgT60N.JPG?thumb=1920x1080f',
  'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/c5a4iw9elmabgfp/p6190657_topaz_denoiseraw_sharpen_WvbG0DdlWy.jpg?thumb=1920x1080f',
  'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/q47q19ee8liuqio/img_5685_x2pwFemQCR.jpeg?thumb=1920x1080f',
  'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/fg4bsxfdpuaor7i/20220602_211051_topaz_original_g3pXStc64A.JPG?thumb=1920x1080f',
]);

const currentImageIndex = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

const go = (i: number) => { currentImageIndex.value = (i + images.value.length) % images.value.length; };

onMounted(() => {
  timer = setInterval(() => go(currentImageIndex.value + 1), 6000);
});
onBeforeUnmount(() => { if (timer) clearInterval(timer); });
</script>

<template>
  <section class="relative min-h-[100svh] w-full overflow-hidden bg-forest">
    <!-- Background slides (Ken Burns) -->
    <div
      v-for="(image, index) in images"
      :key="index"
      :class="['slide', { active: currentImageIndex === index }]"
      :style="{ backgroundImage: 'url(' + image + ')' }"
    ></div>

    <!-- Cinematic grading: vignette + bottom fade -->
    <div class="absolute inset-0 z-10 pointer-events-none vignette"></div>
    <div class="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-forest/80 via-transparent to-forest/40"></div>

    <!-- Topographic texture + ambient drift orbs -->
    <div class="absolute inset-0 z-10 bg-topo opacity-30 pointer-events-none"></div>
    <div class="orb top-1/4 left-1/4 w-96 h-96 bg-amber/10 animate-drift-slow z-10"></div>
    <div class="orb bottom-1/4 right-1/4 w-96 h-96 bg-moss/10 animate-drift z-10"></div>

    <!-- Content -->
    <div class="relative z-20 flex flex-col justify-center min-h-[100svh] container mx-auto px-6">
      <div class="max-w-3xl">
        <p class="eyebrow mb-6 flex items-center gap-3 animate-slide-up">
          <span class="inline-block w-10 h-px bg-amber"></span>
          {{ t('home.landing.kicker') }}
        </p>

        <h1 class="display-xl text-bone text-[18vw] sm:text-[15vw] md:text-[11rem] lg:text-[13rem]">
          <span class="block overflow-hidden">
            <span class="inline-block animate-slide-up" style="animation-delay:.05s">{{ t('home.landing.titleA') }}</span>
          </span>
          <span class="block overflow-hidden">
            <span class="inline-block gradient-text-anim animate-slide-up" style="animation-delay:.18s">{{ t('home.landing.titleB') }}</span>
          </span>
        </h1>

        <p class="mt-6 text-lg md:text-xl text-bone-muted max-w-xl leading-relaxed animate-slide-up" style="animation-delay:.32s">
          {{ t('home.landing.lead') }}
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-4 animate-slide-up" style="animation-delay:.45s">
          <NuxtLink to="/photography" class="btn-wild">{{ t('home.landing.ctaPhotos') }}</NuxtLink>
          <NuxtLink to="/contact" class="btn-wild-outline">{{ t('nav.contact') }}</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Slide indicators -->
    <div class="absolute bottom-10 right-6 md:right-10 z-30 flex flex-col items-end gap-3">
      <social-row class="!justify-end mb-2" />
      <div class="flex gap-2">
        <button
          v-for="(_, i) in images"
          :key="i"
          @click="go(i)"
          :aria-label="`Slide ${i + 1}`"
          class="h-1 rounded-full transition-all duration-500"
          :class="currentImageIndex === i ? 'w-10 bg-amber shadow-[0_0_10px_rgba(217,138,61,0.6)]' : 'w-4 bg-bone/30 hover:bg-bone/60'"
        ></button>
      </div>
    </div>

    <!-- Scroll cue -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
      <span class="eyebrow text-[10px] text-bone-dim">Scroll</span>
      <span class="w-px h-12 bg-gradient-to-b from-amber/70 to-transparent animate-bob"></span>
    </div>
  </section>
</template>

<style scoped>
.slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1.06);
  transition: opacity 1.6s ease-in-out;
}
.slide.active {
  opacity: 1;
  animation: ken-burns 9s ease-out forwards;
}
@keyframes ken-burns {
  0% { transform: scale(1.06) translate(0, 0); }
  100% { transform: scale(1.16) translate(-1.5%, -1.5%); }
}
@media (prefers-reduced-motion: reduce) {
  .slide.active { animation: none; transform: scale(1.02); }
}
</style>
