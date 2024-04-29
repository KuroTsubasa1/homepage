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
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {                          // 'mytheme' is the name of your custom theme
                    'primary': '#0D6E4F',       // A rich green, suitable for primary buttons or highlights
                    'secondary': '#52C67A',     // A lighter shade of green for secondary elements
                    'accent': '#083D25',        // A dark green, great for accents and text
                    'neutral': '#A3BCB6',       // A muted green-grey, perfect for neutral backgrounds and surfaces
                    'base-100': '#E3F9E5',
                    'base-200': '#52C67A',
                    'base-300': '#0D6E4F',
                    'base-content': '#083D25',
                    'info': '#2094f3',
                    'success': '#009485',
                    'warning': '#ff9900',
                    'error': '#ff5724',
                    'dark': '#1E1E1E',
                    'light': '#FFFFFF',

                },
            },
        ],
    },
}



