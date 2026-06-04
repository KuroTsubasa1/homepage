<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const currentYear = ref(new Date().getFullYear());
const { t } = useI18n();
</script>

<template>
  <footer class="bg-dark-100 border-t border-white/5 py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center gap-5">
        <social-row />
        <div class="w-16 h-px bg-gradient-to-r from-transparent via-neon-green/30 to-transparent"></div>
        <p class="font-pixel text-[0.6rem] leading-relaxed text-gray-500">
          {{ t('footer.copyright', { year: currentYear }) }}
        </p>
      </div>
    </div>
  </footer>
</template>
