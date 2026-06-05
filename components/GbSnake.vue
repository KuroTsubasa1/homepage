<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Secret SNAKE minigame, rendered on a little LCD. Driven imperatively by the
// console shell (keyboard + on-screen D-pad) via the exposed input()/action().
const gb = useGameboy()

const COLS = 14
const ROWS = 14
const CELL = 18
const W = COLS * CELL
const H = ROWS * CELL

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

let snake = [{ x: 7, y: 7 }]
let dir = { x: 1, y: 0 }
let nextDir = { x: 1, y: 0 }
let food = { x: 3, y: 3 }
let timer: any = null
let speed = 150

const score = ref(0)
const best = ref(0)
const running = ref(false)
const over = ref(false)

const rnd = (n: number) => Math.floor(Math.random() * n)
const placeFood = () => {
  do { food = { x: rnd(COLS), y: rnd(ROWS) } }
  while (snake.some((s) => s.x === food.x && s.y === food.y))
}

const reset = () => {
  snake = [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }]
  dir = { x: 1, y: 0 }
  nextDir = { x: 1, y: 0 }
  score.value = 0
  speed = 150
  over.value = false
  placeFood()
}

const colorVar = (name: string) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return `rgb(${v || '155 188 15'})`
}
const draw = () => {
  if (!ctx) return
  ctx.fillStyle = colorVar('--c-bg')
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = colorVar('--c-velvet')
  ctx.fillRect(food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6)
  snake.forEach((s, i) => {
    ctx!.fillStyle = i === 0 ? colorVar('--c-green-2') : colorVar('--c-green')
    ctx!.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2)
  })
}

const tick = () => {
  dir = nextDir
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y }
  if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
      snake.some((s) => s.x === head.x && s.y === head.y)) {
    gameOver()
    return
  }
  snake.unshift(head)
  if (head.x === food.x && head.y === food.y) {
    score.value += 1
    gb.sfx.select()
    placeFood()
    if (speed > 70 && score.value % 4 === 0) {
      speed -= 8
      clearInterval(timer); timer = setInterval(tick, speed)
    }
  } else {
    snake.pop()
  }
  draw()
}

const stop = () => { if (timer) { clearInterval(timer); timer = null } running.value = false }
const start = () => {
  reset()
  running.value = true
  clearInterval(timer)
  timer = setInterval(tick, speed)
  draw()
}
const gameOver = () => {
  stop()
  over.value = true
  best.value = Math.max(best.value, score.value)
  gb.sfx.error()
  draw()
}

// --- driven by the shell ---
const input = (d: 'up' | 'down' | 'left' | 'right') => {
  if (!running.value || over.value) return
  const map = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } }
  const nd = map[d]
  if (nd.x === -dir.x && nd.y === -dir.y) return // no reversing
  nextDir = nd
}
const action = () => { if (!running.value || over.value) start() } // A = (re)start
// unified shell interface: confirm = A, cancel returns false so B exits the game
defineExpose({ input, confirm: action, cancel: () => false })

onMounted(() => {
  ctx = canvas.value?.getContext('2d') ?? null
  start()
})
onUnmounted(stop)
</script>

<template>
  <div class="gb-snake">
    <div class="gb-snake-head">
      <span class="font-pixel">SNAKE</span>
      <span class="font-pixel gb-snake-score">{{ String(score).padStart(3, '0') }}</span>
    </div>
    <div class="gb-snake-screen screen-scanlines">
      <canvas ref="canvas" :width="W" :height="H" class="gb-snake-canvas"></canvas>
      <div v-if="over" class="gb-snake-over">
        <p class="font-pixel gb-snake-go">GAME OVER</p>
        <p class="font-pixel gb-snake-best">BEST {{ String(best).padStart(3, '0') }}</p>
        <p class="font-pixel gb-snake-hint animate-blink">▶ A TO RETRY</p>
      </div>
    </div>
    <p class="font-pixel gb-snake-foot">▲▼◄► MOVE · A RESTART · B EXIT</p>
  </div>
</template>

<style scoped>
.gb-snake { width: min(82vw, 320px); }
.gb-snake-head {
  display: flex; align-items: center; justify-content: space-between;
  font-size: 0.6rem; color: rgb(var(--c-green)); margin-bottom: 8px;
}
.gb-snake-score { color: rgb(var(--c-ink)); }
.gb-snake-screen {
  position: relative;
  background: rgb(var(--c-bg));
  border: 3px solid rgb(var(--c-green) / 0.45);
  border-radius: 6px;
  box-shadow: inset 0 0 24px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  line-height: 0;
}
.gb-snake-canvas {
  width: 100%;
  height: auto;
  image-rendering: pixelated;
  display: block;
}
.gb-snake-over {
  position: absolute; inset: 0; z-index: 4;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  background: rgb(var(--c-bg) / 0.82);
}
.gb-snake-go { font-size: 0.9rem; color: rgb(var(--c-crimson)); text-shadow: 0 0 12px rgb(var(--c-crimson) / 0.5); }
.gb-snake-best { font-size: 0.55rem; color: rgb(var(--c-ink)); }
.gb-snake-hint { font-size: 0.5rem; color: rgb(var(--c-green)); }
.gb-snake-foot { margin-top: 10px; font-size: 0.42rem; color: rgb(var(--c-ink-3)); text-align: center; letter-spacing: 0.04em; }
</style>
