import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorComponent } from './sponsor.component';
import { NizInlineSvgModule } from '@components/inline-svg/inline-svg.module';

@NgModule({
  declarations: [SponsorComponent],
  imports: [CommonModule, NizInlineSvgModule],
  exports: [SponsorComponent],
})
export class SponsorModule {}
