import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedComponent } from './featured.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '@pipes/pipes.module';
import { NizInlineSvgModule } from '../inline-svg/inline-svg.module';
import { AuthorSmallModule } from '@components/author-small/author-small.module';

@NgModule({
  declarations: [FeaturedComponent],
  exports: [FeaturedComponent],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    NizInlineSvgModule,
    AuthorSmallModule,
  ],
})
export class FeaturedModule {}
