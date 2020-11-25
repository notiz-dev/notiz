import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NizChipModule, NizInlineSvgModule } from '@notiz/ngx-design';
import { ArticleComponent } from './article.component';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    RouterModule,
    NizChipModule,
    PipesModule,
    NizInlineSvgModule,
  ],
  exports: [ArticleComponent],
  providers: [],
})
export class ArticleModule {}
