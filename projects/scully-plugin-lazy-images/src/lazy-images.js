const { JSDOM } = require('jsdom');

const lazyImagesPlugin = async (html, route) => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  var imgEl = doc.getElementsByTagName('img');

  // can be added when loadine="lazy" is supported in more browsers
  //   for (var i = 0; i < imgEl.length; i++) {
  //     imgEl[i].setAttribute('loading', 'lazy');
  //   }

  for (var i = 0; i < imgEl.length; i++) {
    if (imgEl[i].getAttribute('src')) {
      imgEl[i].setAttribute('data-src', imgEl[i].getAttribute('src'));
      imgEl[i].removeAttribute('src');
      imgEl[i].classList.add('lazyload');
    }
  }

  const lib = doc.createElement('script');
  lib.src = 'https://cdn.jsdelivr.net/npm/lazyload@2.0.0-rc.2/lazyload.js';
  const s = doc.createElement('script');
  s.innerHTML = `
    (() => { 
      document.addEventListener('readystatechange',function(){
          if(document.readyState === 'complete'){
              setTimeout(() => {
                lazyload();
              },0)
          }
      })
    })();
    `;
  doc.body.append(lib);
  doc.body.append(s);

  return dom.serialize();
};

module.exports = {
  lazyImagesPlugin
};
