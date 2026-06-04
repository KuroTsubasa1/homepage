<template>
  <hero
    :title="$t('wedding.title')"
    :description="$t('photography.capturing').toUpperCase()"
    :image="heroImage"
    class="fade-in"
  ></hero>

  <div class="container mx-auto px-4 max-w-5xl py-12 space-y-10">
    <!-- INTEL -->
    <GbWindow :title="$t('photography.aboutPhotography')" class="fade-in">
      <div class="space-y-3 text-gray-300 leading-relaxed">
        <p class="pixel-label text-neon-green mb-1">▸ INTEL</p>
        <p>
          Wedding photography is the art of documenting one of life's most significant celebrations.
          It combines elements of portraiture, documentary, and artistic photography to create a
          comprehensive visual story of the couple's special day.
        </p>
        <p>
          My approach to wedding photography balances carefully composed formal portraits with
          candid, unscripted moments that capture genuine emotions and interactions. I work
          unobtrusively to document the day as it unfolds naturally, while also providing gentle
          direction when needed to create beautiful, timeless images.
        </p>
        <p>
          From the nervous anticipation before the ceremony to the joy of the first dance, I aim to
          preserve all the meaningful moments and details that together tell the unique story of
          each wedding celebration.
        </p>
      </div>
    </GbWindow>

    <!-- ALBUM — inventory grid of slots -->
    <GbWindow :title="$t('wedding.portfolio')" class="fade-in">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="image in images"
          :key="image.id"
          class="gb-tile cursor-pointer group"
          @click="openDetail(image.id)"
        >
          <div class="relative">
            <img
              :src="image.thumbnail"
              :alt="image.alt"
              class="w-full h-36 sm:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
              <p class="text-white text-xs">{{ image.alt }}</p>
            </div>
          </div>
        </div>
      </div>
    </GbWindow>

    <div class="text-center fade-in">
      <NuxtLink to="/photography" class="btn-neon-outline inline-block">
        {{ $t('photography.backToCollections') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// SSR fetch (SEO + no content flash).
const { images, heroImage } = useGalleryImages('weddings', 'Wedding Photography');

const openDetail = (id) => navigateTo(`/photography/weddings/${id}`);

useSeoMeta({
  title: 'Wedding Photography - Lasse Harm',
  ogTitle: 'Wedding Photography - Lasse Harm',
  description: 'Explore wedding photography by Lasse Harm, capturing the magic, emotions, and precious moments of wedding celebrations.',
  ogDescription: 'Explore wedding photography by Lasse Harm, capturing the magic, emotions, and precious moments of wedding celebrations.',
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
