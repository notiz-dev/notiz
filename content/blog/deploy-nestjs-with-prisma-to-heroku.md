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

Check out my previous tutorial [How to query your database using Prisma with Nestjs](https://notiz.dev/blog/how-to-connect-nestjs-with-prisma) to create a `PrismaService` for your Nest application.

## Prepare Nest application for Heroku

Let's get started by preparing our Nest application to run on Heroku.

First we will modify our `main.ts` to use the port provided by Heroku as an environment variable. CORS can also be enabled for web or mobile applications making requests to the Nest application.

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

Heroku takes care of installing our **node_modules** for us. Before Heroku can start our Nest application using `npm run start:prod`, we will need to build our app. We add `"postinstall": "npm run build",` to the **scripts** in our **package.json** which performs the app build creating our `dist` folder.

Heroku needs to know how to execute our Nest application via a `Procfile`. Create a `Procfile` in the root folder with our start script `web: npm run start:prod`. Now Heroku will install our dependencies, build the application in the **postinstall** script and then start the application.

## New Heroku app and CLI

Next, signing up or logging into your [Heroku account](https://id.heroku.com/login). Create a new heroku app by clicking on **New** and then **Create new app**.

Choose an app name to identify your app and the name is also used as your default api endpoint at **https://your-app-name.herokuapp.com/**. You can also choose between two regions for your app **United States** and **Europe**.

![Create new Heroku app](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/create-new-app.png)

Note: Heroku let's you to configure a custom domain in your app settings.

Alright, our heroku app is setup let's install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) and we use it to deploy our Nest application to Heroku.

![Deploy using Heroku Git](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/deploy-using-heroku-git.png)

```bash
heroku login

cd your-nest-app
heroku git:remote -a your-app-name

git push heroku master
```

After pushing your current application to Heroku you should see the following output in your terminal or in the **Activity** tab of your Heroku app.

![First app build on Heroku](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/first-build.png)

Heroku prints **Build succeeded!** and your application link at the end like [https://nestjs-prisma-heroku.herokuapp.com/](https://nestjs-prisma-heroku.herokuapp.com/). Our Nest app should now be successfully deployed on Heroku!? 🤔

Let's visit out app either by clicking on the link or by clicking **Open app** in the toolbar.

I am seeing **Hello World!**, our Nest app is succesfully deployed to Heroku 🎉

![Hello World!](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/first-app-launch.png)

But we are not done yet! Let's setup a PostgreSQL and query it using Prisma.

## Setup PostgreSQL and connect with Prisma
