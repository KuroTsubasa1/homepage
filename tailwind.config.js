/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./error.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                // Bold condensed display — expedition-poster / documentary title-card impact
                display: ['Anton', 'Oswald', 'Impact', 'sans-serif'],
                condensed: ['Oswald', 'Anton', 'sans-serif'],
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                // ── Wildlife "Dark & Cinematic" — after dusk in the forest ──
                forest: {
                    DEFAULT: '#0d0f0c', // moss-black base canvas
                    50: '#11140e',
                    100: '#161a14',     // deep bark panel
                    200: '#1d2219',     // raised panel
                    300: '#27301f',     // border / hover
                    400: '#34402a',     // lighter border / divider
                    500: '#46563a',
                },
                bone: {
                    DEFAULT: '#e8e4d8', // antler-white primary text
                    muted: '#a9a695',   // muted text
                    dim: '#79776b',     // dim / captions
                },
                amber: {               // golden hour — primary accent
                    DEFAULT: '#d98a3d',
                    light: '#ecab63',
                    dark: '#b06d28',
                },
                moss: {                // lichen green — secondary accent
                    DEFAULT: '#7d9c6b',
                    light: '#9bb98a',
                    dark: '#5a7649',
                },
                clay: {                // terracotta / fox — tertiary accent
                    DEFAULT: '#c4663a',
                    light: '#d9824f',
                    dark: '#9c4d28',
                },

                // ── Back-compat remaps so legacy classes stay on-brand ──
                // (old templates & i18n v-html still reference dark-*/neon-*)
                dark: {
                    DEFAULT: '#0d0f0c',
                    100: '#161a14',
                    200: '#1d2219',
                    300: '#27301f',
                    400: '#34402a',
                },
                neon: {
                    green: '#7d9c6b',   // → moss
                    cyan: '#d98a3d',    // → amber
                    magenta: '#c4663a', // → clay
                    purple: '#9bb98a',  // → moss light
                },
            },
            letterSpacing: {
                widest2: '0.25em',
                mega: '0.4em',
            },
            animation: {
                // cinematic
                'ken-burns': 'ken-burns 22s ease-in-out infinite alternate',
                'breathe': 'breathe 9s ease-in-out infinite',
                'float': 'float 7s ease-in-out infinite',
                'drift': 'drift 16s ease-in-out infinite',
                'drift-slow': 'drift 26s ease-in-out infinite',
                // reveals / entrances
                'slide-up': 'slide-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
                'slide-in-left': 'slide-in-left 0.6s cubic-bezier(0.22,1,0.36,1) both',
                'fade-in': 'fade-in 1.2s ease forwards',
                // accents
                'glow-pulse': 'glow-pulse 2.4s ease-in-out infinite alternate',
                'shimmer': 'shimmer 6s ease infinite',
                'gradient-x': 'gradient-x 5s ease infinite',
                'marquee': 'marquee 40s linear infinite',
                'marquee-rev': 'marquee-rev 40s linear infinite',
                'spin-slow': 'spin 14s linear infinite',
                'bob': 'bob 2s ease-in-out infinite',
                // legacy (kept so nothing breaks)
                'flicker': 'flicker 3s linear infinite',
            },
            keyframes: {
                'ken-burns': {
                    '0%': { transform: 'scale(1.05) translate(0, 0)' },
                    '100%': { transform: 'scale(1.18) translate(-2%, -2%)' },
                },
                'breathe': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.035)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                'drift': {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '33%': { transform: 'translate(14px, -18px)' },
                    '66%': { transform: 'translate(-12px, 10px)' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(40px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-in-left': {
                    '0%': { transform: 'translateX(-40px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'glow-pulse': {
                    '0%': { boxShadow: '0 0 5px rgba(217,138,61,0.25), 0 0 22px rgba(217,138,61,0.08)' },
                    '100%': { boxShadow: '0 0 22px rgba(217,138,61,0.55), 0 0 64px rgba(217,138,61,0.18)' },
                },
                'shimmer': {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                },
                'gradient-x': {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                },
                'marquee': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'marquee-rev': {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'bob': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(6px)' },
                },
                'flicker': {
                    '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
                    '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            transitionTimingFunction: {
                'wild': 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {
                    'primary': '#d98a3d',     // amber
                    'secondary': '#7d9c6b',   // moss
                    'accent': '#c4663a',      // clay
                    'neutral': '#161a14',
                    'base-100': '#0d0f0c',
                    'base-200': '#161a14',
                    'base-300': '#1d2219',
                    'base-content': '#e8e4d8',
                    'info': '#7d9c6b',
                    'success': '#7d9c6b',
                    'warning': '#d98a3d',
                    'error': '#c4663a',
                },
            },
        ],
    },
}
