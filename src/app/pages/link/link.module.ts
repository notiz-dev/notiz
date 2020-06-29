import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '@components/components.module';
import { NewsletterSignupModule } from 'src/app/components/newsletter-signup/newsletter-signup.module';
import { BreadcrumbModule } from '@components/breadcrumb/breadcrumb.module';
import { LinkComponent } from './link.component';

import { NizPrimaryButtonModule } from '@notiz/ngx-design';

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
    CommentsModule
  ],
})
export class LinkModule {}
