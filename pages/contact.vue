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
  <!-- Hero Section -->
  <section class="relative py-32 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-dark to-neon-purple/10"></div>
    <div class="absolute inset-0 bg-grid opacity-20"></div>
    <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-green/10 rounded-full blur-[100px]"></div>
    <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-purple/10 rounded-full blur-[100px]"></div>

    <div class="container mx-auto px-4 text-center relative z-10 pt-10 animate-slide-up">
      <h1 class="text-4xl md:text-6xl font-black mb-4">
        <span class="gradient-text">{{ t('contact.hero.title') }}</span>
      </h1>
      <p class="text-lg text-gray-400 max-w-2xl mx-auto">{{ t('contact.hero.subtitle') }}</p>
    </div>
  </section>

  <!-- Contact Form Section -->
  <contact-section></contact-section>
</template>

