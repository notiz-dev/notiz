import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NizInlineSvgModule } from '../inline-svg/inline-svg.module';
import { ArticleComponent } from './article.component';
import { PipesModule } from '@pipes/pipes.module';
import { MarkdownModule } from 'ngx-markdown';
import { AuthorSmallModule } from '@components/author-small/author-small.module';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    MarkdownModule.forChild(),
    NizInlineSvgModule,
    AuthorSmallModule
  ],
  exports: [ArticleComponent],
  providers: [],
})
export class ArticleModule {}
