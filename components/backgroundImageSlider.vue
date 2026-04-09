<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const images = ref([
  'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/o3s31u9eem15ygo/20220929_173927_original_cb7wKgT60N.JPG?thumb=1440x810f',
  'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/c5a4iw9elmabgfp/p6190657_topaz_denoiseraw_sharpen_WvbG0DdlWy.jpg?thumb=1440x810f',
  'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/q47q19ee8liuqio/img_5685_x2pwFemQCR.jpeg?thumb=1440x810f',
  'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/fg4bsxfdpuaor7i/20220602_211051_topaz_original_g3pXStc64A.JPG?thumb=1440x810f',
]);

const currentImageIndex = ref(0);

onMounted(() => {
  setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
  }, 5000);
});
</script>

<template>
  <div class="relative min-h-screen w-full overflow-hidden">
    <!-- Background slides -->
    <div
      v-for="(image, index) in images"
      :key="index"
      :class="['slide', { active: currentImageIndex === index }]"
      :style="{ backgroundImage: 'url(' + image + ')' }"
    ></div>

    <!-- Dark overlay with gradient -->
    <div class="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark z-10"></div>

    <!-- Grid pattern overlay -->
    <div class="absolute inset-0 bg-grid z-10 opacity-30"></div>

    <!-- Ambient glow effects -->
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px] z-10"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-[120px] z-10"></div>

    <!-- Content -->
    <div class="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
      <!-- Avatar -->
      <div class="mb-8 animate-float">
        <div class="w-32 h-32 rounded-full overflow-hidden border-2 border-neon-green/50 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
          <img
            alt="Lasse Harm"
            class="w-full h-full object-cover"
            loading="lazy"
            src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/apekawb8my5xl5w/img_9077_topaz_denoiseraw_sharpen_no3Chl3kmx.jpg?thumb=300x300"
          >
        </div>
      </div>

      <!-- Text -->
      <div class="text-center max-w-2xl">
        <h1 class="text-5xl md:text-7xl font-black mb-4 animate-slide-up">
          <span class="gradient-text">{{ $t('hero.greeting') }}</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-300 mb-10 animate-slide-up" style="animation-delay: 0.15s;">
          {{ $t('hero.tagline') }}
        </p>

        <div class="flex flex-wrap justify-center gap-4 animate-slide-up" style="animation-delay: 0.3s;">
          <NuxtLink to="/reel-web-projects" class="btn-neon">
            {{ $t('hero.watchWork') }}
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-neon-outline">
            {{ $t('nav.contact') }}
          </NuxtLink>
        </div>
      </div>

      <!-- Social row at bottom -->
      <div class="absolute bottom-10 z-20">
        <social-row></social-row>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs uppercase tracking-widest">
        <div class="w-px h-8 bg-gradient-to-b from-transparent to-neon-green/50"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: absolute;
  transition: opacity 1.5s ease-in-out;
  opacity: 0;
  transform: scale(1.05);
}

.slide.active {
  opacity: 1;
  animation: ken-burns 8s ease-in-out forwards;
}

@keyframes ken-burns {
  0% { transform: scale(1.05); }
  100% { transform: scale(1.12); }
}
</style>
