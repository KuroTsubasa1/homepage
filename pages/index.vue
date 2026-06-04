<script setup lang="ts">
const { sfx } = useGameboy()

useSeoMeta({
  title: 'Lasse Harm | Web Developer, Photographer & Maker',
  ogTitle: 'Lasse Harm | Web Developer, Photographer & Maker',
  description: 'Hi, I\'m Lasse Harm — a web developer based in Germany. I build modern web apps, fly FPV drones, shoot wildlife & wedding photography, and tinker with 3D printers.',
  ogDescription: 'Hi, I\'m Lasse Harm — a web developer based in Germany. I build modern web apps, fly FPV drones, shoot wildlife & wedding photography, and tinker with 3D printers.',
  ogImage: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/q8dewf7gwhbqpk2/20240319_182201_N85s671DEL.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
  keywords: 'Lasse Harm, web developer, Germany, Vue.js, Nuxt, photographer, FPV drone pilot, 3D printing',
});

const techStack = [
  'Vue.js', 'Nuxt', 'TypeScript', 'PHP', 'Symfony', 'Laravel', 'Tailwind', 'MySQL', 'Docker', 'Git'
];
</script>

<template>
  <div>
    <!-- TITLE SCREEN -->
    <background-image-slider></background-image-slider>

    <!-- MENU SCREENS -->
    <div class="container mx-auto px-4 max-w-4xl py-12 space-y-10">

      <!-- STATUS -->
      <GbWindow title="STATUS" class="animate-slide-up">
        <div class="flex flex-col gap-5">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 bg-neon-green animate-pulse flex-shrink-0" style="box-shadow:0 0 8px rgba(155,188,15,.7)"></span>
            <div>
              <p class="pixel-label text-lcd-faint">{{ $t('home.currentlyAt') }}</p>
              <p class="text-neon-green text-lg">DIU MarTech Solutions GmbH</p>
            </div>
          </div>
          <div>
            <p class="pixel-label text-lcd-faint mb-3">EQUIPPED</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in techStack" :key="tech" class="gb-chip">{{ tech }}</span>
            </div>
          </div>
        </div>
      </GbWindow>

      <!-- WHAT I DO — skill menu -->
      <GbWindow :title="$t('home.services')" class="animate-slide-up">
        <ul class="gb-menu-list">
          <li>
            <NuxtLink to="/reel-web-projects" class="gb-menu-row !items-start" @mouseenter="sfx.hover()" @click="sfx.select()">
              <span class="flex-1 min-w-0">
                <span class="flex flex-wrap items-center gap-2">
                  <span class="text-neon-green">&lt;/&gt;</span>
                  <span>{{ $t('home.webDev.title') }}</span>
                  <span class="gb-chip">{{ $t('home.mainFocus') }}</span>
                </span>
                <span class="block mt-2 gb-row-desc">{{ $t('home.webDev.description') }}</span>
              </span>
              <span class="hidden sm:flex flex-col items-end gap-1.5 w-28 flex-shrink-0 pt-1">
                <span class="gb-menu-value">LV 99</span>
                <span class="gb-bar block w-full" style="--pct:100%"></span>
              </span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/photography" class="gb-menu-row !items-start" @mouseenter="sfx.hover()" @click="sfx.select()">
              <span class="flex-1 min-w-0">
                <span class="flex flex-wrap items-center gap-2">
                  <span class="text-neon-purple">[o]</span>
                  <span>{{ $t('home.photography.title') }}</span>
                </span>
                <span class="block mt-2 gb-row-desc">{{ $t('home.photography.description') }}</span>
              </span>
              <span class="hidden sm:flex flex-col items-end gap-1.5 w-28 flex-shrink-0 pt-1">
                <span class="gb-menu-value">LV 82</span>
                <span class="gb-bar block w-full" style="--pct:82%"></span>
              </span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/drone" class="gb-menu-row !items-start" @mouseenter="sfx.hover()" @click="sfx.select()">
              <span class="flex-1 min-w-0">
                <span class="flex flex-wrap items-center gap-2">
                  <span class="text-neon-cyan">/\</span>
                  <span>{{ $t('home.drone.title') }}</span>
                </span>
                <span class="block mt-2 gb-row-desc">{{ $t('home.drone.description') }}</span>
              </span>
              <span class="hidden sm:flex flex-col items-end gap-1.5 w-28 flex-shrink-0 pt-1">
                <span class="gb-menu-value">LV 74</span>
                <span class="gb-bar block w-full" style="--pct:74%"></span>
              </span>
            </NuxtLink>
          </li>
          <li>
            <a href="https://3dps.space/" target="_blank" rel="noopener noreferrer" class="gb-menu-row !items-start" @mouseenter="sfx.hover()" @click="sfx.select()">
              <span class="flex-1 min-w-0">
                <span class="flex flex-wrap items-center gap-2">
                  <span class="text-neon-magenta">[#]</span>
                  <span>{{ $t('home.printing.title') }}</span>
                </span>
                <span class="block mt-2 gb-row-desc">{{ $t('home.printing.description') }}</span>
              </span>
              <span class="hidden sm:flex flex-col items-end gap-1.5 w-28 flex-shrink-0 pt-1">
                <span class="gb-menu-value">LV 68</span>
                <span class="gb-bar block w-full" style="--pct:68%"></span>
              </span>
            </a>
          </li>
        </ul>
      </GbWindow>

      <!-- QUEST LOG — current work -->
      <GbWindow :title="$t('home.workingOnTitle')" class="animate-slide-up">
        <ul class="gb-menu-list">
          <li>
            <NuxtLink to="/reel-web-projects/suzuki-hit" class="gb-menu-row !items-start" @mouseenter="sfx.hover()" @click="sfx.select()">
              <span class="flex-1 min-w-0">
                <span class="flex flex-wrap items-center gap-2">
                  <span>Suzuki HIT</span>
                  <span class="gb-chip">{{ $t('home.current') }}</span>
                </span>
                <span class="block mt-2 gb-row-desc">{{ $t('home.featuredHitDesc') }}</span>
                <span class="flex flex-wrap gap-2 mt-2">
                  <span class="gb-chip">Vue.js</span>
                  <span class="gb-chip">Enterprise</span>
                </span>
              </span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/reel-web-projects/suzuki-ssbp-nxt" class="gb-menu-row !items-start" @mouseenter="sfx.hover()" @click="sfx.select()">
              <span class="flex-1 min-w-0">
                <span class="flex flex-wrap items-center gap-2">
                  <span>Suzuki SSBP-Nxt</span>
                  <span class="gb-chip">{{ $t('home.current') }}</span>
                </span>
                <span class="block mt-2 gb-row-desc">{{ $t('home.featuredSsbpDesc') }}</span>
                <span class="flex flex-wrap gap-2 mt-2">
                  <span class="gb-chip">Vue.js</span>
                  <span class="gb-chip">Rewrite</span>
                </span>
              </span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/reel-web-projects" class="gb-menu-row" @mouseenter="sfx.hover()" @click="sfx.select()">
              <span>{{ $t('home.seeAllProjects') }}</span>
            </NuxtLink>
          </li>
        </ul>
      </GbWindow>

      <!-- CTA -->
      <GbWindow class="animate-slide-up">
        <div class="text-center py-2">
          <h2 class="text-2xl md:text-4xl font-black mb-4">
            <span class="gradient-text">{{ $t('cta.title') }}</span>
          </h2>
          <p class="text-gray-400 text-lg mb-7 max-w-2xl mx-auto">{{ $t('cta.description') }}</p>
          <p class="gb-prompt animate-blink mb-5">NEW GAME?</p>
          <NuxtLink to="/contact" class="btn-neon animate-glow-pulse inline-block">
            {{ $t('cta.button') }}
          </NuxtLink>
        </div>
      </GbWindow>

    </div>
  </div>
</template>

<style scoped>
/* Flavour text under each menu row (readable VT323, not pixel font) */
.gb-row-desc {
  font-family: 'VT323', ui-monospace, monospace;
  font-size: 1.05rem;
  line-height: 1.3;
  letter-spacing: 0.01em;
  text-transform: none;
  color: rgb(var(--c-ink-2));
}
</style>
