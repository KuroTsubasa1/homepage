<template>
  <navigation></navigation>

  <!-- Sticky Header -->
  <header class="sticky top-0 bg-white shadow-md z-10">
    <div class="container mx-auto flex justify-between items-center px-4 py-3">
      <h1 class="text-2xl font-bold text-primary">{{ projectData.title }}</h1>
      <button
          class="btn px-4 py-2 text-white bg-primary rounded hover:bg-primary-dark"
          @click="$router.go(-1)"
      >
        Back to Projects
      </button>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero-section bg-gray-50 py-16">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
      <!-- Project Information -->
      <div class="flex flex-col justify-center">
        <h2 class="text-4xl font-bold text-primary mb-6">Project Overview</h2>
        <p class="text-lg text-gray-600 leading-relaxed">{{ projectData.longDescription }}</p>
        <ul class="mt-6 space-y-3">
          <li><strong>Role:</strong> {{ projectData.role }}</li>
          <li><strong>Category:</strong> {{ projectData.category }}</li>
          <li><strong>Duration:</strong> {{ projectData.fromDate }} - {{ projectData.toDate }}</li>
        </ul>
      </div>

      <!-- Project Media -->
      <div>
        <video
            v-if="projectData.videos && projectData.videos.length > 0"
            class="rounded-lg shadow-lg w-full"
            controls
        >
          <source :src="projectData.videos[0]" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <img
            v-else-if="projectData.images && projectData.images.length > 0"
            :src="projectData.images[0]"
            class="rounded-lg shadow-lg w-full"
            :alt="projectData.title"
        />
      </div>
    </div>
  </section>

  <!-- Image Gallery Section -->
  <section v-if="projectData.images && projectData.images.length > 1" class="gallery-section py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-primary mb-8 text-center">Project Gallery</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <img
            v-for="(image, index) in projectData.images.slice(1)"
            :key="index"
            :src="image"
            :alt="'Gallery Image ' + (index + 1)"
            class="rounded-lg shadow-lg transition-transform hover:scale-105"
            loading="lazy"
        />
      </div>
    </div>
  </section>

  <!-- Timeline Section -->
  <section v-if="timelineData.length" class="timeline-section py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-primary mb-6 text-center">Project Timeline</h2>
      <div class="timeline-container">
        <div class="timeline-item" v-for="(milestone, index) in timelineData" :key="index">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <h3 class="text-lg font-bold text-primary">{{ milestone.date }}</h3>
            <p class="text-gray-600">{{ milestone.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Technologies Section -->
  <section v-if="technologies.length" class="tech-section py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-primary mb-6 text-center">Technologies Used</h2>
      <div class="flex flex-wrap justify-center gap-6">
        <div
            class="tech-badge flex items-center space-x-2"
            v-for="(tech, index) in technologies"
            :key="index"
        >
          <font-awesome-icon :icon="tech.icon" class="h-6" />
          <span class="text-lg font-medium">{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Challenges & Solutions Section -->
  <section v-if="challenges.length" class="challenges-section py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-primary mb-6 text-center">Challenges & Solutions</h2>
      <div class="space-y-8">
        <div v-for="(challenge, index) in challenges" :key="index">
          <h3 class="text-xl font-semibold text-primary">{{ challenge.title }}</h3>
          <p class="text-gray-600 leading-relaxed">{{ challenge.solution }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Call-to-Action Section -->
  <section v-if="projectData.link" class="cta-section py-16 bg-gradient-to-r from-primary to-secondary text-white text-center">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-6">Want to explore this project further?</h2>
      <a
          :href="projectData.link"
          target="_blank"
          class="btn px-6 py-3 font-bold bg-white text-primary rounded hover:bg-gray-100 transition-transform"
      >
        Visit Project
      </a>
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

const route = useRoute();

onMounted(async () => {
  const id = route.params.project;
  const response = await fetch(`https://pocket.lasseharm.space/api/collections/portfolio_projects/records/${id}`);
  const data = await response.json();

  projectData.value = {
    title: data.name,
    role: data.role,
    longDescription: data.long_desc,
    category: data.category,
    fromDate: data.from_date,
    toDate: data.to_date,
    images: data.images.map(image => `https://pocket.lasseharm.space/api/files/${data.collectionId}/${image}`),
    videos: data.videos.map(video => `https://pocket.lasseharm.space/api/files/${data.collectionId}/${video}`),
    link: data.link
  };

  timelineData.value = data.timeline || [];
  technologies.value = data.technologies || [];
  challenges.value = data.challenges || [];
});
</script>

<style scoped>
/* General Styling */
.container {
  max-width: 1200px;
}

.timeline-container {
  position: relative;
  margin-left: 1rem;
  border-left: 2px solid var(--primary);
  padding-left: 2rem;
}

.timeline-item {
  margin-bottom: 2rem;
  position: relative;
}

.timeline-dot {
  position: absolute;
  left: -9px;
  top: 0;
  width: 18px;
  height: 18px;
  background-color: var(--primary);
  border-radius: 50%;
}

.timeline-content h3 {
  margin-bottom: 0.5rem;
}

.timeline-content p {
  margin: 0;
  color: var(--text-secondary);
}
</style>
