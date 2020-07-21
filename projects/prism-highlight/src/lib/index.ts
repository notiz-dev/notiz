import { PrismHighlightConfig } from './prism-config';
import {
  registerPlugin,
  HandledRoute,
  getPluginConfig,
} from '@scullyio/scully';
import { JSDOM } from 'jsdom';
import * as Prism from 'prismjs';

const loadLanguages = require('prismjs/components/');

declare var global;

const prismHighlightPlugin = async (
  HTML: string,
  route: HandledRoute
): Promise<string> => {
  const dom = new JSDOM(HTML);
  global.document = dom.window.document;

  const config: PrismHighlightConfig = getPluginConfig(PrismHighlightPlugin);

  loadLanguages(config.languages || []);

  Prism.highlightAll(false);

  return dom.serialize();
};

const PrismHighlightPlugin = 'prismHighlight';
const validator = async (conf) => [];
registerPlugin('render', PrismHighlightPlugin, prismHighlightPlugin, validator);

export const getPrismHighlightPlugin = () => PrismHighlightPlugin;
