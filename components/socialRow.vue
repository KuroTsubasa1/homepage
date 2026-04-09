<script setup lang="ts">
</script>

<template>
  <div class="flex justify-center items-center gap-4">
    <a href="mailto:lasseharm@web.de" class="social-link group" aria-label="Email">
      <Icon name="mdi:mail-outline" class="text-xl text-gray-400 group-hover:text-neon-green transition-colors duration-300" />
    </a>
    <a href="https://www.instagram.com/3d.print.shop.harm/" class="social-link group" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
      <Icon name="mdi:instagram" class="text-xl text-gray-400 group-hover:text-neon-magenta transition-colors duration-300" />
    </a>
    <a href="https://github.com/KuroTsubasa1" class="social-link group" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
      <Icon name="mdi:github" class="text-xl text-gray-400 group-hover:text-neon-purple transition-colors duration-300" />
    </a>
  </div>
</template>

<style scoped>
.social-link {
  @apply w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300;
}
.social-link:hover {
  @apply border-neon-green/40 bg-neon-green/5;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
}
</style>
