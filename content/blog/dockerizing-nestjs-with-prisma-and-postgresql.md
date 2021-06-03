---
title: Dockerizing a NestJS app with Prisma and PostgreSQL
description: How to dockerize a NestJS application with Prisma and PostgreSQL.
published: true
publishedAt: 2020-07-31T10:00:00.000Z
updatedAt: 2021-06-03T15:30:00.000Z
tags:
  - NestJS
  - Prisma
  - Docker
keywords:
  - PostgreSQL
authors:
  - Marc Stammerjohann
github: https://github.com/notiz-dev/nestjs-prisma-docker
---

[Docker](https://www.docker.com/) 🐳 enables you to build **consistent** containers of your applications for your development, testing and production environments. In this post you will dockerize a NestJS 😸 application with Prisma connecting to a PostgreSQL 🐘 database.

Requirements for this post are

1. Docker [installed](https://docs.docker.com/engine/install/)
2. [NestJS application with Prisma](https://notiz.dev/blog/how-to-connect-nestjs-with-prisma)

<div shortcode="article" routes="/blog/how-to-connect-nestjs-with-prisma"></div>

You can find the [full source code](https://github.com/notiz-dev/nestjs-prisma-docker) on GitHub.

<div shortcode="repo" repo="notiz-dev/nestjs-prisma-docker"></div>

Use this prisma schema to follow along:

<div shortcode="code" tabs="schema.prisma">

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Food {
  id   Int    @id @default(autoincrement())
  name String
}
```

</div>

And a `.env` file in your `prisma` directory for a dummy PostgreSQL connection url:

<div shortcode="code" tabs=".env">

```bash
DATABASE_URL=postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public
```

</div>

## TL;DR Multi-stage Dockerfile

Create a `Dockerfile` in the root of your Nest application

<div shortcode="code" tabs="BASH">

```bash
touch Dockerfile
```

</div>

Open the `Dockerfile` and use the multi-stage build steps 🤙 

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

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
```

</div>

But wait... what is going in the `Dockerfile` 🤔❓ See the breakdown for each step below.

Don't forget to create a `.dockerignore` file next to your `Dockerfile`:

<div shortcode="code" tabs=".dockerignore">

```docker
node_modules
npm-debug.log
```

</div>

The `COPY` command ignores those local files and folder and won't copy them into your Docker image to prevent **overwriting** your installed modules in your image.

Your application structure should look like this:

<div shortcode="figure" caption="Project structure">

![Project structure](assets/img/blog/dockerizing-nestjs-with-prisma-and-postgresql/optimized/project-structure.png)

</div>

## Breakdown of the multi-stage Dockerfile

Let's breakdown the `Dockerfile` step-by-step

🏗 Builder Image

<div shortcode="code" tabs="Dockerfile">

```docker
FROM node:14 AS builder
```

</div>

The first line tells Docker to use the latest [LTS](https://nodejs.org/en/about/releases/) version `14` for `node` as the base image to build the container from. To optimize the container image size you are using the [multistage-build](https://docs.docker.com/develop/develop-images/multistage-build/) and assign a name to your base image `AS builder`.

<div shortcode="note">

Before updating to a newer version of `node` check the support of Nest, Prisma and other dependencies

</div>

🧰 Working directory

<div shortcode="code" tabs="Dockerfile">

```docker
# Create app directory
WORKDIR /app
```

</div>

Create the working directory for your application which stores your code. All commands (`RUN`, `COPY`) are executed inside this directory.

📦 Installation

<div shortcode="code" tabs="Dockerfile">

```docker
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install
```

</div>

Next you need to install your app dependencies inside the Docker image. `package.json` and `package-lock.json` are copied over. Generating the Prisma Client requires the `schema.prisma` file. `COPY prisma ./prisma/` copies the whole `prisma` directory in case you also need the migrations. 

<div shortcode="note">

Only `package*.json` and `prisma` directory is copied in this step to take advantage of the cached Docker layers.

</div>

Install all dependencies `RUN npm install` (dev too). This allows you to build the Nest application inside the Docker image. Prisma Client is generated directly after, as it defines its own [postinstall hook](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client#generating-prisma-client-in-the-postinstall-hook-of-prismaclient). 

⚙️ Build app

<div shortcode="code" tabs="Dockerfile">

```docker
COPY . .

RUN npm run build
```

</div>

To build your Nest application copy all of your source files (exceptions in `.dockerignore`) into the Docker image. Now it's time to build your app `RUN npm run build`.

👟 Run your app

<div shortcode="code" tabs="Dockerfile">

```docker
FROM node:14
```

</div>

The second `FROM` is the second stage in the multi-stage build and is used to **run** your application.   

<div shortcode="code" tabs="Dockerfile">

```docker
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
```

</div>

Copy **from** your `builder` image only files and folders required to run the Nest app.

<div shortcode="code" tabs="Dockerfile">

```docker
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
```

</div>

Nest apps usually bind to port `3000`, `EXPOSE` the same port for your Docker image. Last step is the command to run the Nest application using `CMD`.

## Build and run your image

Enter the following command in the directory of your `Dockerfile`. Give your build image a name using the `-t` flag to easily start, stop and remove it.

<div shortcode="code" tabs="BASH">

```bash
# give your docker image a name
docker build -t <your username>/nest-api .

# for example
docker build -t nest-api .
```

</div>

After your Docker image is successfully build start it with this command

<div shortcode="code" tabs="BASH">

```bash
docker run -p 3000:3000 --env-file .env -d <your username>/nest-api 
```

</div>

Prisma Client requires the `DATABASE_URL` environment variable which you pass using the `--env-file .env` flag. Use this `.env` file for additional environment variables (Port, JWT Secret etc.) in your root folder.

Open up [localhost:3000](http://localhost:3000) to verify that your Nest app is running with Docker.

## Add docker-compose with PostgreSQL

[Docker Compose](https://docs.docker.com/compose/) allows you to define and run multiple Docker container together.
Here you are setting up a Docker compose file for the Nest application and a PostgreSQL database.

Create the Docker compose file

<div shortcode="code" tabs="BASH,docker-compose.yml">

```bash
touch docker-compose.yml
```
```yaml
version: '3.7'
services:
  nest-api:
    container_name: nest-api
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 3000:3000
    depends_on:
      - postgres
    env_file:
      - .env

  postgres:
    image: postgres:13
    container_name: postgres
    restart: always
    ports:
      - 5432:5432
    env_file:
      - .env
    volumes:
      - postgres:/var/lib/postgresql/data

volumes:
  postgres:
    name: nest-db
```

</div>

The first service **nest-api** is building the Docker image based on your `Dockerfile` for your Nest app with Prisma. The second service is creating a **postgres** database using the `postgres` Docker image in version `13`. For the Postgres image set `POSTGRES_USER`, `POSTGRES_PASSWORD` and `POSTGRES_DB` environment variables in your root `.env` file.

<div shortcode="code" tabs="BASH">

```bash
POSTGRES_USER=prisma
POSTGRES_PASSWORD=topsecret
POSTGRES_DB=food
```

</div>

To connect to the PostgreSQL database Docker image [configure](https://www.prisma.io/docs/reference/database-connectors/postgresql) the `DATABASE_URL` in your `.env` file. Fill in your values into the Postgres connection url format

<div shortcode="code" tabs="BASH">

```bash
postgresql://USER:PASSWORD@HOST:PORT/DB?schema=NAME&sslmode=prefer
```

</div>

In this example add the following variable to the `.env` file. The `HOST` is when connecting from another Docker image either the service name or the container name - both `postgres`.

<div shortcode="code" tabs="BASH">

```bash
DATABASE_URL=postgresql://prisma:topsecret@postgres:5432/food?schema=food&sslmode=prefer
```

</div>

Time 🕙 to start your Nest app and Postgres Docker image. Make sure the ports `3000` and `5432` are not in use already.

<div shortcode="code" tabs="BASH">

```bash
docker-compose up
# or detached
docker-compose up -d
```

</div>

You should have the following two docker containers started

<div shortcode="figure" caption="Docker container started by docker-compose">

![Docker container started by docker-compose](assets/img/blog/dockerizing-nestjs-with-prisma-and-postgresql/optimized/docker-compose.png)

</div>

Open again [localhost:3000](http://localhost:3000) to verify that your Nest app is running with Docker. Also verify that your endpoints using the Prisma Client have access to the Postgres DB.

## Prisma Migrate Postgres Docker Container

Replace the host `postgres` with `localhost` if you want to perform [Prisma migrations](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate) locally of your Postgres Docker container. Update the `DATABASE_URL` in `prisma/.env` to

<div shortcode="code" tabs="BASH">

```bash
DATABASE_URL=postgresql://prisma:topsecret@localhost:5432/food?schema=food&sslmode=prefer
```

</div>

Now you can run `npx prisma migrate save --experimental` and `npx prisma migrate save --experimental` or even seed the database if you like.

Perfect, now sit back and relax 🏝 and let Docker do the work for you.
