<script lang="ts" setup>

import FooterComponent from "~/components/footerComponent.vue";
</script>

<template>

  <navigation>

  </navigation>

  <div class="my-10">
    <h2 class="flex justify-center text-5xl my-5 text-primary font-semibold">
     Lasse Harm
    </h2>
    <h3 class="flex justify-center text-2xl my-5 text-primary font-semibold">
      Programmer | Photographer | Certified FPV Drone Pilot
    </h3>

    <div class="flex w-full justify-center ">

      <div class="mr-10">

        <img class="w-[200px] h-[200px] rounded-lg"
             src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/q8dewf7gwhbqpk2/20240319_182201_N85s671DEL.jpg?thumb=200" alt="profile picture">

      </div>
      <div class="w-1/4">
        <p class="text-center">
          Lasse Harm is a web developer and certified FPV drone pilot based in Germany. He has a passion for creating beautiful and functional websites and capturing the world around him through his camera lens. He specializes in wildlife and macro photography, but also has experience in event and portrait shoots.
        </p>
      </div>
    </div>
  </div>

  <footer-component>

  </footer-component>

</template>

<style scoped>

</style>