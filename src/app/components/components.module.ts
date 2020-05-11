import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CardStackComponent,
    TagsViewComponent,
    ArticleComponent,
    AuthorComponent,
    ShareComponent,
    GithubUrlComponent,
    ComingSoonComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    IonicModule,
    MarkdownModule.forChild(),
    RouterModule,
  ],
  exports: [
    CardStackComponent,
    TagsViewComponent,
    ArticleComponent,
    AuthorComponent,
    ShareComponent,
    GithubUrlComponent,
    ComingSoonComponent,
  ],
  providers: [],
})
export class ComponentsModule {}
