const { registerPlugin } =  require('@scullyio/scully');
const { lazyImagesPlugin } =  require('./lazy-images');

const validator = async () => [];
registerPlugin('render', 'lazyImages', lazyImagesPlugin, validator);