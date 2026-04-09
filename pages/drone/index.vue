<script setup lang="ts">
import Navigation from "~/components/navigation.vue";
import FooterComponent from "~/components/footerComponent.vue";
import ProjectGrid from "~/components/projectGrid.vue";

useSeoMeta({
  title: 'FPV Drones - Lasse Harm',
  ogTitle: 'FPV Drones - Lasse Harm',
  description: 'FPV freestyle, cinematic flying, drone racing, and building custom quads. A look into my passion for first-person-view drones.',
  ogDescription: 'FPV freestyle, cinematic flying, drone racing, and building custom quads.',
  ogImage: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg?thumb=960x0',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <navigation></navigation>

  <!-- Hero -->
  <section class="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark z-10"></div>
    <div class="absolute inset-0 bg-grid opacity-20 z-10"></div>
    <div class="absolute inset-0 z-0">
      <img src="https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg" alt="FPV drone" class="w-full h-full object-cover">
    </div>
    <div class="relative z-20 text-center px-4">
      <h1 class="text-5xl md:text-7xl font-black mb-4">
        <span class="gradient-text">FPV Drones</span>
      </h1>
      <p class="text-xl text-gray-300 max-w-xl mx-auto">Flying, building, crashing, rebuilding. Repeat.</p>
    </div>
  </section>

  <!-- Main Content - flowing, personal -->
  <section class="py-20 bg-dark relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="absolute top-0 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px]"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-3xl mx-auto space-y-16">

        <!-- What FPV feels like -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">The feeling</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>FPV stands for First Person View. You wear goggles that show a live camera feed from the drone, so you see what the drone sees. It feels like you're actually flying.</p>
            <p>I fly both <span class="text-neon-cyan">freestyle</span> and <span class="text-neon-purple">cinematic</span>. Freestyle is creative expression — flips, rolls, power loops, diving through gaps. Cinematic is smooth, sweeping movements that make footage feel like it came out of a movie.</p>
            <p>There's a feeling of freedom to it that's hard to describe. When you're locked in, flying a line you've been visualizing, everything else fades away. Just you and the sky.</p>
          </div>
        </div>

        <!-- Building -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">Building them is half the fun</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>Every quad I fly started as a pile of parts on my desk. Picking a frame, choosing motors, soldering the flight controller and ESC stack, wiring up the VTX and camera — it's deeply satisfying.</p>
            <p>Then comes the software side: flashing Betaflight, configuring rates, dialing in PID values until the quad responds exactly how you want. And honestly, the build is never truly finished. You're always swapping props, trying different cameras, adjusting filters.</p>
            <p>I prefer 5-inch true-X frames for freestyle. There's something about the way they fly — responsive, aggressive, but still smooth enough for cinematic lines when you want them.</p>
          </div>
        </div>

        <!-- Sims -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">Sim time</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>Before sending a quad into the sky, I spend hours in simulators. They're the safest and cheapest way to build muscle memory and try new tricks without breaking parts.</p>
            <p><span class="text-neon-cyan font-medium">Liftoff</span> is my main sim for freestyle practice. The physics feel very close to real life, and the track editor is great for building custom courses. <span class="text-neon-green font-medium">Velocidrone</span> is the go-to for racing — the timing systems and competitive multiplayer make it the closest thing to a real race without leaving the house.</p>
            <p>I plug in my actual radio controller and fly with the same sticks, same rates. When I go outside to fly for real, the transition is seamless.</p>
          </div>
        </div>

        <!-- Racing -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">Racing</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>Tiny quads ripping through gates at over 120 km/h. Drone racing is one of the most intense hobbies I've picked up. It's less about creativity and more about precision, consistency, and split-second decisions. You fly a course over and over, shaving fractions of a second off your lap times.</p>
            <p>What really makes it special is the community. Local race days are full of people sharing tips, lending parts, and cheering each other on. Everyone's there because they love the same weird, wonderful hobby. Whether you finish first or last, you leave wanting to come back.</p>
          </div>
        </div>

        <!-- My fleet -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">What I fly</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>My <span class="text-neon-cyan font-medium">DJI Air 2S</span> is the go-to for landscape and travel shots. One-inch sensor, gorgeous detail, and intelligent modes that make getting cinematic results easy when I'm exploring new places.</p>
            <p>The <span class="text-neon-green font-medium">5" Freestyle quad</span> is custom-built for ripping through the sky. Full manual flight, GoPro mounted on top. There's nothing like it.</p>
            <p>And the <span class="text-neon-purple font-medium">Cinewhoop</span> — ducted props make it safe for indoor flying. I love using it for smooth, slow proximity flights through tight spaces. Perfect for those buttery cinematic shots.</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Footage -->
  <section class="py-20 bg-dark-100 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="container mx-auto px-6 relative z-10">
      <h2 class="section-heading">Some footage</h2>
      <div class="section-divider"></div>
      <project-grid category="drone"></project-grid>
    </div>
  </section>

  <footer-component></footer-component>
</template>
