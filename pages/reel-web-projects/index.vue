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

  <h2 class="font-semibold text-5xl text-primary text-center my-10 fade-in">
    WEB PROJECTS
  </h2>

  <project-grid category="web" class="fade-in project-grid-item"></project-grid>

  <footer-component></footer-component>
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

.project-grid-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-grid-item:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}
</style>