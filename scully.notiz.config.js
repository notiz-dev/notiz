const { getFlashPreventionPlugin } = require('scully-plugin-flash-prevention');

exports.config = {
  projectRoot: './src',
  projectName: 'notiz',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/blog'
      }
    },
    '/authors/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/authors'
      }
    },
    '/tags/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/tags'
      }
    }
  },
  postRenderers: [getFlashPreventionPlugin()]
};
