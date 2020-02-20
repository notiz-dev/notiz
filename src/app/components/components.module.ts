import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [ThemeSwitcherComponent, HeaderComponent, FooterComponent],
    imports: [ CommonModule, IonicModule ],
    exports: [ThemeSwitcherComponent, HeaderComponent,FooterComponent],
    providers: [],
})
export class ComponentsModule {}