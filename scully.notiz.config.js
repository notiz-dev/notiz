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
    '/tags/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './content/tags'
      }
    }
  }
};
