import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollComponent } from './scrolltop.component';
import { ScrollContainerComponent } from './scrollcontainer.component';
import { ShortcodeModule } from '@garygrossgarten/shortcodes';
import { ScrollPipe } from './scroll.pipe';
import { ScrollDirectionPipe } from './scrolldirection.pipe';
import { NizInlineSvgModule } from '@notiz/ngx-design';

@NgModule({
  declarations: [
    ScrollComponent,
    ScrollPipe,
    ScrollContainerComponent,
    ScrollDirectionPipe
  ],
  imports: [
    CommonModule,
    NizInlineSvgModule,
    ShortcodeModule.forChild([
      { path: '', component: ScrollComponent },
      { path: 'container', component: ScrollContainerComponent },
    ]),
  ],
})
export class ScrollModule {}
