import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NizBannerSeries } from './banner-series.component';

@NgModule({
  declarations: [NizBannerSeries],
  exports: [NizBannerSeries],
  imports: [CommonModule],
})
export class NizBannerSeriesModule {}
