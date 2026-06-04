<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useSeoMeta({
  title: 'Contact Lasse Harm | Get in Touch for Projects & Inquiries',
  ogTitle: 'Contact Lasse Harm | Get in Touch for Projects & Inquiries',
  description: 'Reach out to Lasse Harm for web development, photography, or just to say hi. Based in Schleswig-Holstein, Germany.',
  ogDescription: 'Reach out to Lasse Harm for web development, photography, or just to say hi. Based in Schleswig-Holstein, Germany.',
  ogImage: 'https://pocket.lasseharm.space/api/files/contact_image.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
  keywords: 'contact, Lasse Harm, web developer, Germany',
});
</script>

<template>
  <div class="container mx-auto px-4 max-w-4xl py-12 space-y-10">

    <!-- HAILING FREQUENCY -->
    <GbWindow title="CONTACT" class="animate-slide-up">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-black mb-3">
          <span class="gradient-text">{{ t('contact.hero.title') }}</span>
        </h1>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">{{ t('contact.hero.subtitle') }}</p>
        <p class="gb-prompt animate-blink mt-6">PRESS START</p>
      </div>
    </GbWindow>

    <!-- CONTACT FORM + INFO (logic lives in the shared component) -->
    <contact-section></contact-section>

  </div>
</template>
