import { ComingSoonModule } from '@components/coming-soon/coming-soon.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '@components/components.module';
import { NewsletterSignupModule } from '@components/newsletter-signup/newsletter-signup.module';
import { BreadcrumbModule } from '@components/breadcrumb/breadcrumb.module';
import { LinkComponent } from './link.component';

import { NizPrimaryButtonModule, NizInlineSvgModule } from '@notiz/ngx-design';

import { ArticleModule } from '@components/article/article.module';
import { CommentsModule } from '@components/comments/comments.module';

@NgModule({
  declarations: [LinkComponent],
  imports: [
    CommonModule,
    ScullyLibModule,
    IonicModule,
    ComponentsModule,
    NewsletterSignupModule,
    BreadcrumbModule,
    NizPrimaryButtonModule,
    ArticleModule,
    CommentsModule,
    ComingSoonModule,
    NizInlineSvgModule,
  ],
})
export class LinkModule {}
