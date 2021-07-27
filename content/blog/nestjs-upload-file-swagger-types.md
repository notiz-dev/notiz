---
title: "NestJS: Upload Files type safe with Swagger"
description: Learn how to apply Swagger decorators for type safe file upload endpoints. 
published: true
publishedAt: 2021-07-27T18:30:00.000Z
updatedAt: 2021-07-27T18:30:00.000Z
tags:
  - NestJS
keywords:
  - REST
  - Swagger
  - OpenAPI
  - Upload File
authors:
  - Marc Stammerjohann
github: https://github.com/...
---

Before you start follow this guide to setup Swagger in your NestJS application

<div shortcode="article" routes="/blog/openapi-documentation-in-nestjs"></div>

## Upload File(s)

<div shortcode="code" tabs="app.controller.ts">

```ts
import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ApiFile, ApiImageFile } from './api-file';
import { ApiFileFields } from './api-file-fields';
import { ApiFiles } from './api-files';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       file: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
```

</div>