const { JSDOM } = require('jsdom');

const foucPlugin = async (html, route) => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  doc.body.classList.add('fouc');
  const css = doc.createElement('style');
  css.innerHTML = `
  
  .fouc{
    visibility:hidden;
  }

  `;
  doc.head.append(css);
  const s = doc.createElement('script');
  s.innerHTML = `
    (() => { 
      document.addEventListener('readystatechange',function(){
          if(document.readyState === 'complete'){
              setTimeout(() => {
                document.body.classList.remove('fouc');
              },0)
          }
      })
    })();
    `;
  doc.body.append(s);
  return dom.serialize();
};

module.exports = {
  foucPlugin
};
