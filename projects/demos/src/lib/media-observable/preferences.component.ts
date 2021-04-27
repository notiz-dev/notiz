import { Component, HostBinding, OnInit } from '@angular/core';
import { media } from './media';

@Component({
  selector: 'lib-preferences',
  template: `
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

    <demo-description>Some more media features.</demo-description>
  `,
  styles: [],
})
export class PreferencesComponent implements OnInit {
  @HostBinding('class') class = 'block relative space-y-4';
  prefersLight$ = media('(prefers-color-scheme: light)');
  prefersDark$ = media('(prefers-color-scheme: dark)');
  prefersReducedMotion$ = media('(prefers-reduced-motion:reduce)');
  prefersReducedTransparency$ = media('(prefers-reduced-transparency:reduce)');
  prefersReducedData$ = media('(prefers-reduced-data: reduce)');
  prefersContrast$ = media('(prefers-contrast:high)');
  portrait$ = media('(orientation: portrait)');
  landscape$ = media('(orientation: landscape)');

  constructor() {}

  ngOnInit(): void {}
}
