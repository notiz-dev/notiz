import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() title = 'image-template';
  @Input() updatedAt = new Date().toDateString();
  @Input() logo = 'https://notiz.dev/assets/img/logo-text.svg';
  @Input() set logos(logos: string) {
    this._logos = logos.split(',');
  }
  _logos = [];
  @Input() avatar =
    'https://avatars1.githubusercontent.com/u/8986373?s=460&v=4';
  @Input() author = 'Gary Großgarten';
  @Input() height = 630;
  @Input() width = 1200;

  @HostBinding('style.width')
  get _width() {
    return `${this.width - 2 * 64}px`;
  }

  @HostBinding('style.height')
  get _height() {
    return `${this.height - 2 * 48}px`;
  }
}
