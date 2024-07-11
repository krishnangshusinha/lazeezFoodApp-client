import daisyui from "daisyui"


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {   // this property adds extension to normal behaviour. SO here added extension of "colors" there we mentioned "blue", "red" and there some values , so in our project where ever we use "blue" color then the color corresponding to this value gets executed
      colors:{ 
        blue: "#3333cc",
        red : "#e60000",
        secondary: "#555",
        primaryBG: "#f2f2f2",
      },
      fontFamily: {
        primary: ["Public Sans", "sans-serif"],
      },
    },
  },
  plugins: [
    daisyui,
  ],
}

