import '@notiz/scully-plugin-lazy-images';
import '@notiz/scully-plugin-fouc';
import '@notiz/scully-plugin-rss';
import '@notiz/scully-plugin-medium-zoom';
import './projects/banner-generator';
import './projects/amp';

exports.config = {
  projectRoot: './src',
  projectName: 'notiz',
  defaultPostRenderers: ['fouc', 'seoHrefOptimise', 'lazyImages', 'mediumZoom'],
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
