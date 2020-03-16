---
title: 'GraphQL code first approach with NestJS 7'
description: 'Create a GraphQL API using code first approach with NestJS 7'
published: true
publishedAt: 2020-03-15T09:11:00.000Z
updatedAt: 2020-03-15T09:11:00.000Z
tags:
  - NestJS
  - Prisma
authors:
  - 'Marc Stammerjohann'
github: 'https://github.com/notiz-dev/...'
---

Recently the release of [NestJS 7](https://trilon.io/blog/announcing-nestjs-7-whats-new) was announced with amazing updates to the whole framekwork including the [@nestjs/graphql](https://docs.nestjs.com/graphql/quick-start) ❤️ package.

We create a [GraphQL](https://graphql.org/) Api using the `@nestjs/graphql`. I will show you how to the write the API using TypeScript with the **code first** approach and the new [GraphQL plugin](https://docs.nestjs.com/graphql/resolvers#cli-plugin).

## Setup GraphQL

To start a GraphQL API install the following packages

```bash
npm i --save @nestjs/graphql graphql-tools graphql

# for Express
npm i --save apollo-server-express
# for Fastify
npm i --save apollo-server-fastify
```
