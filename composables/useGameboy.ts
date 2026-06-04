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
const deckOpen = ref(true)      // bottom control deck expanded/collapsed
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
   Background chiptune — a 4-channel loop (lead pulse + shimmering arp pulse +
   driving triangle bass + noise hats) over a catchy Am · F · C · G
   progression, 8 bars with melodic variation. Look-ahead scheduled so it
   loops seamlessly regardless of timer jitter.
   ---------------------------------------------------------------------- */
const NT = {
  F2: 87.31, G2: 98.0, A2: 110.0, C3: 130.81, D3: 146.83, E3: 164.81, G3: 196.0,
  G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77,
}
// Lead melody — 8 bars × 8 eighth-notes (0 = rest), built from chord tones.
const LEAD = [
  NT.A4, 0, NT.C5, NT.E5, 0, NT.C5, NT.A4, 0,        // Am
  NT.A4, 0, NT.C5, NT.F5, 0, NT.C5, NT.A4, 0,        // F
  NT.G4, 0, NT.C5, NT.E5, 0, NT.G5, NT.E5, 0,        // C
  NT.G4, 0, NT.B4, NT.D5, 0, NT.G5, NT.D5, 0,        // G
  NT.E5, 0, NT.A5, NT.E5, NT.C5, 0, NT.A4, 0,        // Am
  NT.F5, 0, NT.A5, NT.F5, NT.C5, 0, NT.A4, 0,        // F
  NT.D5, 0, NT.G5, NT.D5, NT.B4, 0, NT.G4, 0,        // G
  NT.D5, 0, NT.G5, NT.B5, 0, NT.D5, 0, 0,            // G (turnaround)
]
// Chord tones per bar — drive the fast shimmering arpeggio channel.
const CHORDS = [
  [NT.A4, NT.C5, NT.E5], [NT.A4, NT.C5, NT.F5], [NT.G4, NT.C5, NT.E5], [NT.G4, NT.B4, NT.D5],
  [NT.A4, NT.C5, NT.E5], [NT.A4, NT.C5, NT.F5], [NT.G4, NT.B4, NT.D5], [NT.G4, NT.B4, NT.D5],
]
const ROOTS  = [NT.A2, NT.F2, NT.C3, NT.G2, NT.A2, NT.F2, NT.G2, NT.G2]
const FIFTHS = [NT.E3, NT.C3, NT.G3, NT.D3, NT.E3, NT.C3, NT.D3, NT.D3]
const STEP_DUR = 0.15        // seconds per eighth note (~200 BPM-ish groove)
const LOOKAHEAD = 0.12       // schedule this far ahead (s)
const TICK = 25              // scheduler poll (ms)

let musicTimer: any = null
let nextNoteTime = 0
let stepIndex = 0
let noiseBuf: AudioBuffer | null = null

function getNoise(ctx: AudioContext): AudioBuffer {
  if (!noiseBuf) {
    noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.4), ctx.sampleRate)
    const d = noiseBuf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  }
  return noiseBuf
}

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

function noiseHit(t0: number, dur: number, vol: number) {
  if (!audioCtx || !musicGain) return
  const src = audioCtx.createBufferSource()
  src.buffer = getNoise(audioCtx)
  const hp = audioCtx.createBiquadFilter()
  hp.type = 'highpass'
  hp.frequency.value = 7000
  const g = audioCtx.createGain()
  g.gain.setValueAtTime(vol, t0)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  src.connect(hp).connect(g).connect(musicGain)
  src.start(t0)
  src.stop(t0 + dur + 0.02)
}

function musicLoop() {
  if (!audioCtx) return
  while (nextNoteTime < audioCtx.currentTime + LOOKAHEAD) {
    const s = stepIndex % LEAD.length
    const bar = (s / 8) | 0
    const beat = s % 8
    // lead (pulse 1)
    const lead = LEAD[s]
    if (lead) musicNote(lead, STEP_DUR * 0.9, 'square', 0.05, nextNoteTime)
    // shimmering arpeggio (quiet pulse 2)
    const chord = CHORDS[bar]
    musicNote(chord[s % chord.length], STEP_DUR * 0.55, 'square', 0.02, nextNoteTime)
    // driving triangle bass on the beats (fifth on beat 6)
    if (beat % 2 === 0) {
      musicNote(beat === 6 ? FIFTHS[bar] : ROOTS[bar], STEP_DUR * 1.7, 'triangle', 0.06, nextNoteTime)
    }
    // noise hi-hats on the off-beats
    if (beat % 2 === 1) noiseHit(nextNoteTime, 0.03, 0.018)
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
  watch(deckOpen, (m) => {
    try { localStorage.setItem('gb-deck', m ? '1' : '0') } catch {}
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
    const dk = localStorage.getItem('gb-deck')
    if (dk !== null) deckOpen.value = dk === '1'
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

  const toggleDeck = () => { deckOpen.value = !deckOpen.value; sfx.toggle() }

  const finishBoot = () => { booted.value = true }

  return {
    // state
    palette,
    muted,
    musicOn,
    deckOpen,
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
    toggleDeck,
    openMenu,
    closeMenu,
    toggleMenu,
    finishBoot,
  }
}
