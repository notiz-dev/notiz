const plugin = require('tailwindcss/plugin');

const container = plugin(function ({ addComponents, theme }) {
  const container = {
    '.container': {
      maxWidth: '100%',
      padding: '0rem 1rem',
      margin: '0 auto',
      '@screen sm': {
        maxWidth: '640px',
      },
      '@screen md': {
        maxWidth: '768px',
      },
      '@screen lg': {
        maxWidth: '964px',
      },
      '@screen xl': {
        maxWidth: '1112px',
      },
      '@screen 2xl': {
        maxWidth: '1224px',
      },
    },
  };

  addComponents(container);
});

module.exports = container;
