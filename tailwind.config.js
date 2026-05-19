/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,js}'],
  theme: {
    extend: {
      colors: {
        warmYellow: '#FFD93D',
        skyGreen: '#6BCB77',
        coralRed: '#FF6B6B',
        softPurple: '#C77DFF'
      },
      screens: {
        'tv': '1920px',
        '4k': '3840px'
      },
      fontSize: {
        'tv-base': '1.5rem',
        'tv-lg': '2.5rem',
        'tv-xl': '4rem'
      }
    }
  },
  plugins: []
}