import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToComponent } from './scroll-to.component';
import { ShortcodeModule } from '@notiz/shortcodes';

@NgModule({
  declarations: [ScrollToComponent],
  imports: [
    CommonModule,
    ShortcodeModule.forChild([{ shortcode: '', component: ScrollToComponent }]),
  ],
})
export class ScrollToModule {}
