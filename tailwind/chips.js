const plugin = require('tailwindcss/plugin');

const chip = plugin(function ({ addComponents, theme }) {
  const chips = {
    '.chip': {
      fontWeight: theme('fontWeight.medium'),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      padding: `${theme('spacing.1')} ${theme('spacing.3')}`,
      borderRadius: theme('borderRadius.full'),
      backgroundColor: 'var(--canvas-shade)',
      color: 'var(--text)',
      fontSize: theme('fontSize.sm'),
    },
    '.chip-primary': {
      backgroundColor: 'rgba(0, 118, 189,0.2)',
      color: theme('colors.primary.DEFAULT'),
    },
    '.chip-danger': {
      backgroundColor: theme('colors.red.100'),
      color: theme('colors.red.800'),
    },
    '.chip-warn': {
      backgroundColor: theme('colors.yellow.100'),
      color: theme('colors.yellow.800'),
    },
    '.chip-success': {
      backgroundColor: theme('colors.green.100'),
      color: theme('colors.green.800'),
    },
    '.chip-small': {
      padding: `${theme('spacing.1')} ${theme('spacing.2')}`,
      fontSize: theme('fontSize.xs'),
    },
  };

  addComponents(chips);
});

module.exports = chip;
