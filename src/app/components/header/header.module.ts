import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header.component';
import { ThemeSwitcherModule } from '@components/theme-switcher/theme-switcher.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, IonicModule, ThemeSwitcherModule],
  exports: [HeaderComponent],
  providers: []
})
export class HeaderModule {}
