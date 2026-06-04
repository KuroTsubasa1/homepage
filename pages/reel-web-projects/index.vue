<script setup lang="ts">
import ProjectGrid from "~/components/projectGrid.vue";
import { ref } from 'vue';

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
  <!-- Hero -->
  <section class="hero relative min-h-[calc(100vh-13rem)] flex items-center justify-center overflow-hidden">
    <div class="hero-background absolute inset-0 z-0"></div>
    <div class="code-animation absolute inset-0 z-0 opacity-20"></div>
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[100px] z-0"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[100px] z-0"></div>
    <div class="container mx-auto px-6 py-16 z-10 text-center animate-slide-up">
      <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 hero-title">
        <span class="text-white block">Web</span>
        <span class="gradient-text block mt-2">Development</span>
      </h1>
      <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
        I build things for the web. Clean code, great UX, modern stack.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="#career" class="btn-neon font-pixel animate-glow-pulse">My Career</a>
        <a href="#projects" class="btn-neon-outline font-pixel">Side Projects</a>
      </div>
    </div>
  </section>

  <!-- Skills -->
  <section class="py-20 bg-dark relative overflow-hidden">
    <div class="bg-grid absolute inset-0 opacity-10"></div>
    <div class="container mx-auto px-6 relative z-10">
      <h2 class="section-heading">Tech Stack</h2>
      <div class="section-divider"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div v-for="skill in skills" :key="skill.name" class="glass-card rounded-2xl p-5">
          <h3 class="text-sm font-semibold text-white mb-3">{{ skill.name }}</h3>
          <div class="w-full bg-dark-300 rounded-full h-2">
            <div class="h-2 rounded-full transition-all duration-1000" :style="{ width: skill.percentage + '%', backgroundColor: skill.color }"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Career Timeline -->
  <section id="career" class="py-24 bg-dark-100 relative overflow-hidden">
    <div class="bg-grid absolute inset-0 opacity-10"></div>
    <div class="absolute top-0 left-0 w-96 h-96 bg-neon-green/5 rounded-full blur-[100px]"></div>
    <div class="container mx-auto px-6 relative z-10">
      <h2 class="section-heading">My Journey</h2>
      <div class="section-divider"></div>

      <div class="max-w-4xl mx-auto space-y-6">
        <div v-for="(job, index) in career" :key="index" class="glass-card p-6 md:p-8 relative overflow-hidden group" :class="job.current ? 'neon-border' : ''">
          <!-- Current badge -->
          <span v-if="job.current" class="absolute top-4 right-4 text-[10px] font-pixel px-2.5 py-1 rounded-full bg-neon-green/10 text-neon-green border border-neon-green/30 animate-pulse">Current</span>

          <div class="flex flex-col md:flex-row md:items-start gap-4 mb-5">
            <div class="md:w-48 flex-shrink-0">
              <p class="text-neon-green font-mono text-sm">{{ job.period }}</p>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">{{ job.company }}</h3>
              <p class="text-gray-400 text-sm">{{ job.role }}</p>
            </div>
          </div>

          <div class="space-y-4 md:ml-52">
            <NuxtLink v-for="project in job.projects" :key="project.id" :to="`/reel-web-projects/${project.id}`" class="border-l-2 border-neon-green/20 pl-4 block group hover:border-neon-green/50 transition-colors">
              <h4 class="font-semibold text-white text-sm group-hover:text-neon-green transition-colors">{{ project.name }} <span class="text-neon-green/0 group-hover:text-neon-green/60 text-xs transition-colors">→</span></h4>
              <p class="text-gray-400 text-sm mt-1">{{ project.desc }}</p>
              <div class="flex flex-wrap gap-1.5 mt-2">
                <span v-for="tag in project.tags" :key="tag" class="gb-chip">{{ tag }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Open Source / Side Projects -->
  <section id="projects" class="py-24 bg-dark relative overflow-hidden">
    <div class="bg-grid absolute inset-0 opacity-10"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-[100px]"></div>
    <div class="container mx-auto px-6 relative z-10">
      <h2 class="section-heading">Things I've Built</h2>
      <div class="section-divider"></div>

      <!-- Employment projects -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mx-4 md:mx-10 mb-8">
        <template v-for="job in career" :key="job.company">
          <NuxtLink v-for="project in job.projects" :key="project.id" :to="`/reel-web-projects/${project.id}`" class="project-card glass-card neon-border overflow-hidden group block">
            <div class="h-2 w-full" :class="job.current ? 'bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple' : 'bg-dark-300'"></div>
            <div class="p-6">
              <div class="flex items-start justify-between gap-2 mb-1">
                <h3 class="text-xl font-bold text-white group-hover:text-neon-green transition-colors">{{ project.name }}</h3>
                <span v-if="job.current" class="text-[10px] font-pixel px-2 py-0.5 rounded-full bg-neon-green/10 text-neon-green border border-neon-green/20 flex-shrink-0 mt-1">Current</span>
              </div>
              <p class="text-neon-green/60 text-xs mb-3">{{ job.company }} · {{ job.period }}</p>
              <p class="text-gray-400 text-sm mb-4">{{ project.desc }}</p>
              <div class="flex items-center justify-between">
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="tag in project.tags" :key="tag" class="gb-chip">{{ tag }}</span>
                </div>
                <span class="text-neon-green text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">Details →</span>
              </div>
            </div>
          </NuxtLink>
        </template>
      </div>

      <!-- Open source -->
      <div class="mt-16 text-center">
        <h3 class="text-xl font-bold text-white mb-2">Open Source</h3>
        <p class="text-gray-500 text-sm mb-8">
          Side projects on
          <a href="https://github.com/KuroTsubasa1" target="_blank" rel="noopener noreferrer" class="text-neon-green hover:underline">GitHub</a>
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
          <a v-for="project in personalProjects" :key="project.name" :href="project.url" target="_blank" rel="noopener noreferrer"
            class="glass-card px-4 py-3 group hover:border-neon-purple/40 transition-all duration-300 hover:-translate-y-1 block text-center">
            <h4 class="font-bold text-white text-sm group-hover:text-neon-purple transition-colors">{{ project.name }}</h4>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 bg-gradient-to-br from-neon-green/10 via-dark to-neon-purple/10 relative overflow-hidden">
    <div class="bg-grid absolute inset-0 opacity-10"></div>
    <div class="container mx-auto px-6 text-center relative z-10">
      <h2 class="text-4xl font-bold mb-6"><span class="gradient-text">Interested in working together?</span></h2>
      <p class="text-xl mb-10 max-w-2xl mx-auto text-gray-300">
        I'm open to new opportunities and interesting projects. Let's talk.
      </p>
      <a href="/contact" class="btn-neon font-pixel animate-glow-pulse">Get in Touch</a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(to bottom right, rgb(var(--c-bg)), rgb(var(--c-bg-100)));
}

.hero-background {
  background: radial-gradient(circle at 50% 50%, rgba(155, 188, 15, 0.08) 0%, rgba(0, 0, 0, 0) 50%);
}

.code-animation {
  background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='code' patternUnits='userSpaceOnUse' width='100' height='100' patternTransform='scale(0.75)'%3E%3Ctext x='0' y='30' font-family='monospace' font-size='20' fill='%239bbc0f'%3E%26lt;/%26gt;%3C/text%3E%3Ctext x='50' y='60' font-family='monospace' font-size='20' fill='%239bbc0f'%3E%7B%7D%3C/text%3E%3Ctext x='25' y='90' font-family='monospace' font-size='20' fill='%239bbc0f'%3E();%3C/text%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23code)'/%3E%3C/svg%3E");
  animation: slide 20s linear infinite;
}

@keyframes slide {
  0% { background-position: 0 0; }
  100% { background-position: 500px 500px; }
}

.hero-title {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.project-card {
  transition: transform 0.3s ease, border-color 0.3s ease;
}
.project-card:hover {
  transform: translateY(-5px);
  border-color: rgba(155, 188, 15, 0.4);
}
</style>
