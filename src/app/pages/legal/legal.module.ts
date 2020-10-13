import { SeoModule } from '@components/seo/seo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalComponent } from './legal.component';
import { LegalRoutingModule } from './legal-routing.module';
import { ScullyContentModule } from '@scullyio/ng-lib';
import { ComponentsModule } from '@components/components.module';
import { NewsletterSignupModule } from '@components/newsletter-signup/newsletter-signup.module';

@NgModule({
  declarations: [LegalComponent],
  imports: [
    CommonModule,
    LegalRoutingModule,
    ScullyContentModule,
    ComponentsModule,
    NewsletterSignupModule,
    SeoModule,
  ],
})
export class LegalModule {}
