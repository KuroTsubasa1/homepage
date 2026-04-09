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
            colors: {
                dark: {
                    DEFAULT: '#0a0a0f',
                    100: '#16161f',
                    200: '#1e1e2a',
                    300: '#2a2a3a',
                    400: '#3a3a4d',
                },
                neon: {
                    green: '#00ff88',
                    cyan: '#00f0ff',
                    magenta: '#ff00aa',
                    purple: '#8b5cf6',
                },
            },
            animation: {
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'slide-up': 'slide-up 0.6s ease-out',
                'slide-in-left': 'slide-in-left 0.5s ease-out',
                'gradient-x': 'gradient-x 3s ease infinite',
                'flicker': 'flicker 3s linear infinite',
            },
            keyframes: {
                'glow-pulse': {
                    '0%': { boxShadow: '0 0 5px rgba(0, 255, 136, 0.3), 0 0 20px rgba(0, 255, 136, 0.1)' },
                    '100%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.6), 0 0 60px rgba(0, 255, 136, 0.2)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-in-left': {
                    '0%': { transform: 'translateX(-30px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'gradient-x': {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
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
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {
                    'primary': '#00ff88',
                    'secondary': '#00f0ff',
                    'accent': '#8b5cf6',
                    'neutral': '#1e1e2a',
                    'base-100': '#0a0a0f',
                    'base-200': '#12121a',
                    'base-300': '#1e1e2a',
                    'base-content': '#e2e8f0',
                    'info': '#00f0ff',
                    'success': '#00ff88',
                    'warning': '#ffb800',
                    'error': '#ff3860',
                },
            },
        ],
    },
}
