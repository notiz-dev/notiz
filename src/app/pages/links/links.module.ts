import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksRoutingModule } from './links-routing.module';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { ComponentsModule } from '@components/components.module';
import { NewsletterSignupModule } from '@components/newsletter-signup/newsletter-signup.module';
import { LinkModule } from '@pages/link/link.module';

@NgModule({
  imports: [
    LinkModule,
    CommonModule,
    LinksRoutingModule,
    ScullyLibModule,
    ComponentsModule,
    NewsletterSignupModule,
  ],
  exports: [],
  providers: [],
})
export class LinksModule {}
