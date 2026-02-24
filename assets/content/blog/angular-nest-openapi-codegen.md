

Are you using a REST API in your Angular app to fetch data from a server? Are you manually adding model types, specifying each REST call with `HttpClient`? Stop right there!

Use [ng-openapi-gen](https://github.com/cyclosproject/ng-openapi-gen) for a hassle free and automatic generation of models and services based on your OpenAPI 3 specification.

<div shortcode="repo" repo="notiz-dev/codegen-angular-nest"></div>

## Nx monorepo

Setup a monorepo using [nx](https://nx.dev/) with Angular and NestJS.

<div shortcode="code" tabs="BASH">

```bash
npx create-nx-workspace --preset angular-nest
```

</div>

Open `package.json` and replace the `start` script with:

<div shortcode="code" tabs="package.json">

```json
"start": "nx run-many --target=serve",
```

</div>

This will start both your Angular and NestJS app in serve mode.

<div shortcode="code" tabs="BASH">

```bash
npm run start
```

</div>

Angular will be exposed on [localhost:4200](http://localhost:4200) and Nest on [localhost:3333](http://localhost:3333).

## Setup Swagger

Setup Swagger in NestJS for type-safe REST endpoints.

First, install the Nest swagger library.

<div shortcode="code" tabs="BASH">

```bash
npm install --save @nestjs/swagger
```

</div>

Configure Swagger in your `main.ts` file:

<div shortcode="code" tabs="main.ts">

```ts
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // setup swagger
  const config = new DocumentBuilder()
    .setTitle('Angular NestJS Codegen')
    .setDescription('Base for codegen for Angular app')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // enable cors for Angular
  app.enableCors();

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
```

</div>

Visit [localhost:3333/api](http://localhost:3333/api) to see the Swagger UI.

While you are add it. Create a `message.entity.ts` class and annotate the attribute with `@ApiProperty()`.

<div shortcode="code" tabs="message.entity.ts">

```ts
// entities/message.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class Message {
  @ApiProperty()
  message: string;
}
```

</div>

Use `@ApiResponse({ type: Message })` to inform Swagger about the response type.

<div shortcode="code" tabs="app.controller.ts">

```ts
// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { AppService } from './app.service';
import { Message } from './entities/message.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @ApiResponse({ type: Message })
  getData(): Message {
    return this.appService.getData();
  }
}
```

</div>

## Configure Codegen

Next, you will configure [ng-openapi-gen](https://github.com/cyclosproject/ng-openapi-gen) as the OpenAPI 3 code generator for Angular.

<div shortcode="code" tabs="BASH">

```bash
npm i -D ng-openapi-gen
```

</div>

Add a config file with the name `ng-openapi-gen.json` to the root folder. `ng-openapi-gen` loads the config file with this name automatically. Pass `ng-openapi-gen --config your-config.json` for an alternative config file name.

Copy the following config content into the file, will explain the configuration options next.

<div shortcode="code" tabs="ng-openapi-gen.json">

```json
{
  "$schema": "node_modules/ng-openapi-gen/ng-openapi-gen-schema.json",
  "input": "http://localhost:3333/api-json",
  "output": "apps/app/src/api"
}
```

</div>

With `$schema` you get autocomplete in JSON for all possible configuration [options](https://raw.githubusercontent.com/cyclosproject/ng-openapi-gen/master/ng-openapi-gen-schema.json) of `ng-openapi-gen`. 

The `input` requires a file or URL of a OpenAPI 3 specification. In your case the Swagger JSON is available at [localhost:3333/api-json](http://localhost:3333/api-json). You should see `openapi` as first value with version `3.0.0`.

`output` is the directory for the generated files. The files are generated inside your Angular app. Change the directory if you choose a different app name (`apps/your-name/src/api`) or perhaps you want to generate into a shared library (`libs/api/src/lib`).

Last step, add a new script to your `package.json` let's call it `"codegen": "ng-openapi-gen"`. Run the new script, also make sure the Nest app is serving.

<div shortcode="code" tabs="BASH">

```bash
npm run codegen
```

</div>

Your output directory (`apps/your-name/src/api`) now contains a couple of new files. Next, you will start with the configuration of the REST API endpoint.

<div shortcode="figure" caption="Codegen CLI Output">

![Codegen CLI Output](assets/img/blog/angular-nest-openapi-codegen/optimized/codegen-cli-output.png)

</div>

<div shortcode="figure" caption="Codegen file structure">

![Codegen file structure](assets/img/blog/angular-nest-openapi-codegen/optimized/codegen-files.png)

</div>

## Specify API url with ApiModule

Add `ApiModule`, import from `apps/your-name/src/api/api.module.ts`, to your Angular `AppModule` imports. Use `forRoot(...)` to specify the `rootUrl` pointing to [localhost:3333](http://localhost:3333) in development. 

<div shortcode="code" tabs="app.module.ts">

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';

import { ApiModule } from '../api/api.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: environment.apiUrl }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

</div>

Because your API endpoint will be different in production you need to add the `apiUrl` to the `environment(.prod).ts` files.

<div shortcode="code" tabs="environment(.prod).ts">

```ts
// environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3333',
};

// environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.awesome-app', // update in production
};
```

</div>

## First generated REST request

Lastly, you'll be making a REST request with the generated API. Look into the `api/services` directory. A service will be generated for each [tag](https://docs.nestjs.com/openapi/operations#tags) (e.g. `@ApiTags('users')`) in your Swagger API.

Use `ApiService` in `AppComponent` to replace the direct `HttpClient` call. Under the hood `ApiService` uses `HttpClient`.

<div shortcode="code" tabs="app.component.ts">

```diff-ts
import { Component } from '@angular/core';
-import { HttpClient } from '@angular/common/http';
-import { Message } from '@angular-nest-codegen/api-interfaces';
+import { ApiService } from '../api/services';

@Component({
  selector: 'angular-nest-codegen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
+ hello$ = this.apiService.appControllerGetData();
- hello$ = this.http.get<Message>('/api/hello');
+ constructor(private apiService: ApiService) {}
- constructor(private http: HttpClient) {}
}
```

</div>

Perfect, you made it till the end. Keep in mind that the codegen is only as good as your **Swagger documentation**. If you are missing type information for the request or response, you're also missing out in codegen.

Checkout the following two posts as inspiration about type-safe endpoints with Nest.

<div shortcode="article" routes="/blog/type-safe-file-uploads"></div>

<div shortcode="article" routes="/blog/type-safe-file-downloads"></div