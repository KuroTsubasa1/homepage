<script setup lang="ts">
import Navigation from "~/components/navigation.vue";
import FooterComponent from "~/components/footerComponent.vue";
import ProjectGrid from "~/components/projectGrid.vue";

useSeoMeta({
  title: 'Web Projects - Lasse Harm',
  ogTitle: 'Web Projects - Lasse Harm',
  description: 'Discover the web development projects by Lasse Harm, showcasing innovative and creative web solutions.',
  ogDescription: 'Discover the web development projects by Lasse Harm, showcasing innovative and creative web solutions.',
  ogImage: 'https://pocket.lasseharm.space/api/files/web_projects_image.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <navigation></navigation>

  <h2 class="font-semibold text-5xl text-primary text-center my-10">
    WEB PROJECTS
  </h2>

  <project-grid category="web"></project-grid>

  <footer-component></footer-component>
</template>

<style scoped>
</style>