---
title: Send Emails with NestJS
description: Create Email Templates and send them with nodemailer from your Nest application 
published: true
publishedAt: 2021-03-18T11:15:00.000Z
updatedAt: 2021-03-18T11:15:00.000Z
tags:
  - NestJS
keywords:
  - Email
  - nodemailer
authors:
  - Marc Stammerjohann
github: https://github.com/notiz-dev/nestjs-mailer
---

This post gets you up and running with everything you need to know about sending Emails using [nest-modules/mailer](https://github.com/nest-modules/mailer) in your [NestJS](https://github.com/nestjs/nest) backend. 👇

📧 Sending emails using [Nodemailer](https://nodemailer.com/about/)  
🧩 Creating email templates with [handlebars](https://handlebarsjs.com/) (alternatives: pug or ejs)  
⚙️ Configure smtp via `.env` file

## Install Dependencies

Add the `@nestjs-modules/mailer` and the peer dependency `nodemailer` to your Nest application. Choose one of the supported template engines for creating your email templates: [handlebars](https://handlebarsjs.com/), [pug](https://pugjs.org/api/getting-started.html) or [ejs](https://ejs.co/). 

```bash
npm install --save @nestjs-modules/mailer nodemailer

# pick one template adapter and install
npm install --save handlebars
# or
npm install --save pug
# or
npm install --save ejs
```

In this guide, you are creating email templates using handlebars. 

```bash
npm install --save @nestjs-modules/mailer nodemailer handlebars
```

## Mail Module

Let's begin with creating a `mail` module and service via the Nest CLI and followed by creating a `templates` folder.

```bash
nest g module mail
nest g service mail

mkdir src/mail/templates
```

Import the `MailerModule` into your `MailModule` and configure your mail server transport via `smtp`. Provide a default `from` email address to consistently use the same mail throughout your application. No worries, you can always override the default whenever necessary. Last step, configure the templates folder and the adapter in this case `HandlebarsAdapter`. Find out more about the other template adapters in the [Mailer documentation](https://nest-modules.github.io/mailer/docs/mailer#configuration). 

```ts
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.example.com',
        secure: false,
        auth: {
          user: 'user@example.com',
          pass: 'topsecret',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
```

Export the `MailService` to provide it via Dependency Injection (DI) for your controllers, resolvers and services.

## Handlebars Mail Template

Create your first email template `confirmation.hbs` in the `src/mail/templates` folder. Add the following simple template for a user confirmation.

```html
<p>Hey {{ name }},</p>
<p>Please click below to confirm your email</p>
<p>
    <a href="{{ url }}">Confirm</a>
</p>

<p>If you did not request this email you can safely ignore it.</p>
```

Those curly brackets are [handlebars expressions](https://handlebarsjs.com/guide/#what-is-handlebars) and you will provide the `context` later while sending an email.

When you build your Nest application you will notice that the build output is missing your template files (`dist/mail/templates`).

![handlebars templates missing in compilation output](assets/img/blog/send-emails-with-nestjs/optimized/handlebars-templates-missing-in-compilation.png)

By default, Nest **only** distributes TypeScript compiled files (`.js` and `.d.ts`) during the build step. To distribute your `.hbs` files, open your `nest-cli.json` and add your `templates` directory to the [assets](https://docs.nestjs.com/cli/monorepo#assets) property in the global `compilerOptions`.

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "assets": ["mail/templates/**/*"] // 👈  or "**/*.hbs" all files ending with .hbs
    "watchAssets": true // 🤖 copy assets in watch mode
  }
}
```

Build your Nest application again and now your template files are included in the build output.

![handlebars templates included in compilation output](assets/img/blog/send-emails-with-nestjs/optimized/handlebars-templates-included-in-compilation.png)

## Sending Mail

Add `MailerService` to your own `MailService` and implement your mailing logic here. Let's send a user confirmation email using the template `confirmation.hbs`. You need to provide `{{ name }}` and `{{ url }}` under the `context` key. Read the [Handlebars documentation](https://handlebarsjs.com/guide) for more background like [Nested input objects](https://handlebarsjs.com/guide/#nested-input-objects).

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
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }
}

// ./../user/user.entity
export interface User {
  email: string;
  name: string;
}
```

## Using Mail Service

Add the `MailModule` to the `imports` list of your modules which need to use the `MailService`.

```ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [MailModule], // 📧
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
```

Now you can add `MailService` to the constructor of your controllers, resolvers and services

```ts
import { Injectable } from '@nestjs/common';
import { MailService } from './../mail/mail.service';
import { User } from './../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private mailService: MailService) {}

  async signUp(user: User) {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    // create user in db
    // ...
    // send confirmation mail
    await this.mailService.sendUserConfirmation(user, token);
  }
}
```

## Move configurations to dotenv file

Currently, the mail server configurations are hardcoded in to the `MailModule`. Nest provides a [configuration module](https://docs.nestjs.com/techniques/configuration) which enables you to load your configurations and credentials from `.env` files. 

Install the `@nestjs/config` dependency.

```bash
# config 
npm i --save @nestjs/config
```

Add the `ConfigModule` to the `imports` list of your `AppModule`.

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Create a `.env` file in your root directory and don't forget to add in your `.gitingore` file.

```bash
# mail
MAIL_HOST=smtp.example.com
MAIL_USER=user@example.com
MAIL_PASSWORD=topsecret
MAIL_FROM=noreply@example.com

# optional
MAIL_TRANSPORT=smtp://${MAIL_USER}:${MAIL_PASSWORD}@${MAIL_HOST}
```

Reopen `MailModule` and change `MailerModule.forRoot` to `MailerModule.forRootAsync`, this allows you to inject and use the `ConfigService`.

```ts
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_USER')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
```

Time to add your own mail server configuration, start Nest and send your first mails 📧 to your users.