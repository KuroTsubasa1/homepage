<template>
  <div>
    <!-- ① Cinematic resume header -->
    <section class="relative min-h-[72vh] flex items-end overflow-hidden bg-forest print:min-h-0 print:pt-8 print:pb-6">
      <!-- decorative ambience -->
      <div class="absolute inset-0 bg-topo opacity-30 pointer-events-none print:hidden"></div>
      <div class="absolute inset-0 bg-grid opacity-40 pointer-events-none print:hidden"></div>
      <div class="orb top-0 left-1/4 w-[28rem] h-[28rem] bg-amber/10 animate-drift print:hidden"></div>
      <div class="orb bottom-0 right-1/4 w-96 h-96 bg-moss/10 animate-drift-slow print:hidden"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent pointer-events-none print:hidden"></div>

      <div class="container mx-auto px-6 pt-36 pb-16 relative z-10 print:pt-0 print:pb-4">
        <div class="max-w-4xl" v-reveal>
          <p class="eyebrow mb-5 flex items-center gap-3">
            <span class="inline-block w-10 h-px bg-amber"></span>
            Lebenslauf
          </p>
          <h1 class="display-xl text-6xl md:text-8xl lg:text-9xl text-bone mb-3">
            <span class="gradient-text">{{ profile.name }}</span>
          </h1>
          <h2 class="font-condensed text-xl md:text-3xl uppercase tracking-widest2 text-bone-muted mb-9">
            {{ profile.title }}
          </h2>

          <div class="flex flex-wrap gap-4 print:hidden">
            <a :href="pdfUrl" target="_blank" rel="noopener" class="btn-wild">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M4 6h16M4 6a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2" /></svg>
              {{ t('about.cta.downloadCv') }}
            </a>
            <NuxtLink to="/contact" class="btn-wild-outline">
              {{ t('nav.contact') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ② Profile summary + core tech -->
    <section class="relative py-20 bg-forest-100 overflow-hidden print:py-6 print:bg-transparent">
      <div class="absolute inset-0 bg-topo opacity-20 pointer-events-none print:hidden"></div>
      <div class="orb top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-clay/10 print:hidden"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl panel wild-border p-8 md:p-10" v-reveal:scale v-tilt="3">
          <p class="eyebrow mb-4 flex items-center gap-3">
            <span class="inline-block w-8 h-px bg-amber/60"></span>
            Profil
          </p>
          <p class="text-lg text-bone-muted leading-relaxed">{{ profile.summary }}</p>
          <div class="flex flex-wrap gap-2 mt-7" v-reveal.stagger>
            <span
              v-for="tech in profile.coreTech"
              :key="tech"
              class="px-4 py-1.5 text-xs font-condensed uppercase tracking-widest2 rounded-full bg-amber/10 text-amber border border-amber/25 hover:bg-amber/20 hover:border-amber/50 transition-all duration-300"
            >{{ tech }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ③ Main grid: experience timeline + sidebar -->
    <section class="relative py-24 overflow-hidden print:py-6">
      <div class="absolute inset-0 bg-topo opacity-25 pointer-events-none print:hidden"></div>
      <div class="orb bottom-0 left-1/4 w-96 h-96 bg-moss/10 print:hidden"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <!-- Main column -->
          <div class="lg:col-span-2 space-y-20 print:space-y-10">

            <!-- Experience -->
            <div>
              <div class="mb-12 print:mb-6" v-reveal:left>
                <p class="eyebrow mb-3 flex items-center gap-3">
                  <span class="inline-block w-8 h-px bg-amber/60"></span>
                  Werdegang
                </p>
                <h2 class="font-display text-4xl md:text-5xl uppercase text-bone tracking-tight">Berufserfahrung</h2>
              </div>

              <div class="relative border-l border-forest-400 pl-8 md:pl-10 space-y-12 print:space-y-6">
                <!-- glowing rail -->
                <div class="absolute -left-px top-0 bottom-0 w-px bg-gradient-to-b from-amber/60 via-moss/40 to-transparent pointer-events-none print:hidden"></div>

                <div
                  v-for="(job, i) in experience"
                  :key="i"
                  class="relative"
                  v-reveal:left
                >
                  <!-- timeline marker -->
                  <span
                    class="absolute -left-[42px] md:-left-[50px] top-1.5 w-4 h-4 rounded-full border-2 z-10"
                    :class="job.current
                      ? 'bg-amber border-amber shadow-[0_0_14px_rgba(217,138,61,0.7)] animate-pulse'
                      : 'bg-forest border-moss/60'"
                  ></span>

                  <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 class="font-condensed text-xl md:text-2xl uppercase tracking-wide text-bone">{{ job.company }}</h3>
                    <span class="font-condensed text-xs uppercase tracking-widest2 text-bone-dim whitespace-nowrap">{{ job.period }}</span>
                  </div>
                  <p class="font-condensed uppercase tracking-widest2 text-sm text-amber/90 mt-1 mb-5">{{ job.role }}</p>

                  <div class="space-y-4" v-reveal.stagger>
                    <div
                      v-for="(p, j) in job.projects"
                      :key="j"
                      class="panel border border-bone/10 p-5 rounded-2xl transition-all duration-300 hover:border-amber/40 hover:-translate-y-0.5"
                    >
                      <h4 class="font-condensed text-lg uppercase tracking-wide text-bone mb-1">{{ p.name }}</h4>
                      <p class="text-bone-muted text-sm leading-relaxed mb-3">{{ p.desc }}</p>
                      <div class="flex flex-wrap gap-1.5">
                        <span
                          v-for="tech in p.tech"
                          :key="tech"
                          class="px-2.5 py-0.5 text-[11px] font-condensed uppercase tracking-wide rounded-full bg-forest-300 text-bone-muted border border-bone/5"
                        >{{ tech }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Education -->
            <div>
              <div class="mb-12 print:mb-6" v-reveal:left>
                <p class="eyebrow mb-3 flex items-center gap-3">
                  <span class="inline-block w-8 h-px bg-amber/60"></span>
                  Ausbildung
                </p>
                <h2 class="font-display text-4xl md:text-5xl uppercase text-bone tracking-tight">Bildung</h2>
              </div>

              <div class="relative border-l border-forest-400 pl-8 md:pl-10 space-y-6" v-reveal.stagger>
                <div class="absolute -left-px top-0 bottom-0 w-px bg-gradient-to-b from-moss/50 to-transparent pointer-events-none print:hidden"></div>

                <div
                  v-for="(edu, i) in education"
                  :key="i"
                  class="relative panel wild-border p-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span class="absolute -left-[42px] md:-left-[50px] top-6 w-4 h-4 rounded-full border-2 bg-forest border-moss/60 z-10"></span>
                  <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 class="font-condensed text-lg uppercase tracking-wide text-bone">{{ edu.school }}</h3>
                    <span class="font-condensed text-xs uppercase tracking-widest2 text-bone-dim whitespace-nowrap">{{ edu.period }}</span>
                  </div>
                  <p class="text-bone-muted text-sm mt-1.5">{{ edu.degree }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="space-y-8 print:space-y-6">
            <!-- Contact -->
            <div class="panel wild-border p-6" v-reveal:right>
              <h3 class="font-condensed text-sm uppercase tracking-mega text-amber mb-5">Kontakt</h3>
              <ul class="space-y-2.5 text-sm text-bone-muted">
                <li class="flex gap-2.5"><span class="text-moss mt-0.5">▹</span><span>{{ profile.contact.address }}</span></li>
                <li class="flex gap-2.5"><span class="text-moss mt-0.5">▹</span><a :href="`tel:${profile.contact.phone.replace(/[^+\d]/g, '')}`" class="link-glow">{{ profile.contact.phone }}</a></li>
                <li class="flex gap-2.5"><span class="text-moss mt-0.5">▹</span><a :href="`mailto:${profile.contact.email}`" class="link-glow break-all">{{ profile.contact.email }}</a></li>
                <li class="flex gap-2.5"><span class="text-moss mt-0.5">▹</span><a :href="`https://${profile.contact.website}`" target="_blank" rel="noopener" class="link-glow">{{ profile.contact.website }}</a></li>
                <li class="flex gap-2.5"><span class="text-moss mt-0.5">▹</span><a :href="`https://${profile.contact.github}`" target="_blank" rel="noopener" class="link-glow break-all">{{ profile.contact.github }}</a></li>
                <li class="flex gap-2.5"><span class="text-moss mt-0.5">▹</span><a :href="`https://${profile.contact.linkedin}`" target="_blank" rel="noopener" class="link-glow break-all">{{ profile.contact.linkedin }}</a></li>
              </ul>
            </div>

            <!-- Skills -->
            <div class="panel wild-border p-6" v-reveal:right>
              <h3 class="font-condensed text-sm uppercase tracking-mega text-amber mb-5">Technische Fähigkeiten</h3>
              <div class="space-y-5">
                <div v-for="(block, i) in skills" :key="i">
                  <h4 class="font-condensed text-sm uppercase tracking-widest2 text-moss-light mb-1.5 flex items-center gap-2">
                    <span class="inline-block w-1.5 h-1.5 rounded-full bg-amber"></span>
                    {{ block.title }}
                  </h4>
                  <p class="text-bone-muted text-sm leading-relaxed pl-3.5">{{ block.items }}</p>
                </div>
              </div>
            </div>

            <!-- Hobbies -->
            <div class="panel wild-border p-6" v-reveal:right>
              <h3 class="font-condensed text-sm uppercase tracking-mega text-amber mb-5">Hobbys</h3>
              <ul class="space-y-2.5">
                <li v-for="(h, i) in hobbies" :key="i" class="text-bone-muted text-sm flex gap-2.5">
                  <span class="text-moss mt-0.5">▹</span>
                  <span>{{ h }}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
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
/* Print-friendly: collapse the dark cinematic chrome into a clean printable sheet */
@media print {
  :deep(body) {
    background: #fff !important;
  }
}
</style>
