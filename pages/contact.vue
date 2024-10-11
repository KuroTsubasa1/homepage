<script lang="ts" setup>
import FooterComponent from "~/components/footerComponent.vue";

useSeoMeta({
  title: 'Contact - Lasse Harm',
  ogTitle: 'Contact - Lasse Harm',
  description: 'Get in touch with Lasse Harm, a web developer and certified FPV drone pilot.',
  ogDescription: 'Get in touch with Lasse Harm, a web developer and certified FPV drone pilot.',
  ogImage: 'https://pocket.lasseharm.space/api/files/contact_image.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <navigation></navigation>
  <contact-form></contact-form>
  <footer-component></footer-component>
</template>

<style scoped>
</style>