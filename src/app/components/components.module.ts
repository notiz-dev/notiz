import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';
import { CardStackComponent } from './card-stack/card-stack.component';

@NgModule({
    declarations: [ThemeSwitcherComponent, HeaderComponent, FooterComponent, CardStackComponent],
    imports: [ CommonModule, IonicModule ],
    exports: [ThemeSwitcherComponent, HeaderComponent,FooterComponent, CardStackComponent],
    providers: [],
})
export class ComponentsModule {}