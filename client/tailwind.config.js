/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': "#4A3AFF",
      'secondary': "#D9DBE9",
      'neutral800': "#170F49",
      "neutral700": "#514F6E",
      "neutral600": "#6F6C90",
      "neutral500": "#A0A3BD",
      "neutral400": "#D9DBE9",
      "neutral300": "#EFF0F6",
      "neutral200": "#F7F7FB",
      "neutral100": "#FFFFFF"}, 
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}

