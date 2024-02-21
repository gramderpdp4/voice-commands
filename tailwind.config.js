/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      screens: {
        xsm: '400px'
      }
    },
  },
  plugins: [],
}

