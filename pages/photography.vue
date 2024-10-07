<script lang="ts" setup>

import FooterComponent from "~/components/footerComponent.vue";
</script>

<template>

  <navigation>

  </navigation>

  <hero title="Photography" description="WILDLIFE / NATURE / PEOPLE / ABSTRACT" image="https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0"></hero>

  <h2 class="flex justify-center text-5xl  text-primary font-semibold my-10 uppercase">
     Wildlife
  </h2>

  <image-gallery category="wildlife" ></image-gallery>

  <div class="flex flex-col w-full items-center justify-center">
    <div class="w-3/4">
      <div class="divider"></div>
    </div>
  </div>

  <h2 class="flex justify-center text-5xl my-10 text-primary font-semibold uppercase">
    Landscape & Nature
  </h2>

  <image-gallery category="nature" ></image-gallery>

  <div class="flex flex-col w-full items-center justify-center">
    <div class="w-3/4">
      <div class="divider"></div>
    </div>
  </div>

  <h2 class="flex justify-center text-5xl my-10 text-primary font-semibold uppercase">
     Portraits & People
  </h2>

  <image-gallery category="people" ></image-gallery>

  <div class="flex flex-col w-full items-center justify-center">
    <div class="w-3/4">
      <div class="divider"></div>
    </div>
  </div>

  <h2 class="flex justify-center text-5xl my-10 text-primary font-semibold uppercase">
     Absctract & Art
  </h2>

  <image-gallery class="mb-5" category="abstract" ></image-gallery>

  <footer-component>

  </footer-component>

</template>

<style scoped>

</style>