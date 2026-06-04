<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const currentYear = ref(new Date().getFullYear());
const { t } = useI18n();
</script>

<template>
  <!-- Thin footer strip welded into the bottom edge of the console deck -->
  <div class="gb-deck-foot">
    <div class="gb-deck-foot-social">
      <a href="mailto:lasse@lasseharm.space" aria-label="Email" class="gb-deck-foot-link">
        <Icon name="mdi:email-outline" />
      </a>
      <a href="https://www.instagram.com/3d.print.shop.harm/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="gb-deck-foot-link">
        <Icon name="mdi:instagram" />
      </a>
      <a href="https://github.com/KuroTsubasa1" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="gb-deck-foot-link">
        <Icon name="mdi:github" />
      </a>
    </div>
    <p class="gb-deck-foot-copy">{{ t('footer.copyright', { year: currentYear }) }}</p>
  </div>
</template>

<style scoped>
.gb-deck-foot {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
  padding: 8px 1rem 10px;
  border-top: 2px dotted rgba(44, 44, 40, 0.35);
}
.gb-deck-foot-social { display: flex; gap: 0.55rem; }
.gb-deck-foot-link {
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  font-size: 0.95rem;
  color: #3a382f;
  border: 1px solid #8e8b7a;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.2);
  transition: color 0.12s, border-color 0.12s, transform 0.08s;
}
.gb-deck-foot-link:hover { color: #5b3490; border-color: #5b3490; }
.gb-deck-foot-link:active { transform: translateY(1px); }
.gb-deck-foot-copy {
  font-family: 'VT323', ui-monospace, monospace;
  font-size: 0.95rem;
  line-height: 1.2;
  color: #45433a;
  letter-spacing: 0.02em;
  text-align: center;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
}
</style>
