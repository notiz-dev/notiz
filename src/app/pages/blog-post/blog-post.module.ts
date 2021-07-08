import { ComingSoonModule } from '@components/coming-soon/coming-soon.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BlogPostComponent } from './blog-post.component';
import { ComponentsModule } from '@components/components.module';
import { NewsletterSignupModule } from '@components/newsletter-signup/newsletter-signup.module';
import { BreadcrumbModule } from '@components/breadcrumb/breadcrumb.module';
import { ArticleModule } from '@components/article/article.module';
import { CommentsModule } from '@components/comments/comments.module';
import { RouterModule } from '@angular/router';

import { PipesModule } from '@pipes/pipes.module';
import { SeoModule } from '@components/seo/seo.module';
import { ShortcodeModule } from '@notiz/shortcodes';
import { AuthorSmallModule } from '@components/author-small/author-small.module';
import { NizInlineSvgModule } from '@components/inline-svg/inline-svg.module';
import { TableOfContentsModule } from '@components/table-of-contents/table-of-contents.module';

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
    PipesModule,
    SeoModule,
    ShortcodeModule,
    AuthorSmallModule,
  ],
})
export class BlogPostModule {}
