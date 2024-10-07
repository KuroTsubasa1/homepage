<script lang="ts" setup>

const images = ref([
  'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/o3s31u9eem15ygo/20220929_173927_original_cb7wKgT60N.JPG?thumb=1440x810f',
  'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/c5a4iw9elmabgfp/p6190657_topaz_denoiseraw_sharpen_WvbG0DdlWy.jpg?thumb=1440x810f',
  'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/q47q19ee8liuqio/img_5685_x2pwFemQCR.jpeg?thumb=1440x810f',
  'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/fg4bsxfdpuaor7i/20220602_211051_topaz_original_g3pXStc64A.JPG?thumb=1440x810f',
])

const currentImageIndex = ref(0)

function getImageBrightness(url: string, callback: (brightness: number) => void) {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = url;

  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let colorSum = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      colorSum += (r + g + b) / 3;
    }

    const brightness = colorSum / (data.length / 4);
    callback(brightness);
  };
}




// mounted
onMounted(() => {
  setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length
  }, 4000)

  const heroContentStyle = ref("");

  function setHeroContentStyle() {
    const currentImage = images.value[currentImageIndex.value];
    getImageBrightness(currentImage, (brightness) => {
      if (brightness > 128) {
        // Light background - use darker text and background
        heroContentStyle.value = "bg-black/70 text-white";
      } else {
        // Dark background - use lighter text and background
        heroContentStyle.value = "bg-white/70 text-black";
      }
    });
  }

})

// todos
// fetch logo from api
// fetch social media from api
// fetch images from api
// link to work page


</script>

<template>
  <div>

    <div class="hero min-h-screen border-4 border-primary">


      <!-- slides -->
      <div
          v-for="(image, index) in images"
          :key="index"
          :class="{ active: currentImageIndex === index }"
          :style="{ backgroundImage: 'url(' + image + ')' }"
          class="slide"
      ></div>

      <!-- logo -->
      <div class="text-center text-2xl font-bold absolute top-20">
        <div class="w-[250px] h-[250px] rounded-full flex justify-center items-center">
          <img alt="" class="rounded-full border-4 border-primary"
               loading="lazy"
               src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/apekawb8my5xl5w/img_9077_topaz_denoiseraw_sharpen_no3Chl3kmx.jpg?thumb=300x300">
        </div>
      </div>

      <!-- social media -->
      <social-row class="absolute bottom-20"></social-row>

      <div :class="`hero-content text-center text-primary ${heroContentStyle}`">

        <div class="max-w-md backdrop-blur bg-accent/30 p-5 px-20 rounded mt-[50vh]">
          <h1 class="text-5xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)]">
            Lasse Harm
          </h1>
          <p class="py-6 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)]">
            Web Developer & Photographer
          </p>

          <NuxtLink class="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)] btn btn-primary btn-outline rounded-3xl border-2 font-bold" to="/reel-web-projects">Watch My
            Work
          </NuxtLink>

        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

.slide {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: absolute;
  transition: opacity 0.9s ease-in-out;
  opacity: 0;
}

.slide.active {
  opacity: 1;
}

</style>