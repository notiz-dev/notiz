import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'niz-hire-us',
  template: `
    <div class="px-4 py-5 sm:p-6">
      <app-annotate>
        <span class="text-xl font-semibold leading-6 text-color">Hire us!</span>
      </app-annotate>
      <div class="mt-2 max-w-xl text-base text-color-shade">
        <p>
          We create <span class="text-primary">interactive</span> and
          <span class="text-primary">intuitive Apps</span>,
          <span class="text-primary">fast Websites</span> and
          <span class="text-primary">scalable APIs</span>. Come work with us!
        </p>
      </div>
      <div class="mt-5">
        <a
          href="https://portfolio.notiz.dev"
          class="btn btn-primary hover:text-gray-900"
        >
          Find out more
        </a>
      </div>
    </div>
  `,
})
export class HireUsComponent {
  @HostBinding() class = 'block relative rounded-md';
  constructor() {}
}
