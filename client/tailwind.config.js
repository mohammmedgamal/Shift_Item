/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sec: {
          blue: '#005596',
          lightBlue: '#00A3E0',
          white: '#FFFFFF',
          gray: '#F3F4F6',
        }
      },
    },
  },
  plugins: [],
}
