import { SimpleAnalyticsService } from '@services/simple-analytics.service';
import {
  Component,
  OnInit,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'niz-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  private _open = false;
  constructor(
    private el: ElementRef<HTMLElement>,
    private sa: SimpleAnalyticsService
  ) {}

  ngOnInit(): void {}

  @HostBinding('class.open') get isOpen() {
    return this._open;
  }

  open() {
    this._open = true;
  }
  @HostListener('click') close() {
    this._open = false;
  }

  toggle() {
    this.sa.event('mobile_menu_toggle');
    this._open = !this._open;
  }
}
