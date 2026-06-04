/*
 * useGameboy — shared state + 8-bit sound for the Game Boy themed UI.
 *
 * Everything lives at module scope so the console shell (layout) and any
 * component (nav, buttons, palette toggle) share ONE source of truth.
 * Strictly SSR-safe: no window/localStorage/AudioContext touched until a
 * client-side action runs.
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
const muted = ref(true)        // silent until the user opts in (and browsers require a gesture)
const menuOpen = ref(false)
const booted = ref(false)      // flips true once the boot sequence finishes
const hydrated = ref(false)    // becomes true after we read persisted prefs on the client

let audioCtx: AudioContext | null = null
let masterGain: GainNode | null = null
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
  }
  if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {})
  return audioCtx
}

/** Schedule one square/triangle blip. No-op when muted or pre-gesture. */
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
  // The little power-on jingle (a rising arpeggio + ping).
  boot: () => {
    tone(392, 0.1, 'square', 0.09, 0.0)
    tone(523, 0.1, 'square', 0.09, 0.12)
    tone(659, 0.1, 'square', 0.09, 0.24)
    tone(784, 0.22, 'square', 0.11, 0.36)
    tone(1046, 0.3, 'triangle', 0.08, 0.58)
  },
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
}

/** Read persisted prefs + reflect palette onto <html>. Call once on mount. */
function hydrate() {
  if (!isClient() || hydrated.value) return
  try {
    const p = localStorage.getItem('gb-palette') as GbPalette | null
    if (p === 'night' || p === 'classic') palette.value = p
    const m = localStorage.getItem('gb-muted')
    if (m !== null) muted.value = m === '1'
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
    if (!next) { ensureCtx(); sfx.select() } // confirm sound when unmuting
  }

  const openMenu = () => { menuOpen.value = true; sfx.select() }
  const closeMenu = () => { menuOpen.value = false; sfx.back() }
  const toggleMenu = () => { menuOpen.value ? closeMenu() : openMenu() }

  const finishBoot = () => { booted.value = true }

  return {
    // state
    palette,
    muted,
    menuOpen,
    booted,
    hydrated,
    routes: GB_ROUTES,
    // sound
    sfx,
    unlockAudio: ensureCtx,
    // actions
    hydrate,
    setPalette,
    cyclePalette,
    toggleMute,
    openMenu,
    closeMenu,
    toggleMenu,
    finishBoot,
  }
}
