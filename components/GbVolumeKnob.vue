<script setup lang="ts">
import { computed, ref } from 'vue'

// The Game Boy DMG volume wheel. Drag vertically, scroll, or use arrow keys.
const gb = useGameboy()
const dragging = ref(false)
let startY = 0
let startVol = 0

const pct = computed(() => Math.round(gb.volume.value * 100))
const angle = computed(() => -135 + gb.volume.value * 270) // sweep -135°..+135°

const onMove = (e: PointerEvent) => {
  if (!dragging.value) return
  gb.setVolume(startVol + (startY - e.clientY) / 130)
}
const onUp = () => {
  dragging.value = false
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
}
const onDown = (e: PointerEvent) => {
  e.preventDefault()
  gb.unlockAudio()
  dragging.value = true
  startY = e.clientY
  startVol = gb.volume.value
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
}
const onWheel = (e: WheelEvent) => {
  e.preventDefault()
  gb.unlockAudio()
  gb.setVolume(gb.volume.value - Math.sign(e.deltaY) * 0.08)
}
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); gb.setVolume(gb.volume.value + 0.1) }
  else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); gb.setVolume(gb.volume.value - 0.1) }
}
</script>

<template>
  <div class="gb-knob" role="slider" tabindex="0"
       :aria-label="`Volume ${pct}%`" :aria-valuenow="pct" aria-valuemin="0" aria-valuemax="100"
       :title="`Volume: ${pct}%`"
       @pointerdown="onDown" @wheel="onWheel" @keydown="onKey">
    <span class="gb-knob-dial" :class="{ 'is-drag': dragging }" :style="{ transform: `rotate(${angle}deg)` }">
      <span class="gb-knob-tick"></span>
    </span>
  </div>
</template>

<style scoped>
.gb-knob {
  width: 30px; height: 30px;
  border-radius: 9999px;
  background: radial-gradient(circle at 38% 32%, #6a6657, #3a382f 75%);
  border: 2px solid #8e8b7a;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.25), 0 2px 3px rgba(0, 0, 0, 0.4);
  cursor: ns-resize;
  display: grid;
  place-items: center;
  touch-action: none;
  flex-shrink: 0;
}
.gb-knob:focus-visible { outline: 2px dashed #5b3490; outline-offset: 2px; }
.gb-knob-dial { position: relative; width: 100%; height: 100%; transition: transform 0.06s linear; }
.gb-knob-dial.is-drag { transition: none; }
.gb-knob-tick {
  position: absolute;
  top: 2px; left: 50%;
  width: 2.6px; height: 9px;
  margin-left: -1.3px;
  border-radius: 2px;
  background: #9bbc0f;
  box-shadow: 0 0 4px rgba(155, 188, 15, 0.7);
}
</style>
