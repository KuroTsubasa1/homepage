<script lang="ts" setup>
import FooterComponent from "~/components/footerComponent.vue";

useSeoMeta({
  title: 'About - Lasse Harm',
  ogTitle: 'About - Lasse Harm',
  description: 'Discover the story of Lasse Harm, a web developer, photographer, and certified FPV drone pilot.',
  ogDescription: 'Discover the story of Lasse Harm, a web developer, photographer, and certified FPV drone pilot.',
  ogImage: 'https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/q8dewf7gwhbqpk2/20240319_182201_N85s671DEL.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
});

const journeyData = [
  { date: "2015", description: "Started my journey into web development." },
  { date: "2018", description: "Discovered my passion for photography and began exploring wildlife and macro shots." },
  { date: "2020", description: "Became a certified FPV drone pilot and started combining aerial shots with creative storytelling." },
  { date: "2023", description: "Joined exciting projects pushing the boundaries of web design and drone photography." },
];
</script>

<template>
  <navigation></navigation>

  <!-- Hero Section -->
  <section class="hero relativ bg-primary text-white text-center py-20">
    <div class="container mx-auto px-6">
      <h1 class="text-6xl font-bold mb-4 hero-content">Lasse Harm</h1>
      <h2 class="text-2xl font-semibold">
        Web Developer | Photographer | Certified FPV Drone Pilot
      </h2>
      <p class="text-lg mt-4 mx-auto max-w-2xl">
        Combining creativity and technology to build stunning web experiences and capture life’s extraordinary moments.
      </p>
    </div>
  </section>

  <!-- About Me Section -->
<section class="about-me bg-gray-50 py-16">
  <div class="container mx-auto px-6">
    <h2 class="text-4xl font-bold text-center text-primary mb-10">About Me</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div class="text-center md:text-left">
        <p class="text-lg text-gray-700 leading-relaxed">
          Hi, I’m Lasse Harm, a passionate web developer with a knack for problem-solving and creating intuitive web applications. My journey began in 2013, and since then, I have been dedicated to mastering the art of crafting seamless user experiences.
        </p>
        <p class="text-lg text-gray-700 leading-relaxed mt-4">
          Photography has always been close to my heart. I specialize in wildlife and macro photography, capturing the beauty of nature in intricate detail. As a certified FPV drone pilot, I love exploring the skies to capture unique aerial perspectives that tell captivating stories.
        </p>
        <p class="text-lg text-gray-700 leading-relaxed mt-4">
          My goal is to merge creativity with technology, whether it's through designing cutting-edge websites, snapping breathtaking photos, or flying drones to unlock new possibilities. Let's push the boundaries together!
        </p>
        <p class="text-lg text-gray-700 leading-relaxed mt-4">
          In my free time, I enjoy freediving in the Baltic Sea, exploring the underwater world and its hidden treasures. Surfing in the North Sea is another passion of mine, where I find thrill and excitement riding the waves.
        </p>
        <p class="text-lg text-gray-700 leading-relaxed mt-4">
          Mountain biking through the woodlands is a great way for me to stay active and connect with nature. The adrenaline rush and the scenic trails make it an exhilarating experience.
        </p>
      </div>
      <div class="flex justify-center">
        <img
            class="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/q8dewf7gwhbqpk2/20240319_182201_N85s671DEL.jpg"
            alt="About Me Image"
        />
      </div>
    </div>
  </div>
</section>
  <!-- Journey Section -->
  <section class="journey py-20 bg-gradient-to-r from-gray-100 to-gray-200">
    <div class="container mx-auto px-6">
      <h2 class="text-4xl font-bold text-center text-primary mb-10">My Journey</h2>
      <div class="timeline">
        <div class="timeline-item" v-for="(step, index) in journeyData" :key="index">
          <div class="timeline-circle"></div>
          <div class="timeline-content">
            <h3 class="font-bold text-xl text-primary">{{ step.date }}</h3>
            <p class="text-gray-700">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer-component></footer-component>
</template>

<style scoped>
/* General Styles */

:root {
  --primary: #2c3e50;
  --secondary: #34495e;
  --primary-color: #52C67A;
}

.container {
  max-width: 1200px;
}

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

.hero-content {
  background: linear-gradient(90deg, #52C67A, #0D6E4F);
  -webkit-background-clip: text;
  color: transparent;
}

.hero img {
  transition: transform 0.3s ease;
}

.hero img:hover {
  transform: scale(1.1);
}

/* About Me Section */
.about-me img {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.about-me img:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Journey Section */
.timeline {
  position: relative;
  padding-left: 2rem;
  border-left: 2px solid #0d6e4f;
}

.timeline-item {
  margin-bottom: 2rem;
  position: relative;
}

.timeline-circle {
  position: absolute;
  left: -10px;
  top: 0;
  width: 20px;
  height: 20px;
  background: transparent;
  border-radius: 50%;
  border: 2px solid #0d6e4f;
}

.timeline-content {
  padding-left: 2rem;
}

.timeline-content h3 {
  margin-bottom: 0.5rem;
}

.timeline-content p {
  margin: 0;
}
</style>
