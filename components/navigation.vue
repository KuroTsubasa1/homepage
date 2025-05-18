<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const isMenuOpen = ref(false);
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
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' }
];

// Change language
const switchLanguage = (langCode) => {
  locale.value = langCode;
  isLangDropdownOpen.value = false;
  closeMenu();
};
</script>

<template>
  <div class="w-full border-b-2 text-center text-gray flex flex-col items-center fade-in relative z-40">
    <!-- Logo/Profile Section -->
    <NuxtLink class="flex justify-center" to="/" @click="closeMenu">
      <div class="flex justify-center text-center items-center w-[150px] h-[150px] my-6">
        <img class="rounded-full border-4 border-primary top-image" loading="lazy"
             src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/apekawb8my5xl5w/img_9077_topaz_denoiseraw_sharpen_no3Chl3kmx.jpg?thumb=300x300" alt="Lasse Harm">
      </div>
    </NuxtLink>

    <!-- Mobile Menu Toggle -->
    <div class="md:hidden flex justify-center mb-4">
      <button @click="toggleMenu" class="p-2 rounded-md hover:bg-gray-100 transition-colors" aria-label="Toggle menu">
        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Desktop Navigation -->
    <ul class="hidden md:flex flex-row text-center justify-center mb-5 items-center">
      <li>
        <NuxtLink class="font-semibold mr-4 p-2 nav-link" active-class="text-primary" to="/reel-web-projects">{{ $t('nav.webProjects') }}</NuxtLink>
      </li>
      
      <!-- Photography Dropdown -->
      <li class="relative">
        <button 
          @click="togglePhotoDropdown" 
          class="font-semibold mr-4 p-2 nav-link flex items-center"
          :class="{ 'text-primary': isPhotoDropdownOpen }"
        >
          {{ $t('nav.photography') }}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="isPhotoDropdownOpen" class="absolute z-50 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <NuxtLink to="/photography" class="block px-4 py-2 text-sm hover:bg-gray-100">{{ $t('photoCategories.all') }}</NuxtLink>
          <NuxtLink to="/photography/wildlife" class="block px-4 py-2 text-sm hover:bg-gray-100">{{ $t('photoCategories.wildlife') }}</NuxtLink>
          <NuxtLink to="/photography/landscape-nature" class="block px-4 py-2 text-sm hover:bg-gray-100">{{ $t('photoCategories.landscape') }}</NuxtLink>
          <NuxtLink to="/photography/portraits-people" class="block px-4 py-2 text-sm hover:bg-gray-100">{{ $t('photoCategories.portraits') }}</NuxtLink>
          <NuxtLink to="/photography/abstract-art" class="block px-4 py-2 text-sm hover:bg-gray-100">{{ $t('photoCategories.abstract') }}</NuxtLink>
          <NuxtLink to="/photography/weddings" class="block px-4 py-2 text-sm hover:bg-gray-100">{{ $t('photoCategories.weddings') }}</NuxtLink>
          <NuxtLink to="/real-estate" class="block px-4 py-2 text-sm hover:bg-gray-100">{{ $t('photoCategories.realEstate') }}</NuxtLink>
        </div>
      </li>

      <!-- Wedding Photography direct link -->
      <li>
        <NuxtLink class="font-semibold mr-4 p-2 nav-link" active-class="text-primary" to="/photography/weddings">{{ $t('nav.weddings') }}</NuxtLink>
      </li>
      
      <li>
        <NuxtLink class="font-semibold mr-4 p-2 nav-link" active-class="text-primary" to="/drone">{{ $t('nav.drone') }}</NuxtLink>
      </li>
      <li>
        <NuxtLink class="font-semibold mr-4 p-2 nav-link" active-class="text-primary" to="/3d-printing">{{ $t('nav.3dPrinting') }}</NuxtLink>
      </li>
      <li>
        <NuxtLink class="font-semibold mr-4 p-2 nav-link" active-class="text-primary" to="/about">{{ $t('nav.about') }}</NuxtLink>
      </li>
      <li>
        <NuxtLink class="font-semibold mr-4 p-2 nav-link" active-class="text-primary" to="/contact">{{ $t('nav.contact') }}</NuxtLink>
      </li>
      
      <!-- Language Switcher -->
      <li class="relative ml-4">
        <button 
          @click="toggleLangDropdown" 
          class="font-semibold p-2 nav-link flex items-center"
          :class="{ 'text-primary': isLangDropdownOpen }"
        >
          {{ locale.toUpperCase() }}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="isLangDropdownOpen" class="absolute right-0 z-50 mt-2 w-24 bg-white rounded-md shadow-lg py-1">
          <button 
            v-for="loc in availableLocales" 
            :key="loc.code" 
            @click="switchLanguage(loc.code)" 
            class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            {{ loc.name }}
          </button>
        </div>
      </li>
    </ul>

    <!-- Mobile Navigation -->
    <ul v-show="isMenuOpen" class="md:hidden flex flex-col text-center justify-center mb-5 w-full">
      <li class="border-b border-gray-100 py-2">
        <NuxtLink @click="closeMenu" class="font-semibold p-2 nav-link block" active-class="text-primary" to="/reel-web-projects">{{ $t('nav.webProjects') }}</NuxtLink>
      </li>
      <li class="border-b border-gray-100 py-2">
        <NuxtLink @click="closeMenu" class="font-semibold p-2 nav-link block" active-class="text-primary" to="/photography">{{ $t('nav.photography') }}</NuxtLink>
      </li>
      <li class="border-b border-gray-100 py-2">
        <NuxtLink @click="closeMenu" class="font-semibold p-2 nav-link block" active-class="text-primary" to="/photography/wildlife">- {{ $t('photoCategories.wildlife') }}</NuxtLink>
      </li>
      <li class="border-b border-gray-100 py-2">
        <NuxtLink @click="closeMenu" class="font-semibold p-2 nav-link block" active-class="text-primary" to="/photography/landscape-nature">- {{ $t('photoCategories.landscape') }}</NuxtLink>
      </li>
      <li class="border-b border-gray-100 py-2">
        <NuxtLink @click="closeMenu" class="font-semibold p-2 nav-link block" active-class="text-primary" to="/photography/portraits-people">- {{ $t('photoCategories.portraits') }}</NuxtLink>
      </li>
      <li class="border-b border-gray-100 py-2">
        <NuxtLink @click="closeMenu" class="font-semibold p-2 nav-link block" active-class="text-primary" to="/photography/abstract-art">- {{ $t('photoCategories.abstract') }}</NuxtLink>
      </li>
      <li class="border-b border-gray-100 py-2">
        <NuxtLink @click="closeMenu" class="font-semibold p-2 nav-link block" active-class="text-primary" to="/photography/weddings">- {{ $t('photoCategories.weddings') }}</NuxtLink>
      </li>
      <li class="border-b border-gray-100 py-2">
        <NuxtLink @click="closeMenu" class="font-semibold p-2 nav-link block" active-class="text-primary" to="/real-estate">- {{ $t('photoCategories.realEstate') }}</NuxtLink>
      </li>
      <li class="border-b border-gray-100 py-2 bg-gray-50">
        <NuxtLink @click="closeMenu" class="font-semibold p-2 nav-link block" active-class="text-primary" to="/photography/weddings">{{ $t('nav.weddings') }}</NuxtLink>
      </li>
      <li class="border-b border-gray-100 py-2">
        <NuxtLink @click="closeMenu" class="font-semibold p-2 nav-link block" active-class="text-primary" to="/drone">{{ $t('nav.drone') }}</NuxtLink>
      </li>
      <li class="border-b border-gray-100 py-2">
        <NuxtLink @click="closeMenu" class="font-semibold p-2 nav-link block" active-class="text-primary" to="/3d-printing">{{ $t('nav.3dPrinting') }}</NuxtLink>
      </li>
      <li class="border-b border-gray-100 py-2">
        <NuxtLink @click="closeMenu" class="font-semibold p-2 nav-link block" active-class="text-primary" to="/about">{{ $t('nav.about') }}</NuxtLink>
      </li>
      <li class="border-b border-gray-100 py-2">
        <NuxtLink @click="closeMenu" class="font-semibold p-2 nav-link block" active-class="text-primary" to="/contact">{{ $t('nav.contact') }}</NuxtLink>
      </li>
      
      <!-- Language switcher for mobile -->
      <li class="py-4 border-t border-gray-200 mt-2">
        <div class="flex justify-center space-x-4">
          <button 
            v-for="loc in availableLocales" 
            :key="loc.code" 
            @click="switchLanguage(loc.code)" 
            class="px-3 py-1 rounded-md hover:bg-gray-100"
            :class="{ 'bg-primary text-white': locale === loc.code }"
          >
            {{ loc.name }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.fade-in {
  opacity: 0;
  animation: fadeIn 2s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.nav-link {
  transition: color 0.3s ease, text-decoration 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Hover Effect for Top Image */
.top-image {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.top-image:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

/* Dropdown animation */
@keyframes dropdown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.absolute {
  animation: dropdown 0.3s ease forwards;
}

/* Mobile menu styles */
@media (max-width: 768px) {
  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>