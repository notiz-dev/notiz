import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NizChipModule } from '@notiz/ngx-design';
import { ArticleComponent } from './article.component';
import { PipesModule } from '@pipes/pipes.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    NizChipModule,
    PipesModule,
    MarkdownModule.forChild(),
  ],
  exports: [ArticleComponent],
  providers: [],
})
export class ArticleModule {}