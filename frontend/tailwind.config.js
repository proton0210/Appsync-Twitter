/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true
    },
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans]
      },
      colors: {
        blue: '#1DA1F2',
        darkblue: '#2795D9',
        lightblue: '#EFF9FF',
        dark: '#657786',
        light: '#AAB8C2',
        lighter: '#E1E8ED',
        lightest: '#F5F8FA'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
