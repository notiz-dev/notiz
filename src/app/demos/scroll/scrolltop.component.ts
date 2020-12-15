import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { pageScroll$ } from './scroll';

@Component({
  selector: 'niz-scroll',
  template: `
  Page Scrolltop: {{scroll$ | async}}
  `,
})
export class ScrollComponent implements OnInit {
  scroll$ = pageScroll$().pipe(map((v) => v.toFixed()));
  constructor() {}

  ngOnInit(): void {}
}
