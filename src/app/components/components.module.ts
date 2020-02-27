import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';
import { CardStackComponent } from './card-stack/card-stack.component';
import { TagsViewComponent } from './tags-view/tags-view.component';
import { ArticleComponent } from './article/article.component';
import { AuthorComponent } from './author/author.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    ThemeSwitcherComponent,
    HeaderComponent,
    FooterComponent,
    CardStackComponent,
    TagsViewComponent,
    ArticleComponent,
    AuthorComponent
  ],
  imports: [CommonModule, IonicModule,MarkdownModule.forChild()],
  exports: [
    ThemeSwitcherComponent,
    HeaderComponent,
    FooterComponent,
    CardStackComponent,
    TagsViewComponent,
    ArticleComponent,
    AuthorComponent
  ],
  providers: []
})
export class ComponentsModule {}
