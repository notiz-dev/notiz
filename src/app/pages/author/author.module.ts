import { SeoModule } from '@components/seo/seo.module';
import { ComingSoonModule } from '@components/coming-soon/coming-soon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';
import { ComponentsModule } from '@components/components.module';
import { AuthorRoutingModule } from './author-routing.module';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { NewsletterSignupModule } from '@components/newsletter-signup/newsletter-signup.module';
import { BreadcrumbModule } from '@components/breadcrumb/breadcrumb.module';
import { TagsViewModule } from '@components/tags-view/tags-view.module';
import { ArticleModule } from '@components/article/article.module';
import { FeaturedModule } from '@components/featured/featured.module';
import {  NizInlineSvgModule } from '../../components/inline-svg/inline-svg.module';

@NgModule({
  declarations: [AuthorComponent],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    ComponentsModule,
    ScullyLibModule,
    NewsletterSignupModule,
    BreadcrumbModule,
    TagsViewModule,
    ArticleModule,
    ComingSoonModule,
    FeaturedModule,
    SeoModule,
    NizInlineSvgModule,
  ],
})
export class AuthorModule {}
