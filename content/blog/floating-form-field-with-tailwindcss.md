---
title: Floating Form Field with Tailwind CSS
description: Learn how to build a floating form field with Tailwind CSS
published: true
publishedAt: 2020-05-25T11:30:00.000Z
updatedAt: 2020-05-25T11:30:00.000Z
tags:
  - Tailwind CSS
authors:
  - Marc Stammerjohann
github: https://github.com/notiz-dev/...
---

In the following lessons you will learn how to use [Tailwind CSS](https://tailwindcss.com) utility-first approach to create a floating form field known from [Material Design](https://material.io/components/text-fields). Inspired by the awesome video from [fireship.io](https://www.youtube.com/watch?v=yrrw6KdGuxc).

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

## Floating Form Field

## Outline Form Field
