const plugin = require('tailwindcss/plugin');

const prism = plugin(function ({ addBase, theme }) {
  addBase({
    // code block
    'code[class*="language-"]': {
      color: theme('colors.color'),
    },
    'pre[class*="language-"]': {
      padding: theme('spacing.6'),
      borderRadius: theme('borderRadius.xl'),
      backgroundColor: theme('colors.canvas.shade'),
      overflow: 'auto',
    },
    [`.token.boolean,
      .token.function,
      .token.number`]: {
      color: 'var(--code-function)',
    },
    [`.token.attr-value,
      .token.char,
      .token.regex,
      .token.string,
      .token.variable`]: {
      color: 'var(--code-variable)',
    },
    [`.token.attr-name,
      .token.keyword,
      .token.rule,
      .token.operator,
      .token.pseudo-class,
      .token.important`]: {
      color: 'var(--code-keyword)',
    },
    [`.token.class-name,
      .token.constant,
      .token.property,
      .token.symbol`]: {
      color: 'var(--code-class)',
    },
    '.token.comment': {
      color: 'var(--code-comment)',
    },
    '.token.punctuation': {
      color: theme('colors.color'),
    },
    // inline code
    ':not(pre) > code': {
      color: 'var(--code-function)',
      backgroundColor: theme('colors.canvas.shade'),
      paddingTop: theme('spacing[0.5]'),
      paddingBottom: theme('spacing[0.5]'),
      paddingRight: theme('spacing.1'),
      paddingLeft: theme('spacing.1'),
      marginRight: theme('spacing.[0.5]'),
      marginLeft: theme('spacing.[0.5]'),
      borderRadius: theme('borderRadius.md'),
    },
    // diff
    '.token.inserted:not(.prefix)': {
      display: 'block',
      backgroundColor: 'var(--markup-inserted-canvas)',
    },
    '.token.inserted.prefix': {
      color: 'var(--markup-inserted-text)',
    },
    '.token.deleted:not(.prefix)': {
      display: 'block',
      backgroundColor: 'var(--markup-deleted-canvas)',
    },
    '.token.deleted.prefix': {
      color: 'var(--markup-deleted-text)',
    },
  });
});

module.exports = prism;
