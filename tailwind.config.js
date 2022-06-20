const defaultTheme = require('tailwindcss/defaultTheme');
const withOpacity = require('./tailwind/with-opacity');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './projects/elements/**/*.{html,ts}',
    './projects/demos/**/*.{html,ts}',
    './content/**/*.md',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: withOpacity('primary-light'),
          DEFAULT: withOpacity('primary'),
          dark: withOpacity('primary-dark'),
        },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
          950: '#141922',
        },
        color: 'var(--text)',
        'color-light': 'var(--text-light)',
        'color-shade': 'var(--text-shade)',
        canvas: {
          light: 'var(--canvas-light)',
          DEFAULT: 'var(--canvas)',
          shade: 'var(--canvas-shade)',
          opac: 'var(--canvas-opac)',
        },
      },
      fontFamily: {
        sans: ['Muli', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: (theme) => ({
        'gradient-145': 'linear-gradient(145deg, var(--tw-gradient-stops))',
        'gradient-primary': `linear-gradient(145deg, ${theme(
          'colors.primary.light'
        )}, ${theme('colors.primary.DEFAULT')}, ${theme(
          'colors.primary.dark'
        )})`,
        'gradient-primary-inverse': `linear-gradient(-145deg, ${theme(
          'colors.primary.light'
        )}, ${theme('colors.primary.DEFAULT')}, ${theme(
          'colors.primary.dark'
        )})`,
      }),
      inset: {
        4: '1rem',
        8: '2rem',
        12: '3rem',
        16: '4rem',
        24: '6rem',
        32: '8rem',
      },
      maxHeight: {
        248: '248px',
        384: '384px',
        524: '524px',
        669: '669px',
      },
      transformOrigin: {
        0: '0%',
      },
      zIndex: {
        '-1': '-1',
      },
      borderRadius: {
        xl: '22px',
      },
      minHeight: {
        18: '4.5rem',
        24: '6rem',
        80: '20rem',
      },
      screens: {
        xs: '256px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
      },
      minWidth: {
        xxs: '16rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
      },
      width: {
        xxs: '16rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('./tailwind/container'),
    require('./tailwind/min-w-container'),
    require('./tailwind/buttons'),
    require('./tailwind/chips'),
  ],
};
