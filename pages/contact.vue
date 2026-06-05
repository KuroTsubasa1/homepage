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
  <div>
    <!-- ① Cinematic hero -->
    <section class="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden bg-forest flex items-end">
      <div class="absolute inset-0 bg-gradient-to-br from-amber/10 via-forest to-moss/10 pointer-events-none"></div>
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="absolute inset-0 vignette pointer-events-none"></div>
      <div class="orb top-1/4 left-1/4 w-80 h-80 bg-amber/10 animate-drift"></div>
      <div class="orb bottom-0 right-1/4 w-80 h-80 bg-clay/10 animate-drift-slow"></div>

      <div class="relative z-10 container mx-auto px-6 pb-20 pt-32">
        <div class="max-w-3xl" v-reveal>
          <p class="eyebrow mb-5 flex items-center gap-3">
            <span class="inline-block w-10 h-px bg-amber"></span>
            {{ t('contactSection.title') }}
          </p>
          <h1 class="display-xl text-bone text-6xl md:text-8xl lg:text-9xl">
            <span class="gradient-text">{{ t('contact.hero.title') }}</span>
          </h1>
          <p class="mt-6 text-lg md:text-xl text-bone-muted max-w-2xl leading-relaxed">
            {{ t('contact.hero.subtitle') }}
          </p>
        </div>
      </div>

      <div class="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2">
        <span class="w-px h-10 bg-gradient-to-b from-amber/70 to-transparent animate-bob"></span>
      </div>
    </section>

    <!-- ② Contact form section -->
    <contact-section></contact-section>
  </div>
</template>
