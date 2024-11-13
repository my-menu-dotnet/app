/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FFC303",
        secondary: "#f19474",
        warning: "#f5a623",
        danger: "#d0021b",
        success: "#7ed321",
        info: "#4a90e2",
      }
    },
  },
  plugins: [],
}