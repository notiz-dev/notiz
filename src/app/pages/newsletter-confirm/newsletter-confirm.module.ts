import { SeoModule } from '@components/seo/seo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterConfirmComponent } from './newsletter-confirm.component';
import { NewsletterConfirmRoutingModule } from './newsletter-confirm-routing.module';
import { ComponentsModule } from '@components/components.module';
import { NizInlineSvgModule } from '@components/inline-svg/inline-svg.module';

@NgModule({
  declarations: [NewsletterConfirmComponent],
  imports: [
    CommonModule,
    NewsletterConfirmRoutingModule,
    ComponentsModule,
    NizInlineSvgModule,
    SeoModule,
  ],
  exports: [NewsletterConfirmComponent],
  providers: [],
})
export class NewsletterConfirmModule {}
