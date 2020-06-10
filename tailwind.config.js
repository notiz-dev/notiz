module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.ts',
    './projects/design/**/*.html',
    './projects/design/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        blue: 'var(--blue)',
        'blue-opacity-10': 'rgba(var(--blue-rgb), 0.1)',
        cyan: 'var(--cyan)',
        'cyan-opacity-10': 'rgba(var(--cyan-rgb), 0.1)',
        'dark-blue': 'var(--dark-blue)',
        'dark-blue-opacity-10': 'rgba(var(--dark-blue-rgb), 0.1)',
        background: 'var(--background)',
        'background-light': 'var(--background-light)',
        color: 'var(--text-color)',
        'color-light': 'var(--text-color-light)',
        tabs: 'var(--tabs)',
        danger: 'var(--danger)'
      },
      boxShadow: {
        double: 'var(--shadow-double)',
      },
      fontFamily: {
        sans: ['Muli'],
      },
      inset: {
        '8': '8rem',
      },
      transformOrigin: {
        '0': '0%',
      },
      zIndex: {
        '-1': '-1',
      },
    },
    screens: {
      xx: '0px',
      xs: '256px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
  },
};
