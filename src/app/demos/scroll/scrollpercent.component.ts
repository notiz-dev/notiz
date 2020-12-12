import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { scroll$ } from './scroll';

@Component({
  selector: 'niz-scroll',
  template: ` Page Scrolltop: {{ scroll$ | async }} % `,
})
export class ScrollPercentComponent implements OnInit {
  scroll$ = scroll$(document.documentElement).pipe(map((v) => v.toFixed()));
  constructor() {}

  ngOnInit(): void {}
}
