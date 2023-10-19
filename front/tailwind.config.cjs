/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,css}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  darkMode: "class",
};
