import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesDetailsRoutingModule } from './series-details-routing.module';
import { SeriesDetailsComponent } from './series-details.component';
import { SeoModule } from '@components/seo/seo.module';
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [SeriesDetailsComponent],
  imports: [
    CommonModule,
    SeriesDetailsRoutingModule,
    SeoModule,
    ScullyLibModule,
  ],
})
export class SeriesDetailsModule {}
