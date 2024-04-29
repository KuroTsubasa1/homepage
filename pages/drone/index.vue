<script setup lang="ts">

import Navigation from "~/components/navigation.vue";
import FooterComponent from "~/components/footerComponent.vue";
import ProjectGrid from "~/components/projectGrid.vue";
import Card from "~/components/card.vue";

const drones = [
  { name: '5" Freestyle Quad', description: 'Ideal for agile and dynamic shots.', image: '/images/freestyle-quad.jpg' },
  { name: '3.5" CineWhoop', description: 'Perfect for cinematic close-ups.', image: '/images/cinewhoop.jpg' },
  // Add other drones similarly
];
</script>

<template>

  <navigation>

  </navigation>

  <hero title="Drone" description="" image="https://pocket.lasseharm.space/api/files/g2y50g4h40yjol9/a2y4hbqpuo6a40p/dji_0066_tAGACeMmVN.jpg">

  </hero>



  <div class="mt-10 flex justify-center flex-row flex-wrap">

    <card></card>
    <card></card>
    <card></card>
    <card></card>

  </div>

  <project-grid category="drone">

  </project-grid>

  <footer-component>

  </footer-component>

</template>

<style scoped>
.drone-fleet {
  text-align: center;
}
.fleet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.drone-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 20px;
}
.drone-image {
  width: 100%;
  border-radius: 10px;
}
.drone-info {
  margin-top: 10px;
}
</style>