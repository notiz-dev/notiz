import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'niz-sponsor',
  template: `
    <div class="relative">
      <div
        class="absolute -inset-1 rounded-lg bg-gradient-primary-inverse"
      ></div>
      <div class="relative rounded-lg bg-canvas p-4">
        <div class="flex flex-row items-baseline">
          <niz-inline-svg
            class="h-5 w-5 flex-shrink-0 text-primary"
            svgSource="assets/img/heart.svg"
          ></niz-inline-svg>

          <div class="ml-3">
            <h2>Sponsor us</h2>
            <p class="mt-2 text-lg font-medium">
              <strong class="font-semibold"
                >Did you find this post or any other useful?</strong
              >
              Your sponsoring would mean a lot to us 🙏. Sponsor using Patreon
              to receive a reward for your support.
            </p>
            <div
              class="mt-6 flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0"
            >
              <a
                class="flex rounded-md bg-canvas-shade py-1 px-2 text-color hover:text-color-light"
                href="https://github.com/sponsors/notiz-dev"
                target="_blank"
                rel="noopener"
              >
                <svg
                  class="mr-2 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  />
                </svg>
                Sponsor us
                <span class="sr-only">GitHub</span>
              </a>
              <a
                class="flex rounded-md bg-canvas-shade py-1 px-2 text-color hover:text-color-light"
                href="https://www.patreon.com/notiz_dev"
                target="_blank"
                rel="noopener"
              >
                <svg
                  class="mr-2 h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 180 180"
                >
                  <path
                    fill="#f96753"
                    d="M108.814 26.067c-26.469 0-48.003 21.53-48.003 47.998 0 26.386 21.534 47.854 48.003 47.854 26.386 0 47.853-21.468 47.853-47.854 0-26.467-21.467-47.998-47.853-47.998"
                  />
                  <path
                    fill="#052a49"
                    d="M23.333 153.933V26.067H46.8v127.866z"
                  />
                </svg>
                Sponsor us
                <span class="sr-only">Patreon</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SponsorComponent implements OnInit {
  @HostBinding('class') class = 'block';
  constructor() {}

  ngOnInit(): void {}
}
