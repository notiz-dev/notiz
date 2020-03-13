require('@notiz/scully-plugin-lazy-images');
require('@notiz/scully-plugin-fouc');
require('@notiz/scully-plugin-rss');

exports.config = {
  projectRoot: './src',
  projectName: 'notiz',
  defaultPostRenderers: ['lazyImages', 'fouc'],
  rssConfig: {
    title: 'title',
    description: 'description',
    feed_url: 'https://notiz.dev/feed.xml',
    site_url: 'https://notiz.dev',
    image_url: 'https://notiz.dev/assets/img/featured.png',
    copyright: '2020 notiz.dev',
    language: 'en',
    categories: ['Web Development', 'Angular', 'node', 'Programming Blog'],
  },
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
