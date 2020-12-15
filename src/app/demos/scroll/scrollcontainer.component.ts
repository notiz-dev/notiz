import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'niz-scroll',
  template: ` <div class="flex flex-row space-x-2">
      <span class="text-2xl w-16">{{ (el | scroll | async)?.toFixed() }}%</span>
      <niz-inline-svg
        class="h-8 w-8 transform inline-flex transition-transform duration-200 ease-in-out text-color"
        [ngClass]="{ 'rotate-180': (el | scrolldir | async) === 'UP' }"
        svgSource="assets/img/arrow_downward-black-18dp.svg"
      ></niz-inline-svg>
    </div>
    <div
      #el
      [style.height.px]="420"
      class="border-blue-300 border-dashed border-4 rounded-lg w-full overflow-y-scroll"
    >
      <div
        style="height:400vh;"
        class="flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-blue-900"
      ></div>
    </div>`,
})
export class ScrollContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
