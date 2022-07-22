/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'darkborder': 'rgb(47, 51, 54)',
        'lightborder': 'rgb(207, 217, 222)',
        'dark-threadline': 'rgb(51, 54, 57)',
        'transparent-black': 'rgba(0, 0, 0, 0.65)',
        'transparent-white': 'rgba(255, 255, 255, 0.65)',
      },
      flexGrow: {
        '2': 2,
      },
    },
    fontFamily: {
      'sans': ['"IBM Plex Sans"', 'sans-serif'],
    },
  },
  plugins: [],
}
