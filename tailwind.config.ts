const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#242424',
        foreground: '#ededed',
        accent: '#64EEBC',
        disabled: '#919191',
        primaryBg: {
          DEFAULT: 'rgba(36, 36, 36, 1)', 
          hover: 'rgba(36, 36, 36, 0.5)', 
        },
        scrollbar: {
          DEFAULT: '#7e7e7e',
          hover: '#a0a0a0',
        },
        white: colors.white,
        gray: colors.gray,
      },
      fontFamily: {
        sans: ['Bebas Neue', 'sans-serif'],
      },
      spacing: {
        60: '15rem',
      },
      letterSpacing: {
        widest: '0.25em',
      },
    },
  },
  plugins: [],
};
