import { DOCUMENT } from '@angular/common';
import {
  Component,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'niz-scroll-to',
  template: `<ng-content></ng-content>`,
  styles: [],
})
export class ScrollToComponent implements OnInit {
  @HostBinding('class') class = 'inline-flex';
  @Input() fragment: string;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {}

  @HostListener('click')
  scrollTo() {
    console.log('click',this.fragment,this.document
    .getElementById(this.fragment));
    this.document
      .getElementById(this.fragment)
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
