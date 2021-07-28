import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeComponent } from './code.component';
import { ShortcodeModule } from '@notiz/shortcodes';
import { MarkdownModule } from 'ngx-markdown';
import { SanitizePipe } from './sanitize.pipe';

@NgModule({
  declarations: [CodeComponent, SanitizePipe],
  imports: [
    CommonModule,
    ShortcodeModule.forChild([{ shortcode: '', component: CodeComponent }]),
  ],
})
export class CodeModule {}
