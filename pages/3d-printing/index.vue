<script setup lang="ts">

import Navigation from "~/components/navigation.vue";
import FooterComponent from "~/components/footerComponent.vue";
import ProjectGrid from "~/components/projectGrid.vue";
</script>

<template>

  <navigation>

  </navigation>

  <h2 class="font-semibold text-5xl text-primary text-center my-10">
    3D PRINTING PROJECTS
  </h2>

  <project-grid category="3d">

  </project-grid>

  <footer-component>

  </footer-component>

</template>

<style scoped>

</style>