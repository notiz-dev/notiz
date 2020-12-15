const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './src/**/*.{html,ts}',
    './projects/design/**/*.{html,ts}',
    './projects/shortcodes/**/*.{html,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
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
      danger: '#ff4961',
      code: 'var(--code)',
      canvas: {
        light: 'var(--canvas-light)',
        DEFAULT: 'var(--canvas)',
        dark: 'var(--canvas-dark)',
        shade: 'var(--canvas-shade)',
        opac: 'var(--canvas-opac)',
      },
      typography: {},
      'canvas-code': {},
      link: {},
    },
    extend: {
      colors: {},
      fontFamily: {
        sans: ['Muli'],
      },
      // backgroundImage: (theme) => ({
      //   'primary-gradient':
      //     "linear-gradient(145deg, theme('colors.primary.light'), theme('colors.primary.DEFAULT'), theme('colors.primary.dark')",
      // }),
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: { color: theme('colors.color') },
            h2: { color: theme('colors.color') },
            h3: { color: theme('colors.color') },
            h4: { color: theme('colors.color') },
            h5: { color: theme('colors.color') },
            h6: { color: theme('colors.color') },
            strong: { color: theme('colors.color') },
            'ul li:before': {
              backgroundColor: theme('colors.primary.DEFAULT'),
            },
            a: {
              color: theme('colors.primary.DEFAULT'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.primary.light'),
              },
            },
            li: { color: theme('colors.color') },
            hr: { borderColor: theme('colors.color') },
            code: {
              paddingTop: theme('spacing[0.5]'),
              paddingBottom: theme('spacing[0.5]'),
              paddingRight: theme('spacing.1'),
              paddingLeft: theme('spacing.1'),
              marginRight: theme('spacing.[0.5]'),
              marginLeft: theme('spacing.[0.5]'),
              borderRadius: theme('borderRadius.md'),
              color: theme('colors.code'),
              backgroundColor: theme('colors.background-light'),
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            blockquote: {
              color: theme('colors.color'),
              borderLeftColor: theme('colors.primary.DEFAULT'),
            },
            'blockquote p:first-of-type::before': {
              content: '""',
            },
            'blockquote p:last-of-type::after': {
              content: '""',
            },
            pre: {
              color: theme('colors.color'),
              backgroundColor: theme('colors.background-light'),
            },
          },
        },
        toc: {
          css: {
            h2: { cursor: 'pointer' },
            'h2::before': {
              opacity: 0,
              content: '"#"',
              display: 'inline-block',
              marginLeft: '-18px',
              paddingRight: '2px',
              cursor: 'pointer',
              color: theme('colors.primary.light'),
            },
            'h2:hover::before': {
              opacity: 0.75,
            },
          },
        },
      }),
      screens: {
        xs: '256px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
      },
    },
  },
  variants: {
    extend: {
      cursor: ['hover'],
      borderWidth: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
