const plugin = require('tailwindcss/plugin');

const container = plugin(function ({ addComponents, theme }) {
  const container = {
    '.min-w-container': {
      maxWidth: '100%',
      padding: '0rem 0rem 0rem 1rem',
      margin: '0 auto',
      '@screen sm': {
        minWidth: '640px',
      },
      '@screen md': {
        minWidth: '768px',
      },
      '@screen lg': {
        minWidth: '964px',
      },
      '@screen xl': {
        minWidth: '1112px',
      },
      '@screen 2xl': {
        minWidth: '1224px',
      },
    },
  };

  addComponents(container);
});

module.exports = container;
