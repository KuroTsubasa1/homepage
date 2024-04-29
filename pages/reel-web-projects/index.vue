<script setup lang="ts">

import Navigation from "~/components/navigation.vue";
import FooterComponent from "~/components/footerComponent.vue";
import ProjectGrid from "~/components/projectGrid.vue";
</script>

<template>

  <navigation>

  </navigation>

  <h2 class="font-semibold text-5xl text-primary text-center my-10">
    WEB PROJECTS
  </h2>

  <project-grid category="web">

  </project-grid>

  <footer-component>

  </footer-component>

</template>

<style scoped>

</style>