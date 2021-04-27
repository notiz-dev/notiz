---
title: 'Track the State of a Media Query with RxJS'
description: 'Media Queries | Practical Examples in RxJS'
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

<div shortcode="code" tabs="usual.css">

```css
@media (max-width: 767px) {
  /* apply styles */
}
```

</div>

<div shortcode="code" tabs="media.ts">

```ts
import { fromEvent } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export function media(query: string) {
  return fromEvent(window.matchMedia(query), 'change').pipe(
    startWith(window.matchMedia(query)),
    map((list: MediaQueryList) => list.matches)
  );
}

// Usage
media('(max-width: 767px)').subscribe((matches) =>
  console.log(matches) // true or false
);
```

</div>

## Demos

### Breakpoints

In this demo we use the media observable to track the default Tailwind CSS screen breakpoints. Resize your browser window to see the breakpoints change.

<div shortcode="demos/breakpoints"></div>

<div shortcode="code" tabs="TS,HTML">

```ts
import { Component, HostBinding } from '@angular/core';
import { media } from './media';

@Component({
  selector: 'demo-breakpoints',
  templateUrl: 'breakpoints.component.ts',
})
export class BreakPointsComponent {
  @HostBinding('class') class = 'block relative space-y-4 py-4';

  sm$ = media(`(max-width: 767px)`);
  md$ = media(`(min-width: 768px) and (max-width: 1023px)`);
  lg$ = media(`(min-width: 1024px) and (max-width: 1279px)`);
  xl$ = media(`(min-width: 1280px) and (max-width: 1535px)`);
  xl2$ = media(`(min-width: 1536px)`);
}
```
```html
<div
  class="w-1/5 bg-red-400 py-2 px-4 rounded-full transition-opacity duration-100"
  [ngClass]="{ 'opacity-30': !(sm$ | async) }"
>
  sm
</div>
<div
  class="w-2/5 bg-yellow-400 py-2 px-4 rounded-full transition-opacity duration-100"
  [ngClass]="{ 'opacity-30': !(md$ | async) }"
>
  md
</div>
<div
  class="w-3/5 bg-green-400 py-2 px-4 rounded-full transition-opacity duration-100"
  [ngClass]="{ 'opacity-30': !(lg$ | async) }"
>
  lg
</div>
<div
  class="w-4/5 bg-indigo-400 py-2 px-4 rounded-full transition-opacity duration-100"
  [ngClass]="{ 'opacity-30': !(xl$ | async) }"
>
  xl
</div>
<div
  class="w-full bg-purple-400 py-2 px-4 rounded-full transition-opacity duration-100"
  [ngClass]="{ 'opacity-30': !(xl2$ | async) }"
>
  2xl
</div>
```

</div>


### Device / Browser preferences

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