/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        // Simulation logs and code only; the existing `font-mono` labels are unchanged.
        code: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        // Life Album captions only.
        hand: ['"Segoe Print"', 'cursive'],
      },
      colors: {
        white: '#fffdf9',
        stone: {
          50: '#faf7f2', 100: '#f1ebe2', 200: '#e5d9ca', 300: '#d3c1ad',
          400: '#b59b84', 500: '#8d735d', 600: '#705843', 700: '#574231',
          800: '#3f3025', 900: '#2e241c', 950: '#211912',
        },
        amber: {
          50: '#fdf5ec', 100: '#fbe8d4', 200: '#f4d0ad', 300: '#e8b17c',
          400: '#d28b52', 500: '#b96b3c', 600: '#a25731', 700: '#874528',
          800: '#6f3824', 900: '#552b1d', 950: '#351a14',
        },
        paper: {
          light: '#f7f1e7',
          dark: '#29221c',
        },
      },
    },
  },
  plugins: [],
}
