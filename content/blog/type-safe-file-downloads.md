---
title: 'Downloading files with NestJS'
description: 'Setup type-safe endpoints for downloading files in your NestJS application.'
published: true
publishedAt: 2022-07-27T10:00:00.000Z
updatedAt: 2022-07-27T10:00:00.000Z
tags:
    - NestJS
keywords:
    - REST
    - Swagger
    - OpenAPI
    - 'Download File'
authors:
    - 'Marc Stammerjohann'
github: https://github.com/notiz-dev/nestjs-swagger
---

You got [file upload](https://notiz.dev/blog/type-safe-file-uploads) figured out in your NestJS application? And now you need to [download files](https://docs.nestjs.com/techniques/streaming-files) from your REST API? 🤓

Glad you're here now, but make sure you prepare your Nest app with Swagger first.

<div shortcode="article" routes="/blog/openapi-in-nestjs"></div>

Want to jump directly to the code? Here is the repository.

<div shortcode="repo" repo="notiz-dev/nestjs-swagger"></div>

## File download

Downloading a file with Nest depends on how you retrieve it from your file storage:

- as `Buffer` use `response.send(fileBuffer)`
- as `Stream` use `fileStream.pipe(response)`

This will get the job done easily but you'll loose access to the response during [response interceptors](https://docs.nestjs.com/interceptors#response-mapping). See the `LoggingInterceptor` as an example as interceptor.

As an alternative, Nest provides `StreamableFile`, which solves the response interceptor problem, and supports both `Buffer` and `Stream` in one swoop. 🦾

<div shortcode="code" tabs="download.controller.ts,download.service.ts,logging.interceptor.ts">

```ts
import {
  Controller,
  Get,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DownloadService } from './download.service';
import { Response } from 'express';
import { LoggingInterceptor } from 'src/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('download')
@ApiTags('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get('buffer')
  buffer(@Res() response: Response) {
    const file = this.downloadService.imageBuffer();
    response.send(file);
  }

  @Get('stream')
  stream(@Res() response: Response) {
    const file = this.downloadService.imageStream();
    file.pipe(response);
  }

  @Get('streamable')
  streamable(@Res({ passthrough: true }) response: Response) {
    const file = this.downloadService.fileStream();
    // or
    // const file = this.downloadService.fileBuffer();
    return new StreamableFile(file); // 👈 supports Buffer and Stream
  }
}
```
```ts
import { Injectable } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';

/**
 * This service would probably download files from a file storage
 * like S3, minio etc.
 */
@Injectable()
export class DownloadService {
  constructor() {
    // create connection to your file storage
  }

  imageBuffer() {
    return readFileSync(join(process.cwd(), 'notiz.png'));
  }

  imageStream() {
    return createReadStream(join(process.cwd(), 'notiz.png'));
  }

  fileBuffer() {
    return readFileSync(join(process.cwd(), 'package.json'));
  }

  fileStream() {
    return createReadStream(join(process.cwd(), 'package.json'));
  }
}
```
```ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`)),
      tap((response) => console.log(response)), // 👈 response is defined only when StreamableFile is used
    );
  }
}
```

</div>

## Custom headers

Express `Response` allows you to modify the response headers based on your needs. This is possible for all three options described above. Very important to note here is to configure the response `@Res({ passthrough: true })` when using `StreamableFile`, otherwise the response won't end.

Here are some examples how to customize the response headers for your endpoints or use `response.setHeaders(...)` for complete custom headers like caching.

### Change the content type

By default `application/octet-stream` is set as the `Content-Type`. If you know you are returning an image or a document from your endpoint change the content type.

<div shortcode="code" tabs="download.controller.ts">

```ts
@Get('buffer')
buffer(@Res() response: Response) {
  const file = this.downloadService.imageBuffer();
  response.contentType('png');
  // response.contentType('image/png');
  // response.contentType('image/*');
  // response.contentType('application/pdf');
  response.send(file);
}
```

</div>

### Preview or download file

Use the header `Content-Disposition` to inform if the file should be displayed **inline**, the default, or downloaded as an **attachment**. Use `response.attachment()` to indicate the file as download and optionally pass a `filename`.

<div shortcode="code" tabs="download.controller.ts">

```ts
@Get('buffer')
buffer(@Res() response: Response) {
  const file = this.downloadService.imageBuffer();
  response.contentType('image/png');
  response.attachment();
  // provide a filename
  // response.attachment('notiz.png');
  response.send(file);
}
```

</div>

## Swagger Types

Until now, you covered the response part of the Rest API. How about Swagger? Does Swagger already know that the endpoint response is a file? Let's check it out at `http://localhost:3000/api`.

<div shortcode="figure" caption="Download file without Swagger types">

![Download file without Swagger types](assets/img/blog/type-safe-file-downloads/optimized/download-file-without-swagger-types.png)

</div>

Swagger is not aware about the file response and not even your custom content type. There is a way of telling Swagger about it. Can you spot the two [decorators](https://docs.nestjs.com/openapi/decorators) for this job? 🧐 

The decorators for the job are `@ApiResponse` and `@ApiProduces`. 🤝 

`@ApiResponse` is responsible for changing the response schema to a `binary` format. Similar to what you had to do for the [type-safe file upload](https://notiz.dev/blog/type-safe-file-uploads#file-upload-decorators).

<div shortcode="code" tabs="download.controller.ts">

```ts
import { ApiResponse } from '@nestjs/swagger';

@ApiResponse({
  schema: {
    type: 'string',
    format: 'binary',
  },
  status: HttpStatus.OK,
})
@Get('buffer')
buffer(@Res() response: Response) {
  const file = this.downloadService.imageBuffer();
  response.contentType('image/png');
  response.send(file);
}
```

</div>

You can easily replace the decorator `@ApiResponse` with predefined status codes like `@ApiOkResponse`, `@ApiCreatedResponse` and skip the `status` code option.

Next, use `@ApiProduces` to inform Swagger about the response content type. It supports multiple content types and also wildcards (these things `*/*`, `image/*`).

<div shortcode="code" tabs="download.controller.ts">

```ts
import { ApiOkResponse, ApiProduces } from '@nestjs/swagger';

@ApiOkResponse({
  schema: {
    type: 'string',
    format: 'binary',
  },
})
@ApiProduces('image/png')
@Get('buffer')
buffer(@Res() response: Response) {
  const file = this.downloadService.imageBuffer();
  response.contentType('image/png');
  response.send(file);
}
```

</div>

Your Swagger types should look as awesome as this. 👇

<div shortcode="figure" caption="Download file with Swagger types">

![Download file with Swagger types](assets/img/blog/type-safe-file-downloads/optimized/download-file-with-swagger-types.png)

</div>

Great, are you done yet? You are good to go, but there is one optimization you can do for simplifying the applied decorators. Why not create a custom `@ApiFileResponse` decorator to finish it up.

## File response decorator

Add a new file `api-file-response.decorator.ts` and export a function called `ApiFileResponse` like the decorator. You'll create a [composition](https://docs.nestjs.com/custom-decorators#decorator-composition) of `@ApiOkResponse` and `@ApiProduces`.

<div shortcode="code" tabs="api-file-response.decorator.ts">

```ts
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiProduces } from '@nestjs/swagger';

export function ApiFileResponse(...mimeTypes: string[]) {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        type: 'string',
        format: 'binary',
      },
    }),
    ApiProduces(...mimeTypes),
  );
}
```

</div>

That's looking good and you can still pass any content type (`mimeTypes`) as you wish. And it is as simple as that. 🤩

<div shortcode="code" tabs="download.controller.ts">

```ts
// before
import { ApiOkResponse, ApiProduces } from '@nestjs/swagger';

@ApiOkResponse({
  schema: {
    type: 'string',
    format: 'binary',
  },
})
@ApiProduces('image/png')
@Get('buffer')
buffer(@Res() response: Response) {
  const file = this.downloadService.imageBuffer();
  response.contentType('image/png');
  response.send(file);
}

// after
import { ApiFileResponse } from './api-file-response.decorator';

@ApiFileResponse('image/png')
@Get('buffer')
buffer(@Res() response: Response) {
  const file = this.downloadService.imageBuffer();
  response.contentType('image/png');
  response.send(file);
}
```

</div>