---
title: 'NestJS: Upload Files type safe with Swagger'
description: 'Learn how to apply Swagger decorators for type safe file upload endpoints.'
published: true
publishedAt: 2021-08-25T15:30:00.000Z
updatedAt: 2021-08-25T15:30:00.000Z
tags:
    - NestJS
keywords:
    - REST
    - Swagger
    - OpenAPI
    - 'Upload File'
authors:
    - 'Marc Stammerjohann'
github: https://github.com/notiz-dev/nestjs-swagger
---

You will setup REST endpoints for [uploading files](https://docs.nestjs.com/techniques/file-upload), add Swagger decorators for type-safety and learn about [Decorator composition](https://docs.nestjs.com/custom-decorators#decorator-composition) to simplify Swagger decorators.

Before you start follow the setup for Swagger in your NestJS application.

<div shortcode="article" routes="/blog/openapi-in-nestjs"></div>

The source code for this post is available in this repo on GitHub.

<div shortcode="repo" repo="notiz-dev/nestjs-swagger"></div>

## Get Started

Nest uses [multer](https://github.com/expressjs/multer) for handling file uploads using the `multipart/form-data` [format](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST).

Add the multer typings to improve type safety.

<div shortcode="code" tabs="BASH">

```bash
npm i -D @types/multer
```

</div>

## Upload File(s)

Start with uploading a single file. Add a new `Post` endpoint to your controller and add the `FileInterceptor()` to extract the file from the request. Gain access to the file payload via the `@UploadedFile()` decorator.

<div shortcode="code" tabs="files.controller.ts">

```ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
```

</div>

Start the Nest application `npm run start:dev` and checkout the new endpoint in your Swagger API [localhost:3000/api](http://localhost:3000/api).

<div shortcode="figure" caption="Upload file without Swagger types">

![Upload file without Swagger types](assets/img/blog/nestjs-upload-file-swagger-types/optimized/upload-file-without-swagger-types.png)

</div>

The endpoint is available but Swagger doesn't now anything about the file upload. Let's add the Swagger type definitions for uploading a file.

First, you add [@ApiConsumes()](https://docs.nestjs.com/openapi/operations#file-upload) to let Swagger now that this endpoint is consuming `multipart/form-data`. Now use `@ApiBody()` to enable file upload in the Swagger API.

<div shortcode="code" tabs="files.controller.ts">

```ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 👈 field name must match
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { // 👈 this property
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
```

</div>

<div shortcode="note">
The parameter for `@FileInterceptor()` must match the name of the properties field in the `@ApiBody()`. Otherwise Nest returns `400 Unexpected field`.
</div>

Swagger provides you now with a file selection 🎉.

<div shortcode="figure" caption="Upload file with Swagger types">

![Upload file without Swagger types](assets/img/blog/nestjs-upload-file-swagger-types/optimized/upload-file-with-swagger-types.png)

</div>

Now create endpoints for uploading [array of files](https://docs.nestjs.com/techniques/file-upload#array-of-files) - `@FilesInterceptor()` and `@UploadedFiles()` - and [multiple files](https://docs.nestjs.com/techniques/file-upload#multiple-files) - `@FileFieldsInterceptor()` and `@UploadedFiles()`.

<div shortcode="code" tabs="files.controller.ts">

```ts
import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files')) // 👈  using FilesInterceptor here
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array', // 👈  array of files
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Post('uploadFields')
  @UseInterceptors(
    FileFieldsInterceptor([ // 👈  multiple files with different field names 
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { 
        // 👈  field names need to be repeated for swagger
        avatar: {
          type: 'string',
          format: 'binary',
        },
        background: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
  }
}
```

</div>

Checkout the new endpoints in your Swagger API.

<div shortcode="figure" caption="Upload array of files with Swagger types">

![Upload array of files with Swagger types](assets/img/blog/nestjs-upload-file-swagger-types/optimized/upload-files-with-swagger-types.png)

</div>

<div shortcode="figure" caption="Upload multiple files with different field names with Swagger types">

![Upload array of files with Swagger types](assets/img/blog/nestjs-upload-file-swagger-types/optimized/upload-file-fields-with-swagger-types.png)

</div>

As you noticed you need to add a **few** decorators to your endpoints and **repeat** the definition again for Swagger to pick up the correct file types. This is quite error prone as you might forget to add decorator or use the wrong file name property.

Let's improve it by creating custom decorators for file uploads and combining all required decorators together.

## File upload decorators

Create a new file called `api-file.decorator.ts` and export a function called `ApiFile` which returns `applyDecorators()` provided by Nest. Copy all decorators required for handling file upload `FileInterceptor()`, `@ApiConsumes` and `ApiBody` into `applyDecorators()`.

<div shortcode="code" tabs="api-file.decorator.ts">

```ts
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export function ApiFile() {
  return applyDecorators(
    UseInterceptors(FileInterceptor('file')),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}
```

</div>

Now you can replace those decorators and use `@ApiFile()` instead.

<div shortcode="code" tabs="files.controller.ts">

```ts
import {
  Controller,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile } from './api-file.decorator';
import { FilesService } from './files.service';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiFile() // 🤙 cleaned up decorators
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
```

</div>

What if you want to upload a file with a different field name than `file`? Add a `fieldName` parameter to `ApiFile` and set the default to `file`. Replace `file` with the new `fieldName` property. You can even go a step further and add `required` and `MulterOptions` as optional parameters.

<div shortcode="code" tabs="api-file.decorator.ts">

```ts
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export function ApiFile(
  fieldName: string = 'file',
  required: boolean = false,
  localOptions?: MulterOptions,
) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, localOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}
```

</div>

This solves the problem that the `fieldName` for the `FileInterceptor` and the `ApiBody` are always the same and is convenient and easy to reuse.

<div shortcode="code" tabs="files.controller.ts">

```ts
import {
  Controller,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile } from './api-file.decorator';
import { FilesService } from './files.service';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiFile('avatar', true) // 🤩 changing field name and set file required
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
```

</div>

Now create decorators for `@ApiFiles()` and `@ApiFileFields()`.

<div shortcode="code" tabs="api-files.decorator.ts,api-file-fields.decorator.ts">

```ts
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export function ApiFiles(
  fieldName: string = 'files',
  required: boolean = false,
  maxCount: number = 10,
  localOptions?: MulterOptions,
) {
  return applyDecorators(
    UseInterceptors(FilesInterceptor(fieldName, maxCount, localOptions)),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    }),
  );
}
```
```ts
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  MulterField,
  MulterOptions,
} from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export type UploadFields = MulterField & { required?: boolean };

export function ApiFileFields(
  uploadFields: UploadFields[],
  localOptions?: MulterOptions,
) {
  const bodyProperties: Record<string, SchemaObject | ReferenceObject> =
    Object.assign(
      {},
      ...uploadFields.map((field) => {
        return { [field.name]: { type: 'string', format: 'binary' } };
      }),
    );
  const apiBody = ApiBody({
    schema: {
      type: 'object',
      properties: bodyProperties,
      required: uploadFields.filter((f) => f.required).map((f) => f.name),
    },
  });

  return applyDecorators(
    UseInterceptors(FileFieldsInterceptor(uploadFields, localOptions)),
    ApiConsumes('multipart/form-data'),
    apiBody,
  );
}
```

</div>

Now compare the endpoints without and with custom file upload decorators

<div shortcode="code" tabs="Before,After">

```ts
import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files')) // 👈  using FilesInterceptor here
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array', // 👈  array of files
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Post('uploadFields')
  @UseInterceptors(
    FileFieldsInterceptor([ // 👈  multiple files with different field names 
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { 
        // 👈  field names need to be repeated for swagger
        avatar: {
          type: 'string',
          format: 'binary',
        },
        background: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
  }
}
```
```ts
import { Controller, Post, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiFileFields } from './api-file-fields.decorator';
import { ApiFile } from './api-file.decorator';
import { ApiFiles } from './api-files.decorator';
import { FilesService } from './files.service';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiFile('avatar', false)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post('uploads')
  @ApiFiles('files', true)
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Post('uploadFields')
  @ApiFileFields([
    { name: 'avatar', maxCount: 1, required: true },
    { name: 'background', maxCount: 1 },
  ])
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
  }
}
```

</div>

## Custom file filter

What if you like to allow only images or PDF's to upload? Thats where the `MulterOptions.fileFilter` come into action. You can filter based on the file properties such as `originalname`, `mimetype`, `size` and more. 

Let's create a filter for mimetypes call the function `fileMimetypeFilter` which receives one or more mimetypes to match, use the spread operator for the parameter. The `fileMimetypeFilter` return and implements the multer filter signature.

<div shortcode="code" tabs="file-mimetype-filter.ts">

```ts
import { UnsupportedMediaTypeException } from '@nestjs/common';

export function fileMimetypeFilter(...mimetypes: string[]) {
  return (
    req,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (mimetypes.some((m) => file.mimetype.includes(m))) {
      callback(null, true);
    } else {
      callback(
        new UnsupportedMediaTypeException(
          `File type is not matching: ${mimetypes.join(', ')}`,
        ),
        false,
      );
    }
  };
}
```

</div>

Add the filter to the `@ApiFile()`, `@ApiFiles()` or `@ApiFileFields()` decorators `localOptions` object.

<div shortcode="code" tabs="files.controller.ts">

```ts
import {
  Controller,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile } from './api-file.decorator';
import { FilesService } from './files.service';
import { fileMimetypeFilter } from './file-mimetype-filter';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiFile('avatar', true, { fileFilter: fileMimetypeFilter('image') }) 
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
```

</div>

This endpoint only accepts files which include the mimetype `image` such as `image/jpeg` or `image/png`. This is already very quick and the `fileMimetypeFilter` can be reused. 

But heck why not create custom decorators based on the supported mimetype. Let's create two example decorators: `ApiImageFile` and `ApiPdfFile`. They are simple functions returning the previous created `ApiFile` (or `ApiFiles`) decorator and specifying the `fileMimetypeFilter()`.

<div shortcode="code" tabs="api-file.decorator.ts">

```ts
import { fileMimetypeFilter } from './file-mimetype-filter';

export function ApiImageFile(
  fileName: string = 'image',
  required: boolean = false,
) {
  return ApiFile(fileName, required, {
    fileFilter: fileMimetypeFilter('image'),
  });
}

export function ApiPdfFile(
  fileName: string = 'document',
  required: boolean = false,
) {
  return ApiFile(fileName, required, {
    fileFilter: fileMimetypeFilter('pdf'),
  });
}
```

</div>

Now simply use `@ApiImageFile` or `@ApiPdfFile` to handle file uploads.

<div shortcode="code" tabs="files.controller.ts">

```ts
import {
  Controller,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiImageFile, ApiPdfFile  } from './api-file.decorator';
import { FilesService } from './files.service';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('avatar')
  @ApiImageFile('avatar', true)
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
  
  @Post('document')
  @ApiPdfFile('document', true)
  uploadDocument(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
```

</div>



## File validation

Until now, files are only set to required for the Swagger API. If you call the endpoint from a web framework or REST client like Insomnia you are receiving a `201` status and the received file is `undefined`. 

To validate, a file is not `undefined` create a custom pipe, let's called it `ParseFile`. The pipe will check if the file is provided or not and throw a `400 Bad Request` exception. 

<div shortcode="code" tabs="parse-file.pipe.ts">

```ts
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseFile implements PipeTransform {
  transform(
    files: Express.Multer.File | Express.Multer.File[],
    metadata: ArgumentMetadata,
  ): Express.Multer.File | Express.Multer.File[] {
    if (files === undefined || files === null) {
      throw new BadRequestException('Validation failed (file expected)');
    }

    if (Array.isArray(files) && files.length === 0) {
      throw new BadRequestException('Validation failed (files expected)');
    }

    return files;
  }
}
```

</div>

Pass the `ParseFile` to the `@UploadFile()` or `@UploadFiles()` decorator and you now receive a `400 Bad Request` if the file is not provided.

<div shortcode="code" tabs="files.controller.ts">

```ts
import {
  Controller,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile } from './api-file.decorator';
import { FilesService } from './files.service';
import { ParseFile } from './parse-file.pipe';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiFile() 
  // 🔎 ParseFile 
  uploadFile(@UploadedFile(ParseFile) file: Express.Multer.File) {
    console.log(file);
  }
}
```

</div>

That's it for this post. Enjoy uploading your files to Nest! Where are you storing your uploaded files? Drop a comment below if you like.