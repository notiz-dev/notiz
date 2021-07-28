import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NizFooter } from './footer.component';
import { RouterModule } from '@angular/router';
import { NizInlineSvgModule } from '@components/inline-svg/inline-svg.module';

@NgModule({
  declarations: [NizFooter],
  imports: [CommonModule, RouterModule, NizInlineSvgModule],
  exports: [NizFooter],
})
export class NizFooterModule {}
