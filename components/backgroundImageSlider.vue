<script lang="ts" setup>
// Title screen — no image carousel; a repeating phosphor flow drifts
// diagonally from the top-right to the bottom-left behind the plaque.
</script>

<template>
  <!-- Game Boy TITLE SCREEN -->
  <div class="title-screen relative min-h-[calc(100vh-13rem)] w-full overflow-hidden flex items-center justify-center px-4 py-12">
    <!-- Flowing diagonal phosphor layers (top-right -> bottom-left) -->
    <div class="flow flow-dots-lg" aria-hidden="true"></div>
    <div class="flow flow-dots-sm" aria-hidden="true"></div>
    <div class="flow flow-streaks" aria-hidden="true"></div>
    <div class="absolute inset-0 bg-grid opacity-15 z-[1]"></div>
    <div class="title-vignette absolute inset-0 z-[2]"></div>

    <!-- Title plaque -->
    <div class="gb-titlecard relative z-20 animate-pixel-in">
      <!-- Sprite -->
      <div class="flex justify-center mb-5">
        <div class="gb-tile w-28 h-28 animate-float" style="box-shadow: 5px 5px 0 rgba(0,0,0,0.5);">
          <img
            alt="Lasse Harm"
            class="w-full h-full object-cover"
            loading="lazy"
            src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/apekawb8my5xl5w/img_9077_topaz_denoiseraw_sharpen_no3Chl3kmx.jpg?thumb=300x300"
          >
        </div>
      </div>

      <!-- Wordmark -->
      <h1 class="text-4xl md:text-6xl font-black mb-2">
        <span class="gradient-text">{{ $t('hero.greeting') }}</span>
      </h1>
      <p class="pixel-label text-lcd-dim mb-1">LASSE HARM ™</p>
      <p class="text-gray-400 mb-6 text-lg">{{ $t('hero.tagline') }}</p>

      <!-- Blinking start prompt -->
      <p class="gb-prompt animate-blink mb-6">PRESS START</p>

      <!-- Menu buttons -->
      <div class="flex flex-wrap justify-center gap-3 mb-6">
        <NuxtLink to="/reel-web-projects" class="btn-neon animate-glow-pulse">
          {{ $t('hero.watchWork') }}
        </NuxtLink>
        <NuxtLink to="/contact" class="btn-neon-outline">
          {{ $t('nav.contact') }}
        </NuxtLink>
      </div>

      <social-row></social-row>
    </div>
  </div>
</template>

<style scoped>
.title-screen {
  background: rgb(var(--c-bg));
}

/* Each flow layer tiles a square pattern and scrolls exactly one tile
   per loop (down + left) so it repeats seamlessly, streaming TR -> BL. */
.flow {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.flow-dots-lg {
  background-image: radial-gradient(circle, rgb(var(--c-green) / 0.18) 1.7px, transparent 2.3px);
  background-size: 46px 46px;
  opacity: 0.7;
  animation: flow-lg 5.5s linear infinite;
}
.flow-dots-sm {
  background-image: radial-gradient(circle, rgb(var(--c-velvet) / 0.16) 1.2px, transparent 1.8px);
  background-size: 26px 26px;
  opacity: 0.55;
  animation: flow-sm 8s linear infinite;
}
.flow-streaks {
  background-image: repeating-linear-gradient(135deg, rgb(var(--c-green) / 0.05) 0 2px, transparent 2px 40px);
  background-size: 40px 40px;
  opacity: 0.7;
  animation: flow-streak 3.2s linear infinite;
}

@keyframes flow-lg {
  from { background-position: 0 0; }
  to   { background-position: -46px 46px; }
}
@keyframes flow-sm {
  from { background-position: 0 0; }
  to   { background-position: -26px 26px; }
}
@keyframes flow-streak {
  from { background-position: 0 0; }
  to   { background-position: -40px 40px; }
}

.title-vignette {
  pointer-events: none;
  background:
    radial-gradient(120% 90% at 72% 18%, transparent 42%, rgba(0,0,0,0.5) 100%),
    var(--lcd-tint);
}

@media (prefers-reduced-motion: reduce) {
  .flow-dots-lg, .flow-dots-sm, .flow-streaks { animation: none; }
}
</style>
