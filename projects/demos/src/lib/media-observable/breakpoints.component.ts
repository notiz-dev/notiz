import { Component, HostBinding } from '@angular/core';
import { media } from './media';

@Component({
  selector: 'demo-breakpoints',
  templateUrl: 'breakpoints.component.html',
})
export class BreakPointsComponent {
  @HostBinding('class') class = 'demo block relative space-y-4 py-4';
  sm$ = media(`(max-width: 767px)`);

  md$ = media(`(min-width: 768px) and (max-width: 1023px)`);

  lg$ = media(`(min-width: 1024px) and (max-width: 1279px)`);

  xl$ = media(`(min-width: 1280px) and (max-width: 1535px)`);

  xl2$ = media(`(min-width: 1536px)`);
}
