<template>
  <div class="container mx-auto px-4 max-w-4xl py-12 space-y-10">

    <!-- PLAYER CARD -->
    <GbWindow title="PLAYER CARD" class="animate-slide-up">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-black mb-2">
          <span class="gradient-text">{{ profile.name }}</span>
        </h1>
        <p class="pixel-label text-lcd-dim mb-6">{{ profile.title }}</p>
        <div class="flex flex-wrap justify-center gap-3">
          <a :href="pdfUrl" target="_blank" rel="noopener" class="btn-neon font-pixel inline-flex items-center gap-2 animate-glow-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M4 6h16M4 6a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2" /></svg>
            {{ t('about.cta.downloadCv') }}
          </a>
          <NuxtLink to="/contact" class="btn-neon-outline font-pixel inline-flex items-center gap-2">
            {{ t('nav.contact') }}
          </NuxtLink>
        </div>
      </div>
    </GbWindow>

    <!-- PROFILE -->
    <GbWindow title="PROFILE" class="animate-slide-up">
      <p class="text-gray-300 leading-relaxed">{{ profile.summary }}</p>
      <div class="gb-hr my-5"></div>
      <p class="pixel-label text-neon-green mb-3">CORE TECH</p>
      <div class="flex flex-wrap gap-2">
        <span v-for="tech in profile.coreTech" :key="tech" class="gb-chip">{{ tech }}</span>
      </div>
    </GbWindow>

    <!-- EXPERIENCE -->
    <GbWindow title="Berufserfahrung" class="animate-slide-up">
      <ul class="gb-menu-list">
        <li v-for="(job, i) in experience" :key="i">
          <div class="gb-menu-row !items-start !cursor-default">
            <span class="flex-1 min-w-0">
              <span class="flex flex-wrap items-baseline gap-2">
                <span class="text-white font-semibold">{{ job.company }}</span>
                <span v-if="job.current" class="gb-chip">ACTIVE</span>
              </span>
              <span class="block mt-1 text-neon-cyan/80 text-sm">{{ job.role }}</span>

              <span class="block mt-3 space-y-3">
                <span v-for="(p, j) in job.projects" :key="j" class="block">
                  <span class="block text-white font-semibold">▸ {{ p.name }}</span>
                  <span class="block mt-1 gb-row-desc">{{ p.desc }}</span>
                  <span class="flex flex-wrap gap-1.5 mt-2">
                    <span v-for="tech in p.tech" :key="tech" class="gb-chip">{{ tech }}</span>
                  </span>
                </span>
              </span>
            </span>
            <span class="hidden sm:block w-40 flex-shrink-0 text-right">
              <span class="gb-menu-value">{{ job.period }}</span>
            </span>
          </div>
          <span class="sm:hidden block mt-1 text-xs text-gray-500">{{ job.period }}</span>
        </li>
      </ul>
    </GbWindow>

    <!-- EDUCATION -->
    <GbWindow title="Bildung" class="animate-slide-up">
      <ul class="gb-menu-list">
        <li v-for="(edu, i) in education" :key="i">
          <div class="gb-menu-row !items-start !cursor-default">
            <span class="flex-1 min-w-0">
              <span class="block text-white font-semibold">{{ edu.school }}</span>
              <span class="block mt-1 gb-row-desc">{{ edu.degree }}</span>
            </span>
            <span class="hidden sm:block w-40 flex-shrink-0 text-right">
              <span class="gb-menu-value">{{ edu.period }}</span>
            </span>
          </div>
          <span class="sm:hidden block mt-1 text-xs text-gray-500">{{ edu.period }}</span>
        </li>
      </ul>
    </GbWindow>

    <!-- SKILLS -->
    <GbWindow title="Technische Fähigkeiten" class="animate-slide-up">
      <div class="space-y-5">
        <div v-for="(block, i) in skills" :key="i">
          <p class="pixel-label text-neon-green mb-2">{{ block.title }}</p>
          <p class="gb-row-desc">{{ block.items }}</p>
        </div>
      </div>
    </GbWindow>

    <!-- CONTACT + HOBBIES -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <GbWindow title="Kontakt" accent="velvet" class="animate-slide-up">
        <ul class="gb-menu-list">
          <li>
            <span class="gb-menu-row !cursor-default text-gray-300">{{ profile.contact.address }}</span>
          </li>
          <li>
            <a :href="`tel:${profile.contact.phone.replace(/[^+\d]/g, '')}`" class="gb-menu-row break-all">{{ profile.contact.phone }}</a>
          </li>
          <li>
            <a :href="`mailto:${profile.contact.email}`" class="gb-menu-row break-all">{{ profile.contact.email }}</a>
          </li>
          <li>
            <a :href="`https://${profile.contact.website}`" target="_blank" rel="noopener" class="gb-menu-row break-all">{{ profile.contact.website }}</a>
          </li>
          <li>
            <a :href="`https://${profile.contact.github}`" target="_blank" rel="noopener" class="gb-menu-row break-all">{{ profile.contact.github }}</a>
          </li>
          <li>
            <a :href="`https://${profile.contact.linkedin}`" target="_blank" rel="noopener" class="gb-menu-row break-all">{{ profile.contact.linkedin }}</a>
          </li>
        </ul>
      </GbWindow>

      <GbWindow title="Hobbys" class="animate-slide-up">
        <ul class="gb-menu-list">
          <li v-for="(h, i) in hobbies" :key="i">
            <span class="gb-menu-row !cursor-default">
              <span class="text-neon-green flex-shrink-0">▹</span>
              <span class="gb-row-desc">{{ h }}</span>
            </span>
          </li>
        </ul>
      </GbWindow>
    </div>

  </div>
</template>

<script lang="ts" setup>
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

<style scoped>
/* Flavour/body text inside menu rows (readable VT323, not pixel font) */
.gb-row-desc {
  font-family: 'VT323', ui-monospace, monospace;
  font-size: 1.05rem;
  line-height: 1.3;
  letter-spacing: 0.01em;
  text-transform: none;
  color: rgb(var(--c-ink-2));
}
</style>
