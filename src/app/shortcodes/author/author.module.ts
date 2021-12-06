import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';
import { ShortcodeModule } from '@notiz/shortcodes';
import { AuthorCardModule } from '@components/author/author.module';

@NgModule({
  declarations: [AuthorComponent],
  imports: [
    CommonModule,
    ShortcodeModule.forChild([{ shortcode: '', component: AuthorComponent }]),
    AuthorCardModule,
  ],
})
export class AuthorModule {}
