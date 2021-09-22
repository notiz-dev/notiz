import { SeoModule } from '@components/seo/seo.module';
import { ComingSoonModule } from '@components/coming-soon/coming-soon.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { ComponentsModule } from '@components/components.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BlogPostModule } from '@pages/blog-post/blog-post.module';
import { NewsletterSignupModule } from '@components/newsletter-signup/newsletter-signup.module';
import { TagsViewModule } from '@components/tags-view/tags-view.module';
import { ArticleModule } from '@components/article/article.module';
import { FeaturedModule } from '@components/featured/featured.module';
import { IntersectionModule } from 'src/app/directives/intersection.module';
import { HireUsComponent } from './hire-us/hire-us.component';
import { AnnotateModule } from 'src/app/shortcodes/annotate/annotate.module';
import { PopularPostsComponent } from './popular-posts/popular-posts.component';
import { NizInlineSvgModule } from '@components/inline-svg/inline-svg.module';

@NgModule({
  declarations: [HomeComponent, HireUsComponent, PopularPostsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ScullyLibModule,
    ComponentsModule,
    BlogPostModule,
    NewsletterSignupModule,
    TagsViewModule,
    ArticleModule,
    ComingSoonModule,
    FeaturedModule,
    SeoModule,
    IntersectionModule,
    AnnotateModule,
    NizInlineSvgModule
  ],
})
export class HomeModule {}
