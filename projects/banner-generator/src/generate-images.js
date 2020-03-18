const puppeteer = require('puppeteer');
const { resolve } = require('path');

const generateImage = async (route, size) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `file://${resolve(`src/assets/banners/${route.route}/index.html`)}`
  );
  await page.screenshot({
    path: resolve(`src/assets/banners/${route.route}/${size.name}.png`),
    fullPage: true
  });

  await browser.close();
};

module.exports = { generateImage };
