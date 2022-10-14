/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/client/*.{js,ts}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
