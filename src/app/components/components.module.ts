import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardStackComponent } from './card-stack/card-stack.component';
import { AuthorComponent } from './author/author.component';
import { MarkdownModule } from 'ngx-markdown';
import { ShareComponent } from './share/share.component';
import { GithubUrlComponent } from './github-url/github-url.component';
import { PipesModule } from '@pipes/pipes.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CardStackComponent,
    AuthorComponent,
    ShareComponent,
    GithubUrlComponent,
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
    AuthorComponent,
    ShareComponent,
    GithubUrlComponent,
  ],
  providers: [],
})
export class ComponentsModule {}
