/*
 * useGameboy — shared state + 8-bit sound for the Game Boy themed UI.
 *
 * Everything lives at module scope so the console shell (layout) and any
 * component (nav, buttons, palette toggle) share ONE source of truth.
 * Strictly SSR-safe: no window/localStorage/AudioContext touched until a
 * client-side action runs.
 *
 * Audio model:
 *  - SFX (clicks/moves/boot ping) play through `masterGain`.
 *  - A self-generated chiptune loop plays through `musicGain` so its volume is
 *    independent and it can be started/stopped without touching SFX.
 *  - Browsers block audio until a user gesture, so nothing is heard until the
 *    first interaction (typically pressing START on the boot screen) calls
 *    unlockAudio()/startMusic(). `muted` is the master kill-switch.
 */
import { ref, watch } from 'vue'

export type GbPalette = 'night' | 'classic'

/** Primary routes the D-pad left/right cycles through. */
export const GB_ROUTES = [
  { path: '/', label: 'HOME' },
  { path: '/reel-web-projects', label: 'WEB' },
  { path: '/photography', label: 'PHOTO' },
  { path: '/drone', label: 'DRONE' },
  { path: '/3d-printing', label: '3D' },
  { path: '/about', label: 'ABOUT' },
  { path: '/contact', label: 'CONTACT' },
] as const

// ---- Shared singleton state ----
const palette = ref<GbPalette>('night')
const muted = ref(false)        // master sound switch (audio still gated by browser gesture)
const musicOn = ref(true)       // background chiptune on/off
const menuOpen = ref(false)
const booted = ref(false)       // flips true once the boot sequence finishes
const hydrated = ref(false)     // becomes true after we read persisted prefs on the client

let audioCtx: AudioContext | null = null
let masterGain: GainNode | null = null
let musicGain: GainNode | null = null
let persistBound = false

const isClient = () => typeof window !== 'undefined'

function ensureCtx(): AudioContext | null {
  if (!isClient()) return null
  if (!audioCtx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return null
    audioCtx = new AC()
    masterGain = audioCtx.createGain()
    masterGain.gain.value = 0.5
    masterGain.connect(audioCtx.destination)
    musicGain = audioCtx.createGain()
    musicGain.gain.value = 0.5
    musicGain.connect(audioCtx.destination)
  }
  if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {})
  return audioCtx
}

/** Schedule one SFX blip through masterGain. No-op when muted or pre-gesture. */
function tone(
  freq: number,
  dur = 0.08,
  type: OscillatorType = 'square',
  vol = 0.12,
  when = 0,
) {
  if (muted.value) return
  const ctx = ensureCtx()
  if (!ctx || !masterGain) return
  const t0 = ctx.currentTime + when
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(gain).connect(masterGain)
  osc.start(t0)
  osc.stop(t0 + dur + 0.03)
}

// Tiny SFX library. Frequencies loosely follow a chiptune scale.
const sfx = {
  move: () => tone(330, 0.05, 'square', 0.08),
  hover: () => tone(440, 0.035, 'square', 0.05),
  select: () => { tone(660, 0.06, 'square', 0.12); tone(880, 0.08, 'square', 0.1, 0.05) },
  back: () => { tone(300, 0.07, 'square', 0.1); tone(200, 0.09, 'square', 0.08, 0.05) },
  toggle: () => tone(520, 0.05, 'triangle', 0.1),
  error: () => { tone(180, 0.12, 'sawtooth', 0.08); tone(140, 0.14, 'sawtooth', 0.07, 0.06) },
  // The classic power-on "ping": a rising arpeggio resolving on a bright chime.
  boot: () => {
    tone(392, 0.1, 'square', 0.09, 0.0)
    tone(523, 0.1, 'square', 0.09, 0.12)
    tone(659, 0.1, 'square', 0.09, 0.24)
    tone(784, 0.22, 'square', 0.11, 0.36)
    tone(1046, 0.34, 'triangle', 0.09, 0.58)
  },
}

/* ----------------------------------------------------------------------
   Background chiptune — a looping lead + bass over C · G · Am · F.
   Scheduled with the standard Web Audio look-ahead technique so it loops
   seamlessly regardless of timer jitter.
   ---------------------------------------------------------------------- */
const N = {
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77,
  A4: 440.0,
  C3: 130.81, G2: 98.0, A2: 110.0, F2: 87.31,
}
// 32 eighth-note lead steps (4 bars), 0 = rest.
const MELODY = [
  N.C5, N.E5, N.G5, N.E5, N.C5, N.E5, N.G5, N.B5,   // C
  N.D5, N.G5, N.B5, N.G5, N.D5, N.G5, N.B5, N.A5,   // G
  N.A4, N.C5, N.E5, N.C5, N.A4, N.C5, N.E5, N.G5,   // Am
  N.A4, N.C5, N.F5, N.C5, N.A4, N.C5, N.F5, N.E5,   // F
]
// Bass root per half-bar (indexed by floor(step/4)); plays on every 4th step.
const BASS_ROOTS = [N.C3, N.C3, N.G2, N.G2, N.A2, N.A2, N.F2, N.F2]
const STEP_DUR = 0.17        // seconds per eighth note (~176 BPM feel)
const LOOKAHEAD = 0.12       // schedule this far ahead (s)
const TICK = 25              // scheduler poll (ms)

let musicTimer: any = null
let nextNoteTime = 0
let stepIndex = 0

function musicNote(freq: number, dur: number, type: OscillatorType, vol: number, t0: number) {
  if (!audioCtx || !musicGain) return
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(gain).connect(musicGain)
  osc.start(t0)
  osc.stop(t0 + dur + 0.03)
}

function musicLoop() {
  if (!audioCtx) return
  while (nextNoteTime < audioCtx.currentTime + LOOKAHEAD) {
    const s = stepIndex % MELODY.length
    const lead = MELODY[s]
    if (lead) musicNote(lead, STEP_DUR * 0.92, 'square', 0.05, nextNoteTime)
    if (s % 4 === 0) {
      const bass = BASS_ROOTS[Math.floor(s / 4)]
      if (bass) musicNote(bass, STEP_DUR * 3.6, 'triangle', 0.06, nextNoteTime)
    }
    nextNoteTime += STEP_DUR
    stepIndex += 1
  }
}

function startMusic() {
  if (muted.value || !musicOn.value) return
  const ctx = ensureCtx()
  if (!ctx || musicTimer) return
  nextNoteTime = ctx.currentTime + 0.1
  stepIndex = 0
  musicLoop()
  musicTimer = setInterval(musicLoop, TICK)
}

function stopMusic() {
  if (musicTimer) { clearInterval(musicTimer); musicTimer = null }
}

function applyPaletteToDom() {
  if (!isClient()) return
  document.documentElement.dataset.palette = palette.value
}

function bindPersistence() {
  if (persistBound || !isClient()) return
  persistBound = true
  watch(palette, (p) => {
    try { localStorage.setItem('gb-palette', p) } catch {}
    applyPaletteToDom()
  })
  watch(muted, (m) => {
    try { localStorage.setItem('gb-muted', m ? '1' : '0') } catch {}
  })
  watch(musicOn, (m) => {
    try { localStorage.setItem('gb-music', m ? '1' : '0') } catch {}
  })
}

/** Read persisted prefs + reflect palette onto <html>. Call once on mount. */
function hydrate() {
  if (!isClient() || hydrated.value) return
  try {
    const p = localStorage.getItem('gb-palette') as GbPalette | null
    if (p === 'night' || p === 'classic') palette.value = p
    const m = localStorage.getItem('gb-muted')
    if (m !== null) muted.value = m === '1'
    const mu = localStorage.getItem('gb-music')
    if (mu !== null) musicOn.value = mu === '1'
  } catch {}
  applyPaletteToDom()
  bindPersistence()
  hydrated.value = true
}

export function useGameboy() {
  const setPalette = (p: GbPalette) => { palette.value = p; applyPaletteToDom() }
  const cyclePalette = () => {
    palette.value = palette.value === 'night' ? 'classic' : 'night'
    applyPaletteToDom()
    sfx.toggle()
  }

  const toggleMute = () => {
    const next = !muted.value
    muted.value = next
    if (next) {
      stopMusic()
    } else {
      ensureCtx()
      sfx.select()        // confirm sound when unmuting
      startMusic()
    }
  }

  const toggleMusic = () => {
    musicOn.value = !musicOn.value
    ensureCtx()
    sfx.toggle()
    if (musicOn.value && !muted.value) startMusic()
    else stopMusic()
  }

  const openMenu = () => { menuOpen.value = true; sfx.select() }
  const closeMenu = () => { menuOpen.value = false; sfx.back() }
  const toggleMenu = () => { menuOpen.value ? closeMenu() : openMenu() }

  const finishBoot = () => { booted.value = true }

  return {
    // state
    palette,
    muted,
    musicOn,
    menuOpen,
    booted,
    hydrated,
    routes: GB_ROUTES,
    // sound
    sfx,
    unlockAudio: ensureCtx,
    startMusic,
    stopMusic,
    // actions
    hydrate,
    setPalette,
    cyclePalette,
    toggleMute,
    toggleMusic,
    openMenu,
    closeMenu,
    toggleMenu,
    finishBoot,
  }
}
