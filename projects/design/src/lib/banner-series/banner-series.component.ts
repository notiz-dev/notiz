import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'lib-banner-series',
  templateUrl: './banner-series.component.html',
  styleUrls: ['./banner-series.component.scss'],
})
export class NizBannerSeries {
  @Input() title = 'image-template';
  @Input() updatedAt = new Date().toDateString();
  @Input() logo = 'https://notiz.dev/assets/img/logo.svg';
  @Input() set logos(logos: string) {
    this._logos = logos.split(',');
  }
  _logos = [];
  @Input() height = 630;
  @Input() width = 1200;

  @HostBinding('style.width')
  get _width() {
    return `${this.width}px`;
  }

  @HostBinding('style.height')
  get _height() {
    return `${this.height}px`;
  }
}
