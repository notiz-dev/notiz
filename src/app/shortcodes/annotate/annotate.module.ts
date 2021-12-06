import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortcodeModule } from '@notiz/shortcodes';
import { AnnotateComponent } from './annotate.component';
import { IntersectionModule } from '@notiz/toolbelt';

@NgModule({
  declarations: [AnnotateComponent],
  exports: [AnnotateComponent],
  imports: [
    CommonModule,
    ShortcodeModule.forChild([{ shortcode: '', component: AnnotateComponent }]),
    IntersectionModule,
  ],
})
export class AnnotateModule {}
