const { JSDOM } = require('jsdom');
const {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  copyFileSync,
  unlinkSync,
} = require('fs');

const { resolve } = require('path');
const { generateImage } = require('./generate-images');
const { log, logError } = require('@scullyio/scully');

const sizes = [
  { name: 'og', width: 1200, height: 630 },
  { name: 'twitter', width: 1200, height: 600 },
];

const bannerGeneratorPlugin = async (html, route) => {
  if (!(route && route.data && route.data.published)) {
    return html;
  }

  if (route.route.startsWith('/series/')) {
    await generateSeriesBanner(route);
  } else {
    await generateBlogBanner(route);
  }
  return html;
};

async function generateBlogBanner(route) {
  try {
    const outDir = './dist/static/assets/banners';
    const template = readFileSync(
      resolve('./projects/banner-generator/template.html')
    ).toString();
    const avatar = getYamlFromMarkdown(
      `./content/authors/${route.data.authors[0]
        .toUpperCase()
        .toLowerCase()
        .replace(' ', '-')}.md`
    ).img;
    const logos = route.data.tags
      .reverse()
      .map((t) =>
        resolve(`./src/assets/stack/${t.toLowerCase().replace(' ', '-')}.svg`)
      )
      .filter((t) => existsSync(t));

    for await (size of sizes) {
      const dom = new JSDOM(template);
      const document = dom.window.document;
      const image = document.createElement('nizs-banner');
      image.title = route.data.title;
      image.setAttribute('author', route.data.authors[0]);
      image.setAttribute('updated-at', route.data.updatedAt);
      image.setAttribute('avatar', avatar);
      image.setAttribute('logos', logos);
      image.setAttribute('width', size.width);
      image.setAttribute('height', size.height);
      document.body.append(image);
      writeFileSyncRecursive(
        `${outDir}/${route.route}/index.html`,
        dom.serialize()
      );
      copyFileSync(
        resolve('./dist/shortcodes/styles.css'),
        resolve(`${outDir}/${route.route}/styles.css`)
      );
      copyFileSync(
        resolve('./dist/shortcodes/main-es5.js'),
        resolve(`${outDir}/${route.route}/main-es5.js`)
      );
      await generateImage(route, size);
    }
    unlinkSync(`${outDir}/${route.route}/index.html`);
    unlinkSync(`${outDir}/${route.route}/styles.css`);
    unlinkSync(`${outDir}/${route.route}/main-es5.js`);
  } catch (err) {
    logError(err.message);
  }
}

async function generateSeriesBanner(route) {
  try {
    const outDir = './dist/static/assets/banners';
    const template = readFileSync(
      resolve('./projects/banner-generator/template.html')
    ).toString();
    const logos = route.data.tags
      .map((t) =>
        resolve(`./src/assets/stack/${t.toLowerCase().replace(' ', '-')}.svg`)
      )
      .filter((t) => existsSync(t));

    for await (size of sizes) {
      const dom = new JSDOM(template);
      const document = dom.window.document;
      const image = document.createElement('nizs-banner-series');
      image.title = route.data.title;
      image.setAttribute('updated-at', route.data.updatedAt);
      image.setAttribute('logos', logos);
      image.setAttribute('width', size.width);
      image.setAttribute('height', size.height);
      document.body.append(image);
      writeFileSyncRecursive(
        `${outDir}/${route.route}/index.html`,
        dom.serialize()
      );
      copyFileSync(
        resolve('./dist/shortcodes/styles.css'),
        resolve(`${outDir}/${route.route}/styles.css`)
      );
      copyFileSync(
        resolve('./dist/shortcodes/main-es5.js'),
        resolve(`${outDir}/${route.route}/main-es5.js`)
      );
      await generateImage(route, size);
      log(`Generated banner for ${route.route}`);
    }
    unlinkSync(`${outDir}/${route.route}/index.html`);
    unlinkSync(`${outDir}/${route.route}/styles.css`);
    unlinkSync(`${outDir}/${route.route}/main-es5.js`);
  } catch (err) {
    logError(err.message);
  }
}

function getYamlFromMarkdown(path) {
  const file = readFileSync(resolve(path)).toString();
  const yaml = file.slice(3, nth_occurrence(file, '---', 2));
  const json = {};
  yaml
    .split('\n')
    .filter((y) => !!y)
    .map((y) => y.split(': '))
    .forEach((y) => (json[y[0]] = y[1]));

  return json;
}

function writeFileSyncRecursive(filename, content, charset) {
  // create folder path if not exists
  filename
    .split('/')
    .slice(0, -1)
    .reduce((last, folder) => {
      let folderPath = last ? last + '/' + folder : folder;
      if (!existsSync(folderPath)) mkdirSync(folderPath);
      return folderPath;
    });

  writeFileSync(filename, content, charset);
}

function nth_occurrence(text, searchString, nth) {
  const firstIndex = text.indexOf(searchString);
  const lengthUpToFirstIndex = firstIndex + 1;

  if (nth === 1) {
    return firstIndex;
  } else {
    const stringAfterFirstOccurrence = text.slice(lengthUpToFirstIndex);
    const nextOccurrence = nth_occurrence(
      stringAfterFirstOccurrence,
      searchString,
      nth - 1
    );

    if (nextOccurrence === -1) {
      return -1;
    } else {
      return lengthUpToFirstIndex + nextOccurrence;
    }
  }
}

module.exports = {
  bannerGeneratorPlugin,
};
