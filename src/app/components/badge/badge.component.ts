import { SearchItemType } from './../../types/types';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'niz-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  // TODO add styles for new, coming soon
  @Input() type: SearchItemType | 'new' | 'coming-soon' = 'blog';

  constructor() {}

  get typeStylesBg(): string {
    switch (this.type) {
      case 'tag':
        return 'bg-green-500 bg-opacity-10';
      case 'series':
        return 'bg-red-500 bg-opacity-10';
      case 'blog':
      case 'link':
      default:
        return 'bg-primary bg-opacity-10';
    }
  }

  get typeStylesText(): string {
    switch (this.type) {
      case 'tag':
        return 'text-green-500';
      case 'series':
        return 'text-red-500';
      case 'blog':
      case 'link':
      default:
        return 'text-primary';
    }
  }
}
