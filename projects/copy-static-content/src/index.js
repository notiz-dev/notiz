const { registerPlugin } = require('@scullyio/scully');
const { copyStaticContentPlugin } = require('./copy-static-content');

const validator = async () => [];
registerPlugin(
  'postProcessByHtml',
  'copyStaticContent',
  copyStaticContentPlugin,
  validator
);
