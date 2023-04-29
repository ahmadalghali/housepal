/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");


export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        secondary: colors.green,
        accent: colors.zinc,
        brand: colors.sky
        // primary: colors.indigo,
      },
    },
  },
  plugins: [],
}

