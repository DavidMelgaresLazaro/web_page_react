/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors:{
        principal: '#6A0DAD',
        

      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

