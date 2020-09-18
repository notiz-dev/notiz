---
title: DBML generator for Prisma
description: Visualize Prisma Schema as Entity-Relationship Diagram
published: true
publishedAt: 2020-09-15T17:50:00.000Z
updatedAt: 2020-09-18T13:30:00.000Z
tags:
  - Prisma
keywords:
  - DBML
  - Entity-Relationship Diagram
authors:
  - Marc Stammerjohann
github: https://github.com/notiz-dev/prisma-dbml-generator
---

Introducing 🥳 [Prisma DBML Generator](https://github.com/notiz-dev/prisma-dbml-generator) **automatically** generating a [DBML](https://www.dbml.org/home) schema based on your Prisma Schema. 

## DBML Generator

Simply install the DBML generator

```bash
npm install -D prisma-dbml-generator
```

Add the generator to your `schema.prisma`

```prisma
generator dbml {
  provider = "prisma-dbml-generator"
}
```

Running `npx prisma generate` for the following Prisma schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  email     String   @unique
  name      String?
  posts     Post[]
  profile   Profile?
  /// user role
  role      Role     @default(USER)
}

/// User profile
model Profile {
  id     Int     @default(autoincrement()) @id
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model Post {
  id         Int        @id @default(autoincrement())
  title      String     @default("")
  content    String?
  published  Boolean    @default(false)
  author     User?      @relation(fields: [authorId], references: [id])
  authorId   Int?
  categories Category[]
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[]
}

/// user role
enum Role {
  ADMIN /// allowed to do everything
  USER
}
```

generates the following `schema.dbml` to `prisma/dbml`

```dbml
Table User {
  id Int [pk, increment]
  createdAt DateTime [default: `now()`, not null]
  updatedAt DateTime [not null]
  email String [unique, not null]
  name String
  posts Post
  profile Profile
  role Role [not null, default: 'USER', note: 'user role']
}

Table Profile {
  id Int [pk, increment]
  bio String
  user User [not null]
  userId Int [unique, not null]

  Note: 'User profile'
}

Table Post {
  id Int [pk, increment]
  title String [not null, default: '']
  content String
  published Boolean [not null, default: false]
  author User
  authorId Int
  categories Category
}

Table Category {
  id Int [pk, increment]
  name String [not null]
  posts Post
}

Table CategoryToPost {
  categoryId Int [ref: > Category.id]
  postId Int [ref: > Post.id]
}

Enum Role {
  ADMIN
  USER
}

Ref: Profile.userId - User.id

Ref: Post.authorId > User.id
```

Copy the `schema.dbml` content and [visualize](https://dbdiagram.io/d) it as an Entity-Relationship Diagram:

![Entity-Relationship Diagram](assets/img/blog/prisma-dbml-generator/optimized/db-diagram.png)

You should see this output each time you run `npx prisma generate`

```bash
$ npx prisma generate
Environment variables loaded from prisma/.env

✔ Generated Prisma Client to ./node_modules/@prisma/client in 281ms

✔ Generated DBML Schema to ./prisma/dbml in 5ms

You can now start using Prisma Client in your code:

``
import { PrismaClient } from '@prisma/client'
// or const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
``

Explore the full API: http://pris.ly/d/client
```

## Additional Options

Do you like to configure the output directory or even the output name 🤓?
You can play around with the following options:

```prisma
generator dbml {
  provider   = "prisma-dbml-generator"
  output     = "../dbml"
  outputName = "awesome.dbml"
}
```

[Check out all options](https://github.com/notiz-dev/prisma-dbml-generator#additional-options) and give it a try with your own Prisma Schema 😎.
