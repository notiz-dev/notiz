import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'niz-hire-us',
  template: `
    <div class="px-4 py-5 sm:p-6">
      <app-annotate>
        <span class="text-xl leading-6 font-semibold text-color">Hire us!</span>
      </app-annotate>
      <div class="mt-2 max-w-xl text-base text-color-shade">
        <p>
          We create intuitive mobile and web apps and successful websites. Come work with us!
        </p>
      </div>
      <div class="mt-5">
        <button type="button" class="btn btn-primary">Learn more</button>
      </div>
    </div>
  `,
})
export class HireUsComponent implements OnInit {
  @HostBinding() class = 'block relative rounded-md';
  constructor() {}

  ngOnInit(): void {}
}
