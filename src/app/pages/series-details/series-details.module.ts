import { NizInlineSvgModule } from '@notiz/ngx-design';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesDetailsRoutingModule } from './series-details-routing.module';
import { SeriesDetailsComponent } from './series-details.component';
import { SeoModule } from '@components/seo/seo.module';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { PipesModule } from '@pipes/pipes.module';
import { BadgeModule } from '@components/badge/badge.module';

@NgModule({
  declarations: [SeriesDetailsComponent],
  imports: [
    CommonModule,
    SeriesDetailsRoutingModule,
    SeoModule,
    ScullyLibModule,
    PipesModule,
    NizInlineSvgModule,
    BadgeModule
  ],
})
export class SeriesDetailsModule {}
