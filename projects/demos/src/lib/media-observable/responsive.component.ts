import { Component, HostBinding } from '@angular/core';
import { media } from './media';

@Component({
  selector: 'demo-responsive',
  template: `
    <div class="flex space-x-4">
      <div
        class="flex w-24 h-24 mx-auto justify-center items-center text-3xl text-red-400"
        *ngIf="sm$ | async"
      >
        sm
      </div>
      <div
        class="flex w-24 h-24 mx-auto justify-center items-center text-4xl text-yellow-400"
        *ngIf="md$ | async"
      >
        md
      </div>
      <div
        class="flex w-24 h-24 mx-auto justify-center items-center text-5xl text-green-400"
        *ngIf="lg$ | async"
      >
        lg
      </div>
      <div
        class="flex w-24 h-24 mx-auto justify-center items-center text-6xl text-indigo-400"
        *ngIf="xl$ | async"
      >
        xl
      </div>
      <div
        class="flex w-24 h-24 mx-auto justify-center items-center text-7xl text-purple-400"
        *ngIf="xl2$ | async"
      >
        2xl
      </div>

    </div>
    <demo-description
      >Responsive breakpoints tracked with media Observable.</demo-description
    >
  `,
  styles: [],
})
export class ResponsiveComponent {
  @HostBinding('class') class = 'demo block relative space-y-4 py-4';
  sm$ = media(`(max-width: 767px)`);
  md$ = media(`(min-width: 768px) and (max-width: 1023px)`);
  lg$ = media(`(min-width: 1024px) and (max-width: 1279px)`);
  xl$ = media(`(min-width: 1280px) and (max-width: 1535px)`);
  xl2$ = media(`(min-width: 1536px)`);
}
