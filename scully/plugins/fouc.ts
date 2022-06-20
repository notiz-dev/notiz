import { registerPlugin } from '@scullyio/scully';
import { JSDOM } from 'jsdom';

export const fouc = 'fouc';

const foucPlugin = async (html: string): Promise<string> => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  doc.body.classList.add('fouc');
  doc.head.append(createInvisibleStyle(doc));
  doc.body.append(createFoucScript(doc));

  return dom.serialize();
};

const createFoucScript = (doc: Document) => {
  const script = doc.createElement('script');
  script.innerHTML = `
      window.addEventListener('AngularReady', foucScript);
      function foucScript(){
        document.body.classList.remove('fouc');
        window.removeEventListener('AngularReady', foucScript);
      }
      `;
  return script;
};

const createInvisibleStyle = (doc: Document) => {
  const css = doc.createElement('style');
  css.innerHTML = `
      .fouc {
        visibility: hidden;
      }
    `;
  return css;
};

const validator = async () => [];

registerPlugin('postProcessByHtml', fouc, foucPlugin, validator);
