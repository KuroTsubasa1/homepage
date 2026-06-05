<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const currentYear = ref(new Date().getFullYear());
const { t } = useI18n();

const explore = [
  { to: '/photography/wildlife', key: 'wildlife' },
  { to: '/photography/landscape-nature', key: 'landscape' },
  { to: '/photography/portraits-people', key: 'portraits' },
  { to: '/photography/weddings', key: 'weddings' },
];
const more = [
  { to: '/reel-web-projects', label: () => t('nav.webProjects') },
  { to: '/drone', label: () => t('nav.drone') },
  { to: '/3d-printing', label: () => t('nav.3dPrinting') },
  { to: '/about', label: () => t('nav.about') },
  { to: '/contact', label: () => t('nav.contact') },
];
</script>

<template>
  <footer class="relative bg-forest-100 border-t border-bone/5 overflow-hidden">
    <!-- topographic texture + horizon glow -->
    <div class="absolute inset-0 bg-topo opacity-40 pointer-events-none"></div>
    <div class="orb -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-72 bg-amber/5"></div>

    <div class="container mx-auto px-4 relative z-10 py-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-10">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <p class="font-display text-2xl uppercase text-bone leading-none">Lasse<br>Harm</p>
          <p class="eyebrow mt-3 text-bone-dim">Into the Wild</p>
          <p class="text-sm text-bone-muted mt-4 max-w-xs leading-relaxed">
            Photographer, FPV pilot &amp; web developer based in Schleswig-Holstein, Germany.
          </p>
        </div>

        <!-- Galleries -->
        <div>
          <p class="eyebrow mb-4 text-amber/90">{{ t('nav.photography') }}</p>
          <ul class="space-y-2.5">
            <li v-for="l in explore" :key="l.key">
              <NuxtLink :to="l.to" class="link-glow text-sm">{{ t(`photoCategories.${l.key}`) }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- More -->
        <div>
          <p class="eyebrow mb-4 text-amber/90">Explore</p>
          <ul class="space-y-2.5">
            <li v-for="l in more" :key="l.to">
              <NuxtLink :to="l.to" class="link-glow text-sm">{{ l.label() }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Connect -->
        <div>
          <p class="eyebrow mb-4 text-amber/90">Connect</p>
          <social-row class="!justify-start" />
        </div>
      </div>

      <div class="mt-14 pt-6 border-t border-bone/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-sm text-bone-dim">{{ t('footer.copyright', { year: currentYear }) }}</p>
        <div class="w-16 h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent"></div>
        <p class="eyebrow text-[10px] text-bone-dim">Lat 54.5°N · Lon 9.5°E</p>
      </div>
    </div>
  </footer>
</template>
