import { ComingSoonModule } from '@components/coming-soon/coming-soon.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BlogPostComponent } from './blog-post.component';
import { ComponentsModule } from '@components/components.module';
import { NewsletterSignupModule } from '@components/newsletter-signup/newsletter-signup.module';
import { BreadcrumbModule } from '@components/breadcrumb/breadcrumb.module';
import { ArticleModule } from '@components/article/article.module';
import {
  TableOfContentsModule,
  NizInlineSvgModule,
  NizChipModule,
} from '@notiz/ngx-design';
import { CommentsModule } from '@components/comments/comments.module';
import { AuthorCardModule } from '@components/author/author.module';
import { RouterModule } from '@angular/router';

import { PipesModule } from '@pipes/pipes.module';
import { SeoModule } from '@components/seo/seo.module';
import { AuthorSmallModule } from '@components/author-small/author-small.module';

@NgModule({
  declarations: [BlogPostComponent],
  imports: [
    CommonModule,
    ScullyLibModule,
    ComponentsModule,
    NewsletterSignupModule,
    BreadcrumbModule,
    ArticleModule,
    TableOfContentsModule,
    CommentsModule,
    ComingSoonModule,
    RouterModule,
    NizInlineSvgModule,
    NizChipModule,
    PipesModule,
    SeoModule,
    AuthorSmallModule,
  ],
})
export class BlogPostModule {}
