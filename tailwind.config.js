const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './src/**/*.{html,ts}',
    './projects/design/**/*.{html,ts}',
    './projects/shortcodes/**/*.{html,ts}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      red: colors.red,
      green: colors.green,
      gray: { ...colors.coolGray, 950: '#141922' },
      primary: {
        light: '#55f3de',
        DEFAULT: '#55b9f3',
        dark: '#556af3',
      },
      background: 'var(--background)',
      'background-opac': 'var(--background-opac)',
      'background-light': 'var(--background-light)',
      'background-shade': 'var(--background-shade)',
      color: 'var(--text)',
      'color-light': 'var(--text-light)',
      'color-shade': 'var(--text-shade)',
      danger: 'var(--danger)',
      code: 'var(--code)',
    },
    extend: {
      colors: {},
      fontFamily: {
        sans: ['Muli'],
      },
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
    },
    screens: {
      xx: '0px',
      xs: '256px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      dark: { raw: '(prefers-color-scheme: dark)' },
      light: { raw: '(prefers-color-scheme: light)' },
    },
  },
  variants: {
    extend: {
      cursor: ['hover'],
      borderWidth: ['hover'],
    },
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    standardFontWeights: true,
    defaultLineHeights: true,
  },
  plugins: [],
};
