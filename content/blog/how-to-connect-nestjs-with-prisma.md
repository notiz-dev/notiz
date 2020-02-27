---
title: 'How to query your database using Prisma with Nestjs'
description: 'Learn how to setup a database with Prisma2 and query data using Nestjs'
published: true
publishedAt: 2020-02-27T22:12:00.000Z
updatedAt: 2020-02-27T22:00:00.000Z
tags:
    - Nestjs
    - Prisma
authors:
    - 'Marc Stammerjohann'
github: 'https://github.com/notiz-dev/nestjs-prisma'
versions:
    nestjs/cli: 6.14.2
    nestjs: 6.11.x
    prisma2: 2.0.0-preview022
    prisma/client: 2.0.0-preview022
slugs:
    - ___UNPUBLISHED___k759w6qs_ky1TDmFaAfDxRFcXFgk2BI1Z5GRmlide

---
[Prisma](https://prisma.io) is a toolkit for modeling, querying and migrating a [database](https://github.com/prisma/prisma2/blob/master/docs/supported-databases.md). [Prisma 2](https://github.com/prisma/prisma2) is currently rewritten with Rust and is [not yet production ready](https://www.notion.so/Is-Prisma-2-Ready-8b3fba3eaf5b4bf3ab7102fd94f56148).

[Nestjs](https://nestjs.com) is a popular typescript server-side application framework. It is heavily influenced by Angular's architectur and enables to create a REST and [Graphql](https://graphql.org) backend.

This guide shows how to setup a Nestjs application querying data from a SQLite database using Prisma 2.

## TLDR

Add Prisma to a Nest application and generate a `PrismaClient`. Create a Nest `PrismaService` which extends `PrismaClient` and handles the connection using Nest lifecycle events. Inject `PrismaService` into REST controllers or Graphql resolvers to query your data models.

## Step 1: Start a new Nestjs application

Generate a new Nest application or skip to the next step if you follow along with an existing Nest project.

To generate a new Nest application use the nest cli:

```bash
npm i -g @nestjs/cli
nest new project-name
```

Change your directory into the newly created Nest application and open up your prefered IDE.

## Step 2: Add Prisma 2

[Add](https://github.com/prisma/prisma2/blob/master/docs/getting-started/quickstart-existing-project.md) Prisma 2, create an empty `prisma.schema` file and install [prisma-client-js](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md) to your Nest application.

```bash
npm install prisma2 --save-dev
npx prisma2 init

npm install @prisma/client
```

## Step 3: Update Prisma datasource

In this guide we are connecting to a SQLite database. Update the `provider` in the `prisma/prisma.schema` to `sqlite` and change the `url` environment to `file:./dev.db`. Prisma [migrate](https://github.com/prisma/prisma2/tree/master/docs/prisma-migrate) will create a SQLite database at `prisma/dev.db`.

The `prisma.schema` should look like:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}
```

## Step 4: Define a model

Now we define a model for the database. A simple `User` model lookes like:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

We are adding the above model to `prisma.schema` below the generator.

For more complex models check out Prisma's [data modeling](https://github.com/prisma/prisma2/blob/master/docs/data-modeling.md) definition.

## Step 6: Create SQLite database with Migrate

We are creating our first database migration using the experimental Prisma Migrate.
First we save a migration using `npx prisma2 migrate save --experimental`. Prisma prompst us to create the `dev.db` database and we select `Yes`. Next we provide a name for the migration, for example `user` as we just define the `User` model.

Now we can apply the migration with `npx prisma2 migrate up --experimental`.

## Step 6: Generate PrismaClient

For each change we make to the data model of `prisma.schema`, we have to generate the `PrismaClient` again.

Run the following command to generate a new `PrismaClient` which should contain querys for the `User` model:

```bash
npx prisma2 generate
```

## Step 7: Create a Prisma service

SQLite database is setup and a `User` model is defined with Prisma. Now its time to prepare our Nestjs application to query the database using `prisma-client-js`.

We are creating a Nestjs service `prisma` which will extend the `PrismaClient` to instantiate the connection.

```bash
nest generate service prisma
```

Our `PrismaService` looks like this:

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}
```

`PrismaClient` allows us to handle the connection ourselves using `connect()` and `disconnect()`. We will make use of Nest [Lifecycle Events](https://docs.nestjs.com/fundamentals/lifecycle-events) `OnModuleInit` and `OnModuleDestroy` to take care of the connection for us.

Our updated `PrismaService` with the lifecycle events looks like:

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }
}
```

## Step 8: Query data model

Now we can inject the `PrismaService` into any REST controller, Graphql resolver or service to query our data model. We will inject it into a controller and create REST endpoints querying and creating `User` models.

Note we are directly accessing the type-safe generated Api from the `PrismaClient`.

```typescript
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async users() {
    return await this.prisma.user.findMany();
  }

  @Get('users/:id')
  async user(@Param('id') id: string) {
    return await this.prisma.user.findOne({ where: { id: +id } });
  }

  @Post('user')
  async addUser(@Body() createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: createUserDto });
  }
}
```

Now its time to continue updating your data model, generating `PrismaClient` and adding queries to your Nest application.