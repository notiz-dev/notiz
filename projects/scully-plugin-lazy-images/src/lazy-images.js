const { JSDOM } = require('jsdom');

const lazyImagesPlugin = async (html, route) => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  var imgEl = doc.getElementsByTagName('img');
  for (var i = 0; i < imgEl.length; i++) {
    imgEl[i].setAttribute('loading', 'lazy');
  }
  return dom.serialize();
};

module.exports = {
  lazyImagesPlugin
};
