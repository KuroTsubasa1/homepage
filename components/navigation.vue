<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value; };
const closeMenu = () => { isMenuOpen.value = false; };

// Photography mega-menu
const isPhotoDropdownOpen = ref(false);
const togglePhotoDropdown = () => { isPhotoDropdownOpen.value = !isPhotoDropdownOpen.value; };
const closePhoto = () => { isPhotoDropdownOpen.value = false; };

// Language dropdown
const isLangDropdownOpen = ref(false);
const toggleLangDropdown = () => { isLangDropdownOpen.value = !isLangDropdownOpen.value; };

const availableLocales = [
  { code: 'en', name: 'EN' },
  { code: 'de', name: 'DE' },
];

const switchLanguage = (langCode: string) => {
  locale.value = langCode;
  isLangDropdownOpen.value = false;
  closeMenu();
};

const photoLinks = [
  { to: '/photography', key: 'all' },
  { to: '/photography/wildlife', key: 'wildlife' },
  { to: '/photography/landscape-nature', key: 'landscape' },
  { to: '/photography/portraits-people', key: 'portraits' },
  { to: '/photography/abstract-art', key: 'abstract' },
  { to: '/photography/weddings', key: 'weddings' },
];

const handleScroll = () => { isScrolled.value = window.scrollY > 40; };

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-wild',
      isScrolled
        ? 'bg-forest/85 backdrop-blur-xl border-b border-amber/10 shadow-lg shadow-black/40 py-2'
        : 'bg-gradient-to-b from-forest/70 to-transparent py-4'
    ]"
  >
    <div class="container mx-auto px-4 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink class="flex items-center gap-3 group" to="/" @click="closeMenu">
        <div class="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-amber/50 group-hover:ring-amber transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(217,138,61,0.5)]">
          <img class="w-full h-full object-cover img-zoom" loading="lazy"
               src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/apekawb8my5xl5w/img_9077_topaz_denoiseraw_sharpen_no3Chl3kmx.jpg?thumb=300x300" alt="Lasse Harm">
        </div>
        <div class="hidden sm:flex flex-col leading-none">
          <span class="font-display text-lg uppercase tracking-wide text-bone group-hover:text-amber transition-colors duration-300">Lasse Harm</span>
          <span class="eyebrow text-[9px] tracking-widest2 text-bone-dim group-hover:text-amber/80 transition-colors duration-300">Wildlife · Frames · Flight</span>
        </div>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <ul class="hidden lg:flex items-center gap-1">
        <li>
          <NuxtLink class="nav-item" active-class="!text-amber" to="/reel-web-projects">{{ $t('nav.webProjects') }}</NuxtLink>
        </li>

        <!-- Photography mega-menu -->
        <li class="relative" @mouseenter="isPhotoDropdownOpen = true" @mouseleave="closePhoto">
          <button
            @click="togglePhotoDropdown"
            class="nav-item flex items-center gap-1"
            :class="{ '!text-amber': isPhotoDropdownOpen }"
          >
            {{ $t('nav.photography') }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 transition-transform duration-200" :class="{ 'rotate-180': isPhotoDropdownOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <transition
            enter-active-class="transition duration-200 ease-wild"
            enter-from-class="opacity-0 -translate-y-2"
            leave-active-class="transition duration-150"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div v-show="isPhotoDropdownOpen" class="absolute top-full left-0 mt-2 w-60 panel wild-border p-2">
              <NuxtLink
                v-for="(link, i) in photoLinks"
                :key="link.key"
                :to="link.to"
                @click="closePhoto"
                class="dropdown-item group/d"
                :style="{ transitionDelay: (i * 25) + 'ms' }"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-amber/70 group-hover/d:scale-150 transition-transform"></span>
                {{ $t(`photoCategories.${link.key}`) }}
              </NuxtLink>
            </div>
          </transition>
        </li>

        <li><NuxtLink class="nav-item" active-class="!text-amber" to="/drone">{{ $t('nav.drone') }}</NuxtLink></li>
        <li><NuxtLink class="nav-item" active-class="!text-amber" to="/3d-printing">{{ $t('nav.3dPrinting') }}</NuxtLink></li>
        <li><NuxtLink class="nav-item" active-class="!text-amber" to="/about">{{ $t('nav.about') }}</NuxtLink></li>
        <li>
          <NuxtLink class="btn-wild !px-5 !py-2 text-xs" to="/contact">{{ $t('nav.contact') }}</NuxtLink>
        </li>

        <!-- Language Switcher -->
        <li class="relative ml-2">
          <button
            @click="toggleLangDropdown"
            class="flex items-center gap-1 px-3 py-1.5 rounded-full border border-bone/10 text-sm font-condensed uppercase tracking-widest2 text-bone-muted hover:text-amber hover:border-amber/40 transition-all duration-300"
          >
            {{ locale.toUpperCase() }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <transition
            enter-active-class="transition duration-200 ease-wild"
            enter-from-class="opacity-0 -translate-y-2"
            leave-active-class="transition duration-150"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div v-show="isLangDropdownOpen" class="absolute right-0 top-full mt-2 w-24 panel wild-border p-2 space-y-1">
              <button
                v-for="loc in availableLocales"
                :key="loc.code"
                @click="switchLanguage(loc.code)"
                class="dropdown-item w-full text-left"
                :class="{ '!text-amber': locale === loc.code }"
              >
                {{ loc.name }}
              </button>
            </div>
          </transition>
        </li>
      </ul>

      <!-- Mobile Menu Toggle -->
      <button @click="toggleMenu" class="lg:hidden p-2 text-bone-muted hover:text-amber transition-colors" aria-label="Toggle menu">
        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <transition
      enter-active-class="transition duration-300 ease-wild"
      enter-from-class="opacity-0 -translate-y-4"
      leave-active-class="transition duration-200"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-show="isMenuOpen" class="lg:hidden mt-2 mx-4 panel wild-border p-4 space-y-1">
        <NuxtLink @click="closeMenu" class="mobile-nav-item" active-class="!text-amber" to="/reel-web-projects">{{ $t('nav.webProjects') }}</NuxtLink>
        <NuxtLink @click="closeMenu" class="mobile-nav-item" active-class="!text-amber" to="/photography">{{ $t('nav.photography') }}</NuxtLink>
        <NuxtLink @click="closeMenu" class="mobile-nav-item pl-6 text-sm" active-class="!text-amber" to="/photography/wildlife">{{ $t('photoCategories.wildlife') }}</NuxtLink>
        <NuxtLink @click="closeMenu" class="mobile-nav-item pl-6 text-sm" active-class="!text-amber" to="/photography/landscape-nature">{{ $t('photoCategories.landscape') }}</NuxtLink>
        <NuxtLink @click="closeMenu" class="mobile-nav-item pl-6 text-sm" active-class="!text-amber" to="/photography/portraits-people">{{ $t('photoCategories.portraits') }}</NuxtLink>
        <NuxtLink @click="closeMenu" class="mobile-nav-item pl-6 text-sm" active-class="!text-amber" to="/photography/abstract-art">{{ $t('photoCategories.abstract') }}</NuxtLink>
        <NuxtLink @click="closeMenu" class="mobile-nav-item pl-6 text-sm" active-class="!text-amber" to="/photography/weddings">{{ $t('photoCategories.weddings') }}</NuxtLink>
        <NuxtLink @click="closeMenu" class="mobile-nav-item" active-class="!text-amber" to="/drone">{{ $t('nav.drone') }}</NuxtLink>
        <NuxtLink @click="closeMenu" class="mobile-nav-item" active-class="!text-amber" to="/3d-printing">{{ $t('nav.3dPrinting') }}</NuxtLink>
        <NuxtLink @click="closeMenu" class="mobile-nav-item" active-class="!text-amber" to="/about">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink @click="closeMenu" class="mobile-nav-item" active-class="!text-amber" to="/contact">{{ $t('nav.contact') }}</NuxtLink>

        <div class="flex justify-center gap-3 pt-4 border-t border-bone/10">
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            @click="switchLanguage(loc.code)"
            class="px-4 py-1.5 rounded-full text-sm font-condensed uppercase tracking-widest2 transition-all duration-300"
            :class="locale === loc.code
              ? 'bg-amber/20 text-amber border border-amber/40'
              : 'text-bone-muted border border-bone/10 hover:border-amber/40 hover:text-amber'"
          >
            {{ loc.name }}
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.nav-item {
  font-family: 'Oswald', sans-serif;
  @apply px-3 py-2 text-sm font-medium uppercase tracking-widest2 text-bone-muted rounded-lg transition-all duration-300;
}
.nav-item:hover {
  @apply text-amber;
}

.dropdown-item {
  font-family: 'Oswald', sans-serif;
  @apply flex items-center gap-2.5 px-3 py-2 text-sm uppercase tracking-wide text-bone-muted rounded-lg transition-all duration-200;
}
.dropdown-item:hover {
  @apply bg-amber/10 text-amber translate-x-1;
}

.mobile-nav-item {
  font-family: 'Oswald', sans-serif;
  @apply block px-4 py-2.5 uppercase tracking-widest2 text-sm text-bone-muted rounded-lg transition-all duration-200;
}
.mobile-nav-item:hover {
  @apply bg-amber/10 text-amber;
}
</style>
