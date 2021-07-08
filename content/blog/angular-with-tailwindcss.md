---
title: Angular with Tailwind CSS
description: Learn how to style Angular applications with Tailwind CSS
published: true
publishedAt: 2020-07-13T08:55:00.000Z
updatedAt: 2021-06-03T16:20:00.000Z
tags:
  - Angular
  - Tailwind CSS
  - CSS
keywords:
  - Utility-First CSS
authors:
  - Marc Stammerjohann
github: https://github.com/notiz-dev/angular-tailwindcss
---

Learn how to use utility-first CSS framework [Tailwind CSS](https://tailwindcss.com) with [Angular](https://angular.io/) using [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus).

This guide works for both Tailwind CSS v1 and [v2](https://blog.tailwindcss.com/tailwindcss-v2) and Angular v10 and [v11](https://blog.angular.io/version-11-of-angular-now-available-74721b7952f7).

## Angular Version 11.2.0 or higher

<div shortcode="note" type="warn">
Follow this instructions if your Angular version is 11.2 or higher, otherwise follow [Angular Version below 11.2](https://notiz.dev/blog/angular-with-tailwindcss#angular-version-below-112) instructions.
</div>

Angular added native support for Tailwind CSS with the release of [v11.2](https://twitter.com/angular/status/1359736376581840896). Enable Tailwind CSS with the following 3 steps

📦 Install Tailwind dependencies 

<div shortcode="code" tabs="BASH">

```bash
npm install -D tailwindcss autoprefixer postcss
```

</div>

🏗  Create Tailwind config file via the Tailwind CLI

<div shortcode="code" tabs="BASH">

```bash
npx tailwindcss init
```

</div>

Or create `tailwind.config.js` in your root folder and copy the following content. It already includes purge for your HTML and TS files.

<div shortcode="code" tabs="tailwind.config.js">

```js
module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

</div>

🖌️ Add Tailwind in your styles file, either `src/styles.css` or `src/styles.scss`

<div shortcode="code" tabs="src/styles.css,src/styles.scss">

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

</div>

## Angular Version below 11.2

You need the [Angular CLI](https://cli.angular.io/) to create a new Angular v10 or v11 application.

<div shortcode="code" tabs="BASH">

```bash
ng new app-name --style=scss
cd app-name
```

</div>

Follow the instruction to manually configure Angular w/ Tailwind 🍬🍫🍪 or jump directly to the [shortcut](https://notiz.dev/blog/angular-10-with-tailwindcss#shortcut-aka-angular-schematics).

## Setup

Start by adding dependencies for Tailwind, Postcss and ngx-build-plus for angular.

<div shortcode="code" tabs="BASH">

```bash
npm i -D tailwindcss autoprefixer postcss postcss-import postcss-loader postcss-scss

ng add ngx-build-plus
```

</div>

Create a **webpack.config.js** in your root folder to configure Postcss with Tailwind.

<div shortcode="code" tabs="BASH,webpack.config.js">

```bash
touch webpack.config.js
```
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            syntax: 'postcss-scss',
            plugins: [
              require('postcss-import'),
              require('tailwindcss'),
              require('autoprefixer'),
            ],
          },
        },
      },
    ],
  },
};
```

</div>


Now open **angular.json** file to apply the extra webpack config to generate Tailwind styles during `ng build`, `ng serve` and `ng test`. If you used the schematics `ng add ngx-build-plus` it automatically replaces `@angular-devkit/build-angular` with `ngx-build-plus` in your `angular.json`. Additionally, add the `extraWebpackConfig` to each build step. In the end your **angular.json** should look like this:

<div shortcode="code" tabs="angular.json">

```diff
"architect": {
  "build": {
-   "builder": "@angular-devkit/build-angular:browser",
+   "builder": "ngx-build-plus:browser",
    "options": {
+     "extraWebpackConfig": "webpack.config.js",
      ...
    }
    ...
  },
  "serve": {
-   "builder": "@angular-devkit/build-angular:dev-server",
+   "builder": "ngx-build-plus:dev-server",
    "options": {
+     "extraWebpackConfig": "webpack.config.js",
      ...
    }
    ...
  },
  "test": {
-   "builder": "@angular-devkit/build-angular:karma",
+   "builder": "ngx-build-plus:karma",
    "options": {
+     "extraWebpackConfig": "webpack.config.js",
      ...
    }
    ...
  },
```

</div>

Perfect, now it's time to generate the Tailwind config `npx tailwindcss init` or for full config `npx tailwindcss init --full`. Almost there. Add Tailwind base styles to your `src/styles.scss` file

<div shortcode="code" tabs="styles.scss">

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

</div>

Now go ahead serve your app, you are ready to style 🎨 your Angular app with Tailwind utility classes.

... wait a moment, we need to purge the unused CSS styles from Tailwind.

## Remove unused CSS Styles

We can use the new [purge](https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css) option in **tailwind.config.js**.

<div shortcode="code" tabs="tailwind.config.js">

```js
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.ts'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
```

</div>

Unused styles are removed by Tailwind when you run your build with `NODE_ENV` set to `production`. Add `"build:prod": "NODE_ENV=production ng build --prod",` to your scripts in **package.json**. Now run `npm run build:prod` for a production build **only** with used Tailwind styles.

## CSS instead of SCSS

Using CSS instead of SCSS? No problem. You don't need to install `postcss-scss`.

<div shortcode="code" tabs="BASH,webpack.config.js">

```bash
npm i -D tailwindcss autoprefixer postcss postcss-import postcss-loader 

ng add ngx-build-plus
```
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            syntax: 'postcss',
            plugins: [
              require('postcss-import'),
              require('tailwindcss'),
              require('autoprefixer'),
            ],
          },
        },
      },
    ],
  },
};
```

</div>

Finally add Tailwind base styles to `src/styles.css`.

<div shortcode="code" tabs="styles.css">

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

</div>

## Shortcut aka Angular Schematics

If you also think the steps above are tedious ... Don't look any further.

Angular Schematics 💪 to the rescue. [Gary](https://notiz.dev/authors/gary-grossgarten) created a schematic to add Tailwind to an Angular project.

<div shortcode="repo" repo="notiz-dev/ngx-tailwind"></div>

Simply run the schematic to automatically configure Tailwind CSS:

<div shortcode="code" tabs="BASH">

```bash
ng add ngx-tailwind
```

</div>

## Use Tailwind CSS utility classes

Now go crazy with Tailwind's CSS utility classes in your Angular app.

Add them to your HTML template `class`, `[class.hover:...]="true"` or use them with `ngClass`

<div shortcode="code" tabs="HTML,CSS">

```html
<span class="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white" [class.hover:bg-red-700]="hoverMe">
  #angular
</span>
```
```css
span {
  @apply inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white;
} 

span:hover {
  @apply bg-red-700;
} 
```

</div>

<div shortcode="note">
@apply is not compiled when using it in an Angular library due to [missing support for postcss](https://github.com/ng-packagr/ng-packagr/issues/1471) of ng-packagr.
</div>

Or use `@HostBinding` in your `*.ts` files

<div shortcode="code" tabs="TS">

```ts
@HostBinding('class')
get classes() {
  return 'bg-red-500 px-4';
}

@HostBinding('class.hidden')
get classes() {
  return this.isHidden;
}
```

</div>

Add the following snippet to your `src/app.component.html` to see if Tailwind styles the following card. (Don't worry about the picture its random)

<div shortcode="figure" caption="Angular Tailwind Card">

![Angular Tailwind Card](assets/img/blog/angular-10-with-tailwindcss/optimized/angular-tailwind-card.png)

</div>

<div shortcode="code" tabs="HTML">

```html
<div class="max-w-sm mx-auto mt-8 rounded overflow-hidden shadow-lg space-y-4">
  <img
    class="h-64 w-full object-cover object-center"
    src="https://source.unsplash.com/random"
    alt="Random unsplash photo"
  />
  <div class="px-6">
    <div class="font-bold text-xl">Angular w/ Tailwind</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </p>
  </div>
  <div class="px-6 pb-4 space-x-2">
    <a
      href="https://angular.io"
      target="_blank"
      rel="noreferrer"
      class="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white hover:bg-red-700"
    >
      #angular
    </a>
    <a
      href="https://tailwindcss.com"
      target="_blank"
      rel="noreferrer"
      class="inline-block bg-indigo-500 rounded-full px-3 py-1 text-sm font-semibold text-white hover:bg-indigo-700"
    >
      #tailwind
    </a>
    <a
      href="https://notiz.dev"
      target="_blank"
      rel="noreferrer"
      class="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-blue-400"
    >
      #notiz
    </a>
  </div>
</div>
```

</div>

In the next post you will create an Angular component for a floating form field based on my last post [Floating Form Field with Tailwind CSS](https://notiz.dev/blog/floating-form-field-with-tailwindcss).

## Migrations

### Upgrading from Tailwind CSS v1 to v2

To upgrade you project from [Tailwind CSS v1.x to v2.0](https://tailwindcss.com/docs/upgrading-to-v2) run the following install command

<div shortcode="code" tabs="BASH">

```bash
npm i -D tailwindcss@latest postcss@latest autoprefixer@latest postcss-import@latest
```

</div>

Read the full [Upgrade Guide](https://tailwindcss.com/docs/upgrading-to-v2) to update your custom `tailwind.config.js` (e.g. [your color palette](https://tailwindcss.com/docs/upgrading-to-v2#configure-your-color-palette-explicitly)) and replace removed classes from your template (e.g. [shadow-outline and shadow-xs](https://tailwindcss.com/docs/upgrading-to-v2#replace-shadow-outline-and-shadow-xs-with-ring-utilities)).

### Update postcss-loader from 3.x to 4.x

[postcss-loader](https://github.com/webpack-contrib/postcss-loader) has new [breaking changes](https://github.com/webpack-contrib/postcss-loader/blob/master/CHANGELOG.md#-breaking-changes) when updating from version 3.x to 4.x. Huge thanks to [@phileagleson](https://github.com/notiz-dev/notiz/issues/111#issuecomment-689249664) :clap: who pointed out that options for Postcss have moved to the `postcssOptions`. Therefore, update your `webpack.config.js` as follows when updating to `postcss-loader@4.x`

<div shortcode="code" tabs="webpack.config.js">

```diff
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
-          ident: 'postcss',
-          syntax: 'postcss-scss',
-          plugins: () => [
-            require('postcss-import'),
-            require('tailwindcss'),
-            require('autoprefixer'),
-          ],
+          postcssOptions: {
+           ident: 'postcss',
+            syntax: 'postcss-scss',
+            plugins: [
+              require('postcss-import'),
+              require('tailwindcss'),
+              require('autoprefixer'),
            ],
          },
        },
      },
    ],
  },
};
```

</div>

All `webpack.config.js` examples are updated to use the new `postcssOptions` for `postcss-loader@4.x`.
