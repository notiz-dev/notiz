import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortcodeModule } from '@notiz/shortcodes';
import { MarkdownModule } from 'ngx-markdown';
import { FigureComponent } from './figure.component';

@NgModule({
  declarations: [FigureComponent],
  imports: [
    CommonModule,
    ShortcodeModule.forChild([{ shortcode: '', component: FigureComponent }]),
    MarkdownModule,
  ],
})
export class FigureModule {}
