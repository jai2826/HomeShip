/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        '1/3.5':'22.5%'
      },
      spacing:{
        '18':'4.5rem',
        '100':'25rem',
      }



    },
  },
  plugins: [],
}