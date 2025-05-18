<script setup lang="ts">
import Navigation from "~/components/navigation.vue";
import FooterComponent from "~/components/footerComponent.vue";
import ProjectGrid from "~/components/projectGrid.vue";
import { ref, onMounted } from 'vue';

useSeoMeta({
  title: 'Web Development Portfolio | Lasse Harm',
  ogTitle: 'Web Development Portfolio | Lasse Harm',
  description: 'Explore my web development portfolio featuring responsive websites, interactive applications, and innovative digital solutions built with modern technologies.',
  ogDescription: 'Explore my web development portfolio featuring responsive websites, interactive applications, and innovative digital solutions built with modern technologies.',
  ogImage: 'https://pocket.lasseharm.space/api/files/web_projects_image.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
  keywords: 'web development, portfolio, front-end development, UI/UX design, Nuxt.js, Vue.js, JavaScript, responsive design',
});

const skills = ref([
  { name: 'Front-End Development', icon: 'laptop-code', percentage: 95, color: '#4CAF50' },
  { name: 'UI/UX Design', icon: 'pencil-ruler', percentage: 85, color: '#2196F3' },
  { name: 'Back-End Development', icon: 'server', percentage: 80, color: '#9C27B0' },
  { name: 'Responsive Design', icon: 'mobile-alt', percentage: 90, color: '#FF9800' },
  { name: 'JavaScript/TypeScript', icon: 'js', percentage: 90, color: '#F7DF1E' },
  { name: 'Vue.js/Nuxt.js', icon: 'vuejs', percentage: 95, color: '#42B883' },
]);

const activeFilter = ref('all');
const filters = ref([
  { value: 'all', label: 'All Projects' },
  { value: 'frontend', label: 'Front-End' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'corporate', label: 'Corporate' },
]);

const setFilter = (filter) => {
  activeFilter.value = filter;
};

const services = ref([
  {
    title: 'Custom Web Development',
    description: 'Tailor-made websites designed to reflect your brand identity and meet your business needs with a focus on performance and user experience.',
    icon: 'code'
  },
  {
    title: 'E-Commerce Solutions',
    description: 'Robust online stores with secure payment gateways, inventory management, and customer-focused shopping experiences.',
    icon: 'shopping-cart'
  },
  {
    title: 'Web Application Development',
    description: 'Interactive and dynamic web applications built with modern JavaScript frameworks to provide rich user experiences.',
    icon: 'desktop'
  },
  {
    title: 'Responsive Design',
    description: 'Mobile-first websites that adapt flawlessly to any device, ensuring your content looks great on everything from smartphones to desktop monitors.',
    icon: 'mobile-alt'
  },
]);

const stats = ref([
  { number: '50+', text: 'Completed Projects' },
  { number: '25+', text: 'Happy Clients' },
  { number: '5+', text: 'Years Experience' },
  { number: '99%', text: 'Client Satisfaction' },
]);
</script>

<template>
  <navigation></navigation>

  <!-- Hero Section with Animated Background -->
  <section class="hero relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="hero-background absolute inset-0 z-0"></div>
    <div class="code-animation absolute inset-0 z-0 opacity-20"></div>
    <div class="container mx-auto px-6 py-16 z-10 text-center">
      <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 hero-title">
        <span class="text-white block">Web</span>
        <span class="text-primary block mt-2">Development</span>
      </h1>
      <p class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12">
        Creating innovative digital experiences with modern technologies and user-centered design.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="#projects" class="btn-primary">View Projects</a>
        <a href="/contact" class="btn-secondary">Get in Touch</a>
      </div>
    </div>
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
      <a href="#skills" class="text-white opacity-70 hover:opacity-100 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </div>
  </section>

  <!-- Skills Section -->
  <section id="skills" class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-2">Technical Skills</h2>
        <div class="w-24 h-1 bg-primary mx-auto mb-6"></div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Leveraging modern technologies to build robust, scalable, and user-friendly web solutions.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="skill in skills" :key="skill.name" class="skill-card bg-gray-50 rounded-lg p-6 shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center mr-4" :style="{ backgroundColor: skill.color + '20', color: skill.color }">
              <font-awesome-icon :icon="skill.icon" class="text-2xl" />
            </div>
            <h3 class="text-xl font-semibold">{{ skill.name }}</h3>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div class="h-2.5 rounded-full" :style="{ width: skill.percentage + '%', backgroundColor: skill.color }"></div>
          </div>
          <div class="text-right text-sm text-gray-500">{{ skill.percentage }}%</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-2">Web Development Services</h2>
        <div class="w-24 h-1 bg-primary mx-auto mb-6"></div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional web development services tailored to your specific needs and business goals.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div v-for="service in services" :key="service.title" class="service-card bg-white rounded-lg p-8 shadow-lg border-t-4 border-primary transition-all duration-300 hover:shadow-2xl">
          <div class="flex items-center mb-6">
            <div class="w-14 h-14 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4">
              <font-awesome-icon :icon="service.icon" class="text-3xl text-primary" />
            </div>
            <h3 class="text-2xl font-bold text-gray-800">{{ service.title }}</h3>
          </div>
          <p class="text-gray-600 leading-relaxed">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section class="py-16 bg-gradient-to-r from-primary to-secondary text-white">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div v-for="stat in stats" :key="stat.text" class="stat-item">
          <h3 class="text-4xl md:text-5xl font-bold mb-2">{{ stat.number }}</h3>
          <p class="text-lg opacity-80">{{ stat.text }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Projects Section with Filter -->
  <section id="projects" class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-2">Featured Projects</h2>
        <div class="w-24 h-1 bg-primary mx-auto mb-6"></div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore my latest web development projects showcasing creativity, functionality, and attention to detail.
        </p>
      </div>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap justify-center mb-12 gap-4">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          @click="setFilter(filter.value)" 
          class="px-6 py-2 rounded-full transition-colors duration-300"
          :class="activeFilter === filter.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Project Grid -->
      <project-grid category="web"></project-grid>
    </div>
  </section>

  <!-- Workflow Section -->
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-primary mb-2">My Development Process</h2>
        <div class="w-24 h-1 bg-primary mx-auto mb-6"></div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          A structured and collaborative approach ensures efficient delivery of high-quality web solutions.
        </p>
      </div>

      <div class="workflow-timeline relative max-w-4xl mx-auto">
        <!-- Vertical Line -->
        <div class="workflow-line absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary bg-opacity-20 z-0"></div>
        
        <!-- Steps -->
        <div class="workflow-steps relative z-10">
          <!-- Step 1 -->
          <div class="workflow-step grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div class="workflow-step-content md:text-right md:pr-10">
              <h3 class="text-2xl font-bold text-primary mb-4">1. Discovery & Planning</h3>
              <p class="text-gray-600">Understanding your goals, target audience, and requirements to create a detailed project roadmap.</p>
            </div>
            <div class="workflow-step-icon relative md:pl-10">
              <div class="workflow-step-circle absolute left-0 md:left-1/2 top-0 md:top-1/2 transform md:-translate-y-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">1</div>
              <div class="workflow-step-media bg-white p-4 rounded-lg shadow-lg ml-16 md:ml-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="workflow-step grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div class="workflow-step-icon relative md:pr-10 order-2 md:order-1">
              <div class="workflow-step-circle absolute right-0 md:left-1/2 top-0 md:top-1/2 transform md:-translate-y-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">2</div>
              <div class="workflow-step-media bg-white p-4 rounded-lg shadow-lg mr-16 md:mr-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
            </div>
            <div class="workflow-step-content md:pl-10 order-1 md:order-2">
              <h3 class="text-2xl font-bold text-primary mb-4">2. Design & Prototyping</h3>
              <p class="text-gray-600">Creating wireframes and interactive prototypes to visualize the user experience before development begins.</p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="workflow-step grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div class="workflow-step-content md:text-right md:pr-10">
              <h3 class="text-2xl font-bold text-primary mb-4">3. Development</h3>
              <p class="text-gray-600">Building the website or application with clean, efficient code following modern development practices.</p>
            </div>
            <div class="workflow-step-icon relative md:pl-10">
              <div class="workflow-step-circle absolute left-0 md:left-1/2 top-0 md:top-1/2 transform md:-translate-y-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">3</div>
              <div class="workflow-step-media bg-white p-4 rounded-lg shadow-lg ml-16 md:ml-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="workflow-step grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="workflow-step-icon relative md:pr-10 order-2 md:order-1">
              <div class="workflow-step-circle absolute right-0 md:left-1/2 top-0 md:top-1/2 transform md:-translate-y-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">4</div>
              <div class="workflow-step-media bg-white p-4 rounded-lg shadow-lg mr-16 md:mr-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div class="workflow-step-content md:pl-10 order-1 md:order-2">
              <h3 class="text-2xl font-bold text-primary mb-4">4. Testing & Launch</h3>
              <p class="text-gray-600">Thorough testing across devices and browsers, followed by deployment and post-launch support.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-gradient-to-r from-primary to-secondary text-white text-center">
    <div class="container mx-auto px-6">
      <h2 class="text-4xl font-bold mb-6">Ready to Start Your Web Project?</h2>
      <p class="text-xl mb-10 max-w-3xl mx-auto">
        Let's collaborate to create a customized web solution that helps you achieve your business goals.
      </p>
      <a href="/contact" class="btn-white">Get in Touch</a>
    </div>
  </section>

  <footer-component></footer-component>
</template>

<style scoped>
/* Hero Section */
.hero {
  background: linear-gradient(to bottom right, #121212, #2c3e50);
  color: #fff;
}

.hero-background {
  background: radial-gradient(circle at 50% 50%, rgba(76, 175, 80, 0.1) 0%, rgba(0, 0, 0, 0) 50%);
}

.code-animation {
  background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='code' patternUnits='userSpaceOnUse' width='100' height='100' patternTransform='scale(0.75) rotate(0)'%3E%3Ctext x='0' y='30' font-family='monospace' font-size='20' fill='%234CAF50'%3E%26lt;/%3E%3Ctext%3E%3Ctext x='50' y='60' font-family='monospace' font-size='20' fill='%234CAF50'%3E%7B%7D%3C/text%3E%3Ctext x='25' y='90' font-family='monospace' font-size='20' fill='%234CAF50'%3E();%3C/text%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23code)'/%3E%3C/svg%3E");
  animation: slide 20s linear infinite;
}

@keyframes slide {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 500px 500px;
  }
}

.hero-title {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Buttons */
.btn-primary {
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(76, 175, 80, 0.3);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  border: 2px solid white;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-secondary:hover {
  background-color: white;
  color: var(--primary-color);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
}

.btn-white {
  background-color: white;
  color: var(--primary-color);
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-white:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.3);
}

/* Workflow Timeline */
.workflow-timeline {
  padding: 2rem 0;
}

.workflow-line {
  top: 0;
  bottom: 0;
}

.workflow-step-circle {
  box-shadow: 0 0 0 5px white, 0 0 0 6px var(--primary-color);
  z-index: 10;
}

.workflow-step-media {
  transition: transform 0.3s ease;
}

.workflow-step:hover .workflow-step-media {
  transform: translateY(-5px);
}

/* Responsive */
@media (max-width: 768px) {
  .workflow-line {
    left: 6px;
    transform: none;
  }
  
  .workflow-step-circle {
    left: 0;
    transform: none;
  }
}

/* Skill Cards Animation */
.skill-card {
  overflow: hidden;
  position: relative;
}

.skill-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.skill-card:hover::before {
  transform: translateX(100%);
}

/* Stats Animation */
.stat-item {
  position: relative;
  overflow: hidden;
}

.stat-item h3 {
  animation: countUp 3s ease-out forwards;
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>