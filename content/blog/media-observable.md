---
title: 'Media queries with RxJS'
description: 'Media queries | Practical examples with RxJS'
published: true
publishedAt: 2021-04-27T08:55:00.000Z
updatedAt: 2021-04-27T18:40:00.000Z
tags:
    - RxJS
    - Angular
keywords:
    - RxJS
    - Media Query
    - Javascript
    - Typescript
authors:
    - 'Gary Großgarten'
github: 'https://github.com/garygrossgarten/shortcodes'
---

## TLDR

Observables are a great way of using media queries programmatically! 

<div shortcode="scroll-to" fragment="media-queries-with-rxjs">
<button class="btn btn-primary capitalize">Take me to the code!</a>
</div>

<div shortcode="demos/breakpoints"></div>

## Introduction
### Media queries in CSS

[Media queries](https://www.w3schools.com/css/css_rwd_mediaqueries.asp) are an essential tool when building responsive layouts on the web. They are commonly used to hide / show / alter parts of the UI depending on the viewport dimensions or to switch between themes based on user preferences (e.g. Darkmode 🌙).

In CSS media queries are used like so.

<div shortcode="code" tabs="styles.css">

```css
@media (max-width: 767px) {
  /* apply styles */
}
```

</div>

Although this is already pretty great, we sometimes want to **handle the state of a media query programmatically**. For example, preventing the render of some components or dom elements on certain viewport sizes instead of just hiding things with `display: none` could lead to a better performance and less network requests to your server.

### Media queries in Javascript

The vanilla javascript way of implementing such a functionality would be to use the window's `matchMedia` function. The function takes a string query and returns a `MediaQueryList` that can be used to get the current result of the query and listen to changes to the media query.

<div shortcode="code" tabs="JS">

```js
const mediaQueryList = window.matchMedia(`(min-width: 767px)`);

console.log(mediaQueryList.matches); // true or false

mediaQueryList.addEventListener('change', (event) =>
  console.log(event.matches) // true or false
);

// don't forget to remove the event listener ;)
```

</div>

## Media queries with RxJS

As an Angular developer, I make heavy use of [RxJS](https://rxjs.dev/) in my applications. To neatly integrate media queries in my workflow I came up with the media Observable. 

<div shortcode="code" tabs="media.ts">

```ts
import { fromEvent, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export function media(query: string): Observable<boolean> {
  const mediaQuery = window.matchMedia(query);
  return fromEvent(mediaQuery, 'change').pipe(
    startWith(mediaQuery),
    map((list: MediaQueryList) => list.matches)
  );
}

// Usage
media('(max-width: 767px)').subscribe((matches) =>
  console.log(matches) // true or false
);
```

</div>

We use RxJS `fromEvent` Observable creation function to listen for all changes to the `MediaQueryList`. To get the inital `MediaQueryList`, we use the `startWith` operator. The `MediaQueryList` is then mapped to the actual result of the query by using the `matches` function.

<div shortcode="note">

The `media` function returns a `Observable<boolean>` stream which can be used to subscribe to the current state and 
future changes of the media query.

</div>

## Demos

The demos were built in an Angular workspace. As you can see, I make use of Angular's `async` pipe to subscribe to the media Observables.

### Breakpoints demo

In this demo we use the media Observable to track the default Tailwind CSS screen breakpoints. Depending on the viewport dimensions certain elements are hidden using `*ngIf`. Resize your browser window to see the breakpoints change.

<div shortcode="demos/responsive"></div>

<div shortcode="code" tabs="TS,HTML">

```ts
import { Component, HostBinding } from '@angular/core';
import { media } from './media';

@Component({
  selector: 'demo-breakpoints',
  templateUrl: 'breakpoints.component.ts',
})
export class BreakPointsComponent {

  sm$ = media(`(max-width: 767px)`);
  md$ = media(`(min-width: 768px) and (max-width: 1023px)`);
  lg$ = media(`(min-width: 1024px) and (max-width: 1279px)`);
  xl$ = media(`(min-width: 1280px) and (max-width: 1535px)`);
  xl2$ = media(`(min-width: 1536px)`);

}
```
```html
<div *ngIf="sm$ | async">sm</div>
<div *ngIf="md$ | async">md</div>
<div *ngIf="lg$ | async">lg</div>
<div *ngIf="xl$ | async">xl</div>
<div *ngIf="xl2$ | async">2xl</div>
```

</div>


### Device / Browser preferences demo

This demo watches device / browser preferences and the viewport orientation.

<div shortcode="demos/preferences"></div>

<div shortcode="code" tabs="TS,HTML">

```ts
import { Component, HostBinding } from '@angular/core';
import { media } from './media';

@Component({
  selector: 'demo-preferences',
  templateUrl:'preferences.component.html',
})
export class PreferencesComponent {
  @HostBinding('class') class = 'block relative space-y-4';

  prefersLight$ = media('(prefers-color-scheme: light)');
  prefersDark$ = media('(prefers-color-scheme: dark)');
  prefersReducedMotion$ = media('(prefers-reduced-motion:reduce)');
  prefersReducedTransparency$ = media('(prefers-reduced-transparency:reduce)');
  prefersReducedData$ = media('(prefers-reduced-data: reduce)');
  prefersContrast$ = media('(prefers-contrast:high)');
  portrait$ = media('(orientation: portrait)');
  landscape$ = media('(orientation: landscape)');
}
```
```html
<div class="p-4 rounded-xl bg-canvas-shade grid md:grid-cols-2 gap-4">
  <div [ngClass]="{ 'opacity-30': !(prefersDark$ | async) }">
    prefers-color-scheme: dark
  </div>
  <div [ngClass]="{ 'opacity-30': !(prefersLight$ | async) }">
    prefers-color-scheme: light
  </div>
  <div [ngClass]="{ 'opacity-30': !(prefersReducedMotion$ | async) }">
    prefers-reduced-motion: reduce
  </div>
  <div [ngClass]="{ 'opacity-30': !(prefersReducedTransparency$ | async) }">
    prefers-reduced-transparency: reduce
  </div>
  <div [ngClass]="{ 'opacity-30': !(prefersReducedData$ | async) }">
    prefers-reduced-data: reduce
  </div>
  <div [ngClass]="{ 'opacity-30': !(prefersContrast$ | async) }">
    prefers-contract: high
  </div>
  <div [ngClass]="{ 'opacity-30': !(portrait$ | async) }">
    orientation: portrait
  </div>
  <div [ngClass]="{ 'opacity-30': !(landscape$ | async) }">
    orientation: landscape
  </div>
</div>
```

</div>

If you have further questions, feel free to contact me! 

<div shortcode="author" name="Gary Großgarten"></div>