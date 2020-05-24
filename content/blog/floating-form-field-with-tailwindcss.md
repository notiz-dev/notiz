---
title: Floating Form Field with Tailwind CSS
description: Learn how to build a floating form field with Tailwind CSS
published: true
publishedAt: 2020-05-25T11:30:00.000Z
updatedAt: 2020-05-25T11:30:00.000Z
tags:
  - Tailwind CSS
  - CSS
authors:
  - Marc Stammerjohann
github: https://github.com/notiz-dev/...
---

In the following lessons you will learn how to use [Tailwind CSS](https://tailwindcss.com) utility-first approach to create a floating form field known from [Material Design](https://material.io/components/text-fields). 

![Floating form field result](assets/img/blog/floating-form-field-with-tailwindcss/optimized/floating-form-field-result.png)

Inspired by the awesome video by [fireship.io](https://www.youtube.com/watch?v=yrrw6KdGuxc).

## Setup

Let's start in an empty directory and setup up a default `package.json` file using `npm init -y`.

### Setup Tailwind CSS

We setup [Tailwind](https://tailwindcss.com/docs/installation/) by installing

```bash
npm i -D tailwindcss postcss-cli autoprefixer
```

Generate a Tailwind config file as we need to [customize](https://tailwindcss.com/docs/configuration/) Tailwind for the floating form field later.

```bash
npx tailwindcss init
```

Create `postcss.config.js` file requiring `tailwindcss` and `autoprefixer` as a plugin:

```js
module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer")
  ]
};
```

Create your tailwind styles under `css/tailwind.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add those scripts to your `package.json` one to build and the other to watch changes made to the `tailwind.css` file.

```json
"scripts": {
  "build": "postcss css/tailwind.css -o public/build/tailwind.css",
  "dev": "postcss css/tailwind.css -o public/build/tailwind.css -w"
},
```

### Setup HTML

We will start with the following simple HTML layout - create an `index.html` in the **public** directory.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FFFwT</title>

    <link rel="stylesheet" href="build/tailwind.css" />
  </head>
  <body class="antialiased p-4">
    <form>
      <div>
        <input type="text" name="username" />
        <label for="username">Username</label>
      </div>
    </form>
  </body>
</html>
```

You can use [live-server](https://www.npmjs.com/package/live-server) to start a dev-server with live reload.

```bash
live-server public
```

Here we have our input and label.

![Input and Label](assets/img/blog/floating-form-field-with-tailwindcss/optimized/1-input-and-label.png)

Let's apply our styles for the floating form field.

## Floating Form Field

## Outline Form Field
