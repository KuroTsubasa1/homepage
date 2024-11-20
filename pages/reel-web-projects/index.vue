<script setup lang="ts">
import Navigation from "~/components/navigation.vue";
import FooterComponent from "~/components/footerComponent.vue";
import ProjectGrid from "~/components/projectGrid.vue";

useSeoMeta({
  title: 'Web Projects - Lasse Harm',
  ogTitle: 'Web Projects - Lasse Harm',
  description: 'Discover the web development projects by Lasse Harm, showcasing innovative and creative web solutions.',
  ogDescription: 'Discover the web development projects by Lasse Harm, showcasing innovative and creative web solutions.',
  ogImage: 'https://pocket.lasseharm.space/api/files/web_projects_image.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <navigation></navigation>

  <!-- Hero Section -->
  <section class="hero relative">
    <div class="hero-content">
      <h1 class="text-6xl md:text-8xl font-bold tracking-wide text-primary">
        Web Projects
      </h1>
      <p class="mt-6 text-xl text-secondary max-w-3xl">
        Welcome to my collection of creative and innovative web solutions / work samples. Scroll down to explore some of my best projects.
      </p>

    </div>
  </section>

  <!-- Projects Section -->
  <section class="projects relative">
    <div class="projects-wrapper">
      <div class="hex-grid">
        <project-grid category="web"></project-grid>
      </div>
    </div>
  </section>

  <footer-component></footer-component>
</template>

<style scoped>
/* Hero Section */
.hero {
  height: 100vh;
  background: linear-gradient(to bottom right, #1c1c2d, #2c3e50);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  overflow: hidden;
}

.hero-content h1 {
  background: linear-gradient(90deg,  #52C67A,#0D6E4F);
  -webkit-background-clip: text;
  color: transparent;
  animation: textReveal 2s ease forwards;
}

.hero-content p {
  color: rgba(255, 255, 255, 0.8);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.scroll-indicator span {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.scroll-indicator .line {
  width: 2px;
  height: 40px;
  background: rgba(255, 255, 255, 0.7);
  animation: bounce 1.5s infinite;
}

/* Projects Section */
.projects {
  background: #f6f7f9;
  padding: 6rem 0;
}

.projects-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.hex-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  position: relative;
}

.project-grid-item {
  clip-path: polygon(
      50% 0%,
      100% 25%,
      100% 75%,
      50% 100%,
      0% 75%,
      0% 25%
  );
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.project-grid-item:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.project-grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Animations */
@keyframes textReveal {
  0% {
    background-position: -200%;
  }
  100% {
    background-position: 0%;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}
</style>
