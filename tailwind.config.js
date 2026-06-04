/** @type {import('tailwindcss').Config} */
/*
 * GAME BOY THEME
 * --------------
 * Colours are driven by CSS custom properties (channel triplets like "155 188 15")
 * so the whole site can swap between two palettes at runtime:
 *   [data-palette="night"]   -> dark phosphor LCD (default, photo-friendly)
 *   [data-palette="classic"] -> the iconic pea-green DMG screen
 * The vars live in assets/css/tailwind.css. Every token below references them via
 * rgb(var(--x) / <alpha-value>) so Tailwind opacity utilities (/10, /50, ...) work.
 *
 * The physical console chrome (shell, bezel, buttons) uses FIXED greys/velvet that
 * never swap — a Game Boy is always grey, whatever is on the screen.
 */
const v = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./error.vue",
        "./app.vue",
    ],
    theme: {
        extend: {
            colors: {
                // Page / panel backgrounds (palette-swappable LCD)
                dark: {
                    DEFAULT: v('--c-bg'),
                    100: v('--c-bg-100'),
                    200: v('--c-bg-200'),
                    300: v('--c-bg-300'),
                    400: v('--c-bg-400'),
                },
                // Re-mapped "neon" tokens so all existing markup turns Game-Boy-green.
                neon: {
                    green: v('--c-green'),
                    cyan: v('--c-green-2'),   // secondary / pale phosphor
                    magenta: v('--c-crimson'), // DMG A/B button crimson
                    purple: v('--c-velvet'),   // velvet accent
                },
                // Phosphor "ink" — overrides white & the gray ramp so text reads as
                // monochrome LCD text instead of modern white/grey.
                white: v('--c-ink'),
                gray: {
                    200: v('--c-ink'),
                    300: v('--c-ink'),
                    400: v('--c-ink-2'),
                    500: v('--c-ink-3'),
                    600: v('--c-ink-4'),
                    700: v('--c-ink-4'),
                },
                // Phosphor accents (explicit names, palette-swappable)
                lcd: {
                    ink: v('--c-ink'),
                    dim: v('--c-ink-2'),
                    faint: v('--c-ink-3'),
                    green: v('--c-green'),
                    pale: v('--c-green-2'),
                },
                // Physical console chrome — FIXED, never palette-swapped.
                shell: {
                    50: '#ecebe3',
                    100: '#dcdacb',
                    200: '#c7c4b2',
                    300: '#a9a594',
                    400: '#807c6c',
                    500: '#5e5b4e',
                },
                bezel: {
                    DEFAULT: '#4a4a44',
                    deep: '#2c2c28',
                },
                velvet: {
                    light: '#b9a3e6',
                    DEFAULT: '#7c4dc4',
                    deep: '#5b3490',
                    darkest: '#3a205f',
                },
                crimson: {
                    DEFAULT: '#c0395f',
                    deep: '#8e2547',
                },
            },
            fontFamily: {
                pixel: ['"Press Start 2P"', 'monospace'],
                terminal: ['"VT323"', 'ui-monospace', 'monospace'],
                sans: ['"VT323"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            boxShadow: {
                'lcd': '0 0 0 2px rgba(0,0,0,0.35), inset 0 0 60px rgba(0,0,0,0.45)',
                'btn-ab': '0 4px 0 #3a205f, 0 6px 8px rgba(0,0,0,0.4)',
                'btn-ab-down': '0 1px 0 #3a205f, 0 2px 4px rgba(0,0,0,0.4)',
                'shell': '0 18px 40px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -3px 0 rgba(0,0,0,0.25)',
            },
            animation: {
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
                'slide-in-left': 'slide-in-left 0.5s steps(8) both',
                'gradient-x': 'gradient-x 3s ease infinite',
                'flicker': 'flicker 4s linear infinite',
                'scanline': 'scanline 7s linear infinite',
                'blink': 'blink 1.06s steps(1) infinite',
                'press': 'press 0.16s ease-out',
                'power-pulse': 'power-pulse 2.4s ease-in-out infinite',
                'screen-on': 'screen-on 0.9s ease-out both',
                'boot-drop': 'boot-drop 1.6s cubic-bezier(0.5, 0, 0.2, 1) both',
                'marquee': 'marquee 22s linear infinite',
                'wiggle': 'wiggle 0.3s steps(3) infinite',
                'pixel-in': 'pixel-in 0.5s steps(6) both',
                'bob': 'bob 1.2s steps(2) infinite',
                'crt-flicker': 'crt-flicker 0.15s steps(2) infinite',
            },
            keyframes: {
                'glow-pulse': {
                    '0%': { boxShadow: '0 0 4px rgba(155,188,15,0.4), 0 0 14px rgba(155,188,15,0.15)' },
                    '100%': { boxShadow: '0 0 16px rgba(155,188,15,0.7), 0 0 44px rgba(155,188,15,0.3)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(24px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-in-left': {
                    '0%': { transform: 'translateX(-24px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'gradient-x': {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                },
                'flicker': {
                    '0%, 19%, 21%, 23%, 80%, 83%, 100%': { opacity: '1' },
                    '20%, 22%, 81%, 82%': { opacity: '0.78' },
                },
                'scanline': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                'blink': {
                    '0%, 50%': { opacity: '1' },
                    '50.01%, 100%': { opacity: '0' },
                },
                'press': {
                    '0%': { transform: 'translateY(0)' },
                    '45%': { transform: 'translateY(3px) scale(0.96)' },
                    '100%': { transform: 'translateY(0)' },
                },
                'power-pulse': {
                    '0%, 100%': { opacity: '0.55', boxShadow: '0 0 4px 1px rgba(192,57,95,0.5)' },
                    '50%': { opacity: '1', boxShadow: '0 0 9px 2px rgba(192,57,95,0.9)' },
                },
                'screen-on': {
                    '0%': { transform: 'scaleY(0.004) scaleX(1)', filter: 'brightness(6)', opacity: '0.2' },
                    '12%': { transform: 'scaleY(0.012) scaleX(1)', filter: 'brightness(6)', opacity: '1' },
                    '40%': { transform: 'scaleY(1) scaleX(1)', filter: 'brightness(2.4)' },
                    '100%': { transform: 'scaleY(1) scaleX(1)', filter: 'brightness(1)', opacity: '1' },
                },
                'boot-drop': {
                    '0%': { transform: 'translateY(-140%)', opacity: '0' },
                    '55%': { transform: 'translateY(0)', opacity: '1' },
                    '70%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'marquee': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'wiggle': {
                    '0%, 100%': { transform: 'rotate(-2deg)' },
                    '50%': { transform: 'rotate(2deg)' },
                },
                'pixel-in': {
                    '0%': { opacity: '0', filter: 'blur(2px)', transform: 'scale(0.96)' },
                    '100%': { opacity: '1', filter: 'blur(0)', transform: 'scale(1)' },
                },
                'bob': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-3px)' },
                },
                'crt-flicker': {
                    '0%': { opacity: '0.96' },
                    '100%': { opacity: '1' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {
                    'primary': '#9bbc0f',
                    'secondary': '#c6de8b',
                    'accent': '#7c4dc4',
                    'neutral': '#1a2a14',
                    'base-100': '#0d1609',
                    'base-200': '#121e0e',
                    'base-300': '#1a2a14',
                    'base-content': '#d6e8a0',
                    'info': '#c6de8b',
                    'success': '#9bbc0f',
                    'warning': '#e0c020',
                    'error': '#c0395f',
                },
            },
        ],
    },
}
