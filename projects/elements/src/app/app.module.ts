import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { NizBannerModule } from './banner/banner.module';
import { NizBanner } from './banner/banner.component';

@NgModule({
  imports: [BrowserModule, NizBannerModule],
  providers: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const elements: any[] = [[NizBanner, 'nizs-banner']];

    for (const [component, name] of elements) {
      if (!customElements.get(name)) {
        const el = createCustomElement(component, { injector: this.injector });
        customElements.define(name, el);
      }
    }
  }
}
