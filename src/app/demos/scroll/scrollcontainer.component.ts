import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'niz-scroll',
  template: ` {{ (el | scroll | async)?.toFixed() }}%
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
