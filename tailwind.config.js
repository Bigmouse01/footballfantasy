/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        premier: ['"Segoe UI"', 'sans-serif'], // Premier Sans alternative
      },
      colors: {
        premierPurple: '#37003c',
        premierPink: '#d0108a',
        premierDark: '#1e1e2f',
        premierMid: '#2a2a40',
      },
    },
  },
  plugins: [],
}
