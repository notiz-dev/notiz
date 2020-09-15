---
title: DBML generator for Prisma
description: Visualize Prisma Schema as Entity-Relationship Diagram
published: true
publishedAt: 2020-09-15T17:08:00.000Z
updatedAt: 2020-09-15T17:08:00.000Z
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

Run `npx prisma generator` to generate the DBML schema at `prisma/dbml/schema.dbml`. Copy the `schema.dbml` content and [visualize](https://dbdiagram.io/d) it as an Entity-Relationship Diagram.

[Check out the readme](https://github.com/notiz-dev/prisma-dbml-generator#readme) and give it a try with your Prisma Schema.
