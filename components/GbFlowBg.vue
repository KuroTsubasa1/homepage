<script setup lang="ts">
/*
 * GbFlowBg — a fixed, full-viewport animated phosphor background that sits
 * BEHIND the LCD content (z-0; the layout's .gb-screen is z-1). One distinct
 * flowing variant per page. Purely decorative.
 */
defineProps<{ variant: string }>()
</script>

<template>
  <div class="gb-flow" :class="`flow-${variant}`" aria-hidden="true">
    <div class="fl fl1"></div>
    <div class="fl fl2"></div>
    <div class="fl fl3"></div>
  </div>
</template>

<style scoped>
.gb-flow {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
.fl {
  position: absolute;
  inset: 0;
}

/* =====================================================================
   VARIANT FLOWS  (assembled from per-page designs)
   ===================================================================== */

/* ---- PHOTO : contact-sheet grid + velvet grain drifting bottom-right ---- */
.flow-photo .fl1 {
  background-image:
    repeating-linear-gradient(0deg, rgb(var(--c-green) / 0.06) 0 1px, transparent 1px 44px),
    repeating-linear-gradient(90deg, rgb(var(--c-green) / 0.06) 0 1px, transparent 1px 44px);
  background-size: 44px 44px;
  opacity: 0.6;
  animation: photo-grid 8s linear infinite;
}
.flow-photo .fl2 {
  background-image: radial-gradient(circle, rgb(var(--c-velvet) / 0.14) 1.5px, transparent 2.1px);
  background-size: 30px 30px;
  opacity: 0.5;
  animation: photo-grain 12s linear infinite;
}
.flow-photo .fl3 { display: none; }
@keyframes photo-grid {
  from { background-position: 0 0, 0 0; }
  to   { background-position: 44px 44px, 44px 44px; }
}
@keyframes photo-grain {
  from { background-position: 0 0; }
  to   { background-position: 30px 30px; }
}

/* ---- DRONE : fast diagonal speed streaks + a vertical FPV scan band ---- */
.flow-drone .fl1 {
  background-image: repeating-linear-gradient(115deg, rgb(var(--c-green) / 0.08) 0 2px, transparent 2px 17px);
  background-size: 64px 64px;
  opacity: 0.55;
  animation: drone-streak 1.7s linear infinite;
}
.flow-drone .fl2 {
  inset: -45vh 0 auto 0;
  height: 45vh;
  background: linear-gradient(180deg, transparent, rgb(var(--c-green) / 0.12) 50%, transparent);
  animation: drone-scan 3.4s linear infinite;
}
.flow-drone .fl3 {
  background-image: radial-gradient(circle, rgb(var(--c-velvet) / 0.12) 1.2px, transparent 1.8px);
  background-size: 38px 38px;
  opacity: 0.4;
  animation: drone-dots 6s linear infinite;
}
@keyframes drone-streak {
  from { background-position: 0 0; }
  to   { background-position: -64px 64px; }
}
@keyframes drone-scan {
  from { transform: translateY(0); }
  to   { transform: translateY(150vh); }
}
@keyframes drone-dots {
  from { background-position: 0 0; }
  to   { background-position: -38px 38px; }
}

/* ---- PRINT : horizontal layer lines rising + a print-head sweep ---- */
.flow-print .fl1 {
  background-image: repeating-linear-gradient(0deg, rgb(var(--c-green) / 0.07) 0 2px, transparent 2px 15px);
  background-size: 100% 15px;
  opacity: 0.55;
  animation: print-layers 2.3s linear infinite;
}
.flow-print .fl2 {
  inset: auto 0 -24vh 0;
  height: 24vh;
  background: linear-gradient(0deg, transparent, rgb(var(--c-green) / 0.14) 50%, transparent);
  animation: print-head 6.5s linear infinite;
}
.flow-print .fl3 {
  background-image: repeating-linear-gradient(90deg, rgb(var(--c-velvet) / 0.05) 0 1px, transparent 1px 60px);
  opacity: 0.5;
}
@keyframes print-layers {
  from { background-position: 0 0; }
  to   { background-position: 0 -15px; }
}
@keyframes print-head {
  from { transform: translateY(0); }
  to   { transform: translateY(-150vh); }
}

/* ---- ABOUT : calm slow starfield drift ---- */
.flow-about .fl1 {
  background-image: radial-gradient(circle, rgb(var(--c-green) / 0.12) 1.8px, transparent 2.5px);
  background-size: 66px 66px;
  opacity: 0.5;
  animation: about-drift-a 19s linear infinite;
}
.flow-about .fl2 {
  background-image: radial-gradient(circle, rgb(var(--c-velvet) / 0.12) 1.2px, transparent 1.8px);
  background-size: 34px 34px;
  opacity: 0.45;
  animation: about-drift-b 27s linear infinite;
}
.flow-about .fl3 { display: none; }
@keyframes about-drift-a {
  from { background-position: 0 0; }
  to   { background-position: -132px 66px; }
}
@keyframes about-drift-b {
  from { background-position: 0 0; }
  to   { background-position: 34px -34px; }
}

/* ---- CONTACT : transmission dashes + pulsing broadcast rings ---- */
.flow-contact .fl1 {
  background-image: repeating-linear-gradient(90deg, rgb(var(--c-green) / 0.08) 0 6px, transparent 6px 22px);
  background-size: 22px 100%;
  opacity: 0.5;
  animation: contact-tx 1.5s linear infinite;
}
.flow-contact .fl2 {
  inset: -40%;
  background-image: repeating-radial-gradient(circle at 50% 50%, transparent 0 26px, rgb(var(--c-velvet) / 0.1) 26px 29px, transparent 29px 56px);
  transform-origin: center;
  animation: contact-ping 4s ease-out infinite;
}
.flow-contact .fl3 { display: none; }
@keyframes contact-tx {
  from { background-position: 0 0; }
  to   { background-position: 22px 0; }
}
@keyframes contact-ping {
  0%   { transform: scale(0.55); opacity: 0.05; }
  45%  { opacity: 0.45; }
  100% { transform: scale(1.5); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .fl { animation: none !important; }
}
</style>
