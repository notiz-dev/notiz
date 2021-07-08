import { SeoModule } from '@components/seo/seo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsComponent } from './authors.component';
import { AuthorsRoutingModule } from './authors-routing.module';
import { ComponentsModule } from '@components/components.module';
import { AuthorModule } from '@pages/author/author.module';
import { NewsletterSignupModule } from '@components/newsletter-signup/newsletter-signup.module';
import { AuthorCardModule } from '@components/author/author.module';
import { BreadcrumbModule } from '@components/breadcrumb/breadcrumb.module';

@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    AuthorModule,
    ComponentsModule,
    NewsletterSignupModule,
    AuthorCardModule,
    SeoModule,
    BreadcrumbModule
  ],
})
export class AuthorsModule {}
