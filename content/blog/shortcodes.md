---
title: 'Shortcodes in Scully - Use Angular Components in your Markdown'
description: 'Dynamically render Angular Components in your Markdown Content'
published: false
publishedAt: 2021-03-31T08:55:00.000Z
updatedAt: 2021-03-31T18:40:00.000Z
tags:
    - Angular
    - Scully
keywords:
    - 'Angular Comonents'
    - Markdown
    - Blog
authors:
    - 'Gary Großgarten'
github: 'https://github.com/garygrossgarten/shortcodes'
slugs:
    - ___UNPUBLISHED___kmxn8yz9_ZSNaW4iJtYRsu3dUNngLpPhNnbuftCvD
---

## Article

<div shortcode="article" routes="/blog/jamstack-angular-scully-tailwind-css,/blog/create-a-component-library-for-angular-and-the-web"></div>

## Code

<div shortcode="code" tabs="github-repo.component.ts,github-repo.component.html,github-repo.module.ts,app.module.ts">

```typescript
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { GitHubRepo } from './github-repo.types';

@Component({
  selector: 'niz-github-repo',
  templateUrl: 'github-repo.component.ts'
  styleUrls: ['github-repo.component.scss'],
})
export class GithubRepoComponent implements OnInit {
  @Input() repo: string;
  repo$: Observable<GitHubRepo>;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.repo$ = this.http
      .get<GitHubRepo>(`https://api.github.com/repos/${this.repo}`)
      .pipe(shareReplay());
  }
}

```
```html
<div class="space-y-2 flex-grow">
  <h4>
    <a [href]="(repo$ | async)?.html_url" target="_blank" rel="noreferrer"
      >{{ (repo$ | async)?.owner.login }}/{{ (repo$ | async)?.name }}</a
    >
  </h4>
  <p class="line-clamp-2 text-color-light">
    {{ (repo$ | async)?.description }}
  </p>
  <div class="flex space-x-4">
    <span class="flex space-x-2 hover:color-primary text-color">
      <i class="material-icons-outlined">star_rate</i>
      <span>{{ (repo$ | async)?.stargazers_count }}</span>
    </span>
    <span class="flex text-color space-x-2 hover:color-primary">
      <i class="material-icons-outlined">error_outline</i>
      <span>{{ (repo$ | async)?.open_issues_count }}</span>
    </span>
  </div>
</div>
```
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubRepoComponent } from './github-repo.component';
import { ShortcodeModule } from '@notiz/shortcodes';



@NgModule({
  declarations: [GithubRepoComponent],
  imports: [
    CommonModule,
    ShortcodeModule.forChild([{ shortcode: '', component: GithubRepoComponent }]),

  ]
})
export class GithubRepoModule { }

```
```typescript
import { ShortcodeModule } from '@notiz/shortcodes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...
      {
        shortcode: 'repo',
        loadChildren: () =>
          import('./shortcodes/github-repo/github-repo.module').then((m) => m.GithubRepoModule),
      },
    ]),
   
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

```
</div>

<div shortcode="code" tabs="github-repo.component.ts,github-repo.component.html,github-repo.module.ts,app.module.ts">

```typescript
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { GitHubRepo } from './github-repo.types';

@Component({
  selector: 'niz-github-repo',
  templateUrl: 'github-repo.component.ts'
  styleUrls: ['github-repo.component.scss'],
})
export class GithubRepoComponent implements OnInit {
  @Input() repo: string;
  repo$: Observable<GitHubRepo>;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.repo$ = this.http
      .get<GitHubRepo>(`https://api.github.com/repos/${this.repo}`)
      .pipe(shareReplay());
  }
}

```
```html
<div class="space-y-2 flex-grow">
  <h4>
    <a [href]="(repo$ | async)?.html_url" target="_blank" rel="noreferrer"
      >{{ (repo$ | async)?.owner.login }}/{{ (repo$ | async)?.name }}</a
    >
  </h4>
  <p class="line-clamp-2 text-color-light">
    {{ (repo$ | async)?.description }}
  </p>
  <div class="flex space-x-4">
    <span class="flex space-x-2 hover:color-primary text-color">
      <i class="material-icons-outlined">star_rate</i>
      <span>{{ (repo$ | async)?.stargazers_count }}</span>
    </span>
    <span class="flex text-color space-x-2 hover:color-primary">
      <i class="material-icons-outlined">error_outline</i>
      <span>{{ (repo$ | async)?.open_issues_count }}</span>
    </span>
  </div>
</div>
```
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubRepoComponent } from './github-repo.component';
import { ShortcodeModule } from '@notiz/shortcodes';



@NgModule({
  declarations: [GithubRepoComponent],
  imports: [
    CommonModule,
    ShortcodeModule.forChild([{ shortcode: '', component: GithubRepoComponent }]),

  ]
})
export class GithubRepoModule { }

```
```typescript
import { ShortcodeModule } from '@notiz/shortcodes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...
      {
        shortcode: 'repo',
        loadChildren: () =>
          import('./shortcodes/github-repo/github-repo.module').then((m) => m.GithubRepoModule),
      },
    ]),
   
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

```
</div>


## GitHub Repo

<div shortcode="repo" repo="notiz-dev/notiz"></div>

## Notes 

<div shortcode="note" title="Info Note">  
Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.

* A
* B
* C
</div>

<div shortcode="note" type="success" title="Success Note">  Lorem ipsum dolor **sit amet** consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.
</div>

<div shortcode="note" type="warn" title="Warn Note">  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique *veniam*.
</div>