/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // Disable Tailwind's preflight styles
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
