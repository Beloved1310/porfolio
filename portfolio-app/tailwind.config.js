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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        // Simulation logs and code only; the existing `font-mono` labels are unchanged.
        code: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        // Life Album captions only.
        hand: ['Caveat', 'cursive'],
      },
      colors: {
        // Warm paper tone for the Life Album, derived from stone and amber.
        paper: {
          light: '#f7f2e8',
          dark: '#292420',
        },
      },
    },
  },
  plugins: [],
}
