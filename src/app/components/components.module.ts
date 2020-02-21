import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';
import { CardStackComponent } from './card-stack/card-stack.component';
import { TagsViewComponent } from './tags-view/tags-view.component';


@NgModule({
    declarations: [ThemeSwitcherComponent, HeaderComponent, FooterComponent, CardStackComponent, TagsViewComponent],
    imports: [ CommonModule, IonicModule ],
    exports: [ThemeSwitcherComponent, HeaderComponent,FooterComponent, CardStackComponent,TagsViewComponent],
    providers: [],
})
export class ComponentsModule {}