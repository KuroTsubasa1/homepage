<template>
  <hero
    title="Portraits & People"
    description="AUTHENTIC EMOTIONS AND HUMAN STORIES"
    :image="heroImage"
    class="fade-in"
  ></hero>

  <div class="container mx-auto px-4 max-w-5xl py-12 space-y-10">
    <!-- INTEL -->
    <GbWindow title="About Portrait Photography" class="fade-in">
      <div class="space-y-3 text-gray-300 leading-relaxed">
        <p class="pixel-label text-neon-green mb-1">▸ INTEL</p>
        <p>
          Portrait photography is about capturing the essence of a person – their personality, emotions,
          and unique characteristics. Whether through studio portraits or candid moments, I aim to create
          images that tell authentic stories about their subjects.
        </p>
        <p>
          My approach to people photography focuses on building rapport with subjects, finding natural
          moments that reveal character, and using lighting and composition to enhance rather than
          mask individuality. The result is a collection of images that celebrates human diversity,
          connection, and expression.
        </p>
      </div>
    </GbWindow>

    <!-- ALBUM — inventory grid of slots -->
    <GbWindow title="Portrait Gallery" class="fade-in">
      <div class="gb-album">
        <div
          v-for="image in images"
          :key="image.id"
          class="gb-tile gb-album-item cursor-pointer group"
          @click="openDetail(image.id)"
        >
          <div class="relative">
            <img
              :src="image.thumbnail"
              :alt="image.alt"
              class="w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
              <p class="text-white text-xs">{{ image.alt }}</p>
            </div>
          </div>
        </div>
      </div>
    </GbWindow>

    <div class="text-center fade-in">
      <NuxtLink to="/photography" class="btn-neon-outline inline-block font-pixel">
        Back to Photography Collections
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// SSR fetch (SEO + no content flash).
const { images, heroImage } = useGalleryImages('people', 'Portrait Photography');

const openDetail = (id) => navigateTo(`/photography/portraits-people/${id}`);

useSeoMeta({
  title: 'Portraits & People Photography - Lasse Harm',
  ogTitle: 'Portraits & People Photography - Lasse Harm',
  description: 'Explore portrait and people photography by Lasse Harm, capturing authentic human emotions and stories.',
  ogDescription: 'Explore portrait and people photography by Lasse Harm, capturing authentic human emotions and stories.',
  ogImage: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
  twitterCard: 'summary_large_image',
});
</script>

<style scoped>
.fade-in {
  opacity: 0;
  animation: fadeIn 1.2s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}
</style>
