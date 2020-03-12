require('./projects/scully-plugin-lazy-images');
require('./projects/scully-plugin-fouc');

exports.config = {
  projectRoot: './src',
  projectName: 'notiz',
  defaultPostRenderers: ['lazyImages','fouc'],
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/blog'
      },
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
  }
};
