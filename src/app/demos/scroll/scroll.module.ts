import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollComponent } from './scrolltop.component';
import { ScrollPercentComponent } from './scrollpercent.component';
import { ScrollContainerComponent } from './scrollcontainer.component';
import { ShortcodeModule } from '@garygrossgarten/shortcodes';
import { ScrollPipe } from './scroll.pipe';

@NgModule({
  declarations: [
    ScrollComponent,
    ScrollPipe,
    ScrollPercentComponent,
    ScrollContainerComponent,
  ],
  imports: [
    CommonModule,
    ShortcodeModule.forChild([
      { path: '', component: ScrollComponent },
      { path: 'percent', component: ScrollPercentComponent },
      { path: 'container', component: ScrollContainerComponent },
    ]),
  ],
})
export class ScrollModule {}
