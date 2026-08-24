/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ub-maroon': '#FFD700',
        'ub-maroon-light': '#D4AF37',
        'ub-gold': '#FFD700',
        'cinema-black': '#0a0a0a',
        'cinema-dark': '#121212',
        'cinema-gray': '#1a1a1a',
      },
    },
  },
  plugins: [],
}
