require('@notiz/scully-plugin-lazy-images');
require('@notiz/scully-plugin-fouc');
require('@notiz/scully-plugin-rss');

exports.config = {
  projectRoot: './src',
  projectName: 'notiz',
  defaultPostRenderers: ['lazyImages', 'fouc'],
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/blog'
      },
      postRenderers: ['lazyImages', 'fouc', 'rss']
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
