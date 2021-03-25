import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note.component';
import { ShortcodeModule } from '@notiz/shortcodes';

@NgModule({
  declarations: [NoteComponent],
  imports: [
    CommonModule,
    ShortcodeModule.forChild([{ path: '', component: NoteComponent }]),
  ],
})
export class NoteModule {}
