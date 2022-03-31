---
title: OpenApi for your REST APIs in NestJS
description: Setup Swagger to generate an OpenApi documentation for your REST endpoints. 
published: true
publishedAt: 2021-07-28T14:00:00.000Z
updatedAt: 2022-03-31T10:07:00.000Z
tags:
  - NestJS
keywords:
  - REST
  - Swagger
  - OpenApi
authors:
  - Marc Stammerjohann
github: https://github.com/notiz-dev/nestjs-swagger
---

The [OpenApi](https://docs.nestjs.com/openapi/introduction) documentation is a useful API playground for you to test or to share with other developers and for client generation tools (e.g [ng-openapi-gen for Angular](https://github.com/cyclosproject/ng-openapi-gen)).

You'll find the source code in this repo.

<div shortcode="repo" repo="notiz-dev/nestjs-swagger"></div>

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

The setup is complete, start your Nest application `npm run start:dev` and visit the Swagger endpoint [localhost:3000/api](http://localhost:3000/api).

<div shortcode="figure" caption="Swagger API after initial setup">

![Swagger API after initial setup](assets/img/blog/openapi-in-nestjs/optimized/swagger-api.png)

</div>

<div shortcode="note">

Swagger API will be available at the path you provide in `SwaggerModule.setup('api',...)` at `http://localhost:3000/api`. Access the JSON file by opening `http://localhost:3000/api-json` for express and `http://localhost:3000/api/json` for fastify.

</div>

Generate in the next step CRUD endpoints for a resource like **users** or **products** and add type definitions for Swagger. 

## Generate REST resource

Use the Nest CLI to [generate the boilerplate](https://trilon.io/blog/introducing-cli-generators-crud-api-in-1-minute#Generating-a-CRUD-API) the resource for **users**. 

<div shortcode="code" tabs="BASH">

```bash
nest generate resource
# short
nest g res

# CLI prompts
? What name would you like to use for this resource (plural, e.g., "users")? users
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? (Y/n) y
```

</div>

You'll find a new `users` directory under `src` containing all the boilerplates for your REST endpoints - module, controller, service, entity and dto files.

Start again the Nest application and you should see the new `users` endpoints in the Swagger API.

<div shortcode="figure" caption="Users endpoints in the Swagger API">

![Users endpoints in the Swagger API](assets/img/blog/openapi-in-nestjs/optimized/users-crud-api.png)

</div>

## Api decorators

Apply available [decorators prefixed with Api](https://docs.nestjs.com/openapi/decorators) to expose the properties for `.dto.ts` and `.entity.ts` files and the responses for your CRUD endpoints.

### Tags

Group your endpoints together by using `@ApiTags(...tags)` at the controller level.

<div shortcode="code" tabs="users.controller.ts">

```ts
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users') // 👈 apply tags
export class UsersController {
  ...
}
```

</div>

<div shortcode="figure" caption="Group endpoints with tags">

![Group endpoints with tags](assets/img/blog/openapi-in-nestjs/optimized/users-api-tags.png)

</div>

### Property

Let's add the following properties `name`, `email`, `password` to the `CreateUserDto` and mark name as optional.

<div shortcode="code" tabs="create-user.dto.ts">

```ts
export class CreateUserDto {
  email: string;
  password: string;
  name?: string | null;
}
```

</div>

To expose those [properties](https://docs.nestjs.com/openapi/types-and-parameters) to the Swagger API use `@ApiProperty(options)` at the property level and pass options like `required`, `default`, `description` and more.

<div shortcode="code" tabs="create-user.dto.ts">

```ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty({ required: false, nullable: true })
  name?: string | null;
}
```

</div>

Refresh the Swagger API and you should see the properties for the `CreateUserDto`.

<div shortcode="figure" caption="CreateUserDto properties with name optional">

![CreateUserDto properties with name optional](assets/img/blog/openapi-in-nestjs/optimized/createuserdto-properties.png)

</div>

Also have a look at the `UpdateUserDto` schema in Swagger. The same properties are shown but all of them are marked as optional. This is because of `PartialType` also called [Mapped types](https://docs.nestjs.com/openapi/mapped-types) provided by Nest. 

<div shortcode="code" tabs="update-user.dto.ts">

```ts
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

</div>

`PartialType` applies the same properties from `CreateUserDto` but set to optional.

### Response

Add the same properties as before to the `user.entity.ts` and only expose `name` and `email` to Swagger.

<div shortcode="code" tabs="user.entity.ts">

```ts
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  email: string;
  password: string;
  @ApiProperty({ required: false, nullable: true })
  name?: string | null;
}
```

</div>


Additionally, Swagger needs help to pick up the response type. Annotate your REST endpoints with the custom `@ApiResponse()` specifying the status code and the response type or choose a [short-hand API response](https://docs.nestjs.com/openapi/operations#responses) (e.g. `@ApiOkResponse()`, `@ApiCreatedResponse()`, ...).

- `@ApiOkResponse`: `GET` and `DELETE`
- `@ApiCreatedResponse`: `POST` and `PATCH`
- `@ApiForbiddenResponse`: endpoint might throw forbidden (`403`) exception

<div shortcode="code" tabs="user.entity.ts">

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: [User] }) // 👈 array notation
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: User })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: User })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
```

</div>

<div shortcode="note">

When the response type is an `array`, you must indicate it using the array bracket notation (`[ ]`) around the `type` or set `isArray` to `true`. `GET /users` response is an array of `User` annotation looks like this:

`@ApiOkResponse({ type: [User] })`

`@ApiOkResponse({ type: User, isArray: true })`

</div>

You'll see the endpoints with the new response type of `User`.

<div shortcode="figure" caption="CreateUserDto properties with name optional">

![CreateUserDto properties with name optional](assets/img/blog/openapi-in-nestjs/optimized/users-crud-responses.png)

</div>

## Swagger CLI Plugin

Exposing the properties and responses to Swagger results in additional boilerplate. Nest commes with a [Swagger CLI Plugin](https://docs.nestjs.com/openapi/cli-plugin#using-the-cli-plugin) to reduce boilerplate in your `.dto.ts` and `.entity.ts` files. Enable the plugin in your `nest-cli.json` file.

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

**Before**: `User` entity, `CreateUserDto` and `UsersController` with boilerplate.

<div shortcode="code" tabs="user.entity.ts,create-user.dto.ts,users.controller.ts">

```ts
export class User {
  @ApiProperty()
  email: string;
  password: string;
  @ApiProperty({ required: false, nullable: true })
  name?: string | null;
}
```
```ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty({ required: false, nullable: true })
  name?: string | null;
}
```
```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: User })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: User })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
```

</div>

**After**: CLI plugin enabled and without boilerplate. You need to add `@ApiHideProperty` otherwise the plugin will also expose the `password` property.

<div shortcode="code" tabs="user.entity.ts,create-user.dto.ts,users.controller.ts">

```ts
import { ApiHideProperty } from '@nestjs/swagger';

export class User {
  email: string;
  @ApiHideProperty()
  password: string;
  name?: string | null;
}
```
```ts
export class CreateUserDto {
  email: string;
  password: string;
  name?: string | null;
}
```
```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): User {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): User {
    return this.usersService.remove(+id);
  }
}
```

</div>


## Advanced Swagger Types

Check out the following post for type-safe file uploads.

<div shortcode="article" routes="/blog/type-safe-file-uploads"></div>

This allows you to directly test file upload in your Swagger documentation and is perfect for client generation tools to pick up the correct input values for file(s).
