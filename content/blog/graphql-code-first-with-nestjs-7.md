---
title: 'GraphQL code first approach with NestJS 7'
description: 'Create a GraphQL API using code first approach with NestJS 7.'
published: true
publishedAt: 2020-03-15T09:11:00.000Z
updatedAt: 2020-03-15T09:11:00.000Z
tags:
  - NestJS
  - GraphQL
  - Prisma
authors:
  - 'Marc Stammerjohann'
github: 'https://github.com/notiz-dev/...'
---

Recently the release of [NestJS 7](https://trilon.io/blog/announcing-nestjs-7-whats-new) was announced with amazing updates to the whole framekwork including the [@nestjs/graphql](https://docs.nestjs.com/graphql/quick-start) ❤️ package.

We create a [GraphQL](https://graphql.org/) API using the `@nestjs/graphql`. I will show you how to write the API with TypeScript using the **code first** approach and the new [GraphQL plugin](https://docs.nestjs.com/graphql/resolvers#cli-plugin).

## Setup GraphQL

To start a GraphQL API install the following packages into your Nest application.

```bash
npm i --save @nestjs/graphql graphql-tools graphql

# for Express
npm i --save apollo-server-express
# for Fastify
npm i --save apollo-server-fastify
```

Import the `GraphQLModule` into your `AppModule`.

```ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
    }),
  ],
})
export class AppModule {}
```

To configure the GraphQL endpoint we use `GqlModuleOptions` which are passed to the underlying GraphQL server. Here we are enabling the [**code first**](https://docs.nestjs.com/graphql/quick-start#code-first) approach.

- `autoSchemaFile` enables the **code first** approach to use TypeScript classes and decorators to generate the GraphQL schema.
- `playground` enables the [GraphQl Playground](https://github.com/prisma-labs/graphql-playground), an interactive IDE for your API documentation, available at [http://localhost:3000/graphql](http://localhost:3000/graphql).
- `debug` mode

There are two options for `autoSchemaFile` providing a **path** for the schema generation or `true` for generating the schema in memory.

## GraphlQL Code First approach

A GraphQL schema contains many [types](https://graphql.org/learn/schema/) and [Queries](https://graphql.org/learn/queries/). The schema grows in size and complexity for each new query, mutation and type. GraphQL [**Code First**](https://www.youtube.com/watch?v=OloBAdNCnyQ) enables us to automatically generate a GraphQL schema using TypeScript and decorators. This helps us focus on writing `.ts` files and we don't need to write the GraphlQL schema ourselfs.

`@nestjs/graphql` provides all decorators to generate our schema. Here are a few decorators and there usage:

- `@ObjectType()` generate class as [Type](https://graphql.org/learn/schema/#type-system)
- `@Field()` generate a class property as a [Field](https://graphql.org/learn/schema/#object-types-and-fields)
- `@InputType()` generate class as [Input](https://graphql.org/learn/schema/#input-types)
- `@Args` generate method params as [Arguments](https://graphql.org/learn/schema/#arguments)
- `@Query()` generate method as [Query](https://graphql.org/learn/schema/#the-query-and-mutation-types)
- `@Mutation()` generate method as [Mutation](https://graphql.org/learn/schema/#the-query-and-mutation-types)
- `@ResolveField` resolve

### Graphql Type

Create for each database model a TypeScript class to expose them in our GraphQL schema. Create a `movie.model.ts` and a `actor.model.ts` with the same properties from our database:

```typescript
export class Movie {
  id: number;
  releaseDate: Date;
  title: string;
  stars: Actor[];
  rating?: number;
}

export class Actor {
  id: number;
  firstname: string;
  lastname: string;
}
```

Now we use [decorators](https://docs.nestjs.com/graphql/resolvers#code-first) to generate the schema. Start adding `@ObjectType()` to each TypeScript class.

```typescript
import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export clas Movie {
  ...
}

@ObjectType()
export clas Actor {
  ...
}
```

Next we use the `@Field` decorator on each class property providing additional information about the type and state (required or optional).

```typescript
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Actor } from './actor.model';

@ObjectType()
export class Movie {
  @Field(type => Int)
  id: number;

  @Field(type => Date)
  releaseDate: Date;

  @Field()
  title: string;

  @Field(type => [Actor])
  stars: Actor[];

  @Field(type => Float, { nullable: true })
  rating?: number;
}
```

`@nestjs/graphql` provides five GraphQL [scalar types](https://docs.nestjs.com/graphql/scalars) such as `Int`, `Float` and `GraphQLISODateTime`.

### GraphQL Resolver

Great our models are in place! Now we use the Nest CLI to generate our resolvers.

```bash
nest generate resolver <name>

# alias
nest g r <name>

# Movie and Actor
nest g r movie
nest g r actor
```

Our resolvers are added to the `prodivers` array in the `app.module.ts`. Now we add a `@Query` to the `MovieResolver`.

```typescript
import { Resolver, Query } from '@nestjs/graphql';
import { Movie } from '../models/movie.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver('Movie')
export class MovieResolver {
  constructor(private prisma: PrismaService) {}

  @Query(returns => [Movie])
  movies() {
    return this.prisma.movie.findMany();
  }
}
```

If we start the Nest application again and the error from before is gone. Also our GraphQL `schema.gql` is generated containing our generated `types` for Actior and Movie and our `movies` query.

```graphql
type Actor {
  id: Int!
  firstname: String!
  lastname: String!
}

"""
A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
"""
scalar DateTime

type Movie {
  id: Int!
  releaseDate: DateTime!
  title: String!
  stars: [Actor!]!
  rating: Float
}

type Query {
  movies: [Movie!]!
}
```

### Test GraphQL API

Open the [playground](http://localhost:3000/graphql) and try out the movies query. You can use the [Prisma Studio]

```graphql
query Movies {
  movies {
    id
    releaseDate
    title
    stars {
      id
      firstname
      lastname
    }
    rating
  }
}
```

## GraphQL plugin

Nest 7 provides a new [GraphQL plugin](https://docs.nestjs.com/graphql/resolvers#cli-plugin) to reduce the boilerplate of decorators for our **models**, **inputs**, **args** and **entity** files. Enable the plugin by adding `compilerOptions` to `nest-cli.json`:

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": ["@nestjs/graphql/plugin"]
  }
}
```

The plugin automatically handles the decorators for the files with the suffix `['.input.ts', '.args.ts', '.entity.ts', '.model.ts']`. If you like to use custome suffixes add those to the plugins option:

```json
"plugins": [
  {
    "name": "@nestjs/graphql/plugin",
    "options": {
      "typeFileNameSuffix": [".input.ts", ".model.ts"]
    }
  }
]
```

Let's clean up the boilerplate of our models. Before the plugin the models look like this:

```typescript
@ObjectType()
export class Movie {
  @Field(type => Int)
  id: number;

  @Field(type => Date)
  releaseDate: Date;

  @Field()
  title: string;

  @Field(type => [Actor])
  stars: Actor[];

  @Field(type => Float, { nullable: true })
  rating?: number;
}

@ObjectType()
export class Actor {
  @Field(type => Int)
  id: number;

  @Field()
  firstname: string;

  @Field()
  lastname: string;
}
```

With the plugin and the removing the extra boilerplate the models look like this:

```typescript
@ObjectType()
export class Movie {
  @Field(type => Int)
  id: number;

  releaseDate: Date;

  title: string;

  @Field(type => [Actor])
  stars: Actor[];

  rating?: number;
}

@ObjectType()
export class Actor {
  @Field(type => Int)
  id: number;

  firstname: string;

  lastname: string;
}
```

We can add `@Field` to any property to override the documentation and also the inferred type.
For example `number` is inferred as the GraphQL type `Float` here we can use `@Field(type => Int)` to change this to a `Int` type.
