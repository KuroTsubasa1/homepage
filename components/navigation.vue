<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

// Photography dropdown
const isPhotoDropdownOpen = ref(false);
const togglePhotoDropdown = () => {
  isPhotoDropdownOpen.value = !isPhotoDropdownOpen.value;
};

// Language dropdown
const isLangDropdownOpen = ref(false);
const toggleLangDropdown = () => {
  isLangDropdownOpen.value = !isLangDropdownOpen.value;
};

// Available locales
const availableLocales = [
  { code: 'en', name: 'EN' },
  { code: 'de', name: 'DE' }
];

// Change language
const switchLanguage = (langCode) => {
  locale.value = langCode;
  isLangDropdownOpen.value = false;
  closeMenu();
};

// Scroll detection
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled
        ? 'bg-dark/80 backdrop-blur-xl border-b border-neon-green/10 shadow-lg shadow-neon-green/5 py-2'
        : 'bg-transparent py-4'
    ]"
  >
    <div class="container mx-auto px-4 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink class="flex items-center gap-3 group" to="/" @click="closeMenu">
        <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-neon-green/50 group-hover:border-neon-green transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
          <img class="w-full h-full object-cover" loading="lazy"
               src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/apekawb8my5xl5w/img_9077_topaz_denoiseraw_sharpen_no3Chl3kmx.jpg?thumb=300x300" alt="Lasse Harm">
        </div>
        <span class="font-bold text-lg text-white group-hover:text-neon-green transition-colors duration-300 hidden sm:inline">
          Lasse Harm
        </span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <ul class="hidden lg:flex items-center gap-1">
        <li>
          <NuxtLink class="nav-item" active-class="!text-neon-green" to="/reel-web-projects">{{ $t('nav.webProjects') }}</NuxtLink>
        </li>

        <!-- Photography Dropdown -->
        <li class="relative">
          <button
            @click="togglePhotoDropdown"
            class="nav-item flex items-center gap-1"
            :class="{ '!text-neon-green': isPhotoDropdownOpen }"
          >
            {{ $t('nav.photography') }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 transition-transform duration-200" :class="{ 'rotate-180': isPhotoDropdownOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-show="isPhotoDropdownOpen" class="absolute top-full mt-2 w-52 glass-card neon-border p-2 space-y-1">
            <NuxtLink to="/photography" class="dropdown-item">{{ $t('photoCategories.all') }}</NuxtLink>
            <NuxtLink to="/photography/wildlife" class="dropdown-item">{{ $t('photoCategories.wildlife') }}</NuxtLink>
            <NuxtLink to="/photography/landscape-nature" class="dropdown-item">{{ $t('photoCategories.landscape') }}</NuxtLink>
            <NuxtLink to="/photography/portraits-people" class="dropdown-item">{{ $t('photoCategories.portraits') }}</NuxtLink>
            <NuxtLink to="/photography/abstract-art" class="dropdown-item">{{ $t('photoCategories.abstract') }}</NuxtLink>
            <NuxtLink to="/photography/weddings" class="dropdown-item">{{ $t('photoCategories.weddings') }}</NuxtLink>
          </div>
        </li>

        <li>
          <NuxtLink class="nav-item" active-class="!text-neon-green" to="/drone">{{ $t('nav.drone') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink class="nav-item" active-class="!text-neon-green" to="/3d-printing">{{ $t('nav.3dPrinting') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink class="nav-item" active-class="!text-neon-green" to="/about">{{ $t('nav.about') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink class="nav-item" active-class="!text-neon-green" to="/contact">{{ $t('nav.contact') }}</NuxtLink>
        </li>

        <!-- Language Switcher -->
        <li class="relative ml-2">
          <button
            @click="toggleLangDropdown"
            class="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 text-sm text-gray-400 hover:text-neon-green hover:border-neon-green/30 transition-all duration-300"
          >
            {{ locale.toUpperCase() }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-show="isLangDropdownOpen" class="absolute right-0 top-full mt-2 w-24 glass-card neon-border p-2 space-y-1">
            <button
              v-for="loc in availableLocales"
              :key="loc.code"
              @click="switchLanguage(loc.code)"
              class="dropdown-item w-full text-left"
              :class="{ '!text-neon-green': locale === loc.code }"
            >
              {{ loc.name }}
            </button>
          </div>
        </li>
      </ul>

      <!-- Mobile Menu Toggle -->
      <button @click="toggleMenu" class="lg:hidden p-2 text-gray-400 hover:text-neon-green transition-colors" aria-label="Toggle menu">
        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div v-show="isMenuOpen" class="lg:hidden mt-2 mx-4 glass-card neon-border p-4 space-y-1">
      <NuxtLink @click="closeMenu" class="mobile-nav-item" active-class="!text-neon-green" to="/reel-web-projects">{{ $t('nav.webProjects') }}</NuxtLink>
      <NuxtLink @click="closeMenu" class="mobile-nav-item" active-class="!text-neon-green" to="/photography">{{ $t('nav.photography') }}</NuxtLink>
      <NuxtLink @click="closeMenu" class="mobile-nav-item pl-6 text-sm" active-class="!text-neon-green" to="/photography/wildlife">{{ $t('photoCategories.wildlife') }}</NuxtLink>
      <NuxtLink @click="closeMenu" class="mobile-nav-item pl-6 text-sm" active-class="!text-neon-green" to="/photography/landscape-nature">{{ $t('photoCategories.landscape') }}</NuxtLink>
      <NuxtLink @click="closeMenu" class="mobile-nav-item pl-6 text-sm" active-class="!text-neon-green" to="/photography/portraits-people">{{ $t('photoCategories.portraits') }}</NuxtLink>
      <NuxtLink @click="closeMenu" class="mobile-nav-item pl-6 text-sm" active-class="!text-neon-green" to="/photography/abstract-art">{{ $t('photoCategories.abstract') }}</NuxtLink>
      <NuxtLink @click="closeMenu" class="mobile-nav-item pl-6 text-sm" active-class="!text-neon-green" to="/photography/weddings">{{ $t('photoCategories.weddings') }}</NuxtLink>
      <NuxtLink @click="closeMenu" class="mobile-nav-item" active-class="!text-neon-green" to="/drone">{{ $t('nav.drone') }}</NuxtLink>
      <NuxtLink @click="closeMenu" class="mobile-nav-item" active-class="!text-neon-green" to="/3d-printing">{{ $t('nav.3dPrinting') }}</NuxtLink>
      <NuxtLink @click="closeMenu" class="mobile-nav-item" active-class="!text-neon-green" to="/about">{{ $t('nav.about') }}</NuxtLink>
      <NuxtLink @click="closeMenu" class="mobile-nav-item" active-class="!text-neon-green" to="/contact">{{ $t('nav.contact') }}</NuxtLink>

      <div class="flex justify-center gap-3 pt-4 border-t border-white/10">
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          @click="switchLanguage(loc.code)"
          class="px-4 py-1.5 rounded-lg text-sm transition-all duration-300"
          :class="locale === loc.code
            ? 'bg-neon-green/20 text-neon-green border border-neon-green/40'
            : 'text-gray-400 border border-white/10 hover:border-neon-green/30 hover:text-neon-green'"
        >
          {{ loc.name }}
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-item {
  @apply px-3 py-2 text-sm font-medium text-gray-300 rounded-lg transition-all duration-300;
}
.nav-item:hover {
  @apply text-neon-green;
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
}

.dropdown-item {
  @apply block px-3 py-2 text-sm text-gray-300 rounded-lg transition-all duration-200;
}
.dropdown-item:hover {
  @apply bg-neon-green/10 text-neon-green;
}

.mobile-nav-item {
  @apply block px-4 py-2.5 text-gray-300 rounded-lg transition-all duration-200;
}
.mobile-nav-item:hover {
  @apply bg-neon-green/10 text-neon-green;
}
</style>
