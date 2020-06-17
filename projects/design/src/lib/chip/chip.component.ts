import { Component, Input, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'niz-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class NizChip implements OnInit {
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() url: string;

  private _hostStyles =
    'inline-block bg-background text-current m-1 px-4 py-1 rounded-full shadow-md border-2 border-background';

  private _hoverStyles = 'hover:border-2 hover:border-blue';

  private xsStyles = 'text-xs';
  private smStyles = 'text-sm';
  private mdStyles = 'text-base';
  private lgStyles = 'text-lg';
  private xlStyles = 'text-xl';

  constructor() {}

  ngOnInit(): void {}

  get styles() {
    return `${this._hostStyles} ${this.sizeStyles} ${
      this.url ? this._hoverStyles : ''
    }`;
  }

  private get sizeStyles(): string {
    switch (this.size) {
      case 'xs':
        return this.xsStyles;
      case 'sm':
        return this.smStyles;
      case 'md':
        return this.mdStyles;
      case 'lg':
        return this.lgStyles;
      case 'xl':
        return this.xlStyles;
      default:
        return this.mdStyles;
    }
  }
}
