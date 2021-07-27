---
title: OpenApi documentation for your RESTful APIs in NestJS
description: Setup Swagger to generate an OpenApi documentation for your REST endpoints. 
published: true
publishedAt: 2021-07-27T18:30:00.000Z
updatedAt: 2021-07-27T18:30:00.000Z
tags:
  - NestJS
keywords:
  - REST
  - Swagger
  - OpenApi
authors:
  - Marc Stammerjohann
github: https://github.com/...
---

The [OpenApi](https://docs.nestjs.com/openapi/introduction) documentation is useful to test out your API, share with other developers and for client generation tools (e.g [ng-openapi-gen for Angular](https://github.com/cyclosproject/ng-openapi-gen)). 

## Setup Swagger

Start with installing the Swagger dependencies.

<div shortcode="code" tabs="BASH">

```bash
# express
npm install --save @nestjs/swagger swagger-ui-express class-transformer class-validator

# fastify
npm install --save @nestjs/swagger fastify-swagger class-transformer class-validator
```

</div>

Now setup the initialization of Swagger in your `main.ts` file.

<div shortcode="code" tabs="main.ts">

```ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS Swagger')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

</div>

The setup is complete and you can start your Nest application `npm run start:dev` and visit the Swagger endpoint [localhost:3000/api](http://localhost:3000/api)

<div shortcode="note">

Swagger API will be available at the path you provide in `SwaggerModule.setup('api',...)` at `http://localhost:3000/api`. Access the JSON file by opening `http://localhost:3000/api-json` for express and `http://localhost:3000/api/json` for fastify.

</div>

## Swagger CLI Plugin

Enable the [Swagger CLI Plugin](https://docs.nestjs.com/openapi/cli-plugin#using-the-cli-plugin) to reduce boilerplate in your `.dto.ts` and `.entity.ts` files.

<div shortcode="code" tabs="nest-cli.json">

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": ["@nestjs/swagger"]
  }
}
```

</div>

Your `User` entity looks like this with boilerplate.

<div shortcode="code" tabs="user.entity.ts">

```ts
export class User {
  @ApiProperty()
  email: string;
  @ApiProperty({ nullable: true })
  name?: string;
  @ApiProperty()
  emailVerified: Date;
  password: string;
}
```

</div>

And now without the boilerplate.

<div shortcode="code" tabs="user.entity.ts">

```ts
export class User {
  email: string;
  name?: string;
  emailVerified: Date;
  @ApiHideProperty()
  password: string;
}
```

</div>