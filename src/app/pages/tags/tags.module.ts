import { SeoModule } from '@components/seo/seo.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';

import { ComponentsModule } from '@components/components.module';
import { TagModule } from '@pages/tag/tag.module';
import { NewsletterSignupModule } from 'src/app/components/newsletter-signup/newsletter-signup.module';
import { TagsViewModule } from '@components/tags-view/tags-view.module';
import { BreadcrumbModule } from '@components/breadcrumb/breadcrumb.module';

@NgModule({
  declarations: [TagsComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    ScullyLibModule,
    ComponentsModule,
    TagModule,
    NewsletterSignupModule,
    TagsViewModule,
    SeoModule,
    BreadcrumbModule,
  ],
})
export class TagsModule {}
