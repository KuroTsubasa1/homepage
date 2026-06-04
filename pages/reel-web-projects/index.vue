<script setup lang="ts">
import ProjectGrid from "~/components/projectGrid.vue";
import { ref } from 'vue';

const { sfx } = useGameboy()

useSeoMeta({
  title: 'Web Development Portfolio | Lasse Harm',
  ogTitle: 'Web Development Portfolio | Lasse Harm',
  description: 'Explore my web development portfolio — enterprise apps, open source projects, and a career timeline spanning 10+ years of professional development.',
  ogDescription: 'Explore my web development portfolio — enterprise apps, open source projects, and a career timeline spanning 10+ years of professional development.',
  ogImage: 'https://pocket.lasseharm.space/api/files/web_projects_image.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
  keywords: 'web development, portfolio, Vue.js, Nuxt.js, TypeScript, PHP, Symfony, Laravel',
});

const skills = ref([
  { name: 'JavaScript / TypeScript', percentage: 95, color: 'rgb(155, 188, 15)' },
  { name: 'Vue.js / Nuxt.js', percentage: 95, color: 'rgb(155, 188, 15)' },
  { name: 'PHP (Symfony, Laravel)', percentage: 90, color: '#7c4dc4' },
  { name: 'CSS (Tailwind, Bootstrap)', percentage: 90, color: 'rgb(139, 172, 15)' },
  { name: 'Databases (MySQL, PostgreSQL)', percentage: 85, color: '#7c4dc4' },
  { name: 'Node.js / Python', percentage: 75, color: 'rgb(155, 188, 15)' },
]);

const career = ref([
  {
    period: 'Feb 2025 — Now',
    company: 'DIU MarTech Solutions GmbH',
    role: 'Web Developer',
    current: true,
    projects: [
      { id: 'suzuki-hit', name: 'Suzuki HIT', desc: 'Händler Informations Tool — enterprise dealer information platform. Maintained and developed.', tags: ['Vue.js', 'Enterprise'] },
      { id: 'suzuki-ssbp-nxt', name: 'Suzuki SSBP-Nxt', desc: 'Antrags Plattform — complete rewrite of the application platform. Front-end architecture, modernized stack.', tags: ['Vue.js', 'Complete Rewrite'] },
    ]
  },
  {
    period: 'Jun 2024 — Jan 2025',
    company: 'Groenewold - IT Solutions',
    role: 'Web Developer',
    projects: [
      { id: 'lotto-thueringen', name: 'LOTTO Thüringen', desc: 'Ported 3 internal apps — payout tracking, admin system, and training platform.', tags: ['PHP 8', 'Laravel 11', 'Bootstrap 5'] },
    ]
  },
  {
    period: 'Dec 2023 — May 2024',
    company: 'Tritum GmbH',
    role: 'Web Developer',
    projects: [
      { id: 'aok-familiencoach', name: 'AOK Familiencoach Pflege', desc: 'Redesign of an online self-help program for caregivers with interactive exercises and multimedia content.', tags: ['PHP', 'TYPO3 v11'] },
    ]
  },
  {
    period: 'May — Oct 2023',
    company: 'EOS Uptrade GmbH',
    role: 'Web Developer',
    projects: [
      { id: 'eos-ticketingsuite', name: 'eos.ticketingsuite', desc: 'Mobility ticketing and distribution platform for public transport and modern mobility services.', tags: ['PHP', 'Symfony 1/5', 'MySQL'] },
    ]
  },
  {
    period: 'Jan — Apr 2023',
    company: 'TimberTec GmbH',
    role: 'Web Developer',
    projects: [
      { id: 'timbertec-tias', name: 'TIAS', desc: 'Local UI for industrial plant control systems used by production companies.', tags: ['TypeScript', 'Vue 3', 'Quasar'] },
    ]
  },
  {
    period: 'Aug 2018 — Dec 2022',
    company: 'LYNET GmbH',
    role: 'Web Developer',
    projects: [
      { id: 'exxonmobil-emdes', name: 'Exxonmobil EMDES', desc: 'Portal for end customers to book oil changes and workshop services.', tags: ['PHP 7/8', 'Symfony 4', 'Vue 2'] },
      { id: 'exxonmobil-intranet', name: 'Exxonmobil Intranet', desc: 'Learning and information platform for partner workshops.', tags: ['PHP 8', 'Symfony 5', 'React'] },
      { id: 'lynet-cookie-banner', name: 'LYNET Cookie-Banner', desc: 'GDPR-compliant cookie consent solution.', tags: ['JavaScript', 'HTML', 'CSS'] },
    ]
  },
  {
    period: 'Aug 2015 — Aug 2018',
    company: 'Gutzmann GmbH, Lübeck',
    role: 'Apprentice — IT Application Developer',
    projects: [
      { id: 'mars-petprofi', name: 'Mars PetProfi', desc: 'Knowledge and sales portal for Mars Germany GmbH.', tags: ['PHP 5.6', 'MySQL'] },
      { id: 'drk-server', name: 'DRK-Server', desc: 'Resource management system for the German Red Cross.', tags: ['Java SE 8', 'Spring Boot'] },
    ]
  },
]);

const personalProjects = ref([
  { name: 'Katachi', url: 'https://github.com/KuroTsubasa1/katachi', description: 'Shape-based project' },
  { name: 'Tanzaku', url: 'https://github.com/KuroTsubasa1/Tanzaku', description: 'Wish / task tracker' },
  { name: 'Photobooth', url: 'https://github.com/KuroTsubasa1/photobooth', description: 'Photo booth app' },
  { name: '3DPS Budget Tracker', url: 'https://github.com/KuroTsubasa1/3dps-budget-tracker', description: 'Budget tracker for 3D printing' },
  { name: 'LinkHub', url: 'https://github.com/KuroTsubasa1/linkhub', description: 'Link aggregator' },
]);

</script>

<template>
  <div>
    <!-- TITLE SCREEN -->
    <section class="relative bg-dark overflow-hidden py-16 md:py-24">
      <div class="bg-grid absolute inset-0 opacity-10"></div>
      <div class="dither absolute inset-0 opacity-30"></div>
      <div class="container mx-auto px-4 relative z-10 animate-slide-up">
        <div class="gb-titlecard">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 hero-title">
            <span class="text-white block">Web</span>
            <span class="gradient-text block mt-2">Development</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            I build things for the web. Clean code, great UX, modern stack.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="#career" class="btn-neon font-pixel animate-glow-pulse">My Career</a>
            <a href="#projects" class="btn-neon-outline font-pixel">Side Projects</a>
          </div>
        </div>
      </div>
    </section>

    <!-- MENU SCREENS -->
    <div class="container mx-auto px-4 max-w-4xl py-12 space-y-10">

      <!-- TECH STACK — skill bars -->
      <GbWindow title="Tech Stack" class="animate-slide-up">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          <div v-for="skill in skills" :key="skill.name" class="flex flex-col gap-2">
            <div class="flex items-center justify-between gap-3">
              <span class="text-white text-sm">{{ skill.name }}</span>
              <span class="gb-menu-value">{{ skill.percentage }}%</span>
            </div>
            <span class="gb-bar block w-full" :style="`--pct:${skill.percentage}%`"></span>
          </div>
        </div>
      </GbWindow>

      <!-- MY JOURNEY — career timeline -->
      <GbWindow id="career" title="My Journey" class="animate-slide-up">
        <div class="space-y-8">
          <div v-for="(job, index) in career" :key="index">
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
              <h3 class="text-lg font-bold text-white">{{ job.company }}</h3>
              <span v-if="job.current" class="gb-chip animate-pulse">Current</span>
            </div>
            <p class="pixel-label text-neon-green">{{ job.period }}</p>
            <p class="text-gray-400 text-sm mb-3">{{ job.role }}</p>

            <ul class="gb-menu-list">
              <li v-for="project in job.projects" :key="project.id">
                <NuxtLink :to="`/reel-web-projects/${project.id}`" class="gb-menu-row !items-start" @mouseenter="sfx.hover()" @click="sfx.select()">
                  <span class="flex-1 min-w-0">
                    <span class="text-white">{{ project.name }}</span>
                    <span class="block mt-1 gb-row-desc">{{ project.desc }}</span>
                    <span class="flex flex-wrap gap-1.5 mt-2">
                      <span v-for="tag in project.tags" :key="tag" class="gb-chip">{{ tag }}</span>
                    </span>
                  </span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </GbWindow>

      <!-- THINGS I'VE BUILT — project tiles -->
      <GbWindow id="projects" title="Things I've Built" class="animate-slide-up">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <template v-for="job in career" :key="job.company">
            <NuxtLink
              v-for="project in job.projects"
              :key="project.id"
              :to="`/reel-web-projects/${project.id}`"
              class="gb-tile group flex flex-col p-4"
              @mouseenter="sfx.hover()"
              @click="sfx.select()"
            >
              <div class="flex items-start justify-between gap-2 mb-1">
                <h3 class="text-lg font-bold text-white group-hover:text-neon-green transition-colors">{{ project.name }}</h3>
                <span v-if="job.current" class="gb-chip flex-shrink-0">Current</span>
              </div>
              <p class="pixel-label text-neon-purple mb-2">{{ job.company }} · {{ job.period }}</p>
              <p class="gb-row-desc flex-1">{{ project.desc }}</p>
              <div class="flex flex-wrap gap-1.5 mt-3">
                <span v-for="tag in project.tags" :key="tag" class="gb-chip">{{ tag }}</span>
              </div>
            </NuxtLink>
          </template>
        </div>
      </GbWindow>

      <!-- OPEN SOURCE — side projects -->
      <GbWindow title="Open Source" class="animate-slide-up">
        <p class="gb-row-desc mb-4">
          Side projects on
          <a href="https://github.com/KuroTsubasa1" target="_blank" rel="noopener noreferrer" class="text-neon-green hover:underline">GitHub</a>
        </p>
        <ul class="gb-menu-list">
          <li v-for="project in personalProjects" :key="project.name">
            <a :href="project.url" target="_blank" rel="noopener noreferrer" class="gb-menu-row !items-start" @mouseenter="sfx.hover()" @click="sfx.select()">
              <span class="flex-1 min-w-0">
                <span class="text-white">{{ project.name }}</span>
                <span class="block mt-1 gb-row-desc">{{ project.description }}</span>
              </span>
            </a>
          </li>
        </ul>
      </GbWindow>

      <!-- CTA -->
      <GbWindow class="animate-slide-up">
        <div class="text-center py-2">
          <h2 class="text-2xl md:text-4xl font-black mb-4">
            <span class="gradient-text">Interested in working together?</span>
          </h2>
          <p class="text-gray-400 text-lg mb-7 max-w-2xl mx-auto">
            I'm open to new opportunities and interesting projects. Let's talk.
          </p>
          <p class="gb-prompt animate-blink mb-5">NEW GAME?</p>
          <a href="/contact" class="btn-neon font-pixel animate-glow-pulse inline-block">Get in Touch</a>
        </div>
      </GbWindow>

    </div>
  </div>
</template>

<style scoped>
.hero-title {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* Flavour text under each menu row / tile (readable VT323, not pixel font) */
.gb-row-desc {
  font-family: 'VT323', ui-monospace, monospace;
  font-size: 1.05rem;
  line-height: 1.3;
  letter-spacing: 0.01em;
  text-transform: none;
  color: rgb(var(--c-ink-2));
}
</style>
