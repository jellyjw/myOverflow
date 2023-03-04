/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        whiteMode: "#FFFFFF",
      },
      animation: {
        'spin-slow': 'spin 0.4s linear infinite',
      }
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
