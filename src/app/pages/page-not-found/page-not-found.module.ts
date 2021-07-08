import { SeoModule } from '@components/seo/seo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { ComponentsModule } from '@components/components.module';
import { NewsletterSignupModule } from '@components/newsletter-signup/newsletter-signup.module';
import { BreadcrumbModule } from '@components/breadcrumb/breadcrumb.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule,
    ComponentsModule,
    NewsletterSignupModule,
    SeoModule,
    BreadcrumbModule
  ],
})
export class PageNotFoundModule {}
