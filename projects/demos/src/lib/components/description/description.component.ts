import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'demo-description',
  template: ` <ng-content></ng-content> `,
  styles: [],
})
export class DescriptionComponent {
  @HostBinding('class') class =
    'flex items-center justify-center text-color-shade';
}
