---
title: 'How to query your database using Prisma with NestJS'
description: 'Learn how to setup a database with Prisma 2.0 and query data using NestJS.'
published: true
publishedAt: 2020-03-02T10:12:00.000Z
updatedAt: 2021-06-17T10:50:00.000Z
tags:
  - NestJS
  - Prisma
keywords:
  - SQLite
authors:
  - 'Marc Stammerjohann'
github: 'https://github.com/notiz-dev/nestjs-prisma-demo'
---

[Prisma](https://prisma.io) is a toolkit for modeling, querying and migrating a [database](https://www.prisma.io/docs/reference/database-reference/supported-databases). [Prisma 2.0](https://github.com/prisma/prisma) is rewritten with Rust, read more about the recent [release](https://www.prisma.io/blog/announcing-prisma-2-n0v98rzc8br1) 🎉.

[NestJS](https://nestjs.com) is a popular typescript server-side application framework. It is heavily influenced by Angular's architecture and enables to create a REST and [GraphQL](https://graphql.org) backend.

This guide shows you how to setup a NestJS application querying data from a SQLite database using Prisma 2.0.

## TL;DR

Add Prisma to a Nest application and generate a `PrismaClient`. Create a Nest `PrismaModule` and `PrismaService` which extends `PrismaClient` and handles the connection using Nest lifecycle events. Inject `PrismaService` into REST controllers or GraphQL resolvers to query your data models.

Or use the [NestJS Prisma Schematics](/blog/nestjs-prisma-schematics) to automatically setup Prisma in your NestJS application and start defining your Prisma Schema.

<div shortcode="code" tabs="BASH">

```bash
nest add nestjs-prisma
```

</div>

## Step 1: Start a new NestJS application

Generate a new Nest application or skip to the next step if you follow along with an existing Nest project.

To generate a new Nest application use the nest cli:

<div shortcode="code" tabs="BASH">

```bash
npm i -g @nestjs/cli
nest new project-name
```

</div>

Change your directory into the newly created Nest application and open up your preferred IDE.

## Step 2: Add Prisma 2.0

[Add](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project-typescript-postgres) Prisma 2.0, initialize Prisma Schema and install [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client) to your Nest application.

<div shortcode="code" tabs="BASH">

```bash
npm install prisma --save-dev
npx prisma init

npm install @prisma/client
```

</div>

## Step 3: Update Prisma datasource

In this guide you are connecting to a SQLite database. Update the `provider` in the `prisma/schema.prisma` to `sqlite` and change the `url` environment to `file:./dev.db`. [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate) will create a SQLite database at `prisma/dev.db`.

The `schema.prisma` should look like:

<div shortcode="code" tabs="schema.prisma">

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}
```

</div>

## Step 4: First Prisma model

Now add a model for the database. A simple `User` model looks like:

<div shortcode="code" tabs="schema.prisma">

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

</div>

Add the above model to `schema.prisma` below the generator section.

For more complex models check out Prisma's [data modeling](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model) definition.

## Step 5: Create SQLite database with Migrate

Create your first database migration using the [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate). To use Migrate during development use the new command called:

<div shortcode="code" tabs="BASH">

```bash
npx prisma migrate dev
```

</div>

This creates a `migration.sql` file containing changes you made to the `schema.prisma`, updates the database schema and generates a new Prisma Client.

Prisma Migrate has been released as stable with [v2.19](https://github.com/prisma/prisma/releases/tag/2.19.0). Upgrade to the latest Prisma version and you can use the following migrate commands.

<div shortcode="code" tabs="BASH">

```bash
# since v2.19
npx prisma migrate <COMMAND>

npx prisma migrate dev
npx prisma migrate reset
npx prisma migrate deploy
npx prisma migrate resolve
npx prisma migrate status
```

</div>

<div shortcode="note">

[Hassle-Free Database Migrations with Prisma Migrate](https://www.prisma.io/blog/prisma-migrate-ga-b5eno5g08d0b) is highly recommended 🚀 for more information about the stable release of Prisma Migrate. 

</div>

## Step 6: Generate PrismaClient

For each change you make to the data model of `schema.prisma`, you need to generate the `PrismaClient` again.

Run the following command to generate a new `PrismaClient` which contains the [CRUD](https://www.prisma.io/docs/concepts/components/prisma-client/crud) operations for the new `User` model:

<div shortcode="code" tabs="BASH">

```bash
npx prisma generate
```

</div>

<div shortcode="note">

If you run `npx prisma migrate dev` the client will be generated automatically after performing the migration.

</div>

## Step 7: Create a Nest Module and Service for PrismaClient

SQLite database is setup and a `User` model is defined with Prisma. Now its time to prepare our NestJS application to query the database using `PrismaClient`.

First, generate a Nest module and service called `prisma` via the NestJS CLI.

<div shortcode="code" tabs="BASH">

```bash
nest generate module prisma
nest generate service prisma
```

</div>

Open the `PrismaModule` and add `PrismaService` to the `exports` list to be available for dependency injection. Add the `PrismaModule` to the `imports` list of your modules which need to use the `PrismaService`.

<div shortcode="code" tabs="prisma.module.ts">

```ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService] // 👈 export PrismaService for DI
})
export class PrismaModule {}
```

</div>

Open `PrismaService` and extend it with the `PrismaClient`

<div shortcode="code" tabs="prisma.service.ts">

```ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}
```

</div>

`PrismaClient` has two different ways to start a connection to your database: **lazy** or **explicit**.
After you run your **first** query, `PrismaClient` automatically creates a connection (**lazy**) to the database. If needed rapid response after application start, you can **explicitly** start or stop a connection using `$connect()` and `$disconnect()`.

Use the Nest [Lifecycle Events](https://docs.nestjs.com/fundamentals/lifecycle-events) `OnModuleInit` and `OnModuleDestroy` to take care of starting **explicit** the connection for you. Implement `OnModuleInit` and `OnModuleDestroy` in your `PrismaService`.

The `PrismaService` with the **explicit** connection and lifecycle events looks like:

<div shortcode="code" tabs="prisma.service.ts">

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
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

</div>

## Step 8: Query data model

Now you can inject the `PrismaService` into any REST controller, GraphQL resolver or service to query our data model. Make sure you add `PrismaModule` to the `imports` list of the module. Inject it into a controller and create REST endpoints querying and creating `User` models.

Note you are directly accessing the type-safe generated Api from the `PrismaClient` through `PrismaService`.

<div shortcode="code" tabs="app.controller.ts">

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

</div>

Now its time to continue updating your data model, generating `PrismaClient` and adding queries to your Nest application.

Checkout [nestjs-prisma-starter](https://github.com/fivethree-team/nestjs-prisma-starter) to get started quickly with Nest and Prisma, if you like it leave a ⭐.

<div shortcode="repo" repo="fivethree-team/nestjs-prisma-starter"></div>