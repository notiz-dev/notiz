const { registerPlugin } = require('@scullyio/scully');
const { bannerGeneratorPlugin } = require('./banner-generator');

const validator = async () => [];
registerPlugin(
  'postProcessByHtml',
  'bannerGenerator',
  bannerGeneratorPlugin,
  validator
);
