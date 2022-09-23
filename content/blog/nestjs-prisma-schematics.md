---
title: Introducing NestJS Prisma Library and Schematics
description: Library and schematics to add Prisma integration to a NestJS application  
published: true
publishedAt: 2020-08-07T09:30:00.000Z
updatedAt: 2022-09-12T14:25:00.000Z
tags:
  - NestJS
  - Prisma
keywords:
  - Schematics
authors:
  - Marc Stammerjohann
github: https://github.com/notiz-dev/nestjs-prisma
---

Until now, adding [Prisma to a NestJS application](https://notiz.dev/blog/how-to-connect-nestjs-with-prisma) requires a few manual steps - installing [@prisma/cli](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-cli/command-reference) and [@prisma/client](https://github.com/prisma/prisma-client-js), creating a `PrismaService` and (eventually) adding a `Dockerfile`.

We are excited to release [nestjs-prisma](https://nestjs-prisma.dev) - a library with build-in `PrismaService`, `PrismaClientExceptionFilter`, `loggingMiddleware` and a set of schematics to perform **automatically** all steps necessary to add Prisma to your NestJS application. 

<div shortcode="repo" repo="notiz-dev/nestjs-prisma"></div>

## Schematics

All you need to do is run the following command in your Nest app:

<div shortcode="code" tabs="BASH">

```bash
nest add nestjs-prisma
```

</div>

<div shortcode="figure" caption="Schematics in action">

![Schematics in action](assets/img/blog/nestjs-prisma-schematics/schematics-in-action.gif)

</div>

## Library

Since version [0.6.0](https://github.com/notiz-dev/nestjs-prisma/releases/tag/v0.6.0) the package `nestjs-prisma` is also a library providing `PrismaService`, `PrismaModule` and `PrismaClientExceptionFilter` ([0.13.0](https://github.com/notiz-dev/nestjs-prisma/releases/tag/v0.13.0)).

### PrismaModule and PrismaService

Add `PrismaModule` to the imports section in your `AppModule` or any other modules to gain access to `PrismaService`.

<div shortcode="code" tabs="app.module.ts">

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule.forRoot()],
})
export class AppModule {}
```

</div>

`PrismaModule` allows to be used globally and to pass options to the `PrismaClient`.

<div shortcode="code" tabs="app.module.ts">

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: { log: ['info'] },
        explicitConnect: true,
      },
    }),
  ],
})
export class AppModule {}
```

</div>

Additionally, `PrismaModule` provides a `forRootAsync` to pass options asynchronously. One option is to use a factory function:

<div shortcode="code" tabs="app.module.ts">

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: () => ({
        prismaOptions: {
          log: ['info', 'query'],
        },
        explicitConnect: false,
      }),
    }),
  ],
})
export class AppModule {}
```

</div>

You can inject dependencies such as `ConfigModule` to load options from .env files.

<div shortcode="code" tabs="app.module.ts">

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return {
          prismaOptions: {
            log: [configService.get('log')],
            datasources: {
              db: {
                url: configService.get('DATABASE_URL'),
              },
            },
          },
          explicitConnect: configService.get('explicit'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

</div>

Alternatively, you can use a class instead of a factory:

<div shortcode="code" tabs="app.module.ts">

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
  ],
})
export class AppModule {}
```

</div>

Create the `PrismaConfigService` and extend it with the `PrismaOptionsFactory`

<div shortcode="code" tabs="prisma-config.service.ts">

```ts
import { Injectable } from '@nestjs/common';
import { PrismaOptionsFactory, PrismaServiceOptions } from '.nestjs-prisma';

@Injectable()
export class PrismaConfigService implements PrismaOptionsFactory {
  constructor() {
    // TODO inject any other service here like the `ConfigService`
  }

  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        log: ['info', 'query'],
      },
      explicitConnect: true,
    };
  }
}
```

</div>

### PrismaClientExceptionFilter

`nestjs-prisma` provides a `PrismaClientExceptionFilter` to catch unhandled [PrismaClientKnownRequestError](https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine) and returning different status codes instead of `500 Internal server error`.

To use the filter you have the following two options.

1. Instantiate the filter in your `main.ts` and pass the `HttpAdapterHost`


<div shortcode="code" tabs="main.ts">

```ts
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
```

</div>

2. Use `APP_FILTER` token in any module

<div shortcode="code" tabs="app.module.ts">

```ts
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule {}
```

</div>

## Additional Options

Do you need more options? I got you covered, you can go a step further and specify a Prisma version if you like:

<div shortcode="code" tabs="BASH">

```bash
nest add nestjs-prisma --prismaVersion 2.4.1
```

</div>

Or go crazy by adding a `Dockerfile` for your Nest app and a `docker-compose.yaml` with a **PostgreSQL** database.

<div shortcode="code" tabs="BASH">

```bash
nest add nestjs-prisma --addDocker
```

</div>

[Check out all options](https://github.com/notiz-dev/nestjs-prisma#additional-options) and give it a try with your Nest app.
