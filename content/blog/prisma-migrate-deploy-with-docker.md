---
title: 'Prisma Migrate: Deploy Migration with Docker'
description: 'Perform database migration with Prisma Migrate using Docker'
published: true
publishedAt: 2021-11-22T09:40:00.000Z
updatedAt: 2021-11-22T09:40:00.000Z
tags:
  - Prisma
  - Docker
keywords:
  - NestJS
  - Prisma Migrate
  - PostgreSQL
authors:
  - Marc Stammerjohann
github: https://github.com/notiz-dev/nestjs-prisma-docker
---

One question about the guide [Dockerizing a NestJS app with Prisma and PostgreSQL](/blog/dockerizing-nestjs-with-prisma-and-postgresql) was asked frequently: "How to run database migrations in production?"

Let's dive into this topic and find out how to use `prisma migrate deploy` with Docker for your production database.

Prisma recommends to perform migrations for production database in an [automated step](https://www.prisma.io/docs/concepts/components/prisma-migrate#production-and-testing-environments) and advises against performing it locally 🙅‍♂️

## Prisma Migrate with Docker

Let's take a look at how to integrate the command `prisma migrate deploy` into the following `Dockerfile`.

<div shortcode="code" tabs="Dockerfile">

```docker
FROM node:14 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

# as build step❓

FROM node:14

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
# or during execution ❓
CMD [ "npm", "run", "start:prod" ]
```

</div>

First of all, one command is very important: `COPY prisma ./prisma/`. This makes sure to **not** only copy the `schema.prisma` into the Docker image, but also includes the `migrations` directory. This is necessary as `prisma migrate deploy` only executes the [migration history files](https://www.prisma.io/docs/concepts/components/prisma-migrate#source-controlling-the-migration-history).

### Add a RUN command ❌

What about adding `RUN npx prisma migrate dev` to the `Dockerfile`?  
Two issues that come to mind are making it not a good solution.

1. Performs migration during build step, not before Docker container is started
2. CI/CD needs access to your production database, requires `DATABASE_URL` environment

`RUN` commands are executed during the build steps of your the Docker image. Time may pass between the database migration and restarting the Docker container (Nest app), leaving your database and Nest app in **different** states. Additionally, when you create your Docker image in a CI/CD pipeline, the server needs access to the production database to perform the migration.

### Add to CMD ✅

A better approach is to perform the migration just before starting your Nest app.

Nest app is started with the last command `CMD [ "npm", "run", "start:prod" ]`. [CMD](https://docs.docker.com/engine/reference/builder/#cmd) is not executed during the build steps of your Docker image, rather than during executing the Docker container (`docker run ...` or `docker-compose up`).

This is a multi-stage build `Dockerfile`, you need to copy the `prisma` directory including the **migration history** into the second stage.

<div shortcode="code" tabs="Dockerfile">

```docker
FROM node:14 AS builder

# build steps
...

RUN npm run build

FROM node:14

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
# 👇 copy prisma directory
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD [  "npm", "run", "start:prod" ]
```

</div>


Add a new script to your `package.json` to execute `prisma migrate deploy && npm run start:prod`.

<div shortcode="code" tabs="package.json">

```json
{
  ...
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "start:migrate:prod": "prisma migrate deploy && npm run start:prod", // new script 👈
  },
  ...
}
```

</div>

Use the new script as `CMD` command

<div shortcode="code" tabs="Dockerfile">

```docker
FROM node:14 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:14

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
# 👇 new migrate and start app script
CMD [  "npm", "run", "start:migrate:prod" ]
```

</div>

<div shortcode="note" type="warn">
When testing locally make sure that your `DATABASE_URL` in your `.env` file is **not** using `localhost` as the host 🙅‍♂️. Replace `localhost` with the database container name.
</div>

Now start your Docker containers with `docker-compose up` to see the logs and verify that your migrations are performed. In case all migrations have already been applied to your database, Prisma Migrate will complete with "No pending migrations to apply.".

<div shortcode="code" tabs="Migrations performed,No pending migrations">

```bash
postgresprisma | 2021-11-09 15:24:30.189 UTC [1] LOG:  database system is ready to accept connections
nest-api    | 
nest-api    | > nestjs-prisma-docker@0.0.1 start:prod:docker /
nest-api    | > npm run migrate:deploy && npm run start:prod
nest-api    | 
nest-api    | 
nest-api    | > nestjs-prisma-docker@0.0.1 migrate:deploy /
nest-api    | > prisma migrate deploy
nest-api    | 
nest-api    | Prisma schema loaded from prisma/schema.prisma
nest-api    | Datasource "db": PostgreSQL database "food", schema "public" at "postgresprisma:5432"
postgresprisma | 2021-11-09 15:24:38.959 UTC [34] ERROR:  relation "_prisma_migrations" does not exist at character 126
postgresprisma | 2021-11-09 15:24:38.959 UTC [34] STATEMENT:  SELECT "id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count" FROM "_prisma_migrations" ORDER BY "started_at" ASC
nest-api    | 
nest-api    | 1 migration found in prisma/migrations
nest-api    | 
nest-api    | Applying migration `20210603130425_init`
nest-api    | 
nest-api    | The following migration have been applied:
nest-api    | 
nest-api    | migrations/
nest-api    |   └─ 20210603130425_init/
nest-api    |     └─ migration.sql
nest-api    |       
nest-api    | All migrations have been successfully applied.
nest-api    | 
nest-api    | > nestjs-prisma-docker@0.0.1 start:prod /
nest-api    | > node dist/main
nest-api    | 
nest-api    | [Nest] 174  - 11/09/2021, 3:24:40 PM     LOG [NestFactory] Starting Nest application...
nest-api    | [Nest] 174  - 11/09/2021, 3:24:40 PM     LOG [InstanceLoader] PrismaModule dependencies initialized +73ms
nest-api    | [Nest] 174  - 11/09/2021, 3:24:40 PM     LOG [InstanceLoader] AppModule dependencies initialized +0ms
nest-api    | [Nest] 174  - 11/09/2021, 3:24:40 PM     LOG [RoutesResolver] AppController {/}: +14ms
nest-api    | [Nest] 174  - 11/09/2021, 3:24:40 PM     LOG [RouterExplorer] Mapped {/, GET} route +7ms
nest-api    | [Nest] 174  - 11/09/2021, 3:24:40 PM     LOG [RouterExplorer] Mapped {/foods, GET} route +1ms
nest-api    | [Nest] 174  - 11/09/2021, 3:24:40 PM     LOG [NestApplication] Nest application successfully started +65ms
```
```bash
postgresprisma | 2021-11-09 16:20:52.899 UTC [1] LOG:  database system is ready to accept connections
nest-api    | 
nest-api    | > nestjs-prisma-docker@0.0.1 start:prod:docker /
nest-api    | > npm run migrate:deploy && npm run start:prod
nest-api    | 
nest-api    | 
nest-api    | > nestjs-prisma-docker@0.0.1 migrate:deploy /
nest-api    | > prisma migrate deploy
nest-api    | 
nest-api    | Prisma schema loaded from prisma/schema.prisma
nest-api    | Datasource "db": PostgreSQL database "food", schema "public" at "postgresprisma:5432"
nest-api    | 
nest-api    | 1 migration found in prisma/migrations
nest-api    | 
nest-api    | 
nest-api    | No pending migrations to apply.
nest-api    | 
nest-api    | > nestjs-prisma-docker@0.0.1 start:prod /
nest-api    | > node dist/main
nest-api    | 
nest-api    | [Nest] 174  - 11/09/2021, 4:20:55 PM     LOG [NestFactory] Starting Nest application...
nest-api    | [Nest] 174  - 11/09/2021, 4:20:56 PM     LOG [InstanceLoader] PrismaModule dependencies initialized +69ms
nest-api    | [Nest] 174  - 11/09/2021, 4:20:56 PM     LOG [InstanceLoader] AppModule dependencies initialized +1ms
nest-api    | [Nest] 174  - 11/09/2021, 4:20:56 PM     LOG [RoutesResolver] AppController {/}: +12ms
nest-api    | [Nest] 174  - 11/09/2021, 4:20:56 PM     LOG [RouterExplorer] Mapped {/, GET} route +8ms
nest-api    | [Nest] 174  - 11/09/2021, 4:20:56 PM     LOG [RouterExplorer] Mapped {/foods, GET} route +1ms
nest-api    | [Nest] 174  - 11/09/2021, 4:20:56 PM     LOG [NestApplication] Nest application successfully started +62ms
```

</div>

Hurray 🎉 the database migrations are executing successfully with Docker! Test it out on your test, staging and then production environment.
