import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { CardStackComponent } from './card-stack/card-stack.component';
import { TagsViewComponent } from './tags-view/tags-view.component';
import { ArticleComponent } from './article/article.component';
import { AuthorComponent } from './author/author.component';
import { MarkdownModule } from 'ngx-markdown';
import { ShareComponent } from './share/share.component';
import { GithubUrlComponent } from './github-url/github-url.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [
    ThemeSwitcherComponent,
    HeaderComponent,
    CardStackComponent,
    TagsViewComponent,
    ArticleComponent,
    AuthorComponent,
    ShareComponent,
    GithubUrlComponent,
    ComingSoonComponent
  ],
  imports: [CommonModule, PipesModule, IonicModule, MarkdownModule.forChild()],
  exports: [
    ThemeSwitcherComponent,
    HeaderComponent,
    CardStackComponent,
    TagsViewComponent,
    ArticleComponent,
    AuthorComponent,
    ShareComponent,
    GithubUrlComponent,
    ComingSoonComponent
  ],
  providers: []
})
export class ComponentsModule {}
