<script lang="ts" setup>
import FooterComponent from "~/components/footerComponent.vue";

useSeoMeta({
  title: 'About - Lasse Harm',
  ogTitle: 'About - Lasse Harm',
  description: 'Learn more about Lasse Harm, a web developer, photographer, and certified FPV drone pilot.',
  ogDescription: 'Learn more about Lasse Harm, a web developer, photographer, and certified FPV drone pilot.',
  ogImage: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/q8dewf7gwhbqpk2/20240319_182201_N85s671DEL.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <navigation></navigation>

  <div class="my-10 mx-4">
    <h2 class="flex justify-center text-5xl my-5 text-primary font-semibold fade-in">
     Lasse Harm
    </h2>
    <h3 class="flex justify-center text-2xl my-5 text-primary font-semibold text-center md:text-left fade-in">
      Programmer | Photographer | Certified FPV Drone Pilot
    </h3>

    <div class="flex flex-col md:flex-row w-full justify-center items-center md:items-start space-y-5 md:space-y-0 md:space-x-10">
      <div class="flex-shrink-0">
        <img class="w-[200px] h-[200px] rounded-lg hover-effect"
             src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/q8dewf7gwhbqpk2/20240319_182201_N85s671DEL.jpg?thumb=200" alt="profile picture">
      </div>
      <div class="w-full md:w-1/4 px-5 md:px-0 fade-in">
        <p class="text-center md:text-left">
          Lasse Harm is a web developer and certified FPV drone pilot based in Germany. He has a passion for creating beautiful and functional websites and capturing the world around him through his camera lens. He specializes in wildlife and macro photography, but also has experience in event and portrait shoots.
        </p>
      </div>
    </div>
  </div>

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

.hover-effect {
  transition: transform 0.3s ease;
}

.hover-effect:hover {
  transform: scale(1.1);
}
</style>