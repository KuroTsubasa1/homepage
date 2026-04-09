<script setup lang="ts">
useSeoMeta({
  title: 'Lasse Harm | Web Developer, Photographer & Maker',
  ogTitle: 'Lasse Harm | Web Developer, Photographer & Maker',
  description: 'Hi, I\'m Lasse Harm — a web developer based in Germany. I build modern web apps, fly FPV drones, shoot wildlife & wedding photography, and tinker with 3D printers.',
  ogDescription: 'Hi, I\'m Lasse Harm — a web developer based in Germany. I build modern web apps, fly FPV drones, shoot wildlife & wedding photography, and tinker with 3D printers.',
  ogImage: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/q8dewf7gwhbqpk2/20240319_182201_N85s671DEL.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
  keywords: 'Lasse Harm, web developer, Germany, Vue.js, Nuxt, photographer, FPV drone pilot, 3D printing',
});

const techStack = [
  'Vue.js', 'Nuxt', 'TypeScript', 'PHP', 'Symfony', 'Laravel', 'Tailwind', 'MySQL', 'Docker', 'Git'
];
</script>

<template>
  <div>
    <background-image-slider></background-image-slider>

    <!-- Quick Impact Strip — currently at + tech -->
    <section class="py-10 bg-dark-100 border-y border-white/5 relative overflow-hidden">
      <div class="absolute inset-0 bg-grid opacity-10"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <!-- Currently at -->
          <div class="flex items-center gap-4">
            <div class="w-3 h-3 rounded-full bg-neon-green animate-pulse shadow-[0_0_10px_rgba(0,255,136,0.6)]"></div>
            <div>
              <p class="text-gray-500 text-xs uppercase tracking-widest">Currently at</p>
              <p class="text-white font-bold">DIU MarTech Solutions GmbH</p>
            </div>
          </div>
          <!-- Tech marquee -->
          <div class="flex flex-wrap justify-center gap-2">
            <span v-for="tech in techStack" :key="tech" class="px-3 py-1 text-xs rounded-full border border-white/10 text-gray-400 hover:border-neon-green/30 hover:text-neon-green transition-all duration-300">{{ tech }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Current Work -->
    <section class="py-16 bg-dark relative overflow-hidden">
      <div class="absolute inset-0 bg-grid opacity-10"></div>
      <div class="absolute top-0 right-0 w-80 h-80 bg-neon-green/5 rounded-full blur-[100px]"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto">
          <p class="text-gray-500 text-xs uppercase tracking-widest mb-6 text-center">What I'm working on right now</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NuxtLink to="/reel-web-projects/suzuki-hit" class="glass-card neon-border p-6 group block hover:-translate-y-1 transition-all duration-300">
              <div class="flex items-start justify-between mb-3">
                <h3 class="text-lg font-bold text-white group-hover:text-neon-green transition-colors">Suzuki HIT</h3>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-neon-green/10 text-neon-green border border-neon-green/20">Current</span>
              </div>
              <p class="text-gray-400 text-sm mb-3">Enterprise dealer information platform — complex data flows, real-time management.</p>
              <div class="flex items-center gap-2">
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-dark-300 text-gray-500">Vue.js</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-dark-300 text-gray-500">Enterprise</span>
                <span class="text-neon-green text-xs ml-auto opacity-0 group-hover:opacity-100 transition-opacity">Details →</span>
              </div>
            </NuxtLink>
            <NuxtLink to="/reel-web-projects/suzuki-ssbp-nxt" class="glass-card neon-border p-6 group block hover:-translate-y-1 transition-all duration-300">
              <div class="flex items-start justify-between mb-3">
                <h3 class="text-lg font-bold text-white group-hover:text-neon-green transition-colors">Suzuki SSBP-Nxt</h3>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-neon-green/10 text-neon-green border border-neon-green/20">Current</span>
              </div>
              <p class="text-gray-400 text-sm mb-3">Complete rewrite of the application platform — front-end architecture, modernized stack.</p>
              <div class="flex items-center gap-2">
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-dark-300 text-gray-500">Vue.js</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-dark-300 text-gray-500">Rewrite</span>
                <span class="text-neon-green text-xs ml-auto opacity-0 group-hover:opacity-100 transition-opacity">Details →</span>
              </div>
            </NuxtLink>
          </div>
          <div class="text-center mt-6">
            <NuxtLink to="/reel-web-projects" class="text-neon-green text-sm font-medium hover:underline">See all projects & career timeline →</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- What I Do Section -->
    <section class="py-24 bg-dark-100 relative overflow-hidden">
      <div class="absolute inset-0 bg-grid opacity-20"></div>
      <div class="absolute top-0 left-1/3 w-80 h-80 bg-neon-green/5 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-0 right-1/3 w-80 h-80 bg-neon-purple/5 rounded-full blur-[100px]"></div>

      <div class="container mx-auto px-4 relative z-10">
        <h2 class="section-heading">{{ $t('home.services') }}</h2>
        <div class="section-divider"></div>

        <!-- Web Dev - Featured large card -->
        <NuxtLink to="/reel-web-projects" class="featured-card glass-card neon-border p-8 md:p-10 mb-8 block group relative overflow-hidden">
          <div class="card-glow-featured"></div>
          <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div class="w-16 h-16 rounded-2xl bg-neon-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-neon-green/20 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-2xl font-bold text-white group-hover:text-neon-green transition-colors duration-300">{{ $t('home.webDev.title') }}</h3>
                <span class="text-xs px-2 py-0.5 rounded-full bg-neon-green/10 text-neon-green border border-neon-green/20">Main focus</span>
              </div>
              <p class="text-gray-400 leading-relaxed mb-3">{{ $t('home.webDev.description') }}</p>
              <span class="text-neon-green text-sm font-medium flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                {{ $t('home.viewProjects') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </div>
          </div>
        </NuxtLink>

        <!-- Hobbies -->
        <p class="text-center text-gray-500 text-sm uppercase tracking-widest mb-6">Hobbies & Side Projects</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink to="/photography" class="service-card group">
            <div class="card-glow card-glow-purple"></div>
            <div class="relative z-10">
              <div class="w-14 h-14 rounded-xl bg-neon-purple/10 flex items-center justify-center mb-5 group-hover:bg-neon-purple/20 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3 group-hover:text-neon-purple transition-colors duration-300">{{ $t('home.photography.title') }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed mb-4">{{ $t('home.photography.description') }}</p>
              <span class="text-neon-purple text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {{ $t('home.explorePortfolio') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </div>
          </NuxtLink>

          <NuxtLink to="/drone" class="service-card group">
            <div class="card-glow card-glow-cyan"></div>
            <div class="relative z-10">
              <div class="w-14 h-14 rounded-xl bg-neon-cyan/10 flex items-center justify-center mb-5 group-hover:bg-neon-cyan/20 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-6.5L15 8" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors duration-300">{{ $t('home.drone.title') }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed mb-4">{{ $t('home.drone.description') }}</p>
              <span class="text-neon-cyan text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {{ $t('home.learnMore') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </div>
          </NuxtLink>

          <a href="https://3dps.space/" target="_blank" rel="noopener noreferrer" class="service-card group">
            <div class="card-glow card-glow-magenta"></div>
            <div class="relative z-10">
              <div class="w-14 h-14 rounded-xl bg-neon-magenta/10 flex items-center justify-center mb-5 group-hover:bg-neon-magenta/20 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-neon-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3 group-hover:text-neon-magenta transition-colors duration-300">{{ $t('home.printing.title') }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed mb-4">{{ $t('home.printing.description') }}</p>
              <span class="text-neon-magenta text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {{ $t('home.exploreServices') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-dark to-neon-purple/10"></div>
      <div class="absolute inset-0 bg-grid opacity-10"></div>
      <div class="absolute top-0 left-0 w-64 h-64 bg-neon-green/10 rounded-full blur-[80px]"></div>
      <div class="absolute bottom-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-[80px]"></div>

      <div class="container mx-auto px-4 text-center relative z-10">
        <h2 class="text-3xl md:text-5xl font-black mb-6">
          <span class="gradient-text">{{ $t('cta.title') }}</span>
        </h2>
        <p class="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">{{ $t('cta.description') }}</p>
        <NuxtLink to="/contact" class="btn-neon inline-block">
          {{ $t('cta.button') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.featured-card {
  transition: transform 0.3s ease, border-color 0.3s ease;
}
.featured-card:hover {
  transform: translateY(-3px);
  border-color: rgba(0, 255, 136, 0.4);
}

.card-glow-featured {
  @apply absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] bg-neon-green/10 opacity-0 transition-opacity duration-500;
}
.featured-card:hover .card-glow-featured {
  @apply opacity-100;
}

.service-card {
  @apply relative glass-card p-6 overflow-hidden transition-all duration-500 cursor-pointer block;
}
.service-card:hover {
  @apply border-white/20;
  transform: translateY(-5px);
}

.card-glow {
  @apply absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 transition-opacity duration-500;
}
.service-card:hover .card-glow {
  @apply opacity-100;
}

.card-glow-cyan { @apply bg-neon-cyan/20; }
.card-glow-magenta { @apply bg-neon-magenta/20; }
.card-glow-purple { @apply bg-neon-purple/20; }
.card-glow-green { @apply bg-neon-green/20; }

.project-card {
  transition: transform 0.3s ease, border-color 0.3s ease;
}
.project-card:hover {
  border-color: rgba(0, 255, 136, 0.4);
}
</style>
