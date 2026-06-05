<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

// Renders a pixel-art sprite (array of equal-length strings) to a crisp canvas.
// Each char maps to a colour via `colors`; '.' / ' ' = transparent.
const props = withDefaults(defineProps<{
  pixels: string[]
  colors: Record<string, string>
  px?: number
}>(), { px: 6 })

const canvas = ref<HTMLCanvasElement | null>(null)

const render = () => {
  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')
  if (!ctx) return
  const rows = props.pixels.length
  const cols = props.pixels[0]?.length ?? 0
  c.width = cols * props.px
  c.height = rows * props.px
  ctx.clearRect(0, 0, c.width, c.height)
  for (let y = 0; y < rows; y++) {
    const row = props.pixels[y]
    for (let x = 0; x < cols; x++) {
      const ch = row[x]
      const col = props.colors[ch]
      if (!col || ch === '.' || ch === ' ') continue
      ctx.fillStyle = col
      ctx.fillRect(x * props.px, y * props.px, props.px, props.px)
    }
  }
}

onMounted(render)
watch(() => [props.pixels, props.colors], render, { deep: true })
</script>

<template>
  <canvas ref="canvas" class="gb-sprite"></canvas>
</template>

<style scoped>
.gb-sprite { image-rendering: pixelated; display: block; width: 100%; height: auto; }
</style>
