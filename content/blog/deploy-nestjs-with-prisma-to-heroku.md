---
title: 'Deploy Nestjs with Prisma to Heroku'
description: 'Deploy a Nestjs application with Prisma 2 to Heroku and connect to a PostgreSQL database.'
published: true
publishedAt: 2020-03-10T12:35:00.000Z
updatedAt: 2020-03-10T12:35:00.000Z
tags:
  - Nestjs
  - Prisma
  - Heroku
authors:
  - 'Marc Stammerjohann'
github: 'https://github.com/notiz-dev/deploy-nestjs-prisma-heroku'
---

I will show you how to deploy a Nestjs application with Prisma 2 to [Heroku](https://www.heroku.com/) 🚀. Also we will create a [PostgreSQL database on Heroku](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1) and connect it with Prisma.
Heroku offers a Free and Hobby plan and a free PostgreSQL database.

Check out my previous tutorial [How to query your database using Prisma with Nestjs](https://notiz.dev/blog/how-to-connect-nestjs-with-prisma) to create a `PrismaService` for your Nest application.

## Prepare Nest application for Heroku

Let's get started by preparing our Nest application to run on Heroku.

First we will modify `main.ts` to use the port provided by Heroku as a environment variable. CORS can also be enabled for web application making requests to this Nest application.

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

Heroku takes care installing our **node_modules** for us. Before Heroku can start our Nest application using `npm run start:prod`, we will need to build our app. We add a `"postinstall": "npm run build",` to the **scripts** in our **package.json** which performs the app build creating our `dist` folder.

We need to tell Heroku how to execute our Nest application and we do this by creating a `Procfile` in the root folder with the start script `web: npm run start:prod`.

## New Heroku app and CLI

Next, signing up or logging into our [Heroku account](https://id.heroku.com/login). Create a new heroku app click on **New** and then **Create new app**.

Choose an app name to identify your app and the name is also used as your default api endpoint at **https://your-app-name.herokuapp.com/**. You can also choose between two regions for your app **United States** and **Europe**.

![Create new Heroku app](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/create-new-app.png)

Note: Heroku let's you to configure a custom domain in your app settings.

Alright, our app is setup now we install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) and we deploy our Nest application to Heroku.

![Deploy using Heroku Git](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/deploy-using-heroku-git.png)

```bash
heroku login

cd your-nest-app
heroku git:remote -a your-app-name

git push heroku master
```

## Create PostgreSQL and connect with Prisma
