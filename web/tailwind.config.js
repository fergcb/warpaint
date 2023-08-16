/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Fira Sans, sans-serif'
      },
      fontSize: {
        sm: '1rem',
        base: '1.25rem',
        lg: '1.365rem',
        xl: '1.563rem',
        '2xl': '1.750rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      }
    },
  },
  plugins: [],
}

