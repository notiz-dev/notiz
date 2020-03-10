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

> **Note**: Heroku let's you to configure a custom domain in your app settings.

Alright, our heroku app is setup.

![Deploy using Heroku Git](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/deploy-using-heroku-git.png)

We install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) and deploy our Nest application by pushing to Heroku git.

```bash
heroku login

cd your-nest-app
heroku git:remote -a your-app-name

git push heroku master
```

After pushing our current application to Heroku we see the following output in our terminal or in the **Activity** tab of our Heroku app.

![First app build on Heroku](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/first-build.png)

Heroku prints **Build succeeded!** and our application link at the end like [https://nestjs-prisma-heroku.herokuapp.com/](https://nestjs-prisma-heroku.herokuapp.com/). Our Nest app should now be successfully deployed on Heroku!? 🤔

Let's visit out app either by clicking on the link or by clicking **Open app** in the toolbar.

I am seeing **Hello World!**, the Nest app is successfully deployed to Heroku 🎉

![Hello World!](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/first-app-launch.png)

In the next step we will setup a PostgreSQL database and use Prisma Migrate to apply our database schema.

## Setup PostgreSQL and use Prisma Migrate

Navigate to **Resources** tab in Heroku and search for **Heroku Postgres** addon.

![Add Heroku Postgres addon](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/add-heroku-postgres-addon.png)

We select a plan for our Postgres database, I will start with the **Hobby Dev - Free** plan and click **Provision**. We can upgrade the database plan later at anytime.

![Select Postgres plan](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/select-postgres-plan.png)

Our database has been setup and it appears in our addon list.

![Open Postgres Dashboard](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/open-progres-dashbp-postgres-dashboard.png)

We select **Heroku Postgres** which brings us to the Postgres Dashboard. To connect Prisma to the database, we need to provide the database connection URL found in the **Settings** of our database. Select the **Settings** tab and **View Credentials...** and copy the whole **URI** starting with `postgres://`.

![View Postgres Credentials](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/view-postgres-credentials.png)

[.env](https://github.com/prisma/prisma2/blob/master/docs/prisma-schema-file.md#using-env-files) file support is included in Prisma 2. Hence, we provide the database connection URL as the environment variable `DATABASE_URL`.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Paste the **URI** from the Heroku Postgres dashboard into the `prisma/.env` file.

```
DATABASE_URL=postgres://swdnqezdxfrehx:b3e...
```

> **WARNING**: Do not commit `.env` files into version control

Right now our database is empty and has no tables. Let's use Prisma Migrate to save and apply our migrations for the following schema.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model NationalPark {
  id      Int     @id @default(autoincrement())
  name    String
  country Country
}

model Country {
  id   Int    @id @default(autoincrement())
  name String @unique
}
```

```bash
npx prisma2 migrate save --experimental

npx prisma2 migrate up --experimental
```

We can use [Prisma Studio](https://github.com/prisma/studio) to view if our migration was successful. Run and open studio at [http://localhost:5555](http://localhost:5555).

```bash
npx prisma2 studio --experimental
```

![Prisma Studio with NationalPark and Country Table](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/prisma-studio-after-migration.png)

Our migration was successful 🎉! We see the empty **NationalPark** and **Country** table. Now we create two REST endpoints to query all **NationalPark**s and to create a new **NationalPark** in our Nest application.

## Prisma CRUD in Nest
