module.exports = {
  purge: ['./src/**/*.html', './src/**/*.ts'],
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
        color: 'var(--text-color)',
        'color-light': 'var(--text-color-light)',
        tabs: 'var(--tabs)'
      }
    },
    screens: {
      xx: '0px',
      xs: '256px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
  }
};
