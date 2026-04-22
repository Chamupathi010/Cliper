/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: { 
      colors: {
        primary: "#0056D2",
        secondary: "#E8EDF2",
        tertiary: "#A93803",
        neutral: "#F5F7F9",
      },
      fontFamily: { 
        sans: ["Inter", "system-ui", "ui-sans-serif", "SF Pro Text", "Segoe UI", "sans-serif"] 
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};