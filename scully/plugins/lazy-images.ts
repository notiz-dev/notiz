import { log, registerPlugin, scullyConfig } from '@scullyio/scully';
import { JSDOM } from 'jsdom';
import axios from 'axios';
import sizeOf from 'image-size';
import { join } from 'path';

export const lazyImages = 'lazyImages';

const lazyImagesPlugin = async (html: string): Promise<string> => {
  const dom = new JSDOM(html);

  const imageElements = dom.window.document.getElementsByTagName('img');

  for (let i = 0; i < imageElements.length; i++) {
    imageElements[i].setAttribute('loading', 'lazy');

    const src = imageElements[i].getAttribute('src');

    if (src && !src.startsWith('data:image/svg+xml')) {
      let dimensions = {
        width: imageElements[i].width || 0,
        height: imageElements[i].height || 0,
      };
      try {
        if (src.startsWith('http')) {
          const image = await axios.get(src, {
            responseType: 'arraybuffer',
          });
          dimensions = sizeOf(image.data);
          imageElements[i].setAttribute('height', `${dimensions.height}`);
          imageElements[i].setAttribute('width', `${dimensions.width}`);
        } else {
          dimensions = sizeOf(join(scullyConfig.outDir, src));
          imageElements[i].setAttribute('height', `${dimensions.height}`);
          imageElements[i].setAttribute('width', `${dimensions.width}`);
        }
      } catch (err) {
        log(`Image cannot be loaded, ignoring...`, err.message);
      }
    }
  }

  return dom.serialize();
};

const validator = async () => [];

registerPlugin('postProcessByHtml', lazyImages, lazyImagesPlugin, validator);
