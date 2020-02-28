import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BlogPostComponent } from './blog-post.component';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '@components/components.module';
import { NewsletterSignupModule } from 'src/app/components/newsletter-signup/newsletter-signup.module';
import { BlogHeadlineModule } from '@components/blog-headline/blog-headline.module';

@NgModule({
  declarations: [BlogPostComponent],
  imports: [
    CommonModule,
    ScullyLibModule,
    IonicModule,
    ComponentsModule,
    NewsletterSignupModule,
    BlogHeadlineModule
  ]
})
export class BlogPostModule {}
