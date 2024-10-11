<script lang="ts" setup>
import FooterComponent from "~/components/footerComponent.vue";

useSeoMeta({
  title: 'Photography - Lasse Harm',
  ogTitle: 'Photography - Lasse Harm',
  description: 'Explore the photography portfolio of Lasse Harm, featuring wildlife, nature, people, and abstract art.',
  ogDescription: 'Explore the photography portfolio of Lasse Harm, featuring wildlife, nature, people, and abstract art.',
  ogImage: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <navigation></navigation>

  <hero title="Photography" description="WILDLIFE / NATURE / PEOPLE / ABSTRACT" image="https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0" class="fade-in"></hero>

  <h2 class="flex justify-center text-5xl text-primary font-semibold my-10 uppercase text-center w-full fade-in">
     Wildlife
  </h2>

  <image-gallery category="wildlife" class="fade-in"></image-gallery>

  <div class="flex flex-col w-full items-center justify-center fade-in">
    <div class="w-3/4">
      <div class="divider"></div>
    </div>
  </div>

  <h2 class="flex justify-center text-5xl my-10 text-primary font-semibold uppercase text-center w-full fade-in">
    Landscape & Nature
  </h2>

  <image-gallery category="nature" class="fade-in"></image-gallery>

  <div class="flex flex-col w-full items-center justify-center fade-in">
    <div class="w-3/4">
      <div class="divider"></div>
    </div>
  </div>

  <h2 class="flex justify-center text-5xl my-10 text-primary font-semibold uppercase text-center w-full fade-in">
     Portraits & People
  </h2>

  <image-gallery category="people" class="fade-in"></image-gallery>

  <div class="flex flex-col w-full items-center justify-center fade-in">
    <div class="w-3/4">
      <div class="divider"></div>
    </div>
  </div>

  <h2 class="flex justify-center text-5xl my-10 text-primary font-semibold uppercase text-center w-full fade-in">
     Abstract & Art
  </h2>

  <image-gallery class="mb-5 fade-in" category="abstract"></image-gallery>

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

</style>>