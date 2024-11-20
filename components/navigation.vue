Ï<script lang="ts" setup>

</script>

<template>
  <div class="flex w-full border-b-2 text-center text-gray justify-center items-center flex-col fade-in">
    <NuxtLink class="" to="/">
      <div class="flex justify-center text-center items-center w-[150px] h-[150px] my-10">
        <img class="rounded-full border-4 border-primary top-image" loading="lazy"
             src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/apekawb8my5xl5w/img_9077_topaz_denoiseraw_sharpen_no3Chl3kmx.jpg?thumb=300x300" alt="">
      </div>
    </NuxtLink>

    <ul class="flex flex-col md:flex-row text-center justify-center mb-5">
      <li>
        <NuxtLink class="font-semibold mr-4 p-2 nav-link" active-class="text-primary" to="/reel-web-projects">WEB PROJECTS</NuxtLink>
      </li>
      <li>
        <NuxtLink class="font-semibold mr-4 p-2 nav-link" active-class="text-primary" to="/photography">PHOTOGRAPHY</NuxtLink>
      </li>
      <li class="hidden">
        <NuxtLink class="font-semibold mr-4 p-2 nav-link" active-class="text-primary" to="/drone">DRONE STUFF</NuxtLink>
      </li>
      <li class="hidden">
        <NuxtLink class="font-semibold mr-4 p-2 nav-link" active-class="text-primary" to="/3d-printing">3D PRINTING</NuxtLink>
      </li>
      <li>
        <NuxtLink class="font-semibold mr-4 p-2 nav-link" active-class="text-primary" to="/about">ABOUT</NuxtLink>
      </li>
      <li>
        <NuxtLink class="font-semibold mr-4 p-2 nav-link" active-class="text-primary" to="/contact">CONTACT</NuxtLink>
      </li>
    </ul>
  </div>
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

.nav-link {
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-color);
  text-decoration: underline;
}

/* Hover Effect for Top Image */
.top-image {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.top-image:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}
</style>