<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const gb = useGameboy()

/* ----------------------------------------------------------------------
   JSON-LD schema injection (preserved from the original layout) + palette
   ---------------------------------------------------------------------- */
const personSchema = ref<any>(null)
const businessSchema = ref<any>(null)

useHead({
  htmlAttrs: { 'data-theme': 'mytheme', 'data-palette': computed(() => gb.palette.value) },
  bodyAttrs: { class: 'gb-body' },
  script: [
    { type: 'application/ld+json', children: computed(() => personSchema.value ? JSON.stringify(personSchema.value) : '{}') },
    { type: 'application/ld+json', children: computed(() => businessSchema.value ? JSON.stringify(businessSchema.value) : '{}') },
  ],
})

/* ----------------------------------------------------------------------
   Navigation model
   ---------------------------------------------------------------------- */
const navLinks = computed(() => [
  { path: '/reel-web-projects', label: t('nav.webProjects') },
  { path: '/photography', label: t('nav.photography'), dropdown: true },
  { path: '/drone', label: t('nav.drone') },
  { path: '/3d-printing', label: t('nav.3dPrinting') },
  { path: '/about', label: t('nav.about') },
  { path: '/contact', label: t('nav.contact') },
])

const photoLinks = computed(() => [
  { path: '/photography', label: t('photoCategories.all') },
  { path: '/photography/wildlife', label: t('photoCategories.wildlife') },
  { path: '/photography/landscape-nature', label: t('photoCategories.landscape') },
  { path: '/photography/portraits-people', label: t('photoCategories.portraits') },
  { path: '/photography/abstract-art', label: t('photoCategories.abstract') },
  { path: '/photography/weddings', label: t('photoCategories.weddings') },
])

const isActive = (path: string) =>
  path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(path + '/')

const currentIndex = computed(() => {
  let idx = gb.routes.findIndex(r => r.path === route.path)
  if (idx === -1) idx = gb.routes.findIndex(r => r.path !== '/' && route.path.startsWith(r.path))
  return idx === -1 ? 0 : idx
})

// Per-page animated background variant (home keeps its own title-screen flow).
const flowVariant = computed(() => {
  const p = route.path
  if (p.startsWith('/photography')) return 'photo'
  if (p.startsWith('/drone')) return 'drone'
  if (p.startsWith('/3d-printing')) return 'print'
  if (p.startsWith('/reel-web-projects')) return 'web'
  if (p === '/about') return 'about'
  if (p === '/contact') return 'contact'
  return ''
})

const photoOpen = ref(false)
const navTo = (path: string) => { gb.sfx.select(); photoOpen.value = false; router.push(path) }

/* ----------------------------------------------------------------------
   Unified menu (START button + mobile hamburger + D-pad)
   A flat list of actionable items so the D-pad can drive everything.
   ---------------------------------------------------------------------- */
type MenuItem = { label: string; kind: 'route' | 'lang' | 'palette' | 'sound' | 'music' | 'game'; path?: string; indent?: boolean; game?: 'snake' | 'rpg' }
const menuItems = computed<MenuItem[]>(() => [
  ...gb.routes.map(r => ({ label: r.label, kind: 'route' as const, path: r.path })),
  { label: t('photoCategories.wildlife'), kind: 'route', path: '/photography/wildlife', indent: true },
  { label: t('photoCategories.weddings'), kind: 'route', path: '/photography/weddings', indent: true },
  { label: `LANG: ${locale.value.toUpperCase()}`, kind: 'lang' },
  { label: `PALETTE: ${gb.palette.value.toUpperCase()}`, kind: 'palette' },
  { label: `SOUND: ${gb.muted.value ? 'OFF' : 'ON'}`, kind: 'sound' },
  { label: `MUSIC: ${gb.musicOn.value ? 'ON' : 'OFF'}`, kind: 'music' },
  ...(gb.secretUnlocked.value ? [
    { label: '★ MONSTA QUEST', kind: 'game' as const, game: 'rpg' as const },
    { label: '★ SNAKE', kind: 'game' as const, game: 'snake' as const },
  ] : []),
])
const menuIndex = ref(0)

watch(() => gb.menuOpen.value, (open) => {
  if (open) { menuIndex.value = currentIndex.value; lockScroll(true) }
  else lockScroll(false)
})

const runMenuItem = (item: MenuItem) => {
  switch (item.kind) {
    case 'route': router.push(item.path!); gb.closeMenu(); break
    case 'lang': locale.value = locale.value === 'en' ? 'de' : 'en'; gb.sfx.toggle(); break
    case 'palette': gb.cyclePalette(); break
    case 'sound': gb.toggleMute(); break
    case 'music': gb.toggleMusic(); break
    case 'game': gb.closeMenu(); openGame(item.game ?? 'rpg'); break
  }
}

/* ----------------------------------------------------------------------
   D-pad / button behaviour
   ---------------------------------------------------------------------- */
const pressed = ref('')
let pressTimer: any = null
const flash = (k: string) => {
  pressed.value = k
  clearTimeout(pressTimer)
  pressTimer = setTimeout(() => { if (pressed.value === k) pressed.value = '' }, 170)
}

const scrollByViewport = (dir: number) =>
  window.scrollBy({ top: dir * window.innerHeight * 0.82, behavior: 'smooth' })
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const goRelative = (delta: number) => {
  const len = gb.routes.length
  const next = (currentIndex.value + delta + len) % len
  gb.sfx.move()
  router.push(gb.routes[next].path)
}

const onDir = (dir: 'up' | 'down' | 'left' | 'right') => {
  flash(dir)
  if (gameOpen.value) { gameRef.value?.input(dir); return }
  if (feedKonami(dir)) return
  if (gb.menuOpen.value) {
    const len = menuItems.value.length
    if (dir === 'up') { menuIndex.value = (menuIndex.value - 1 + len) % len; gb.sfx.move() }
    else if (dir === 'down') { menuIndex.value = (menuIndex.value + 1) % len; gb.sfx.move() }
    return
  }
  if (dir === 'up') { gb.sfx.move(); scrollByViewport(-1) }
  else if (dir === 'down') { gb.sfx.move(); scrollByViewport(1) }
  else if (dir === 'left') goRelative(-1)
  else if (dir === 'right') goRelative(1)
}
const onA = () => {
  flash('a')
  if (gameOpen.value) { gameRef.value?.confirm?.(); return }
  if (feedKonami('a')) return
  if (gb.menuOpen.value) { runMenuItem(menuItems.value[menuIndex.value]); return }
  gb.sfx.select(); scrollTop()
}
const onB = () => {
  flash('b')
  if (gameOpen.value) { if (!gameRef.value?.cancel?.()) closeGame(); return }
  if (feedKonami('b')) return
  if (gb.menuOpen.value) { gb.closeMenu(); return }
  gb.sfx.back()
  if (window.history.length > 1) router.back()
  else router.push('/')
}
const onStart = () => { flash('start'); if (gameOpen.value) { closeGame(); return } gb.unlockAudio(); gb.toggleMenu() }
const onSelect = () => { flash('select'); gb.cyclePalette() }

/* ----------------------------------------------------------------------
   Boot sequence
   ---------------------------------------------------------------------- */
const showBoot = ref(true)
let bootTimer: any = null

const lockScroll = (on: boolean) => {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('no-scroll', on)
}

const endBoot = () => {
  if (!showBoot.value) return
  clearTimeout(bootTimer)
  showBoot.value = false
  gb.finishBoot()
  lockScroll(false)
  try { sessionStorage.setItem('gb-booted', '1') } catch {}
}

// First user gesture unlocks audio (browser policy), fires the power-on ping
// while the boot screen is up, and kicks off the background chiptune.
let sessionStarted = false
const startSession = () => {
  if (sessionStarted) return
  sessionStarted = true
  gb.unlockAudio()
  if (!gb.muted.value && showBoot.value) gb.sfx.boot()
  gb.startMusic()
  window.removeEventListener('pointerdown', startSession)
  window.removeEventListener('touchstart', startSession)
}

// Pressing START / clicking the boot screen: ping, then clear it shortly after
// so the chime rings against the LCD before the content appears.
const proceedFromBoot = () => {
  startSession()
  clearTimeout(bootTimer)
  bootTimer = setTimeout(endBoot, 650)
}

/* ----------------------------------------------------------------------
   Keyboard control
   ---------------------------------------------------------------------- */
/* ----------------------------------------------------------------------
   Easter eggs
   ---------------------------------------------------------------------- */
// Konami code -> unlock secret palettes + fanfare + pixel-coin rain
const KONAMI = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a']
let kPos = 0
const cheatToast = ref(false)
const coins = ref<{ id: number; left: number; delay: number; dur: number; glyph: string }[]>([])
let coinId = 0
const spawnCoins = () => {
  const glyphs = ['◆', '★', '♥', '●', '▲']
  coins.value = Array.from({ length: 28 }, () => ({
    id: coinId++,
    left: Math.random() * 96 + 2,
    delay: Math.random() * 0.9,
    dur: 1.6 + Math.random() * 1.6,
    glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
  }))
  setTimeout(() => { coins.value = [] }, 3600)
}
const triggerCheat = () => {
  gb.cheatParty()       // unlock secrets + rainbow palette + party track
  gb.sfx.cheat()
  cheatToast.value = true
  spawnCoins()
  setTimeout(() => { cheatToast.value = false }, 2800)
}
// Fed by BOTH the keyboard and the on-screen deck (onDir/onA/onB).
// Returns true when the input should be swallowed (konami is consuming it).
const feedKonami = (token: string): boolean => {
  kPos = (token === KONAMI[kPos]) ? kPos + 1 : (token === KONAMI[0] ? 1 : 0)
  if (kPos === KONAMI.length) { kPos = 0; triggerCheat(); return true }
  return kPos >= 5   // swallow the ←→←→ B A tail so it doesn't navigate (keyboard or clicks)
}

// Power LED -> CRT power-cycle blink
const powerBlink = ref(false)
const triggerPower = () => {
  gb.unlockAudio(); gb.sfx.toggle()
  powerBlink.value = false
  requestAnimationFrame(() => {
    powerBlink.value = true
    setTimeout(() => { powerBlink.value = false }, 2050)
  })
}

// Idle screensaver
const idle = ref(false)
let idleTimer: any = null
const resetIdle = () => {
  if (idle.value) idle.value = false
  clearTimeout(idleTimer)
  idleTimer = setTimeout(() => { idle.value = true }, 45000)
}

// Secret SNAKE minigame
const gameOpen = ref(false)
const gameRef = ref<any>(null)
const currentGame = ref<'snake' | 'rpg'>('rpg')
const openGame = (which: 'snake' | 'rpg' = 'rpg') => { currentGame.value = which; gb.unlockAudio(); gb.sfx.select(); idle.value = false; gameOpen.value = true }
const closeGame = () => { gb.sfx.back(); gameOpen.value = false }
watch(gameOpen, (v) => lockScroll(v))
// hidden trigger: triple-click the "DOT MATRIX WITH STEREO SOUND" label
let labelClicks = 0
let labelTimer: any = null
const onLabelClick = () => {
  labelClicks += 1
  clearTimeout(labelTimer)
  labelTimer = setTimeout(() => { labelClicks = 0 }, 700)
  if (labelClicks >= 3) { labelClicks = 0; openGame('rpg') }
}

const onKey = (e: KeyboardEvent) => {
  const el = e.target as HTMLElement | null
  const tag = (el?.tagName || '').toLowerCase()
  if (['input', 'textarea', 'select'].includes(tag) || el?.isContentEditable) return
  resetIdle()
  if (showBoot.value) { proceedFromBoot(); return }
  // minigame captures input
  if (gameOpen.value) {
    switch (e.key) {
      case 'ArrowUp': e.preventDefault(); gameRef.value?.input('up'); break
      case 'ArrowDown': e.preventDefault(); gameRef.value?.input('down'); break
      case 'ArrowLeft': e.preventDefault(); gameRef.value?.input('left'); break
      case 'ArrowRight': e.preventDefault(); gameRef.value?.input('right'); break
      case 'Enter': gameRef.value?.confirm?.(); break
      case 'Escape': e.preventDefault(); closeGame(); break
      case 'Backspace': e.preventDefault(); if (!gameRef.value?.cancel?.()) closeGame(); break
    }
    return
  }
  startSession()
  switch (e.key) {
    // Arrows + Enter/Backspace feed the Konami detector via onDir/onA/onB.
    case 'ArrowUp': e.preventDefault(); onDir('up'); break
    case 'ArrowDown': e.preventDefault(); onDir('down'); break
    case 'ArrowLeft': onDir('left'); break
    case 'ArrowRight': onDir('right'); break
    case 'Enter': onA(); break
    case 'Escape': if (gb.menuOpen.value) gb.closeMenu(); break
    case 'Backspace': e.preventDefault(); onB(); break
    // letter b / a also feed the Konami tail (don't navigate)
    case 'b': case 'B': if (feedKonami('b')) e.preventDefault(); break
    case 'a': case 'A': if (feedKonami('a')) e.preventDefault(); break
    case 'm': case 'M': gb.toggleMute(); break
    case 'p': case 'P': gb.cyclePalette(); break
    case 's': case 'S': onStart(); break
    case 'c': case 'C': gb.toggleDeck(); break
  }
}

onMounted(async () => {
  gb.hydrate()
  // boot only once per browser session
  let already = false
  try { already = !!sessionStorage.getItem('gb-booted') } catch {}
  if (already) {
    showBoot.value = false
    gb.finishBoot()
  } else {
    lockScroll(true)
    bootTimer = setTimeout(endBoot, 2700)
  }
  window.addEventListener('keydown', onKey)
  window.addEventListener('pointerdown', startSession)
  window.addEventListener('touchstart', startSession)

  // idle screensaver
  ;['mousemove', 'pointerdown', 'touchstart', 'scroll', 'wheel'].forEach((ev) =>
    window.addEventListener(ev, resetIdle, { passive: true }))
  resetIdle()

  // console easter egg
  try {
    console.log('%c ▶ LASSE HARM — GAME BOY EDITION ',
      'background:#0d1609;color:#9bbc0f;font:700 13px monospace;padding:6px 10px;border-radius:4px')
    console.log('%cPsst… try the Konami code on the page:  ↑ ↑ ↓ ↓ ← → ← → B A',
      'color:#a282e0;font:12px monospace')
  } catch {}

  // schema (preserved)
  try {
    const [p, b] = await Promise.all([fetch('/schemas/person.json'), fetch('/schemas/business.json')])
    if (p.ok && b.ok) { personSchema.value = await p.json(); businessSchema.value = await b.json() }
  } catch (err) { console.error('Error loading schema:', err) }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('pointerdown', startSession)
  window.removeEventListener('touchstart', startSession)
  ;['mousemove', 'pointerdown', 'touchstart', 'scroll', 'wheel'].forEach((ev) =>
    window.removeEventListener(ev, resetIdle))
  clearTimeout(idleTimer)
  gb.stopMusic()
  clearTimeout(bootTimer)
  clearTimeout(pressTimer)
  lockScroll(false)
})

// close the menu/dropdown after a route change
watch(() => route.path, () => { gb.closeMenu(); photoOpen.value = false })
</script>

<template>
  <div class="gb-console min-h-screen bg-dark text-gray-300" :class="{ 'deck-collapsed': !gb.deckOpen.value }">

    <!-- ================= BOOT SEQUENCE ================= -->
    <transition name="boot-fade">
      <div v-if="showBoot" class="gb-boot" @click="proceedFromBoot">
        <div class="gb-boot-inner screen-scanlines screen-dots">
          <div class="gb-boot-logo animate-boot-drop">
            <span class="font-pixel gb-boot-brand">LASSE HARM</span>
            <span class="font-pixel gb-boot-tm">™</span>
          </div>
          <p class="font-pixel gb-boot-hint animate-blink">LOADING…</p>
        </div>
      </div>
    </transition>

    <!-- ================= TOP CONSOLE HEADER ================= -->
    <header class="gb-header shell-surface">
      <div class="gb-header-inner">
        <!-- brand + power -->
        <div class="flex items-center gap-2 md:gap-3 min-w-0">
          <button class="gb-power-led animate-power-pulse" title="Power" aria-label="Power" @click="triggerPower"></button>
          <NuxtLink to="/" class="flex items-center gap-2 group min-w-0" @click="gb.sfx.select()">
            <span class="gb-avatar">
              <img src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/apekawb8my5xl5w/img_9077_topaz_denoiseraw_sharpen_no3Chl3kmx.jpg?thumb=120x120"
                   alt="Lasse Harm" class="pixelated" loading="lazy" />
            </span>
            <span class="gb-brand font-pixel hidden sm:inline">LASSE&nbsp;HARM</span>
          </NuxtLink>
        </div>

        <!-- desktop nav -->
        <nav class="hidden lg:flex items-center gap-1" aria-label="Primary">
          <template v-for="link in navLinks" :key="link.path">
            <div v-if="link.dropdown" class="relative" @mouseenter="photoOpen = true" @mouseleave="photoOpen = false">
              <button class="gb-nav-item" :class="{ 'gb-nav-active': isActive(link.path) }" @click="navTo(link.path)" @focus="gb.sfx.hover()">
                {{ link.label }} <span class="text-[8px]">▼</span>
              </button>
              <transition name="drop">
                <div v-if="photoOpen" class="gb-dropdown shell-surface">
                  <button v-for="pl in photoLinks" :key="pl.path" class="gb-drop-item" :class="{ 'gb-nav-active': isActive(pl.path) }"
                          @click="navTo(pl.path)" @mouseenter="gb.sfx.hover()">{{ pl.label }}</button>
                </div>
              </transition>
            </div>
            <NuxtLink v-else :to="link.path" class="gb-nav-item" :class="{ 'gb-nav-active': isActive(link.path) }"
                      @click="gb.sfx.select()" @mouseenter="gb.sfx.hover()">{{ link.label }}</NuxtLink>
          </template>
        </nav>

        <!-- right controls -->
        <div class="flex items-center gap-1.5 md:gap-2">
          <button class="gb-lang" @click="locale = locale === 'en' ? 'de' : 'en'; gb.sfx.toggle()" :aria-label="'Language: ' + locale">
            {{ locale.toUpperCase() }}
          </button>
          <button class="gb-icon-btn" @click="gb.toggleMute()" :aria-label="gb.muted.value ? 'Unmute' : 'Mute'" :title="gb.muted.value ? 'Sound off' : 'Sound on'">
            <Icon :name="gb.muted.value ? 'mdi:volume-off' : 'mdi:volume-high'" />
          </button>
          <!-- DMG volume wheel (drag / scroll) — desktop & tablet -->
          <div class="hidden sm:block"><GbVolumeKnob /></div>
          <button class="gb-icon-btn" @click="gb.toggleMusic()" :aria-label="gb.musicOn.value ? 'Turn music off' : 'Turn music on'" :title="gb.musicOn.value ? 'Music on' : 'Music off'">
            <Icon :name="gb.musicOn.value ? 'mdi:music' : 'mdi:music-off'" />
          </button>
          <button class="gb-icon-btn" @click="gb.cyclePalette()" aria-label="Toggle screen palette" title="Swap LCD palette">
            <Icon :name="gb.palette.value === 'night' ? 'mdi:weather-night' : 'mdi:white-balance-sunny'" />
          </button>
          <button class="gb-icon-btn lg:hidden" @click="onStart()" :aria-label="gb.menuOpen.value ? 'Close menu' : 'Open menu'">
            <Icon :name="gb.menuOpen.value ? 'mdi:close' : 'mdi:menu'" />
          </button>
        </div>
      </div>
      <div class="gb-header-stripe"></div>
    </header>

    <!-- ================= PER-PAGE ANIMATED BACKGROUND ================= -->
    <GbFlowBg v-if="flowVariant" :variant="flowVariant" />

    <!-- ================= SCREEN FX OVERLAY ================= -->
    <div class="gb-fx screen-scanlines screen-dots" aria-hidden="true">
      <div class="gb-fx-scan animate-scanline"></div>
      <div class="gb-fx-tint animate-flicker"></div>
      <div class="gb-fx-vignette"></div>
    </div>

    <!-- ================= LCD CONTENT ================= -->
    <main class="gb-screen">
      <slot />
    </main>

    <!-- ================= START / D-PAD MENU OVERLAY ================= -->
    <transition name="menu-fade">
      <div v-if="gb.menuOpen.value" class="gb-menu-overlay" @click.self="gb.closeMenu()">
        <div class="gb-menu shell-surface">
          <div class="gb-menu-screen screen-scanlines">
            <p class="gb-menu-title font-pixel">★ MENU</p>
            <ul>
              <li v-for="(item, i) in menuItems" :key="i">
                <button class="gb-menu-item font-pixel" :class="{ 'gb-menu-sel': i === menuIndex, 'pl-7': item.indent }"
                        @click="menuIndex = i; runMenuItem(item)" @mouseenter="menuIndex = i; gb.sfx.hover()">
                  <span class="gb-menu-cursor">{{ i === menuIndex ? '▶' : ' ' }}</span>{{ item.label }}
                </button>
              </li>
            </ul>
            <div class="gb-keys">
              <p class="gb-keys-title font-pixel">⌨ KEYBOARD</p>
              <ul class="gb-keys-list">
                <li><kbd>↑↓←→</kbd><span>Move / page</span></li>
                <li><kbd>Enter</kbd><span>A · select</span></li>
                <li><kbd>Esc</kbd><span>B · back</span></li>
                <li><kbd>S</kbd><span>Open menu</span></li>
                <li><kbd>M</kbd><span>Sound</span></li>
                <li><kbd>P</kbd><span>Palette</span></li>
                <li><kbd>C</kbd><span>Hide controls</span></li>
              </ul>
              <p class="gb-menu-hint font-pixel">▲▼ MOVE · A SELECT · B BACK · click works too</p>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- ================= BOTTOM CONTROL DECK ================= -->
    <footer class="gb-deck shell-surface" :class="{ 'is-collapsed': !gb.deckOpen.value }">
      <!-- fold / unfold tab (always visible) -->
      <button class="gb-deck-toggle" @click="gb.toggleDeck()"
              :aria-label="gb.deckOpen.value ? 'Hide controls' : 'Show controls'"
              :aria-expanded="gb.deckOpen.value">
        <span class="gb-deck-grip"></span>
        <span class="font-pixel">{{ gb.deckOpen.value ? '▼ HIDE' : '▲ CONTROLS' }}</span>
      </button>

      <div class="gb-deck-collapsible">
        <div class="gb-deck-label" @click="onLabelClick" title="">
          <span class="gb-dot"></span>
          <span class="font-pixel">DOT MATRIX WITH STEREO SOUND</span>
          <span class="gb-stripe"></span>
        </div>

        <div class="gb-deck-controls">
        <!-- D-PAD -->
        <div class="gb-dpad" role="group" aria-label="Direction pad">
          <button class="dpad-btn dpad-up" :class="{ 'is-down': pressed === 'up' }" @click="onDir('up')" aria-label="Up">▲</button>
          <button class="dpad-btn dpad-left" :class="{ 'is-down': pressed === 'left' }" @click="onDir('left')" aria-label="Previous page">◄</button>
          <span class="dpad-hub"></span>
          <button class="dpad-btn dpad-right" :class="{ 'is-down': pressed === 'right' }" @click="onDir('right')" aria-label="Next page">►</button>
          <button class="dpad-btn dpad-down" :class="{ 'is-down': pressed === 'down' }" @click="onDir('down')" aria-label="Down">▼</button>
        </div>

        <!-- center: speaker + start/select -->
        <div class="gb-center">
          <div class="gb-startselect">
            <button class="gb-pill" :class="{ 'is-down': pressed === 'select' }" @click="onSelect()" aria-label="Select — swap palette">
              <span class="gb-pill-cap"></span><span class="gb-pill-label font-pixel">SELECT</span>
            </button>
            <button class="gb-pill" :class="{ 'is-down': pressed === 'start' }" @click="onStart()" aria-label="Start — open menu">
              <span class="gb-pill-cap"></span><span class="gb-pill-label font-pixel">START</span>
            </button>
          </div>
          <div class="gb-speaker" aria-hidden="true">
            <span v-for="n in 24" :key="n"></span>
          </div>
        </div>

        <!-- A/B -->
        <div class="gb-ab" role="group" aria-label="Action buttons">
          <button class="ab-btn ab-b" :class="{ 'is-down': pressed === 'b' }" @click="onB()" aria-label="B — back">
            <span class="ab-face">B</span>
          </button>
          <button class="ab-btn ab-a" :class="{ 'is-down': pressed === 'a' }" @click="onA()" aria-label="A — select">
            <span class="ab-face">A</span>
          </button>
        </div>
      </div>

        <!-- footer strip welded into the bottom edge of the console -->
        <footer-component />
      </div>
    </footer>

    <!-- ================= EASTER EGGS ================= -->
    <!-- Konami: coin/heart rain + cheat toast -->
    <div v-if="coins.length" class="gb-coins" aria-hidden="true">
      <span v-for="c in coins" :key="c.id" class="gb-coin"
            :style="{ left: c.left + '%', animationDelay: c.delay + 's', animationDuration: c.dur + 's' }">{{ c.glyph }}</span>
    </div>
    <transition name="menu-fade">
      <div v-if="cheatToast" class="gb-cheat-toast">
        <div class="gb-cheat-box shell-surface">
          <p class="font-pixel gb-cheat-line">★ RAINBOW MODE ★</p>
          <p class="font-pixel gb-cheat-sub">PARTY TRACK ON · SELECT CYCLES PALETTES</p>
        </div>
      </div>
    </transition>

    <!-- Idle screensaver -->
    <transition name="menu-fade">
      <div v-if="idle" class="gb-saver" aria-hidden="true">
        <div class="gb-saver-sprite">
          <div class="gb-tile w-20 h-20">
            <img src="https://pocket.lasseharm.space/api/files/679z7gj3r5etrhr/apekawb8my5xl5w/img_9077_topaz_denoiseraw_sharpen_no3Chl3kmx.jpg?thumb=120x120" alt="" class="w-full h-full object-cover pixelated" />
          </div>
          <p class="font-pixel gb-saver-zzz">z z Z</p>
        </div>
      </div>
    </transition>

    <!-- Power-LED CRT power-cycle blink -->
    <div v-if="powerBlink" class="gb-powerfx" aria-hidden="true"></div>

    <!-- Secret SNAKE minigame -->
    <transition name="menu-fade">
      <div v-if="gameOpen" class="gb-game-overlay" @click.self="closeGame">
        <div class="gb-game shell-surface">
          <GbRpg v-if="currentGame === 'rpg'" ref="gameRef" />
          <GbSnake v-else ref="gameRef" />
          <button class="gb-game-close font-pixel" @click="closeGame">✕ EXIT</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* ---------- layout spacing so fixed chrome doesn't cover content ---------- */
.gb-screen {
  position: relative;
  z-index: 1;
  padding-top: 56px;
  padding-bottom: 196px;
  min-height: 100vh;
}
@media (min-width: 768px) {
  .gb-screen { padding-top: 60px; padding-bottom: 212px; }
}
/* When the deck is folded away, reclaim the space (only the toggle tab remains). */
.gb-console.deck-collapsed .gb-screen { padding-bottom: 64px; }
@media (min-width: 768px) {
  .gb-console.deck-collapsed .gb-screen { padding-bottom: 68px; }
}

/* ---------- plastic shell surface ---------- */
.shell-surface {
  background:
    linear-gradient(180deg, #e7e5dc 0%, #cdcabb 38%, #bcb9a8 100%);
  border-color: #b6b3a2;
  position: relative;
}
.shell-surface::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(120% 80% at 20% 0%, rgba(255,255,255,0.55), transparent 60%),
    radial-gradient(120% 120% at 100% 100%, rgba(0,0,0,0.12), transparent 55%);
}

/* ---------- TOP HEADER ---------- */
.gb-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 50;
  box-shadow: 0 4px 0 rgba(0,0,0,0.18), 0 8px 22px rgba(0,0,0,0.35);
}
.gb-header-inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  max-width: 1280px;
  margin: 0 auto;
  height: 52px;
  padding: 0 0.75rem;
}
@media (min-width: 768px) { .gb-header-inner { height: 56px; padding: 0 1.25rem; } }
.gb-header-stripe {
  position: relative; z-index: 2;
  height: 4px;
  background: repeating-linear-gradient(90deg, #7c4dc4 0 14px, #5b3490 14px 28px);
  opacity: 0.85;
}
.gb-power-led {
  width: 9px; height: 9px; border-radius: 9999px;
  background: #c0395f;
  box-shadow: 0 0 6px 1px rgba(192,57,95,0.8), inset 0 0 2px rgba(255,255,255,0.6);
  flex-shrink: 0;
}
.gb-avatar {
  width: 30px; height: 30px;
  border-radius: 4px;
  overflow: hidden;
  border: 2px solid #5b3490;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.3);
  flex-shrink: 0;
}
.gb-avatar img { width: 100%; height: 100%; object-fit: cover; }
.gb-brand {
  font-size: 0.62rem;
  color: #2c2c28;
  letter-spacing: 0.04em;
  text-shadow: 0 1px 0 rgba(255,255,255,0.4);
}
.gb-nav-item {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.52rem;
  letter-spacing: 0.03em;
  color: #3a382f;
  padding: 0.5rem 0.55rem;
  border-radius: 3px;
  transition: color 0.12s, background 0.12s;
  text-transform: uppercase;
}
.gb-nav-item:hover { color: #5b3490; background: rgba(124,77,196,0.12); }
.gb-nav-active { color: #5b3490 !important; text-shadow: 0 0 1px rgba(124,77,196,0.4); }
.gb-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 220px;
  padding: 6px;
  border-radius: 5px;
  border: 2px solid #8e8b7a;
  box-shadow: 0 10px 24px rgba(0,0,0,0.4);
  z-index: 60;
}
.gb-drop-item {
  display: block; width: 100%; text-align: left;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5rem;
  color: #3a382f;
  padding: 0.55rem 0.5rem;
  border-radius: 3px;
}
.gb-drop-item:hover { background: rgba(124,77,196,0.15); color: #5b3490; }
.gb-lang {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5rem;
  color: #2c2c28;
  border: 2px solid #8e8b7a;
  border-radius: 3px;
  padding: 0.35rem 0.4rem;
  background: rgba(255,255,255,0.25);
}
.gb-lang:hover { border-color: #5b3490; color: #5b3490; }
.gb-icon-btn {
  width: 30px; height: 30px;
  display: grid; place-items: center;
  font-size: 1rem;
  color: #2c2c28;
  border: 2px solid #8e8b7a;
  border-radius: 3px;
  background: rgba(255,255,255,0.25);
  transition: color 0.12s, border-color 0.12s, transform 0.08s;
}
.gb-icon-btn:hover { color: #5b3490; border-color: #5b3490; }
.gb-icon-btn:active { transform: translateY(1px); }

/* ---------- SCREEN FX OVERLAY ---------- */
.gb-fx {
  position: fixed;
  inset: 0;
  z-index: 30;
  pointer-events: none;
}
.gb-fx-scan {
  position: absolute;
  left: 0; right: 0;
  height: 22%;
  background: linear-gradient(180deg, transparent, rgba(255,255,255,0.045), transparent);
}
.gb-fx-tint { position: absolute; inset: 0; background: var(--lcd-tint); }
.gb-fx-vignette {
  position: absolute; inset: 0;
  box-shadow: inset 0 0 120px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.3);
}

/* ---------- BOOT ---------- */
.gb-boot {
  position: fixed; inset: 0;
  z-index: 70;
  display: grid; place-items: center;
  background: rgb(var(--c-bg));
  cursor: pointer;
  /* Fallback for JS-disabled clients: auto-dismiss so content stays usable.
     With JS the v-if removes it at ~2.7s, before this fade starts. */
  animation: boot-auto-dismiss 3.4s ease forwards;
}
@keyframes boot-auto-dismiss {
  0%, 90% { opacity: 1; }
  100% { opacity: 0; visibility: hidden; pointer-events: none; }
}
.gb-boot-inner {
  position: relative;
  width: min(86vw, 520px);
  aspect-ratio: 10 / 9;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 2rem;
  border-radius: 8px;
  background: rgb(var(--c-bg-100));
  box-shadow: inset 0 0 60px rgba(0,0,0,0.5);
  overflow: hidden;
}
.gb-boot-logo { display: inline-flex; align-items: flex-start; }
.gb-boot-brand {
  font-size: clamp(1rem, 5vw, 2rem);
  color: rgb(var(--c-green));
  letter-spacing: 0.02em;
  text-shadow: 0 0 18px rgb(var(--c-green) / 0.5);
}
.gb-boot-tm { font-size: 0.7rem; color: rgb(var(--c-ink-2)); margin-left: 4px; }
.gb-boot-hint { font-size: 0.6rem; color: rgb(var(--c-ink-2)); }

/* ---------- START MENU ---------- */
.gb-menu-overlay {
  position: fixed; inset: 0;
  z-index: 60;
  display: grid; place-items: center;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(2px);
  padding: 1rem;
}
.gb-menu {
  width: min(92vw, 340px);
  padding: 12px;
  border-radius: 10px;
  border: 3px solid #8e8b7a;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
}
.gb-menu-screen {
  position: relative;
  background: rgb(var(--c-bg));
  border-radius: 6px;
  padding: 14px 12px;
  box-shadow: inset 0 0 30px rgba(0,0,0,0.5);
  max-height: 80vh;
  overflow-y: auto;
}
.gb-menu-title { font-size: 0.7rem; color: rgb(var(--c-green)); margin-bottom: 10px; }
.gb-menu-item {
  display: flex; align-items: center; gap: 6px;
  width: 100%; text-align: left;
  font-size: 0.62rem;
  color: rgb(var(--c-ink-2));
  padding: 0.45rem 0.3rem;
  transition: color 0.1s;
}
.gb-menu-cursor { color: rgb(var(--c-green)); width: 0.8em; display: inline-block; }
.gb-menu-sel { color: rgb(var(--c-ink)); background: rgb(var(--c-green) / 0.12); }
.gb-menu-hint { font-size: 0.42rem; color: rgb(var(--c-ink-3)); margin-top: 12px; letter-spacing: 0.04em; line-height: 1.6; }

/* keyboard legend inside the START menu */
.gb-keys {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 2px dotted rgb(var(--c-green) / 0.25);
}
.gb-keys-title { font-size: 0.5rem; color: rgb(var(--c-green)); margin-bottom: 10px; }
.gb-keys-list { display: flex; flex-direction: column; gap: 7px; margin-bottom: 10px; }
.gb-keys-list li { display: flex; align-items: center; gap: 9px; font-size: 0.5rem; color: rgb(var(--c-ink-2)); }
.gb-keys kbd {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.42rem;
  line-height: 1;
  color: rgb(var(--c-bg));
  background: rgb(var(--c-green));
  border-radius: 3px;
  box-shadow: 0 2px 0 rgb(var(--c-green) / 0.4);
  padding: 5px 6px;
  min-width: 3.4rem;
  text-align: center;
  flex-shrink: 0;
}

/* ---------- BOTTOM DECK ---------- */
.gb-deck {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  z-index: 50;
  box-shadow: 0 -4px 0 rgba(0,0,0,0.18), 0 -8px 22px rgba(0,0,0,0.35);
}

/* fold / unfold tab */
.gb-deck-toggle {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 7px 8px 6px;
  color: #45433a;
  border-bottom: 2px solid rgba(44, 44, 40, 0.2);
}
.gb-deck-toggle .font-pixel { font-size: 0.46rem; letter-spacing: 0.06em; }
.gb-deck-toggle:hover { color: #5b3490; }
.gb-deck-grip {
  width: 42px;
  height: 5px;
  border-radius: 999px;
  background: #8e8b7a;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.4);
}
.gb-deck-toggle:hover .gb-deck-grip { background: #5b3490; }

/* collapsible body */
.gb-deck-collapsible {
  overflow: hidden;
  max-height: 460px;
  opacity: 1;
  transition: max-height 0.32s ease, opacity 0.22s ease;
}
.gb-deck.is-collapsed .gb-deck-collapsible {
  max-height: 0;
  opacity: 0;
}

.gb-deck-label {
  position: relative; z-index: 2;
  display: flex; align-items: center; justify-content: center;
  gap: 8px;
  padding: 9px 8px 4px;
  font-size: 0.42rem;
}
.gb-deck-label .font-pixel { color: #5b3490; letter-spacing: 0.05em; font-size: 0.42rem; }
.gb-dot { width: 7px; height: 7px; border-radius: 9999px; background: #c0395f; box-shadow: 0 0 5px rgba(192,57,95,0.7); }
.gb-stripe { width: 60px; height: 4px; background: repeating-linear-gradient(90deg,#7c4dc4 0 8px,transparent 8px 14px); }
.gb-deck-controls {
  position: relative; z-index: 2;
  display: flex; align-items: center; justify-content: space-between;
  gap: 0.5rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 1.2rem 10px;
}

/* D-PAD */
.gb-dpad {
  position: relative;
  width: 84px; height: 84px;
  flex-shrink: 0;
}
.dpad-btn {
  position: absolute;
  display: grid; place-items: center;
  width: 28px; height: 28px;
  background: linear-gradient(180deg, #44443f, #232320);
  color: #d8d6cc;
  font-size: 0.6rem;
  border: 1px solid #15150f;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 3px rgba(0,0,0,0.4);
  transition: transform 0.07s, background 0.1s, color 0.1s;
}
.dpad-up { top: 0; left: 28px; border-radius: 5px 5px 0 0; }
.dpad-down { bottom: 0; left: 28px; border-radius: 0 0 5px 5px; }
.dpad-left { top: 28px; left: 0; border-radius: 5px 0 0 5px; }
.dpad-right { top: 28px; right: 0; border-radius: 0 5px 5px 0; }
.dpad-hub {
  position: absolute; top: 28px; left: 28px;
  width: 28px; height: 28px;
  background: #2b2b26;
  box-shadow: inset 0 0 4px rgba(0,0,0,0.7);
}
.dpad-hub::after {
  content: ''; position: absolute; inset: 8px; border-radius: 9999px;
  background: radial-gradient(circle at 40% 35%, #3d3d36, #1c1c17);
}
.dpad-btn:hover { color: #aee04a; }
.dpad-btn.is-down, .dpad-btn:active {
  transform: scale(0.9);
  background: linear-gradient(180deg, #232320, #111);
  color: #9bbc0f;
}

/* CENTER */
.gb-center { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.gb-startselect { display: flex; gap: 16px; transform: rotate(-22deg); }
.gb-pill { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.gb-pill-cap {
  width: 36px; height: 11px; border-radius: 9999px;
  background: linear-gradient(180deg, #6a6657, #46443a);
  border: 1px solid #2c2b24;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 3px rgba(0,0,0,0.35);
  transition: transform 0.07s, background 0.1s;
}
.gb-pill-label { font-size: 0.36rem; color: #45433a; transform: rotate(0deg); }
.gb-pill:hover .gb-pill-cap { background: linear-gradient(180deg,#7c4dc4,#5b3490); }
.gb-pill.is-down .gb-pill-cap, .gb-pill:active .gb-pill-cap { transform: translateY(2px) scaleY(0.85); }
.gb-speaker {
  display: grid;
  grid-template-columns: repeat(6, 5px);
  gap: 4px;
  transform: rotate(-22deg);
}
.gb-speaker span { width: 5px; height: 5px; border-radius: 9999px; background: rgba(0,0,0,0.35); box-shadow: inset 0 1px 1px rgba(0,0,0,0.5); }

/* A / B */
.gb-ab { display: flex; align-items: flex-end; gap: 14px; transform: rotate(-22deg); flex-shrink: 0; }
.ab-btn {
  width: 42px; height: 42px; border-radius: 9999px;
  display: grid; place-items: center;
  border: none;
  transition: transform 0.07s, box-shadow 0.07s;
}
.ab-b { transform: translateY(14px); }
.ab-btn .ab-face {
  width: 100%; height: 100%; border-radius: 9999px;
  display: grid; place-items: center;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6rem;
  transform: rotate(22deg);
}
.ab-a .ab-face {
  background: radial-gradient(circle at 38% 32%, #c0395f, #7a1d3a);
  color: #ffd9e4;
  box-shadow: inset 0 2px 3px rgba(255,255,255,0.3), 0 4px 0 #4d1224, 0 6px 8px rgba(0,0,0,0.4);
}
.ab-b .ab-face {
  background: radial-gradient(circle at 38% 32%, #8e6fd0, #5b3490);
  color: #ece1ff;
  box-shadow: inset 0 2px 3px rgba(255,255,255,0.3), 0 4px 0 #3a205f, 0 6px 8px rgba(0,0,0,0.4);
}
.ab-btn.is-down, .ab-btn:active { transform: translateY(2px); }
.ab-b.is-down, .ab-b:active { transform: translateY(16px); }
.ab-btn.is-down .ab-face, .ab-btn:active .ab-face { box-shadow: inset 0 2px 4px rgba(0,0,0,0.4); }

/* hide speaker + slim deck on small screens */
@media (max-width: 640px) {
  .gb-speaker { display: none; }
  .gb-dpad { width: 72px; height: 72px; }
  .dpad-btn { width: 24px; height: 24px; }
  .dpad-up, .dpad-down { left: 24px; }
  .dpad-left, .dpad-right { top: 24px; }
  .dpad-hub { top: 24px; left: 24px; width: 24px; height: 24px; }
  .ab-btn { width: 36px; height: 36px; }
  .gb-deck-controls { padding: 16px 0.75rem 8px; }
  .gb-pill-cap { width: 30px; }
}

/* ---------- transitions ---------- */
.boot-fade-leave-active { transition: opacity 0.5s ease; }
.boot-fade-leave-to { opacity: 0; }
.menu-fade-enter-active, .menu-fade-leave-active { transition: opacity 0.18s ease; }
.menu-fade-enter-from, .menu-fade-leave-to { opacity: 0; }
.drop-enter-active, .drop-leave-active { transition: opacity 0.14s ease, transform 0.14s ease; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-6px); }

/* ---------- EASTER EGGS ---------- */
/* Konami coin/heart rain */
.gb-coins { position: fixed; inset: 0; z-index: 59; pointer-events: none; overflow: hidden; }
.gb-coin {
  position: absolute;
  top: -6%;
  font-size: 1.4rem;
  color: rgb(var(--c-green));
  text-shadow: 0 0 8px rgb(var(--c-green) / 0.6);
  animation-name: coin-fall;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes coin-fall {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translateY(112vh) rotate(540deg); opacity: 0.9; }
}

/* Cheat toast */
.gb-cheat-toast { position: fixed; inset: 0; z-index: 60; display: grid; place-items: center; pointer-events: none; }
.gb-cheat-box {
  border: 3px solid #8e8b7a;
  border-radius: 10px;
  padding: 16px 22px;
  text-align: center;
  box-shadow: 0 14px 40px rgba(0,0,0,0.6);
  animation: cheat-pop 0.3s steps(3) both;
}
.gb-cheat-line { position: relative; z-index: 2; font-size: 0.8rem; color: #5b3490; letter-spacing: 0.05em; }
.gb-cheat-sub { position: relative; z-index: 2; font-size: 0.45rem; color: #45433a; margin-top: 8px; }
@keyframes cheat-pop { 0% { transform: scale(0.4); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }

/* Idle screensaver — sprite bounces around (DVD-logo style) */
.gb-saver { position: fixed; inset: 0; z-index: 58; background: rgb(var(--c-bg) / 0.92); overflow: hidden; }
.gb-saver-sprite {
  position: absolute;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  animation: saver-x 8.5s linear infinite alternate, saver-y 6.1s linear infinite alternate;
}
.gb-saver-zzz { font-size: 0.55rem; color: rgb(var(--c-green)); }
@keyframes saver-x { from { left: 3%; } to { left: calc(97% - 80px); } }
@keyframes saver-y { from { top: 12%; } to { top: calc(88% - 110px); } }

/* Power-LED CRT power-cycle (slow shutdown -> dark hold -> power back on) */
.gb-powerfx {
  position: fixed; inset: 0; z-index: 64; pointer-events: none;
  background: #000; opacity: 0;
  animation: pf-screen 2s ease both;
}
.gb-powerfx::after {
  content: '';
  position: absolute;
  left: 0; right: 0; top: 50%;
  height: 100%;
  transform: translateY(-50%);
  transform-origin: center;
  background: linear-gradient(180deg, #c6de8b, #eafff0 50%, #c6de8b);
  box-shadow: 0 0 30px rgba(200, 255, 200, 0.7);
  animation: pf-beam 2s ease both;
}
@keyframes pf-screen {           /* the black "off" screen */
  0%   { opacity: 0; }
  9%   { opacity: 1; }
  86%  { opacity: 1; }           /* hold dark */
  100% { opacity: 0; }           /* power back on -> reveal page */
}
@keyframes pf-beam {             /* phosphor collapses to a line, then a dot, then re-expands */
  0%   { opacity: 0;   transform: translateY(-50%) scale(1, 1); }
  7%   { opacity: 0.95; transform: translateY(-50%) scale(1, 0.6); }
  20%  { opacity: 1;   transform: translateY(-50%) scale(1, 0.012); }
  32%  { opacity: 1;   transform: translateY(-50%) scale(0.03, 0.012); }
  46%  { opacity: 0;   transform: translateY(-50%) scale(0.03, 0.012); }
  84%  { opacity: 0;   transform: translateY(-50%) scale(1, 0.012); }
  90%  { opacity: 1;   transform: translateY(-50%) scale(1, 0.04); }
  100% { opacity: 0;   transform: translateY(-50%) scale(1, 1); }
}

/* Secret SNAKE minigame overlay */
.gb-game-overlay {
  position: fixed; inset: 0; z-index: 62;
  display: grid; place-items: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  padding: 1rem;
}
.gb-game {
  padding: 14px;
  border-radius: 10px;
  border: 3px solid #8e8b7a;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
}
.gb-game > .gb-snake { position: relative; z-index: 2; }
.gb-game-close {
  position: relative; z-index: 2;
  display: block; margin: 12px auto 2px;
  font-size: 0.5rem; color: #45433a;
  border: 2px solid #8e8b7a; border-radius: 4px;
  padding: 6px 10px; background: rgba(255, 255, 255, 0.25);
}
.gb-game-close:hover { color: #5b3490; border-color: #5b3490; }

@media (prefers-reduced-motion: reduce) {
  .animate-boot-drop, .animate-blink, .animate-power-pulse, .animate-scanline, .animate-flicker { animation: none !important; }
  .gb-coin, .gb-saver-sprite { animation: none !important; }
}
</style>
