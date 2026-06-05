<script setup lang="ts">
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
  { name: 'JavaScript / TypeScript', percentage: 95, color: '#00ff88' },
  { name: 'Vue.js / Nuxt.js', percentage: 95, color: '#42B883' },
  { name: 'PHP (Symfony, Laravel)', percentage: 90, color: '#8b5cf6' },
  { name: 'CSS (Tailwind, Bootstrap)', percentage: 90, color: '#00f0ff' },
  { name: 'Databases (MySQL, PostgreSQL)', percentage: 85, color: '#ff00aa' },
  { name: 'Node.js / Python', percentage: 75, color: '#ffb800' },
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
    <!-- ① Cinematic hero -->
    <section class="relative min-h-[78vh] flex items-end overflow-hidden bg-forest">
      <div class="absolute inset-0 bg-topo opacity-30 pointer-events-none"></div>
      <div class="absolute inset-0 bg-grid opacity-50 pointer-events-none"></div>
      <div class="absolute inset-0 vignette pointer-events-none"></div>
      <div class="orb top-10 left-1/4 w-[28rem] h-[28rem] bg-amber/10 animate-drift"></div>
      <div class="orb bottom-0 right-1/4 w-96 h-96 bg-moss/10 animate-drift-slow"></div>

      <div class="container mx-auto px-6 pb-20 pt-40 relative z-10">
        <div class="max-w-4xl" v-reveal:blur>
          <p class="eyebrow mb-5 flex items-center gap-3">
            <span class="inline-block w-10 h-px bg-amber"></span>
            Field Notes · Code
          </p>
          <h1 class="display-xl text-bone text-6xl md:text-8xl lg:text-[10rem] mb-6">
            <span class="block">Web</span>
            <span class="gradient-text-anim block">Development</span>
          </h1>
          <p class="text-lg md:text-2xl text-bone-muted max-w-2xl leading-relaxed mb-10">
            I build things for the web. Clean code, great UX, a modern stack — tracked across a decade in the field.
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="#career" class="btn-wild">My Career</a>
            <a href="#projects" class="btn-wild-outline">Side Projects</a>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2">
        <span class="w-px h-10 bg-gradient-to-b from-amber/70 to-transparent animate-bob"></span>
      </div>
    </section>

    <!-- ② Tech stack marquee -->
    <species-marquee :items="['Vue.js', 'Nuxt', 'TypeScript', 'PHP', 'Symfony', 'Laravel', 'Tailwind', 'Docker', 'PostgreSQL', 'Node.js']" />

    <!-- ③ Skills -->
    <section class="relative py-28 overflow-hidden bg-forest-100">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb top-0 right-0 w-96 h-96 bg-amber/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading eyebrow="The Toolkit" title="Tech Stack" subtitle="The languages and frameworks I reach for in the field." />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto" v-reveal.stagger>
          <div v-for="skill in skills" :key="skill.name" v-tilt="5" class="panel wild-border p-6 group">
            <div class="flex items-baseline justify-between mb-4">
              <h3 class="font-condensed uppercase tracking-wide text-sm text-bone group-hover:text-amber transition-colors duration-300">{{ skill.name }}</h3>
              <span class="font-display text-2xl text-amber tabular-nums leading-none">{{ skill.percentage }}<span class="text-bone-dim text-base">%</span></span>
            </div>
            <div class="w-full bg-forest-300 rounded-full h-1.5 overflow-hidden">
              <div class="h-1.5 rounded-full bg-gradient-to-r from-amber via-clay to-moss transition-all duration-1000 ease-wild" :style="{ width: skill.percentage + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ④ Career Timeline -->
    <section id="career" class="relative py-28 overflow-hidden bg-forest">
      <div class="absolute inset-0 bg-grid opacity-50 pointer-events-none"></div>
      <div class="orb top-0 left-1/4 w-96 h-96 bg-moss/10 animate-drift"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading eyebrow="A Decade in the Field" title="My Journey" subtitle="Ten-plus years tracking enterprise platforms, rewrites and internal tools." />

        <div class="relative max-w-4xl mx-auto">
          <!-- vertical trail line -->
          <div class="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-amber/50 via-forest-400 to-transparent pointer-events-none"></div>

          <div class="space-y-12 md:space-y-16" v-reveal.stagger>
            <div
              v-for="(job, index) in career"
              :key="index"
              class="relative pl-12 md:pl-0"
              :class="(index % 2 === 0) ? 'md:pr-[52%] md:text-right' : 'md:pl-[52%]'"
            >
              <!-- node -->
              <span
                class="absolute left-3 md:left-1/2 -translate-x-1/2 top-1.5 w-4 h-4 rounded-full border-2 z-10"
                :class="job.current ? 'bg-amber border-amber animate-glow-pulse' : 'bg-forest-200 border-amber/40'"
              ></span>

              <p class="font-condensed uppercase tracking-widest2 text-xs text-amber mb-2">{{ job.period }}</p>
              <div class="panel wild-border p-6 md:p-7 group" :class="job.current ? 'animate-glow-pulse' : ''" v-tilt="4">
                <div class="flex items-start gap-3 mb-5" :class="(index % 2 === 0) ? 'md:flex-row-reverse md:text-left' : ''">
                  <div :class="(index % 2 === 0) ? 'md:text-right' : ''">
                    <div class="flex items-center gap-2 flex-wrap" :class="(index % 2 === 0) ? 'md:justify-end' : ''">
                      <h3 class="font-display text-xl md:text-2xl uppercase text-bone leading-tight">{{ job.company }}</h3>
                      <span v-if="job.current" class="text-[10px] font-condensed uppercase tracking-widest2 px-2.5 py-0.5 rounded-full bg-moss/15 text-moss-light border border-moss/25 animate-pulse">Current</span>
                    </div>
                    <p class="text-bone-muted text-sm mt-1">{{ job.role }}</p>
                  </div>
                </div>

                <div class="space-y-3 text-left">
                  <NuxtLink
                    v-for="project in job.projects"
                    :key="project.id"
                    :to="`/reel-web-projects/${project.id}`"
                    class="block border-l-2 border-amber/20 pl-4 py-1 hover:border-amber transition-colors duration-300 group/proj"
                  >
                    <h4 class="font-condensed uppercase tracking-wide text-sm text-bone group-hover/proj:text-amber transition-colors">
                      {{ project.name }}
                      <span class="text-amber/0 group-hover/proj:text-amber text-xs transition-colors">→</span>
                    </h4>
                    <p class="text-bone-muted text-sm mt-1 leading-relaxed">{{ project.desc }}</p>
                    <div class="flex flex-wrap gap-1.5 mt-2">
                      <span v-for="tag in project.tags" :key="tag" class="text-[10px] font-condensed uppercase tracking-wide px-2 py-0.5 rounded-full bg-forest-300 text-bone-dim border border-bone/5">{{ tag }}</span>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑤ Things I've Built -->
    <section id="projects" class="relative py-28 overflow-hidden bg-forest-100">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none"></div>
      <div class="orb top-0 right-1/4 w-96 h-96 bg-clay/10 animate-drift-slow"></div>
      <div class="container mx-auto px-6 relative z-10">
        <section-heading eyebrow="The Specimens" title="Things I've Built" subtitle="A field guide to the platforms, portals and tools I've shipped." />

        <!-- Employment project cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" v-reveal.stagger>
          <template v-for="job in career" :key="job.company">
            <NuxtLink
              v-for="project in job.projects"
              :key="project.id"
              :to="`/reel-web-projects/${project.id}`"
              v-tilt="6"
              class="group relative block rounded-2xl overflow-hidden panel wild-border transition-all duration-500 ease-wild hover:-translate-y-2"
            >
              <div class="h-1.5 w-full" :class="job.current ? 'bg-gradient-to-r from-amber via-clay to-moss' : 'bg-forest-300'"></div>
              <div class="p-6">
                <div class="flex items-start justify-between gap-2 mb-1">
                  <h3 class="font-display text-xl md:text-2xl uppercase text-bone group-hover:text-amber transition-colors duration-300 leading-tight">{{ project.name }}</h3>
                  <span v-if="job.current" class="text-[10px] font-condensed uppercase tracking-widest2 px-2 py-0.5 rounded-full bg-moss/15 text-moss-light border border-moss/25 flex-shrink-0 mt-1">Current</span>
                </div>
                <p class="eyebrow text-bone-dim mb-3 normal-case tracking-wide">{{ job.company }} · {{ job.period }}</p>
                <p class="text-bone-muted text-sm mb-5 leading-relaxed">{{ project.desc }}</p>
                <div class="flex items-center justify-between gap-2">
                  <div class="flex flex-wrap gap-1.5">
                    <span v-for="tag in project.tags" :key="tag" class="text-[10px] font-condensed uppercase tracking-wide px-2 py-0.5 rounded-full bg-forest-300 text-bone-dim border border-bone/5">{{ tag }}</span>
                  </div>
                  <span class="btn-ghost-wild text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">Details →</span>
                </div>
              </div>
            </NuxtLink>
          </template>
        </div>

        <!-- Open source -->
        <div class="mt-20 text-center" v-reveal>
          <p class="eyebrow mb-3">Open Source</p>
          <h3 class="font-display text-3xl md:text-4xl uppercase text-bone mb-3">In the Wild</h3>
          <p class="text-bone-muted text-sm mb-10 max-w-xl mx-auto">
            Side projects roaming free on
            <a href="https://github.com/KuroTsubasa1" target="_blank" rel="noopener noreferrer" class="link-glow text-amber">GitHub</a>.
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto" v-reveal.stagger>
            <a
              v-for="project in personalProjects"
              :key="project.name"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              v-tilt="8"
              class="panel px-4 py-4 group hover:border-amber/40 transition-all duration-300 hover:-translate-y-1 block text-center"
            >
              <h4 class="font-condensed uppercase tracking-wide text-sm text-bone group-hover:text-amber transition-colors">{{ project.name }}</h4>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑥ CTA -->
    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-amber/10 via-forest to-moss/10"></div>
      <div class="absolute inset-0 bg-topo opacity-30 pointer-events-none"></div>
      <div class="orb top-0 left-0 w-72 h-72 bg-amber/10"></div>
      <div class="orb bottom-0 right-0 w-72 h-72 bg-clay/10"></div>
      <div class="container mx-auto px-6 text-center relative z-10" v-reveal:scale>
        <p class="eyebrow mb-4">Let's Build</p>
        <h2 class="display-xl text-5xl md:text-7xl text-bone mb-6 text-balance">
          <span class="gradient-text">Interested in working together?</span>
        </h2>
        <p class="text-lg text-bone-muted mb-10 max-w-2xl mx-auto leading-relaxed">
          I'm open to new opportunities and interesting projects. Let's talk.
        </p>
        <NuxtLink to="/contact" class="btn-wild">Get in Touch</NuxtLink>
      </div>
    </section>
  </div>
</template>
