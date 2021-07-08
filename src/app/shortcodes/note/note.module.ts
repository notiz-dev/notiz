import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note.component';
import { ShortcodeModule } from '@notiz/shortcodes';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [NoteComponent],
  imports: [
    CommonModule,
    ShortcodeModule.forChild([{ shortcode: '', component: NoteComponent }]),
    MarkdownModule
  ],
})
export class NoteModule {}
