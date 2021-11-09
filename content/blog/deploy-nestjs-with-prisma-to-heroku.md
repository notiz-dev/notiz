---
title: 'Deploy NestJS with Prisma to Heroku'
description: 'Deploy a NestJS application with Prisma 2.0 to Heroku and connect to a PostgreSQL database.'
published: true
publishedAt: 2020-03-12T09:11:00.000Z
updatedAt: 2021-11-09T15:00:00.000Z
tags:
  - NestJS
  - Prisma
  - Heroku
keywords:
  - PostgreSQL
authors:
  - 'Marc Stammerjohann'
github: 'https://github.com/notiz-dev/deploy-nestjs-prisma-heroku'
---

You will learn how to deploy a NestJS application with Prisma 2.0 to [Heroku](https://www.heroku.com/) 🚀. Also we will create a [PostgreSQL database on Heroku](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1) and connect it with Prisma.

Check out my previous tutorial to create a `PrismaService` for your Nest application.

<div shortcode="article" routes="/blog/how-to-connect-nestjs-with-prisma"></div>

## Preparing Nest application for Heroku

Let's get started by preparing our Nest application to run on Heroku.

First, we modify `main.ts` to use the port provided by Heroku as an environment variable. CORS can also be enabled for web or mobile applications making requests to the Nest application.

<div shortcode="code" tabs="main.ts">

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

</div>

Heroku takes care of installing our **node_modules** for us. Before Heroku can start our Nest application using `npm run start:prod`, we need to generate the `PrismaClient` and build our app. We add `"postinstall": "npx prisma generate && npm run build",` to the **scripts** in our **package.json** which generates a new `PrismaClient` and performs the app build, creating our `dist` folder.

Heroku needs to know how to execute our Nest application via a `Procfile`. Create a `Procfile` in the root folder with our start script `web: npm run start:prod`. Now Heroku will install our dependencies, generate Prisma Client and build the application in the **postinstall** script and then start the application.

## New Heroku app and CLI

Next, sign up or log into your [Heroku account](https://id.heroku.com/login). Create a new Heroku app by clicking on **New** and then **Create new app**.

Choose an app name to identify your app and the name is also used as your default api endpoint at **https://your-app-name.herokuapp.com/**. You can also choose between two regions for your app **United States** and **Europe**.

<div shortcode="figure" caption="Create new Heroku app">

![Create new Heroku app](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/create-new-app.png)

</div>

<div shortcode="note">

Heroku let's you configure a custom domain in your app settings.

</div>

Alright, our heroku app is set up.

<div shortcode="figure" caption="Deploy using Heroku Git">

![Deploy using Heroku Git](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/deploy-using-heroku-git.png)

</div>

We install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) and deploy our Nest application by pushing to Heroku git.

<div shortcode="code" tabs="BASH">

```bash
heroku login

cd your-nest-app
heroku git:remote -a your-app-name

git push heroku master
```

</div>

After pushing our current application to Heroku, we see the following output in our terminal or in the **Activity** tab of our Heroku app.

<div shortcode="figure" caption="First app build on Heroku">

![First app build on Heroku](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/first-build.png)

</div>

Heroku prints **Build succeeded!** and our application link at the end like [https://nestjs-prisma-heroku.herokuapp.com/](https://nestjs-prisma-heroku.herokuapp.com/).

Let's visit our app by either clicking on the link or on **Open app** in the toolbar.

I am seeing **Hello World!**. The Nest app has been successfully deployed to Heroku 🎉

<div shortcode="figure" caption="Hello World">

![Hello World!](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/first-app-launch.png)

</div>

In the next step we will setup a PostgreSQL database and use Prisma Migrate to apply our database schema.

## Setup PostgreSQL and use Prisma Migrate

Navigate to **Resources** tab on Heroku and search for the **Heroku Postgres** addon.

<div shortcode="figure" caption="Add Heroku Postgres addon">

![Add Heroku Postgres addon](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/add-heroku-postgres-addon.png)

</div>

We select a plan for our Postgres database, we start with the **Hobby Dev - Free** plan and click **Provision**. We can upgrade the database plan later at anytime.

<div shortcode="figure" caption="Select Postgres plan">

![Select Postgres plan](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/select-postgres-plan.png)

</div>

Our database has been setup and it appears in the addon list.

<div shortcode="figure" caption="Open Postgres Dashboard">

![Open Postgres Dashboard](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/open-postgres-dashboard.png)

</div>

To connect Prisma to the database, we need to provide the database connection URL found in the **Settings** of our database. Select **Heroku Postgres** and switch to the **Settings** tab and **View Credentials...**. Copy the whole **URI** starting with `postgres://`.

<div shortcode="figure" caption="View Postgres Credentials">

![View Postgres Credentials](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/view-postgres-credentials.png)

</div>

[.env](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/prisma-schema-file#using-environment-variables) file support is included in Prisma 2.0. Hence, we provide the database connection URL as the environment variable `DATABASE_URL`.

<div shortcode="code" tabs="schema.prisma">

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

</div>

Paste the **URI** from the Heroku Postgres dashboard into the `prisma/.env` file.

<div shortcode="code" tabs=".env">

```bash
DATABASE_URL=postgres://ytodrxnfzdnxlr:005777fd...
```

</div>

<div shortcode="note" type="warn">

Do not commit `.env` files into version control.

</div>

Right now our database is empty and has no tables.

<div shortcode="code" tabs="schema.prisma">

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
  country Country @relation(fields: [countryId], references: [id])
  countryId Int
}

model Country {
  id   Int    @id @default(autoincrement())
  name String @unique
  parks NationalPark[]
}
```

</div>

Let's use [Prisma Migrate](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate) to save and apply our migrations for the following schema.

<div shortcode="code" tabs="BASH">

```bash
npx prisma migrate dev
```

</div>

We can use [Prisma Studio](https://github.com/prisma/studio) to view if our migration was successful. Run and open studio at [http://localhost:5555](http://localhost:5555).

<div shortcode="code" tabs="BASH">

```bash
npx prisma studio
```

</div>

<div shortcode="figure" caption="Prisma Studio with NationalPark and Country Table">

![Prisma Studio with NationalPark and Country Table](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/prisma-studio-after-migration.png)

</div>

Our migration was successful 🎉
We see the **NationalPark** and **Country** table was created in our database. We can use Prisma Studio to create our test data, start creating a new **Country** and then new **NationalPark**s as they require a connection to a country.

Since we have our database ready, we create two REST endpoints to query all **NationalPark**s and to create a new **NationalPark** in our Nest application.

## Prisma CRUD operations in Nest

Before we implement our CRUD operations in Nest, we need to generate a new `PrismaClient` whenever we make a change to our `schema.prisma` or our `.env` file. Run `npx prisma generate` and now we have access to the [CRUD](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/crud) operations of our models.

<div shortcode="figure" caption="Prisma Client CRUD operations">

![Prisma Client CRUD operations](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/prisma-client-crud.png)

</div>

### Find Many National Parks

We setup the `GET` endpoint for all **NationalPark**s at `/nationalParks`.

<div shortcode="code" tabs="app.controller.ts">

```typescript
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('nationalParks')
  getNationalParks() {
    return this.prisma.nationalPark.findMany();
  }
}
```

</div>

Start the Nest app locally in dev mode `npm run start:dev` and try the request at [http://localhost:3000/nationalParks](http://localhost:3000/nationalParks).

<div shortcode="figure" caption="Query all National Parks without Country">

![Query all National Parks without Country](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/query-national-parks-without-country-dev.png)

</div>

I have added one national park via Prisma Studio, but we don't see the **Country** in the response. To return the countries in the national park response we [include](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/field-selection#include) country in the `findMany()` query using the `include` keyword.

<div shortcode="code" tabs="app.controller.ts">

```typescript
@Get('nationalParks')
getNationalParks() {
  return this.prisma.nationalPark.findMany({ include: { country: true } });
}
```

</div>

<div shortcode="figure" caption="Query all National Parks with Country">

![Query all National Parks with Country](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/query-national-parks-dev.png)

</div>

Awesome, our response now includes **Country**.

### Create New National Park

We can query our national parks, but we also want to add new national parks. Create the `NationalParkDto` class with the two properties `name` for the national park and `country` as the country name.

<div shortcode="code" tabs="TS">

```typescript
export class NationalParkDto {
  name: string;
  country: string;
}
```

</div>

We use this DTO class in the `POST` endpoint for creating a new national park.

<div shortcode="code" tabs="app.controller.ts">

```typescript
@Post('nationalPark')
createNationalPark(@Body() nationalParkDto: NationalParkDto) {
}
```

</div>

As we need a country `id` to connect to a national park we use `prisma.country.findOne` to see if this country already exists in our database. Use `async/await` to find the country as `PrismaClient` CRUD operations always return `Promise`'s.

<div shortcode="code" tabs="app.controller.ts">

```typescript
@Post('nationalPark')
async createNationalPark(@Body() nationalParkDto: NationalParkDto) {
  const country = await this.prisma.country.findOne({
    where: { name: nationalParkDto.country },
  });

  if (country) {
    // create national park and connect country
    });
  } else {
    // create national park and create country
  }
}
```

</div>

When we create our national park we have two options for how to create the connection to a country. If the country exists we use `connect` using the country id `country: { connect: { id: country.id } }`. Otherwise we `create` the country alongside the national park `country: { create: { name: nationalParkDto.country } }`. Let's also return the created **NationalPark** including the **Country** in our response. Our `POST` endpoint looks like this:

<div shortcode="code" tabs="app.controller.ts">

```typescript
@Post('nationalPark')
async createNationalPark(@Body() nationalParkDto: NationalParkDto) {
  const country = await this.prisma.country.findOne({
    where: { name: nationalParkDto.country },
  });

  if (country) {
    return this.prisma.nationalPark.create({
      data: {
        name: nationalParkDto.name,
        country: { connect: { id: country.id } },
      },
      include: { country: true },
    });
  } else {
    return this.prisma.nationalPark.create({
      data: {
        name: nationalParkDto.name,
        country: { create: { name: nationalParkDto.country } },
      },
      include: { country: true },
    });
  }
}
```

</div>

Yeah! 🎉 The request works locally.

<div shortcode="figure" caption="Create new National Park">

![Create new National Park](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/new-national-park-dev.png)

</div>

We are ready to push our Nest application to Heroku again to expose the two new REST endpoints.

### Push to Heroku and test new Endpoints

Run `git push heroku master` in your Nest application and wait for the build to succeed. Also, we need to see if the environment variable `DATABASE_URL` is added to the Heroku app. Head over to the **Settings** tab and click on **Reveal Config Vars**. `DATABASE_URL` has already been added when we installed the **Heroku Postgres** addon. If you like to change your database you can update the URL here.

<div shortcode="figure" caption="DATABASE_URL environment variable on Heroku">

![DATABASE_URL environment variable on Heroku](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/heroku-config-vars.png)

</div>

Our new endpoints have been successfully deployed. Time to test it out [https://nestjs-prisma-heroku.herokuapp.com/nationalParks](https://nestjs-prisma-heroku.herokuapp.com/nationalParks).

<div shortcode="figure" caption="Query all National Parks with Country on Heroku">

![Query all National Parks with Country on Heroku](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/query-national-parks-heroku.png)

</div>

<div shortcode="figure" caption="Create new National Park on Heroku">

![Create new National Park on Heroku](assets/img/blog/deploy-nestjs-with-prisma-to-heroku/optimized/new-national-park-heroku.png)

</div>

To wrap up, we have successfully deployed 🚀 our Nest application 😻 on Heroku and connected Prisma to a PostgreSQL database.
