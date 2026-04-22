<template>
  <navigation></navigation>

  <!-- Hero -->
  <section class="pt-28 py-16 bg-dark-100 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="absolute top-0 left-0 w-96 h-96 bg-neon-green/5 rounded-full blur-[100px]"></div>
    <div class="container mx-auto px-4 relative z-10">
      <NuxtLink to="/reel-web-projects" class="btn-neon-outline text-sm !py-2 !px-4 inline-flex items-center gap-2 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        Back
      </NuxtLink>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex flex-col justify-center">
        <div class="flex items-center gap-3 mb-4">
          <h2 class="text-3xl md:text-4xl font-bold text-white">{{ projectData.title }}</h2>
          <span v-if="projectData.company" class="text-xs px-2.5 py-1 rounded-full bg-neon-green/10 text-neon-green border border-neon-green/20">{{ projectData.company }}</span>
        </div>
        <p class="text-gray-300 leading-relaxed mb-6">{{ projectData.longDescription }}</p>
        <ul class="space-y-2 text-gray-300">
          <li v-if="projectData.role"><span class="text-neon-green font-medium">Role:</span> {{ projectData.role }}</li>
          <li v-if="projectData.category"><span class="text-neon-green font-medium">Type:</span> {{ projectData.category }}</li>
          <li v-if="projectData.fromDate"><span class="text-neon-green font-medium">Period:</span> {{ projectData.fromDate }}{{ projectData.toDate ? ' — ' + projectData.toDate : '' }}</li>
        </ul>
      </div>
      <div>
        <video v-if="projectData.videos && projectData.videos.length > 0" class="rounded-2xl border border-white/10 w-full" controls>
          <source :src="projectData.videos[0]" type="video/mp4">
        </video>
        <img v-else-if="projectData.images && projectData.images.length > 0" :src="projectData.images[0]" class="rounded-2xl border border-white/10 w-full" :alt="projectData.title" />
        <div v-else class="rounded-2xl border border-white/10 w-full h-64 bg-gradient-to-br from-dark-200 to-dark-400 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        </div>
      </div>
      </div>
    </div>
  </section>

  <!-- Technologies -->
  <section v-if="technologies.length" class="py-16 bg-dark">
    <div class="container mx-auto px-4">
      <h2 class="section-heading">Technologies</h2>
      <div class="section-divider"></div>
      <div class="flex flex-wrap justify-center gap-3">
        <span v-for="(tech, index) in technologies" :key="index" class="glass-card neon-border px-5 py-2.5 text-gray-300 font-medium text-sm">
          {{ typeof tech === 'string' ? tech : tech.name }}
        </span>
      </div>
    </div>
  </section>

  <!-- Image Gallery -->
  <section v-if="projectData.images && projectData.images.length > 1" class="py-16 bg-dark-100">
    <div class="container mx-auto px-4">
      <h2 class="section-heading">Gallery</h2>
      <div class="section-divider"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(image, index) in projectData.images.slice(1)" :key="index" class="rounded-2xl overflow-hidden border border-white/10 hover:border-neon-green/30 transition-all duration-300">
          <img :src="image" :alt="'Gallery Image ' + (index + 1)" class="w-full transition-transform hover:scale-105 duration-500" loading="lazy" />
        </div>
      </div>
    </div>
  </section>

  <!-- Challenges -->
  <section v-if="challenges.length" class="py-16 bg-dark">
    <div class="container mx-auto px-4">
      <h2 class="section-heading">Highlights</h2>
      <div class="section-divider"></div>
      <div class="max-w-3xl mx-auto space-y-6">
        <div v-for="(challenge, index) in challenges" :key="index" class="glass-card neon-border p-6">
          <h3 class="text-lg font-semibold text-neon-green mb-2">{{ typeof challenge === 'string' ? challenge : challenge.title }}</h3>
          <p v-if="typeof challenge !== 'string'" class="text-gray-300 leading-relaxed">{{ challenge.solution }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section v-if="projectData.link" class="py-16 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-dark to-neon-purple/10"></div>
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="container mx-auto px-4 text-center relative z-10">
      <h2 class="text-3xl font-bold mb-6"><span class="gradient-text">Want to explore this project?</span></h2>
      <a :href="projectData.link" target="_blank" class="btn-neon inline-block">Visit Project</a>
    </div>
  </section>

  <footer-component></footer-component>
</template>

<script setup>
import Navigation from '~/components/navigation.vue';
import FooterComponent from '~/components/footerComponent.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const projectData = ref({});
const timelineData = ref([]);
const technologies = ref([]);
const challenges = ref([]);

// Static employment project data — used when PocketBase doesn't have the project
const staticProjects = {
  'suzuki-hit': {
    title: 'Suzuki HIT',
    company: 'DIU MarTech Solutions GmbH',
    role: 'Web Developer',
    category: 'Enterprise Platform',
    fromDate: 'Feb 2025',
    toDate: 'Present',
    longDescription: 'The Suzuki Händler Informations Tool (HIT) is an enterprise dealer information platform used by Suzuki dealerships across Germany. I maintain and develop the platform as part of my current role, working on complex data flows, dealer management interfaces, and internal tooling. The application handles real-time dealer communications, inventory management, and reporting dashboards that serve as the central hub for Suzuki\'s dealer network.',
    technologies: ['Vue.js', 'TypeScript', 'REST API', 'Enterprise Architecture'],
    challenges: ['Managing complex state across a large dealer network', 'Ensuring real-time data consistency across multiple concurrent users', 'Balancing feature development with maintenance of legacy components'],
  },
  'suzuki-ssbp-nxt': {
    title: 'Suzuki SSBP-Nxt',
    company: 'DIU MarTech Solutions GmbH',
    role: 'Web Developer',
    category: 'Complete Rewrite',
    fromDate: 'Feb 2025',
    toDate: 'Present',
    longDescription: 'A ground-up rewrite of the Suzuki SSBP application platform (Antrags Plattform). I led the front-end architecture for the new version, modernizing the entire tech stack while maintaining feature parity with the legacy system. The platform handles dealer applications, approvals, and workflow management. The rewrite focused on improved UX, faster load times, and a maintainable component architecture that the team can build on for years.',
    technologies: ['Vue.js', 'TypeScript', 'Modern Front-End Architecture', 'Component Design'],
    challenges: ['Architecting a complete rewrite while maintaining business continuity', 'Modernizing the UX without disrupting established dealer workflows', 'Building a scalable component system for long-term maintainability'],
  },
  'lotto-thueringen': {
    title: 'LOTTO Thüringen',
    company: 'Groenewold - IT Solutions',
    role: 'Web Developer',
    category: 'Internal Tools',
    fromDate: 'Jun 2024',
    toDate: 'Jan 2025',
    longDescription: 'Ported three internal applications for LOTTO Thüringen GmbH to a modern stack. The projects included a payout tracking system for managing lottery winnings, an internal administration platform, and a staff training system. Each application was migrated from legacy code to Laravel 11 with a refreshed Bootstrap 5 frontend, improving performance, security, and developer experience.',
    technologies: ['PHP 8', 'Laravel 11', 'jQuery', 'Bootstrap 5', 'MySQL'],
    challenges: ['Migrating three separate legacy applications while preserving business logic', 'Ensuring data integrity during the transition period', 'Standardizing the codebase across all three applications'],
  },
  'aok-familiencoach': {
    title: 'AOK Familiencoach Pflege',
    company: 'Tritum GmbH',
    role: 'Web Developer',
    category: 'Healthcare Platform',
    fromDate: 'Dec 2023',
    toDate: 'May 2024',
    longDescription: 'Redesigned an online self-help program for AOK that supports caregivers of people in need of care. The platform helps users strengthen their mental health and prevent burnout through interactive exercises, practical tips, and video/audio content. The project focused on accessibility, clean content presentation, and a warm, supportive user experience — quite different from the typical corporate web app.',
    technologies: ['PHP', 'TYPO3 v11', 'HTML/CSS', 'Accessibility'],
    challenges: ['Creating a warm, approachable design for sensitive health content', 'Ensuring full accessibility compliance for all interactive elements', 'Working within the TYPO3 CMS framework while delivering a modern UX'],
  },
  'eos-ticketingsuite': {
    title: 'eos.ticketingsuite',
    company: 'EOS Uptrade GmbH',
    role: 'Web Developer',
    category: 'Mobility Platform',
    fromDate: 'May 2023',
    toDate: 'Oct 2023',
    longDescription: 'The eos.ticketingsuite is an innovative platform for mobility ticketing and distribution, supporting both public transport and modern mobility services. The platform scales modularly for B2C and B2B requirements, handling ticket purchases, validation, and distribution across multiple channels. I worked on both the legacy Symfony 1 codebase and the newer Symfony 5 modules.',
    technologies: ['PHP', 'Symfony 1', 'Symfony 5', 'MySQL'],
    challenges: ['Navigating a dual-framework codebase (Symfony 1 + 5)', 'Working with complex ticketing business logic and validation rules', 'Ensuring reliability for a system handling real-time transit operations'],
  },
  'timbertec-tias': {
    title: 'TIAS',
    company: 'TimberTec GmbH',
    role: 'Web Developer',
    category: 'Industrial UI',
    fromDate: 'Jan 2023',
    toDate: 'Apr 2023',
    longDescription: 'The TimberTec Anlagensteuerung (TIAS) is the local user interface for an industrial plant control system used by timber production companies. I built the front-end in Vue 3 with the Quasar framework, creating a responsive and intuitive interface for operators to monitor and control production equipment in real-time. The UI needed to be fast, reliable, and clear enough for use on factory floors.',
    technologies: ['TypeScript', 'Vue 3', 'Quasar Framework', 'Real-Time Data'],
    challenges: ['Designing for industrial environments with varying screen sizes', 'Handling real-time data streams from production equipment', 'Creating an interface intuitive enough for non-technical operators'],
  },
  'exxonmobil-emdes': {
    title: 'Exxonmobil EMDES',
    company: 'LYNET GmbH',
    role: 'Web Developer',
    category: 'Customer Portal',
    fromDate: 'Aug 2018',
    toDate: 'Dec 2022',
    longDescription: 'The Exxonmobil Digital Ecosystem (EMDES) is a portal where end customers can easily book oil changes and other workshop services. The platform connects customers with partner workshops, handles appointment scheduling, and manages the full service booking flow. I worked on both the PHP/Symfony backend and the Vue 2 frontend over several years, seeing the project grow from initial launch through multiple iterations.',
    technologies: ['PHP 7/8', 'Symfony 4', 'MariaDB', 'Bootstrap 5', 'Vue 2', 'Yandex API'],
    challenges: ['Scaling the platform as the partner workshop network grew', 'Integrating with third-party APIs for location services and scheduling', 'Maintaining and evolving the codebase over a 4+ year lifecycle'],
  },
  'exxonmobil-intranet': {
    title: 'Exxonmobil Intranet',
    company: 'LYNET GmbH',
    role: 'Web Developer',
    category: 'Internal Platform',
    fromDate: 'Aug 2018',
    toDate: 'Dec 2022',
    longDescription: 'A learning and information platform for Exxonmobil\'s partner workshops. The intranet provided training materials, documentation, and internal communications for the workshop network. Built with Symfony 5 and React on the frontend, using the SULU.io CMS for content management. The platform needed to be easy for non-technical staff to update while maintaining a polished user experience.',
    technologies: ['PHP 8', 'Symfony 5', 'MariaDB', 'React', 'Webpack', 'SULU.io CMS'],
    challenges: ['Balancing CMS flexibility with a consistent, branded design', 'Building a training system that tracks progress across workshop teams', 'Ensuring the platform works reliably for non-technical users'],
  },
  'lynet-cookie-banner': {
    title: 'LYNET Cookie-Banner',
    company: 'LYNET GmbH',
    role: 'Web Developer',
    category: 'Utility',
    fromDate: 'Aug 2018',
    toDate: 'Dec 2022',
    longDescription: 'A lightweight, elegant GDPR-compliant cookie consent solution. Designed to be easy to integrate into any website, the banner handles cookie categories, user preferences, and consent logging. Built with vanilla JavaScript, HTML, and CSS — no framework dependencies, keeping the footprint minimal.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    challenges: ['Meeting GDPR requirements while keeping the UX simple', 'Ensuring zero framework dependencies for universal compatibility', 'Making it easy for developers to integrate across diverse projects'],
  },
  'mars-petprofi': {
    title: 'Mars PetProfi',
    company: 'Gutzmann GmbH',
    role: 'Apprentice',
    category: 'Digital Ecosystem',
    fromDate: 'Aug 2015',
    toDate: 'Aug 2018',
    longDescription: 'A digital portal for knowledge sharing and product sales targeting various audiences of Mars Germany GmbH. Built during my apprenticeship, this was one of my first major professional projects. The platform served pet professionals with educational content and e-commerce functionality, built on PHP 5.6 with MySQL and the company\'s in-house PerfAct Framework.',
    technologies: ['PHP 5.6', 'MySQL', 'PerfAct Framework V1'],
    challenges: ['Learning professional development practices during my apprenticeship', 'Working with an in-house framework with limited documentation', 'Building e-commerce features for a major brand as a junior developer'],
  },
  'drk-server': {
    title: 'DRK-Server',
    company: 'Gutzmann GmbH',
    role: 'Apprentice',
    category: 'Resource Management',
    fromDate: 'Aug 2015',
    toDate: 'Aug 2018',
    longDescription: 'A resource management system developed specifically for the German Red Cross (Deutsches Rotes Kreuz e.V.). The system helped organize and track resources across DRK operations. Built with Java SE 8 and Spring Boot during my apprenticeship — my first experience with backend Java development and enterprise frameworks.',
    technologies: ['Java SE 8', 'Spring Boot', 'Java Lombok', 'PerfAct Framework V2'],
    challenges: ['Transitioning from PHP to Java for the first time', 'Understanding enterprise patterns like dependency injection and ORM', 'Building a reliable system for an organization that depends on it for operations'],
  },
};

const route = useRoute();

onMounted(async () => {
  const id = route.params.project || '';

  // Try PocketBase first
  try {
    const response = await fetch(`https://pocket.lasseharm.space/api/collections/portfolio_projects/records/${id}`);
    if (response.ok) {
      const data = await response.json();
      projectData.value = {
        title: data.name,
        role: data.role,
        longDescription: data.long_desc,
        category: data.category,
        fromDate: data.from_date,
        toDate: data.to_date,
        images: data.images?.map(image => `https://pocket.lasseharm.space/api/files/${data.collectionId}/${image}`) || [],
        videos: data.videos?.map(video => `https://pocket.lasseharm.space/api/files/${data.collectionId}/${video}`) || [],
        link: data.link
      };
      timelineData.value = data.timeline || [];
      technologies.value = data.technologies || [];
      challenges.value = data.challenges || [];
      return;
    }
  } catch (e) {
    // PocketBase failed, try static
  }

  // Fallback to static data
  const staticProject = staticProjects[id];
  if (staticProject) {
    projectData.value = {
      title: staticProject.title,
      company: staticProject.company,
      role: staticProject.role,
      longDescription: staticProject.longDescription,
      category: staticProject.category,
      fromDate: staticProject.fromDate,
      toDate: staticProject.toDate,
      images: [],
      videos: [],
      link: null
    };
    technologies.value = staticProject.technologies || [];
    challenges.value = staticProject.challenges || [];
  }
});
</script>
