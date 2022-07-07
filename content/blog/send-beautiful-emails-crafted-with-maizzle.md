---
title: "Maizzle: Craft beautiful HTML emails with Tailwind CSS"
description: Send beautiful HTML emails via NestJS crafted with Maizzle and Tailwind CSS
published: true
publishedAt: 2022-07-07T10:00:00.000Z
updatedAt: 2022-07-07T10:00:00.000Z
tags:
  - Maizzle
  - Tailwind CSS
  - NestJS
keywords:
  - Email
  - nodemailer
authors:
  - Marc Stammerjohann
github: https://github.com/notiz-dev/nestjs-mailer
---

Building beautiful HTML emails with CSS can be quite cumbersome 🙁, right?!

Get ready to build beautiful email templates 🖼️ crafted with [Maizzle](https://maizzle.com) using [Tailwind CSS](https://tailwindcss.com) and send them with your NestJS application.

Start with the previous post on how to create [email templates and sending them from NestJS](https://notiz.dev/blog/send-emails-with-nestjs) with [Handlebars](https://handlebarsjs.com).

<div shortcode="article" routes="/blog/send-emails-with-nestjs"></div>

## Maizzle project

[Add](https://maizzle.com/docs/installation#create-a-project) a new Maizzle project to your NestJS repository.

<div shortcode="note">

@maizzle/framework v4.x requires Node v14 or higher

</div>

<div shortcode="code" tabs="BASH">

```bash
npx degit maizzle/maizzle project-name

# for example
npx degit maizzle/maizzle mail-templates
```

</div>

Open the new project in your terminal and install the dependencies:

<div shortcode="code" tabs="BASH">

```bash
cd mail-templates

npm install
```

</div>

Start the development server with `npm run dev` and go to [localhost:3000](http://localhost:3000) in your browser to see your email templates. This is useful for your local development.

When your templates are ready you want to build your email templates for production: 

<div shortcode="code" tabs="BASH">

```bash
npm run build
```

</div>

You'll get to this in a bit. Next you'll customize the email confirmation template (`src/templates/transactional.html`) to include [Handlebar expressions](https://handlebarsjs.com/guide/#simple-expressions). 

Open the [transaction template](http://localhost:3000/transactional.html) in your browser and watch for the changes you'll make.

## Handlebar expressions

Ideally, when sending an email you want to customize the email content based on the requesting user. This includes greeting the user 👋 (with name or email), links for interactions (confirming email, requesting new password) or personal links for managing mail preferences.

Open `src/templates/transactional.html` and add custom content through Handlebar expressions for `name` and `url` to the template.

<div shortcode="code" tabs="transactional.html">

```html
<!-- ... -->
<p>Hello {{name}},</p> 
<p class="m-0 ... sm:leading-8">
  Is it you we're looking for?
</p>
<p class="m-0 mb-6">
  Please confirm your email address by clicking the button below:
</p>
<div class="leading-full">
  <a
    href="{{url}}"
    class="inline-block ... hover:bg-indigo-500"
  >
    <!-- ... -->
    <span class="mso-text-raise-4">Confirm email address &rarr;</span>
    <!-- ... -->
  </a>
</div>
<!-- ... -->
```

</div>

You'll notice that `{{name}}` is not displayed at all, instead you see `undefined` 😤.

<div shortcode="figure" caption="Handlebars expression are missing in email template">

![Handlebars expression are missing in email template](assets/img/blog/send-beautiful-emails-crafted-with-maizzle/optimized/missing-handlebar-expressions.png)

</div>

Thats because Maizzle itself relies on [curly brace expressions](https://maizzle.com/docs/templates#expressions) to access variables or template front matter. 

Luckily, Maizzle provides two options to [prevent expression compilation](https://maizzle.com/docs/templates#ignoring-expressions) 😎. Use `@{{ }}` for single expression and `<raw> ... </raw>` tag for blocks with multiple expressions.

Add the `@` prefix to the `name` and `url` expression and you should see `Hello {{name}},` in your compiled template.

<div shortcode="code" tabs="transactional.html">

```html
<!-- ... -->
<p>Hello @{{name}},</p> 
<p class="m-0 ... sm:leading-8">
  Is it you we're looking for?
</p>
<p class="m-0 mb-6">
  Please confirm your email address by clicking the button below:
</p>
<div class="leading-full">
  <a
    href="@{{url}}"
    class="inline-block ... hover:bg-indigo-500"
  >
    <!-- ... -->
    <span class="mso-text-raise-4">Confirm email address &rarr;</span>
    <!-- ... -->
  </a>
</div>
<!-- ... -->
```

</div>

<div shortcode="figure" caption="Handlebars expression are ignored from compilation">

![Handlebars expression are ignored from compilation](assets/img/blog/send-beautiful-emails-crafted-with-maizzle/optimized/ignored-handlebar-expressions.png)

</div>

Your email template is looking great. Let's build the template for production and for NestJS to be used for sending emails.

## Build production email

Maizzle provides a build command for production to inline CSS and many more optimizations.

<div shortcode="code" tabs="BASH">

```bash
npm run build
```

</div>

This compiles your emails inside `mail-templates/build_production`, but wouldn't it be nice to output them into the template folders used by `@nestjs-modules/mailer` from the previous post (`src/mail/templates`) 🤩.

`config.production.js` contains settings used for the production build. Open it and change the destination path and change the extension to `hbs`.

```js
module.exports = {
  build: {
    templates: {
      destination: {
        path: '../src/mail/templates',
        extension: 'hbs'
      },
    },
  },
  inlineCSS: true,
  removeUnusedCSS: true,
}
```

Now when you run `npm run build` your templates are compiled to `src/mail/templates/*.hbs`. 

Cool 💪 your templates are ready and compiled for production. Use them in your NestJs application with `@nestjs-modules/mailer`.

## Sending mail template

In the previous post you created the `MailService`.

<div shortcode="code" tabs="mail.service.ts">

```ts
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from './../user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // 👈 either change to ./transactional or rename transactional.html to confirmation.html
      context: { // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }
}
```

</div>

Here you used `confirmation` as the template name. Either rename `transactional.html` to `confirmation.html` in `mail-templates/src/templates`, don't forget to compile again, or use `transactional` as the template name when using `this.mailerService.sendMail({...});`.

Awesome 🤩 you are all set to build your own beautiful email templates. Comment below which templates you most often use in your applications. Checkout these [transactional templates](https://github.com/mailpace/templates) build with Maizzle (v3.7.2) for some inspiration.

Do want to dig through the source code? Checkout the repository for this post.

<div shortcode="repo" repo="notiz-dev/nestjs-mailer"></div>