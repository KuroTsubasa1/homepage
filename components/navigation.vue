<script lang="ts" setup>

</script>

<template>
  <div class="flex w-full border-b-2 text-center text-gray justify-center items-center flex-col">


    <NuxtLink class="" to="/">
      <div class="flex justify-center text-center items-center w-[150px] h-[150px] my-10">
        <img class="rounded-full border-4 border-primary" loading="lazy"
             src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/apekawb8my5xl5w/img_9077_topaz_denoiseraw_sharpen_no3Chl3kmx.jpg?thumb=300x300" alt="">
      </div>
    </NuxtLink>

      <ul class="flex flex-wrap text-center justify-center mb-5">
        <li>
          <NuxtLink class="font-semibold mr-4 p-2 hover:text-primary" active-class="text-primary"  to="/reel-web-projects">WEB PROJECTS</NuxtLink>
        </li>
        <li>
          <NuxtLink class="font-semibold mr-4 p-2 hover:text-primary" active-class="text-primary" to="/photography">PHOTOGRAPHY</NuxtLink>
        </li>
        <li class="hidden">
          <NuxtLink class="font-semibold mr-4 p-2 hover:text-primary" active-class="text-primary" to="/drone">DRONE STUFF</NuxtLink>
        </li>
        <li  class="hidden">
          <NuxtLink class="font-semibold mr-4 p-2 hover:text-primary" active-class="text-primary" to="/3d-printing">3D PRINTING</NuxtLink>
        </li>
        <li>
          <NuxtLink class="font-semibold mr-4 p-2 hover:text-primary" active-class="text-primary" to="/about">ABOUT</NuxtLink>
        </li>
        <li>
          <NuxtLink class="font-semibold mr-4 p-2 hover:text-primary" active-class="text-primary" to="/contact">CONTACT</NuxtLink>
        </li>
      </ul>

  </div>
</template>

<style scoped>

</style>