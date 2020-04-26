import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ThemeSwitcherComponent],
  imports: [CommonModule, IonicModule],
  exports: [ThemeSwitcherComponent],
  providers: []
})
export class ThemeSwitcherModule {}
