import { PipesModule } from '@pipes/pipes.module';
import { NizInlineSvgModule } from '@notiz/ngx-design';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesRoutingModule } from './series-routing.module';
import { SeriesComponent } from './series.component';
import { SeoModule } from '@components/seo/seo.module';

@NgModule({
  declarations: [SeriesComponent],
  imports: [
    CommonModule,
    SeriesRoutingModule,
    SeoModule,
    NizInlineSvgModule,
    PipesModule,
  ],
})
export class SeriesModule {}
