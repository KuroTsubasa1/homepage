<script setup lang="ts">
</script>

<template>
  <div class="flex justify-center items-center gap-4">
    <a href="mailto:lasse@lasseharm.space" class="social-link group" aria-label="Email">
      <Icon name="mdi:mail-outline" class="text-xl text-bone-muted group-hover:text-amber transition-colors duration-300" />
    </a>
    <a href="https://www.instagram.com/3d.print.shop.harm/" class="social-link group" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
      <Icon name="mdi:instagram" class="text-xl text-bone-muted group-hover:text-clay transition-colors duration-300" />
    </a>
    <a href="https://github.com/KuroTsubasa1" class="social-link group" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
      <Icon name="mdi:github" class="text-xl text-bone-muted group-hover:text-moss-light transition-colors duration-300" />
    </a>
  </div>
</template>

<style scoped>
.social-link {
  @apply w-11 h-11 rounded-full border border-bone/10 flex items-center justify-center transition-all duration-300;
}
.social-link:hover {
  @apply border-amber/40 bg-amber/5 -translate-y-1;
  box-shadow: 0 0 18px rgba(217, 138, 61, 0.18);
}
</style>
