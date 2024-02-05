/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        FredokaOne: ['Fredoka One', 'sans-serif']
      },
      colors: {
        'primary-orange': '#FF5722',
        'dark-theme-green': '#183d3d',
        'light-theme-green': '#5c8374',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}


