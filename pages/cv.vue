<template>
  <navigation></navigation>

  <!-- Hero -->
  <section class="relative overflow-hidden pt-28 pb-16">
    <div class="absolute inset-0 bg-grid opacity-20"></div>
    <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px]"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]"></div>

    <div class="container mx-auto px-6 relative z-10">
      <h1 class="text-5xl md:text-7xl font-black mb-3">
        <span class="gradient-text">{{ profile.name }}</span>
      </h1>
      <h2 class="text-xl md:text-2xl font-semibold text-gray-300 mb-8">{{ profile.title }}</h2>

      <div class="flex flex-wrap gap-4">
        <a :href="pdfUrl" target="_blank" rel="noopener" class="btn-neon inline-flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M4 6h16M4 6a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2" /></svg>
          {{ t('about.cta.downloadCv') }}
        </a>
        <NuxtLink to="/contact" class="btn-neon-outline inline-flex items-center gap-2">
          {{ t('nav.contact') }}
        </NuxtLink>
      </div>
    </div>
  </section>

  <div class="container mx-auto px-6 pb-24 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <!-- Main column -->
      <div class="lg:col-span-2 space-y-12">
        <!-- Profile summary -->
        <div class="glass-card neon-border p-6 md:p-8">
          <p class="text-gray-300 leading-relaxed">{{ profile.summary }}</p>
          <div class="flex flex-wrap gap-2 mt-5">
            <span v-for="tech in profile.coreTech" :key="tech" class="px-3 py-1 text-xs rounded-full bg-neon-green/10 text-neon-green border border-neon-green/20">{{ tech }}</span>
          </div>
        </div>

        <!-- Experience -->
        <section>
          <h2 class="text-2xl font-bold text-white mb-2">Berufserfahrung</h2>
          <div class="h-1 w-16 bg-gradient-to-r from-neon-green to-neon-cyan rounded-full mb-8"></div>

          <div class="relative border-l border-white/10 pl-8 space-y-10">
            <div v-for="(job, i) in experience" :key="i" class="relative">
              <!-- timeline dot -->
              <span
                class="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full border-2"
                :class="job.current ? 'bg-neon-green border-neon-green shadow-[0_0_10px_rgba(0,255,136,0.6)] animate-pulse' : 'bg-dark border-neon-cyan/50'"
              ></span>

              <div class="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 class="text-lg font-bold text-white">{{ job.company }}</h3>
                <span class="text-xs text-gray-500 whitespace-nowrap">{{ job.period }}</span>
              </div>
              <p class="text-neon-cyan/80 text-sm mb-4">{{ job.role }}</p>

              <div class="space-y-4">
                <div v-for="(p, j) in job.projects" :key="j" class="glass-card border border-white/5 p-4 rounded-xl">
                  <h4 class="text-white font-semibold mb-1">{{ p.name }}</h4>
                  <p class="text-gray-400 text-sm mb-3">{{ p.desc }}</p>
                  <div class="flex flex-wrap gap-1.5">
                    <span v-for="tech in p.tech" :key="tech" class="px-2 py-0.5 text-[11px] rounded-full bg-dark-300 text-gray-400 border border-white/5">{{ tech }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Education -->
        <section>
          <h2 class="text-2xl font-bold text-white mb-2">Bildung</h2>
          <div class="h-1 w-16 bg-gradient-to-r from-neon-green to-neon-cyan rounded-full mb-8"></div>

          <div class="space-y-4">
            <div v-for="(edu, i) in education" :key="i" class="glass-card neon-border p-5">
              <div class="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 class="text-white font-semibold">{{ edu.school }}</h3>
                <span class="text-xs text-gray-500 whitespace-nowrap">{{ edu.period }}</span>
              </div>
              <p class="text-gray-400 text-sm uppercase tracking-wide mt-1">{{ edu.degree }}</p>
            </div>
          </div>
        </section>
      </div>

      <!-- Sidebar -->
      <aside class="space-y-8">
        <!-- Contact -->
        <div class="glass-card neon-border p-6">
          <h3 class="text-sm uppercase tracking-widest text-gray-500 mb-4">Kontakt</h3>
          <ul class="space-y-2 text-sm text-gray-300">
            <li>{{ profile.contact.address }}</li>
            <li><a :href="`tel:${profile.contact.phone.replace(/[^+\d]/g, '')}`" class="hover:text-neon-green transition-colors">{{ profile.contact.phone }}</a></li>
            <li><a :href="`mailto:${profile.contact.email}`" class="hover:text-neon-green transition-colors break-all">{{ profile.contact.email }}</a></li>
            <li><a :href="`https://${profile.contact.website}`" target="_blank" rel="noopener" class="hover:text-neon-cyan transition-colors">{{ profile.contact.website }}</a></li>
            <li><a :href="`https://${profile.contact.github}`" target="_blank" rel="noopener" class="hover:text-neon-cyan transition-colors break-all">{{ profile.contact.github }}</a></li>
            <li><a :href="`https://${profile.contact.linkedin}`" target="_blank" rel="noopener" class="hover:text-neon-cyan transition-colors break-all">{{ profile.contact.linkedin }}</a></li>
          </ul>
        </div>

        <!-- Skills -->
        <div class="glass-card neon-border p-6">
          <h3 class="text-sm uppercase tracking-widest text-gray-500 mb-4">Technische Fähigkeiten</h3>
          <div class="space-y-4">
            <div v-for="(block, i) in skills" :key="i">
              <h4 class="text-neon-green text-sm font-semibold mb-1">{{ block.title }}</h4>
              <p class="text-gray-400 text-sm leading-relaxed">{{ block.items }}</p>
            </div>
          </div>
        </div>

        <!-- Hobbies -->
        <div class="glass-card neon-border p-6">
          <h3 class="text-sm uppercase tracking-widest text-gray-500 mb-4">Hobbys</h3>
          <ul class="space-y-2">
            <li v-for="(h, i) in hobbies" :key="i" class="text-gray-300 text-sm flex gap-2">
              <span class="text-neon-green">▹</span>
              <span>{{ h }}</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>

  <footer-component></footer-component>
</template>

<script lang="ts" setup>
import FooterComponent from "~/components/footerComponent.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const pdfUrl = '/cv.pdf';

const profile = {
  name: 'Lasse Harm',
  title: 'Full-Stack Web Developer',
  summary: 'Full-Stack Web Developer mit 10+ Jahren Erfahrung in PHP, JavaScript/TypeScript und Vue.js. Spezialisiert auf Enterprise-Webanwendungen — von Legacy-Migrationen und Portierungen bis hin zu kompletten Rewrites moderner Plattformen. Erfahren im gesamten Stack: Frontend-Architektur (Vue 2/3, Nuxt, React), Backend (Symfony, Laravel), Datenbanken (MySQL, MariaDB, PostgreSQL) und DevOps (Docker, Git).',
  coreTech: ['Vue.js / Nuxt', 'TypeScript', 'PHP / Symfony', 'Laravel', 'MySQL', 'Docker'],
  contact: {
    address: 'Krete 8, 23701 Eutin',
    phone: '(+49) 176-55025151',
    email: 'lasse@lasseharm.space',
    website: 'lasseharm.space',
    github: 'github.com/KuroTsubasa1',
    linkedin: 'linkedin.com/in/lasse-harm-a46543ba',
  },
};

const experience = [
  {
    company: 'DIU MarTech Solutions GmbH',
    period: 'Februar 2025 — Gegenwart',
    role: 'Web Developer',
    current: true,
    projects: [
      { name: 'Suzuki HIT (Händler Informations Tool)', desc: 'Enterprise-Plattform für Händlerinformationen der Suzuki Deutschland. Wartung und Weiterentwicklung komplexer Datenflüsse, Händlerverwaltung und interner Tooling-Systeme.', tech: ['Vue.js', 'TypeScript', 'REST API'] },
      { name: 'Suzuki SSBP-Nxt (Antrags Plattform)', desc: 'Kompletter Rewrite der Suzuki Antragsplattform. Frontend-Architektur, modernisierter Tech-Stack, verbesserte UX für Händler und interne Nutzer.', tech: ['Vue.js', 'TypeScript', 'Component Architecture'] },
    ],
  },
  {
    company: 'Groenewold - IT Solutions',
    period: 'Juni 2024 — Januar 2025',
    role: 'Web Developer',
    projects: [
      { name: 'LOTTO Thüringen', desc: 'Portierung von 3 internen Systemen für die LOTTO Thüringen GmbH auf einen modernen Stack: Gewinnausschüttung, Verwaltung und Schulung. Migration in 7 Monaten abgeschlossen.', tech: ['PHP 8', 'Laravel 11', 'jQuery', 'Bootstrap 5'] },
    ],
  },
  {
    company: 'Tritum GmbH',
    period: 'Dezember 2023 — Mai 2024',
    role: 'Web Developer',
    projects: [
      { name: 'Redesign AOK Familiencoach Pflege', desc: 'Online-Selbsthilfe-Programm für pflegende Angehörige mit interaktiven Übungen, Video-/Audioinhalten und barrierefreiem Design.', tech: ['PHP', 'TYPO3 v11.05'] },
    ],
  },
  {
    company: 'EOS Uptrade GmbH',
    period: 'Mai 2023 — Oktober 2023',
    role: 'Web Developer',
    projects: [
      { name: 'eos.ticketingsuite', desc: 'Modulare Plattform für Mobilitäts-Ticketing und Vertrieb — ÖPNV und moderne Mobilitätsdienste, skalierbar für B2C- und B2B-Anforderungen.', tech: ['PHP', 'Symfony 1', 'Symfony 5', 'MySQL'] },
    ],
  },
  {
    company: 'TimberTec GmbH',
    period: 'Januar 2023 — April 2023',
    role: 'Web Developer',
    projects: [
      { name: 'TimberTec Anlagensteuerung (TIAS)', desc: 'Lokale Benutzeroberfläche für industrielle Anlagensteuerung mit Echtzeit-Datenvisualisierung für Produktionsunternehmen.', tech: ['TypeScript', 'Vue 3', 'Quasar'] },
    ],
  },
  {
    company: 'LYNET GmbH',
    period: 'August 2018 — Dezember 2022',
    role: 'Web Developer',
    projects: [
      { name: 'Exxonmobil Digitales Ökosystem (EMDES)', desc: 'Buchungsportal für Ölwechsel und Werkstattdienstleistungen mit Anbindung an 500+ Partnerwerkstätten.', tech: ['PHP 7/8', 'Symfony 4', 'MariaDB', 'Bootstrap 5', 'Vue 2', 'Yandex API'] },
      { name: 'Exxonmobil Intranet', desc: 'Lern- und Informationsplattform für das Partnerwerkstatt-Netzwerk mit CMS-basierter Inhaltsverwaltung.', tech: ['PHP 8', 'Symfony 5', 'MariaDB', 'React', 'Webpack', 'SULU.io CMS'] },
      { name: 'LYNET Cookie-Banner', desc: 'Leichtgewichtige, framework-unabhängige DSGVO-konforme Cookie-Consent-Lösung.', tech: ['JavaScript', 'HTML', 'CSS'] },
    ],
  },
  {
    company: 'Gutzmann GmbH, Lübeck',
    period: 'August 2015 — August 2018',
    role: 'Auszubildender zum IT-Fachmann für Anwendungsentwicklung',
    projects: [
      { name: 'Mars PetProfi Digitales Ökosystem', desc: 'Wissens- und Verkaufsportal für verschiedene Zielgruppen der Mars Germany GmbH.', tech: ['PHP 5.6', 'MySQL', 'PerfAct Framework V1 (Inhouse)'] },
      { name: 'DRK-Server', desc: 'Ressourcenmanagementsystem für das Deutsche Rote Kreuz e.V.', tech: ['Java SE 8', 'Spring Boot', 'Java Lombok', 'PerfAct Framework V2 (Inhouse)'] },
    ],
  },
];

const education = [
  { school: 'EPS-HL, Lübeck', period: 'August 2015 — August 2018', degree: 'Ausbildung zum IT-Fachmann für Anwendungsentwicklung' },
  { school: 'Berufliche Schule des Kreises Ostholstein, Eutin', period: 'August 2013 — August 2015', degree: 'Abitur, Ausbildung zum Technischen Assistenten' },
  { school: 'Wilhelm Wisser Schule, Eutin', period: 'August 2007 — August 2013', degree: 'Realschulabschluss' },
];

const skills = [
  { title: 'Sprachen', items: 'Deutsch: Muttersprache · Englisch: Fließend (Fachkenntnisse in Informatik/Elektronik)' },
  { title: 'Programmiersprachen & Frameworks', items: 'PHP (Symfony, Laravel, FuelPHP) · JavaScript / TypeScript (Vue.js 2/3, Nuxt.js, React, ES6, jQuery) · HTML5 · CSS3 (Tailwind, Bootstrap 5, LESS/SASS) · C# (Unity, .NET Core) · Node.js (Express, Socket.io) · Python (Django, Flask, QT5, Pandas)' },
  { title: 'Datenbanken', items: 'MySQL · MariaDB · PostgreSQL' },
  { title: 'Tools & Workflow', items: 'Git (GitHub, GitLab, SVN) · Docker · Jetbrains IDEs · VS Code · npm / Composer / Pip · Webpack · Playwright · phpMyAdmin · Adminer · Datagrip · Windows / macOS / Linux · Self-hosted Mailserver · ChatGPT · GitHub Copilot · Claude · Claude Code' },
  { title: 'Kreativ-Tools', items: 'Blender · Plasticity · Autodesk Fusion360 · ZBrush · Adobe CC · Unity · Stable Diffusion' },
];

const hobbies = [
  'FPV-Drohnenpilot (zertifiziert) — Freestyle, Cinematic, Racing, Custom Builds',
  '3D-Druck & CAD-Modellierung (Blender, Plasticity, Fusion360)',
  'Fotografie (Wildlife, Landschaft, Hochzeiten)',
  'Freediving (Apnoetauchen) · Surfen · Mountainbike (XC, Enduro)',
  'DLRG-Rettungsschwimmer',
];

useSeoMeta({
  title: 'Lebenslauf — Lasse Harm | Full-Stack Web Developer',
  ogTitle: 'Lebenslauf — Lasse Harm | Full-Stack Web Developer',
  description: 'Lebenslauf von Lasse Harm — Full-Stack Web Developer mit 10+ Jahren Erfahrung in PHP, Vue.js und Enterprise-Webanwendungen.',
  ogDescription: 'Lebenslauf von Lasse Harm — Full-Stack Web Developer mit 10+ Jahren Erfahrung in PHP, Vue.js und Enterprise-Webanwendungen.',
  twitterCard: 'summary_large_image',
});
</script>
