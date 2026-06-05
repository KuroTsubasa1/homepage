<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

/*
 * MONSTA QUEST — a tiny Pokémon-like RPG: a town with enterable houses + NPCs,
 * grass encounter spots, 4 monsters (2 attacks each), turn-based battles with
 * capture, a persistent team, and a "caught them all" confetti finale.
 * Driven by the console shell via the exposed input(dir) / confirm() / cancel().
 */
const gb = useGameboy()

type Move = { name: string; pow: number }
type Mon = { key: string; name: string; color: string; maxHp: number; hp: number; moves: [Move, Move] }
type Dir = 'up' | 'down' | 'left' | 'right'

const DEX: Record<string, { key: string; name: string; color: string; maxHp: number; moves: [Move, Move] }> = {
  sproutle: { key: 'sproutle', name: 'SPROUTLE', color: '#7bc043', maxHp: 26, moves: [{ name: 'VINE WHIP', pow: 6 }, { name: 'LEAF SLASH', pow: 9 }] },
  emberit:  { key: 'emberit',  name: 'EMBERIT',  color: '#e8643c', maxHp: 22, moves: [{ name: 'EMBER', pow: 7 }, { name: 'FLAME DASH', pow: 10 }] },
  bubblio:  { key: 'bubblio',  name: 'BUBBLIO',  color: '#3ca6e8', maxHp: 28, moves: [{ name: 'BUBBLE', pow: 5 }, { name: 'AQUA JET', pow: 9 }] },
  sparkit:  { key: 'sparkit',  name: 'SPARKIT',  color: '#e8c63c', maxHp: 20, moves: [{ name: 'SPARK', pow: 8 }, { name: 'THUNDER ZAP', pow: 11 }] },
}
const SPECIES = Object.keys(DEX)
const makeMon = (key: string): Mon => {
  const s = DEX[key]
  return { key: s.key, name: s.name, color: s.color, maxHp: s.maxHp, hp: s.maxHp, moves: s.moves }
}

// ---- 13x13 pixel-art monster sprites: feature on top + shared body ----
const BODY = [
  '....KKKKK....', '..KKBBBBBKK..', '.KBBBBBBBBBK.', '.KBWWBBBWWBK.', '.KBWKBBBKWBK.',
  '.KBBBBBBBBBK.', '..KBBKKKBBK..', '..KBDDDDDBK..', '...KKKKKKK...', '....K...K....',
]
const FEATURE: Record<string, string[]> = {
  sproutle: ['......A......', '.....AAA.....', '......K......'],
  emberit:  ['...A..A..A...', '...AAAAAAA...', '....KKKKK....'],
  bubblio:  ['.....KAK.....', '....KAAAK....', '....KKKKK....'],
  sparkit:  ['.A.A.A.A.A.A.', '.AAAAAAAAAAA.', '....KKKKK....'],
}
const ACCENT: Record<string, string> = { sproutle: '#39a83a', emberit: '#ffd23c', bubblio: '#bfeaff', sparkit: '#fff14a' }
const shade = (hex: string, amt: number) => {
  const n = parseInt(hex.slice(1), 16)
  const cl = (v: number) => Math.max(0, Math.min(255, Math.round(v)))
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  if (amt >= 0) { r += (255 - r) * amt; g += (255 - g) * amt; b += (255 - b) * amt }
  else { const f = 1 + amt; r *= f; g *= f; b *= f }
  return '#' + [cl(r), cl(g), cl(b)].map((v) => v.toString(16).padStart(2, '0')).join('')
}
const spriteOf = (m: Mon) => [...(FEATURE[m.key] || FEATURE.sproutle), ...BODY]
const colorsOf = (m: Mon) => ({ B: m.color, D: shade(m.color, -0.35), L: shade(m.color, 0.4), K: '#15150f', W: '#f4f4e6', A: ACCENT[m.key] || '#fff' })

// ---- maps (all 13x11). town: W tree, H house roof/wall, D door, C heal, G grass.
//      interiors: # wall, . floor, T table, P plant, B bed, X exit mat ----
const COLS = 13, ROWS = 11, CELL = 20
const W = COLS * CELL, H = ROWS * CELL
const MAPS: Record<string, string[]> = {
  town: [
    'WWWWWWWWWWWWW',
    'W..G..HH..G.W',
    'W..G..DH....W',
    'W...........W',
    'WGG...C...GGW',
    'WGG.......GGW',
    'W...........W',
    'W..HH....HH.W',
    'W..DH....DH.W',
    'W..........GW',
    'WWWWWWWWWWWWW',
  ],
  lab: [
    '#############', '#...........#', '#.TT.....TT.#', '#...........#', '#...........#',
    '#...........#', '#.P.......P.#', '#...........#', '#.....X.....#', '#...........#', '#############',
  ],
  home1: [
    '#############', '#BB.......T.#', '#BB.........#', '#...........#', '#...........#',
    '#...........#', '#.........P.#', '#...........#', '#.....X.....#', '#...........#', '#############',
  ],
  home2: [
    '#############', '#.........BB#', '#T........BB#', '#T..........#', '#...........#',
    '#...........#', '#.P.......P.#', '#...........#', '#.....X.....#', '#...........#', '#############',
  ],
}
// Each door leads to its OWN interior — no room is shared.
const DOORS: Record<string, { to: string; sx: number; sy: number }> = {
  '6,2': { to: 'lab', sx: 6, sy: 6 },
  '3,8': { to: 'home1', sx: 6, sy: 6 },
  '9,8': { to: 'home2', sx: 6, sy: 6 },
}
// `done` lines are shown instead of `lines` once every monster is caught.
type Npc = { map: string; x: number; y: number; cap: string; shirt: string; lines: string[]; done?: string[] }
const NPCS: Npc[] = [
  { map: 'town', x: 4, y: 3, cap: '#c0395f', shirt: '#3a3a37', lines: ['Wild monsters hide in the tall grass!', 'Walk through it to find them.'] },
  { map: 'town', x: 8, y: 6, cap: '#3ca6e8', shirt: '#2c2c28', lines: ['The red cross heals your whole team.', 'Step on it any time.'] },
  { map: 'town', x: 6, y: 9, cap: '#e8c63c', shirt: '#4a3a20', lines: ['Catch all four monsters...', '...and something special happens! ★'], done: ['You really did it!', 'You caught every last one!'] },
  {
    map: 'lab', x: 6, y: 3, cap: '#7c4dc4', shirt: '#e8e8e0',
    lines: ['Welcome to my lab!', 'I study the four monsters.', 'Bring them all and I will be amazed!'],
    done: ['You... you caught ALL FOUR!', 'I am truly amazed, MONSTA MASTER!', "Here's your hero's welcome! ★"],
  },
  { map: 'home1', x: 6, y: 4, cap: '#39a83a', shirt: '#c0395f', lines: ['Make yourself at home.', "Cosy little town, isn't it?"] },
  { map: 'home2', x: 6, y: 4, cap: '#3ca6e8', shirt: '#4a3a20', lines: ['I love watching the monsters in the grass.', 'But catching them takes real courage!'] },
]

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
const currentMap = ref('town')
const map = () => MAPS[currentMap.value]
const px = ref(6), py = ref(6)
const facing = ref<Dir>('down')
let returnTo = { map: 'town', x: 6, y: 7, facing: 'down' as Dir }

const mode = ref<'world' | 'battle'>('world')
const bstate = ref<'menu' | 'moves' | 'msg'>('menu')
const sel = ref(0)
const msgs = ref<string[]>([])
let afterMsg: (() => void) | null = null
const enemy = ref<Mon | null>(null)
const party = ref<Mon[]>([makeMon('sproutle')])
const active = ref(0)
const caught = ref<string[]>(['sproutle'])
const worldMsg = ref('')
let worldMsgTimer: any = null
const dialog = ref<string[]>([])
const dialogReward = ref(false) // the active dialogue ends in a confetti ceremony
const wonAll = ref(false)
const confetti = ref<{ id: number; left: number; delay: number; dur: number; color: string }[]>([])
const MENU = ['FIGHT', 'CATCH', 'SWAP', 'RUN']
const CONF_COLORS = ['#7bc043', '#e8643c', '#3ca6e8', '#e8c63c', '#7c4dc4', '#f4f4e6']

const cur = computed(() => party.value[active.value])
const rnd = (n: number) => Math.floor(Math.random() * n)
const colorVar = (name: string, alpha?: number) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '155 188 15'
  return alpha != null ? `rgb(${v} / ${alpha})` : `rgb(${v})`
}
const hpStyle = (m: Mon) => {
  const r = m.hp / m.maxHp
  return { width: Math.max(0, r * 100) + '%', background: r > 0.5 ? '#9bcc2f' : r > 0.2 ? '#e0c020' : '#e0506a' }
}
const tile = (x: number, y: number) => map()[y]?.[x] ?? '#'
const walkable = (c: string) => c === '.' || c === 'G' || c === 'C' || c === 'D' || c === 'X'
const npcAt = (m: string, x: number, y: number) => NPCS.find((n) => n.map === m && n.x === x && n.y === y)

// ---- rendering ----
const draw = () => {
  if (!ctx) return
  const g = ctx
  const F = (x: number, y: number, w: number, h: number, c: string) => { g.fillStyle = c; g.fillRect(x, y, w, h) }
  const C = {
    path: colorVar('--c-bg-200'), pathHi: colorVar('--c-bg-300'), floor: colorVar('--c-bg-300'),
    grass: colorVar('--c-green', 0.5), gBlade: colorVar('--c-green'), gDark: colorVar('--c-green', 0.7),
    treeF: colorVar('--c-green'), treeHi: colorVar('--c-green', 0.45), treeD: colorVar('--c-bg-400'),
    roof: colorVar('--c-velvet'), roofD: colorVar('--c-velvet', 0.6), roofHi: colorVar('--c-velvet', 0.4),
    wall: colorVar('--c-bg-100'), wallD: colorVar('--c-bg-400'), win: colorVar('--c-green-2'),
    heal: colorVar('--c-crimson'), pad: colorVar('--c-bg-300'), bg: colorVar('--c-bg'),
    matc: colorVar('--c-green', 0.6),
  }
  const trunk = '#6b4a2a', skin = '#e8c79c', wood = '#7a5a32'
  const isTown = currentMap.value === 'town'

  const grass = (tx: number, ty: number) => {
    F(tx, ty, CELL, CELL, C.grass)
    const b = [[4, 11], [9, 8], [14, 12], [6, 15], [12, 15], [16, 9]]
    b.forEach(([bx, by], i) => F(tx + bx, ty + by, 2, CELL - by - 1, i % 2 ? C.gDark : C.gBlade))
  }
  const tree = (tx: number, ty: number) => {
    F(tx + 8, ty + 12, 4, 7, trunk); F(tx + 3, ty + 4, 14, 9, C.treeF); F(tx + 5, ty + 2, 10, 4, C.treeF)
    F(tx + 5, ty + 4, 4, 3, C.treeHi); F(tx + 4, ty + 11, 12, 2, C.treeD)
  }
  const roof = (tx: number, ty: number) => {
    F(tx, ty + 6, CELL, CELL - 6, C.roof); F(tx + 3, ty + 3, CELL - 6, 4, C.roof)
    F(tx + 3, ty + 4, CELL - 6, 2, C.roofHi); F(tx, ty + CELL - 3, CELL, 3, C.roofD)
  }
  const wall2 = (tx: number, ty: number) => {
    F(tx, ty, CELL, CELL, C.wall); F(tx, ty, CELL, 2, C.roofD)
    F(tx + 5, ty + 6, 10, 8, C.wallD); F(tx + 6, ty + 7, 8, 6, C.win); F(tx + 9, ty + 7, 2, 6, C.wallD)
  }
  const door = (tx: number, ty: number) => {
    F(tx, ty, CELL, CELL, C.wall); F(tx, ty, CELL, 2, C.roofD)
    F(tx + 6, ty + 5, 8, CELL - 5, C.wallD); F(tx + 7, ty + 7, 6, CELL - 7, C.bg)
    F(tx + 11, ty + 12, 1, 2, C.win) // knob
  }
  const heal = (tx: number, ty: number) => {
    F(tx, ty, CELL, CELL, C.pad); F(tx + 1, ty + 1, CELL - 2, CELL - 2, C.path)
    F(tx + 8, ty + 4, 4, 12, C.heal); F(tx + 4, ty + 8, 12, 4, C.heal)
  }
  const iwall = (tx: number, ty: number) => {
    F(tx, ty, CELL, CELL, C.wallD)
    F(tx + 1, ty + 1, CELL - 2, 8, C.wall); F(tx + 1, ty + 11, CELL - 2, 8, C.wall)
  }
  const table = (tx: number, ty: number) => { F(tx + 2, ty + 6, CELL - 4, 10, wood); F(tx + 2, ty + 6, CELL - 4, 3, shade(wood, 0.25)) }
  const plant = (tx: number, ty: number) => { F(tx + 7, ty + 12, 6, 6, trunk); F(tx + 5, ty + 3, 10, 9, C.treeF); F(tx + 6, ty + 4, 4, 3, C.treeHi) }
  const bed = (tx: number, ty: number) => { F(tx + 2, ty + 3, CELL - 4, CELL - 5, C.heal); F(tx + 3, ty + 4, CELL - 6, 6, '#f0ece0') }
  const mat = (tx: number, ty: number) => { F(tx + 3, ty + 7, CELL - 6, CELL - 11, C.matc) }
  const drawChar = (tx: number, ty: number, cap: string, shirt: string, dir: Dir, showFace: boolean) => {
    const ink = C.bg
    F(tx + 5, ty + 2, 10, 4, cap); F(tx + 4, ty + 5, 12, 2, cap); F(tx + 6, ty + 6, 8, 5, skin)
    if (showFace && dir !== 'up') {
      const ey = ty + 8
      if (dir === 'left') F(tx + 6, ey, 2, 2, ink)
      else if (dir === 'right') F(tx + 12, ey, 2, 2, ink)
      else { F(tx + 7, ey, 2, 2, ink); F(tx + 11, ey, 2, 2, ink) }
    }
    F(tx + 5, ty + 11, 10, 6, shirt); F(tx + 6, ty + 17, 3, 2, ink); F(tx + 11, ty + 17, 3, 2, ink)
  }

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const tx = x * CELL, ty = y * CELL, ch = map()[y][x]
      F(tx, ty, CELL, CELL, isTown ? C.path : C.floor)
      if (isTown) {
        if (((x * 7 + y * 5) % 5) === 0) F(tx + 5, ty + 13, 2, 2, C.pathHi)
        if (((x * 3 + y * 11) % 4) === 0) F(tx + 13, ty + 6, 2, 2, C.pathHi)
      } else if (ch === '.') {
        F(tx, ty, CELL, 1, C.pathHi); F(tx, ty, 1, CELL, C.pathHi) // floor tile grid
      }
      if (ch === 'G') grass(tx, ty)
      else if (ch === 'W') tree(tx, ty)
      else if (ch === 'C') heal(tx, ty)
      else if (ch === 'D') door(tx, ty)
      else if (ch === 'H') { if (map()[y - 1]?.[x] !== 'H') roof(tx, ty); else wall2(tx, ty) }
      else if (ch === '#') iwall(tx, ty)
      else if (ch === 'T') table(tx, ty)
      else if (ch === 'P') plant(tx, ty)
      else if (ch === 'B') bed(tx, ty)
      else if (ch === 'X') mat(tx, ty)
    }
  }
  NPCS.filter((n) => n.map === currentMap.value).forEach((n) => drawChar(n.x * CELL, n.y * CELL, n.cap, n.shirt, 'down', true))
  drawChar(px.value * CELL, py.value * CELL, colorVar('--c-green'), colorVar('--c-velvet'), facing.value, true)
}

const setWorldMsg = (s: string) => {
  worldMsg.value = s
  clearTimeout(worldMsgTimer)
  worldMsgTimer = setTimeout(() => { worldMsg.value = '' }, 1900)
}

// ---- world movement + warps ----
const facedTile = () => {
  const dx = facing.value === 'left' ? -1 : facing.value === 'right' ? 1 : 0
  const dy = facing.value === 'up' ? -1 : facing.value === 'down' ? 1 : 0
  return { x: px.value + dx, y: py.value + dy }
}
const enterDoor = (dx: number, dy: number) => {
  const d = DOORS[`${dx},${dy}`]
  if (!d) return
  returnTo = { map: currentMap.value, x: dx, y: dy + 1, facing: 'down' }
  currentMap.value = d.to
  px.value = d.sx; py.value = d.sy; facing.value = 'down'
  gb.sfx.select(); draw()
}
const exitDoor = () => {
  currentMap.value = returnTo.map
  px.value = returnTo.x; py.value = returnTo.y; facing.value = returnTo.facing
  gb.sfx.back(); draw()
}
const moveBy = (dir: Dir) => {
  facing.value = dir
  const dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0
  const dy = dir === 'up' ? -1 : dir === 'down' ? 1 : 0
  const nx = px.value + dx, ny = py.value + dy
  const c = tile(nx, ny)
  if (!walkable(c) || npcAt(currentMap.value, nx, ny)) { draw(); return }
  px.value = nx; py.value = ny
  gb.sfx.move(); draw()
  if (c === 'C') { healAll(); setWorldMsg('Your team was healed!') }
  else if (c === 'D') enterDoor(nx, ny)
  else if (c === 'X') exitDoor()
  else if (c === 'G' && currentMap.value === 'town' && Math.random() < 0.16) startEncounter()
}
const healAll = () => party.value.forEach((m) => { m.hp = m.maxHp })

const startEncounter = () => {
  enemy.value = makeMon(SPECIES[rnd(SPECIES.length)])
  if (cur.value.hp <= 0) { const i = party.value.findIndex((m) => m.hp > 0); if (i >= 0) active.value = i }
  mode.value = 'battle'
  gb.sfx.select()
  queue([`Wild ${enemy.value.name} appeared!`], toMenu)
}

// ---- battle ----
const queue = (m: string[], after: (() => void) | null) => { msgs.value = m.slice(); afterMsg = after; bstate.value = 'msg' }
const advance = () => { msgs.value.shift(); if (msgs.value.length === 0) { const a = afterMsg; afterMsg = null; if (a) a() } }
const toMenu = () => { bstate.value = 'menu'; sel.value = 0 }
const calc = (mv: Move) => { const crit = Math.random() < 0.12 ? 1.6 : 1; return Math.max(1, Math.round((mv.pow + rnd(4)) * crit)) }
const playerAttack = (mv: Move) => {
  if (!enemy.value) return
  enemy.value.hp = Math.max(0, enemy.value.hp - calc(mv))
  const m = [`${cur.value.name} used ${mv.name}!`]
  if (enemy.value.hp <= 0) { m.push(`Wild ${enemy.value.name} fainted!`); queue(m, winBattle) } else queue(m, enemyTurn)
}
const enemyTurn = () => {
  if (!enemy.value) return
  const mv = enemy.value.moves[rnd(2)]
  cur.value.hp = Math.max(0, cur.value.hp - calc(mv))
  const m = [`Wild ${enemy.value.name} used ${mv.name}!`]
  if (cur.value.hp <= 0) { m.push(`${cur.value.name} fainted!`); queue(m, onFaint) } else queue(m, toMenu)
}
const onFaint = () => {
  const next = party.value.findIndex((m) => m.hp > 0)
  if (next >= 0) { active.value = next; queue([`Go! ${cur.value.name}!`], toMenu) } else queue(['You blacked out!'], blackout)
}
const blackout = () => { healAll(); currentMap.value = 'town'; px.value = 6; py.value = 6; facing.value = 'down'; mode.value = 'world'; setWorldMsg('You woke up back in town.') }
const winBattle = () => { mode.value = 'world'; setWorldMsg('You won the battle!') }
const persist = () => { try { localStorage.setItem('gb-rpg', JSON.stringify(caught.value)) } catch {} }
const spawnConfetti = () => {
  confetti.value = Array.from({ length: 44 }, (_, i) => ({ id: i, left: Math.random() * 100, delay: Math.random() * 2, dur: 1.8 + Math.random() * 1.8, color: CONF_COLORS[Math.floor(Math.random() * CONF_COLORS.length)] }))
}
const celebrate = () => { wonAll.value = true; spawnConfetti(); gb.sfx.cheat() }
const tryCatch = () => {
  if (!enemy.value) return
  const chance = Math.min(0.9, 0.35 + (1 - enemy.value.hp / enemy.value.maxHp) * 0.55)
  const m = ['You threw a BALL!']
  if (Math.random() < chance) { m.push(`Gotcha! ${enemy.value.name} was caught!`); queue(m, doCatch) }
  else { m.push(`${enemy.value.name} broke free!`); queue(m, enemyTurn) }
}
const doCatch = () => {
  if (!enemy.value) return
  const key = enemy.value.key
  const wasNew = !caught.value.includes(key)
  if (wasNew) caught.value.push(key)
  if (party.value.length < 6) party.value.push(makeMon(key))
  persist()
  gb.sfx.cheat()
  mode.value = 'world'
  if (wasNew && caught.value.length === SPECIES.length) celebrate()
  else setWorldMsg(`${DEX[key].name} joined your team!`)
}
const tryRun = () => {
  if (Math.random() < 0.6) queue(['Got away safely!'], () => { mode.value = 'world' })
  else queue(["Couldn't escape!"], enemyTurn)
}
const swap = () => {
  if (party.value.length < 2) { queue(['No others to swap to!'], toMenu); return }
  let n = active.value
  do { n = (n + 1) % party.value.length } while (party.value[n].hp <= 0 && n !== active.value)
  active.value = n
  queue([`Go! ${cur.value.name}!`], toMenu)
}

// ---- shell interface ----
const input = (dir: Dir) => {
  if (wonAll.value) return
  if (mode.value === 'world') { if (!dialog.value.length) moveBy(dir); return }
  if (bstate.value === 'menu') { if (dir === 'up' || dir === 'down') sel.value ^= 2; else sel.value ^= 1; gb.sfx.move() }
  else if (bstate.value === 'moves') { sel.value = sel.value ? 0 : 1; gb.sfx.move() }
}
const confirm = () => {
  if (wonAll.value) { wonAll.value = false; confetti.value = []; gb.sfx.back(); return }
  if (mode.value === 'world') {
    if (dialog.value.length) {
      dialog.value.shift()
      gb.sfx.move()
      if (!dialog.value.length && dialogReward.value) { dialogReward.value = false; celebrate() }
      return
    }
    const f = facedTile()
    const npc = npcAt(currentMap.value, f.x, f.y)
    if (npc) {
      const done = caught.value.length === SPECIES.length && npc.done
      dialog.value = (done || npc.lines).slice()
      dialogReward.value = !!done && npc.map === 'lab' // the professor throws a party
      gb.sfx.select()
    }
    return
  }
  if (bstate.value === 'msg') { advance(); return }
  if (bstate.value === 'menu') {
    gb.sfx.select()
    if (sel.value === 0) { bstate.value = 'moves'; sel.value = 0 }
    else if (sel.value === 1) tryCatch()
    else if (sel.value === 2) swap()
    else tryRun()
  } else if (bstate.value === 'moves') playerAttack(cur.value.moves[sel.value])
}
const cancel = (): boolean => {
  if (wonAll.value) { wonAll.value = false; confetti.value = []; return true }
  if (mode.value === 'world') { if (dialog.value.length) { dialog.value = []; dialogReward.value = false; return true } return false }
  if (bstate.value === 'moves') { bstate.value = 'menu'; sel.value = 0; gb.sfx.back(); return true }
  return true
}
const pick = (i: number) => { sel.value = i; confirm() }
defineExpose({ input, confirm, cancel })

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem('gb-rpg') || '[]')
    if (Array.isArray(saved) && saved.length) {
      caught.value = saved.filter((k: string) => SPECIES.includes(k))
      if (!caught.value.includes('sproutle')) caught.value.unshift('sproutle')
      party.value = caught.value.slice(0, 6).map(makeMon)
    }
  } catch {}
  ctx = canvas.value?.getContext('2d') ?? null
  draw()
  gb.setMusicTrack('rpg-town')
})
onUnmounted(() => gb.setMusicTrack('auto'))
watch(mode, (m) => {
  gb.setMusicTrack(m === 'battle' ? 'rpg-battle' : 'rpg-town')
  if (m === 'world') nextTick(() => { ctx = canvas.value?.getContext('2d') ?? null; draw() })
})
</script>

<template>
  <div class="gb-rpg">
    <template v-if="mode === 'world'">
      <div class="gb-rpg-head">
        <span class="font-pixel">MONSTA QUEST</span>
        <span class="font-pixel gb-rpg-dex">{{ caught.length }}/{{ SPECIES.length }}</span>
      </div>
      <div class="gb-rpg-screen screen-scanlines">
        <canvas ref="canvas" :width="W" :height="H" class="gb-rpg-canvas"></canvas>
        <div v-if="worldMsg" class="gb-rpg-worldmsg font-pixel">{{ worldMsg }}</div>
      </div>
      <div v-if="dialog.length" class="gb-rpg-box gb-rpg-box-world">
        <p class="font-pixel gb-rpg-msg">{{ dialog[0] }} <span class="animate-blink">▼</span></p>
      </div>
      <p v-else class="font-pixel gb-rpg-foot">▲▼◄► WALK · A TALK/ENTER · B EXIT</p>
    </template>

    <template v-else>
      <div class="gb-rpg-arena screen-scanlines">
        <div class="gb-rpg-row gb-rpg-row-enemy">
          <div class="gb-rpg-info">
            <span class="font-pixel">{{ enemy?.name }}</span>
            <span class="hpbar"><i :style="enemy ? hpStyle(enemy) : {}"></i></span>
          </div>
          <div class="gb-mon"><GbSprite v-if="enemy" :pixels="spriteOf(enemy)" :colors="colorsOf(enemy)" :px="6" /></div>
        </div>
        <div class="gb-rpg-row gb-rpg-row-buddy">
          <div class="gb-mon gb-mon-sm"><GbSprite :pixels="spriteOf(cur)" :colors="colorsOf(cur)" :px="6" /></div>
          <div class="gb-rpg-info">
            <span class="font-pixel">{{ cur.name }} <span class="gb-rpg-hp">{{ cur.hp }}/{{ cur.maxHp }}</span></span>
            <span class="hpbar"><i :style="hpStyle(cur)"></i></span>
          </div>
        </div>
      </div>
      <div class="gb-rpg-box">
        <p v-if="bstate === 'msg'" class="font-pixel gb-rpg-msg">{{ msgs[0] }} <span class="animate-blink">▼</span></p>
        <div v-else-if="bstate === 'menu'" class="gb-rpg-grid">
          <button v-for="(o, i) in MENU" :key="o" class="font-pixel gb-rpg-opt" :class="{ sel: sel === i }" @click="pick(i)">
            <span class="cur">{{ sel === i ? '▶' : ' ' }}</span>{{ o }}
          </button>
        </div>
        <div v-else class="gb-rpg-grid">
          <button v-for="(m, i) in cur.moves" :key="m.name" class="font-pixel gb-rpg-opt" :class="{ sel: sel === i }" @click="pick(i)">
            <span class="cur">{{ sel === i ? '▶' : ' ' }}</span>{{ m.name }}
          </button>
          <button class="font-pixel gb-rpg-opt gb-rpg-back" @click="cancel()">↩ BACK (B)</button>
        </div>
      </div>
    </template>

    <!-- caught-them-all finale -->
    <div v-if="wonAll" class="gb-rpg-win">
      <span v-for="c in confetti" :key="c.id" class="gb-rpg-conf"
            :style="{ left: c.left + '%', animationDelay: c.delay + 's', animationDuration: c.dur + 's', background: c.color }"></span>
      <div class="gb-rpg-win-box">
        <p class="font-pixel gb-rpg-win-t">★ YOU CAUGHT ★</p>
        <p class="font-pixel gb-rpg-win-t">★ THEM ALL! ★</p>
        <p class="font-pixel gb-rpg-win-s">{{ SPECIES.length }}/{{ SPECIES.length }} CAPTURED</p>
        <p class="font-pixel gb-rpg-win-h animate-blink">▶ A</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gb-rpg { width: min(86vw, 340px); position: relative; }
.gb-rpg-head { display: flex; align-items: center; justify-content: space-between; font-size: 0.58rem; color: rgb(var(--c-green)); margin-bottom: 8px; }
.gb-rpg-dex { color: rgb(var(--c-ink)); }
.gb-rpg-screen, .gb-rpg-arena {
  position: relative; background: rgb(var(--c-bg));
  border: 3px solid rgb(var(--c-green) / 0.45); border-radius: 6px;
  box-shadow: inset 0 0 24px rgba(0, 0, 0, 0.5); overflow: hidden;
}
.gb-rpg-canvas { width: 100%; height: auto; image-rendering: pixelated; display: block; }
.gb-rpg-worldmsg {
  position: absolute; left: 6px; right: 6px; bottom: 6px; font-size: 0.52rem; color: rgb(var(--c-ink));
  background: rgb(var(--c-bg-100) / 0.92); border: 2px solid rgb(var(--c-green) / 0.5); border-radius: 4px; padding: 7px 8px; line-height: 1.4;
}
.gb-rpg-foot { margin-top: 10px; font-size: 0.42rem; color: rgb(var(--c-ink-3)); text-align: center; letter-spacing: 0.03em; }

.gb-rpg-arena { padding: 12px; min-height: 200px; display: flex; flex-direction: column; justify-content: space-between; }
.gb-rpg-row { display: flex; align-items: center; gap: 12px; }
.gb-rpg-row-buddy { justify-content: flex-end; }
.gb-rpg-info { min-width: 130px; }
.gb-rpg-info > .font-pixel { font-size: 0.55rem; color: rgb(var(--c-ink)); display: block; margin-bottom: 5px; }
.gb-rpg-hp { color: rgb(var(--c-ink-3)); font-size: 0.45rem; }
.hpbar { display: block; height: 8px; border: 2px solid rgb(var(--c-green) / 0.5); background: rgb(var(--c-bg-200)); border-radius: 2px; overflow: hidden; }
.hpbar > i { display: block; height: 100%; transition: width 0.3s steps(6); }
.gb-mon { width: 84px; flex-shrink: 0; filter: drop-shadow(3px 3px 0 rgba(0, 0, 0, 0.35)); }
.gb-mon-sm { width: 70px; }

.gb-rpg-box { margin-top: 10px; border: 3px solid rgb(var(--c-green) / 0.45); border-radius: 6px; background: rgb(var(--c-bg-100)); padding: 12px; min-height: 64px; }
.gb-rpg-box-world { min-height: 48px; }
.gb-rpg-msg { font-size: 0.55rem; color: rgb(var(--c-ink)); line-height: 1.6; }
.gb-rpg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 12px; }
.gb-rpg-opt { display: flex; align-items: center; gap: 4px; font-size: 0.52rem; color: rgb(var(--c-ink-2)); text-align: left; padding: 3px 2px; }
.gb-rpg-opt.sel { color: rgb(var(--c-ink)); }
.gb-rpg-opt .cur { color: rgb(var(--c-green)); width: 0.9em; flex-shrink: 0; }
.gb-rpg-back { grid-column: 1 / -1; color: rgb(var(--c-ink-3)); }

/* caught-them-all finale + confetti */
.gb-rpg-win { position: absolute; inset: 0; z-index: 5; display: grid; place-items: center; overflow: hidden; background: rgb(var(--c-bg) / 0.55); border-radius: 6px; }
.gb-rpg-conf { position: absolute; top: -8%; width: 7px; height: 7px; border-radius: 1px; animation-name: gb-conf-fall; animation-timing-function: linear; animation-iteration-count: infinite; }
@keyframes gb-conf-fall { 0% { transform: translateY(0) rotate(0); } 100% { transform: translateY(360px) rotate(540deg); } }
.gb-rpg-win-box { position: relative; z-index: 2; text-align: center; background: rgb(var(--c-bg-100) / 0.95); border: 3px solid rgb(var(--c-green) / 0.6); border-radius: 8px; padding: 18px 16px; box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.4); }
.gb-rpg-win-t { font-size: 0.72rem; color: rgb(var(--c-green)); line-height: 1.7; text-shadow: 0 0 12px rgb(var(--c-green) / 0.5); }
.gb-rpg-win-s { font-size: 0.5rem; color: rgb(var(--c-ink)); margin-top: 8px; }
.gb-rpg-win-h { font-size: 0.5rem; color: rgb(var(--c-ink-3)); margin-top: 10px; }
</style>
