import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'niz-figure',
  template: `<figure>
    <ng-content></ng-content>
    <figcaption class="text-sm italic text-center">{{ caption }}</figcaption>
  </figure>`,
  styles: [],
})
export class FigureComponent implements OnInit {
  @HostBinding('class') class = "block relative";
  @Input() caption: string;
  constructor() {}

  ngOnInit(): void {}
}
