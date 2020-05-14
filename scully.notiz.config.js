require('@notiz/scully-plugin-lazy-images');
require('@notiz/scully-plugin-fouc');
require('@notiz/scully-plugin-rss');
require('@notiz/scully-plugin-medium-zoom');
require('./projects/banner-generator');
require('./projects/amp');

exports.config = {
  projectRoot: './src',
  projectName: 'notiz',
  defaultPostRenderers: ['fouc', 'seoHrefOptimise', 'lazyImages','mediumZoom'],
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/blog',
      },
      postRenderers: [
        'fouc',
        'seoHrefOptimise',
        'amp',
        'rss',
        'lazyImages',
        'mediumZoom',
        'bannerGenerator',
      ],
    },
    '/links/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/links',
      },
      postRenderers: [
        'fouc',
        'seoHrefOptimise',
        'rss',
        'lazyImages',
        'mediumZoom',
        'bannerGenerator',
      ],
    },
    '/authors/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/authors',
      },
    },
    '/tags/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/tags',
      },
    },
    '/legal/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/legal',
      },
    },
  },
};
