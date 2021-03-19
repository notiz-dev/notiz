import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedComponent } from './featured.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '@pipes/pipes.module';
import {
  NizInlineSvgModule,
  NizChipModule,
  NizPrimaryButtonModule,
} from '@notiz/ngx-design';

@NgModule({
  declarations: [FeaturedComponent],
  exports: [FeaturedComponent],
  imports: [
    CommonModule,
    RouterModule,
    NizChipModule,
    PipesModule,
    NizInlineSvgModule,
    NizPrimaryButtonModule,
  ],
})
export class FeaturedModule {}
