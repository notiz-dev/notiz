import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComingSoonComponent } from './coming-soon.component';
import { NizInlineSvgModule } from '@components/inline-svg/inline-svg.module';

@NgModule({
  declarations: [ComingSoonComponent],
  imports: [CommonModule, NizInlineSvgModule],
  exports: [ComingSoonComponent],
  providers: [],
})
export class ComingSoonModule {}
