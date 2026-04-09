<script setup lang="ts">
import Navigation from "~/components/navigation.vue";
import FooterComponent from "~/components/footerComponent.vue";
import ProjectGrid from "~/components/projectGrid.vue";

useSeoMeta({
  title: '3D Printing & Making - Lasse Harm',
  ogTitle: '3D Printing & Making - Lasse Harm',
  description: 'Exploring 3D printing, CAD modeling in Blender and Plasticity, multi-color prints, and the joy of turning ideas into real objects.',
  ogDescription: 'Exploring 3D printing, CAD modeling in Blender and Plasticity, multi-color prints, and the joy of turning ideas into real objects.',
  ogImage: 'https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=960x0',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <navigation></navigation>

  <!-- Hero -->
  <section class="relative min-h-[70vh] flex items-center overflow-hidden" style="background-image: url('https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/60sc2mi6uk0lw66/img_1085_yaf6gcg51Y.JPG?thumb=1920x1080'); background-size: cover; background-position: center;">
    <div class="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark z-10"></div>
    <div class="absolute inset-0 bg-grid opacity-20 z-10"></div>
    <div class="relative z-20 container mx-auto px-6 py-20">
      <div class="max-w-2xl">
        <h1 class="text-5xl md:text-7xl font-black mb-4">
          <span class="text-white">3D Printing</span><br>
          <span class="gradient-text">& Making</span>
        </h1>
        <p class="text-lg text-gray-300 mb-8">Turning ideas into real, tangible things. One layer at a time.</p>
        <div class="flex flex-wrap gap-4">
          <a href="https://3dps.space/" target="_blank" rel="noopener noreferrer" class="btn-neon inline-block">Visit 3dps.space</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Main Content - flowing, personal -->
  <section class="py-20 bg-dark relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="absolute top-0 left-0 w-96 h-96 bg-neon-green/5 rounded-full blur-[100px]"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-3xl mx-auto space-y-16">

        <!-- The joy -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">Why I print</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>3D printing combines everything I love: problem-solving, design, technology, and the satisfaction of building something real. The whole journey from a rough idea to a finished print is endlessly rewarding — sketching a concept, modeling it in CAD, dialing in the slicer settings, and watching layer after layer come to life.</p>
            <p>What started as curiosity quickly turned into a full-blown workshop. Whether it's functional parts for around the house, custom enclosures for electronics projects, or purely creative prints just because they look cool — there's always something on the build plate.</p>
            <p>I also run <a href="https://3dps.space/" target="_blank" rel="noopener noreferrer" class="text-neon-green hover:underline font-medium">3dps.space</a> as a side project where I share more about printing and the maker community.</p>
          </div>
        </div>

        <!-- CAD & Modeling -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">Designing in 3D</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>Every great print starts with a great model. I use <span class="text-neon-purple font-medium">Blender</span> for anything organic, sculptural, or artistically driven — sculpting, subdivision modeling, and quick concept work. When a shape needs to feel alive rather than measured, Blender is where it happens.</p>
            <p>For anything mechanical or dimensionally precise, I reach for <span class="text-neon-cyan font-medium">Plasticity</span>. It's a modern CAD tool that's fast and intuitive while delivering the exact, watertight geometry that 3D printing demands. Enclosures, brackets, mounts — anything that needs to fit just right.</p>
            <p>The two complement each other perfectly. Sometimes a project starts in Plasticity for the precise shell and moves to Blender for decorative details. Other times it's pure Blender from start to finish.</p>
          </div>
        </div>

        <!-- My machines -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">The workshop</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>My main workhorse is the <span class="text-neon-green font-medium">Bambulab X1C</span> — a CoreXY speed machine with multi-material capabilities through the AMS system. It's fast, precise, and handles everything from PLA to ABS without breaking a sweat. The built-in lidar and camera monitoring mean I can start a print and walk away knowing it'll be fine.</p>
            <p>Next to it sits the <span class="text-neon-green font-medium">Bambulab P1S</span>, the enclosed everyday printer. Reliable, quiet, and perfect for materials that need a stable temperature. Between the two Bambulab machines, most of my printing happens here.</p>
            <p>The <span class="text-neon-cyan font-medium">Snapmaker U1</span> is the Swiss Army knife — swappable tool heads let it 3D print, laser engrave, and CNC mill. One machine, endless possibilities. It's great for projects that mix disciplines.</p>
            <p>And when the build plate needs to be big, the <span class="text-neon-purple font-medium">Anycubic Kobra Max 3</span> steps in. Large format printing for oversized projects and pieces that just won't fit anywhere else.</p>
          </div>
        </div>

        <!-- Multi-color -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">Multi-color printing</h2>
          <div class="text-gray-300 leading-relaxed space-y-4">
            <p>One of the most exciting parts of my setup is the Bambulab AMS (Automatic Material System). It switches between up to four filament spools during a single print — full multi-color without manual filament swaps.</p>
            <p>This opens up a whole new dimension: color-accurate logos, prints with contrasting accents, models with built-in text, or functional parts that combine different materials — like a rigid body with a flexible TPU grip. Chain multiple AMS units together and even 8- or 16-color prints become possible.</p>
            <p>It's the kind of capability that used to require industrial machines, now sitting on a desk in my office.</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Prints showcase -->
  <section class="py-20 bg-dark-100 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="container mx-auto px-6 relative z-10">
      <h2 class="section-heading">Some prints</h2>
      <div class="section-divider"></div>
      <project-grid category="3d"></project-grid>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-dark to-neon-cyan/10"></div>
    <div class="absolute inset-0 bg-grid opacity-10"></div>
    <div class="container mx-auto px-6 text-center relative z-10">
      <h2 class="text-3xl md:text-4xl font-black mb-6"><span class="gradient-text">Curious about 3D printing?</span></h2>
      <p class="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">Check out my side project for more builds, guides, and maker content.</p>
      <a href="https://3dps.space/" target="_blank" rel="noopener noreferrer" class="btn-neon inline-block">Visit 3dps.space</a>
    </div>
  </section>

  <footer-component></footer-component>
</template>
