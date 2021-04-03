import { SeoModule } from '@components/seo/seo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@components/components.module';
import { NewsletterUnsubscribeRoutingModule } from './newsletter-unsubscribe-routing.module';
import { NewsletterUnsubscribeComponent } from './newsletter-unsubscribe.component';
import { NewsletterSignupModule } from '@components/newsletter-signup/newsletter-signup.module';
import { NizInlineSvgModule } from '@components/inline-svg/inline-svg.module';
import { BreadcrumbModule } from '@components/breadcrumb/breadcrumb.module';

@NgModule({
  declarations: [NewsletterUnsubscribeComponent],
  imports: [
    CommonModule,
    NewsletterUnsubscribeRoutingModule,
    ComponentsModule,
    NewsletterSignupModule,
    NizInlineSvgModule,
    SeoModule,
    BreadcrumbModule
  ],
  exports: [NewsletterUnsubscribeComponent],
  providers: [],
})
export class NewsletterUnsubscribeModule {}
