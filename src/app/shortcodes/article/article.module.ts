import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleShortcodeComponent } from './article.component';
import { ArticleModule } from '@components/article/article.module';
import { ShortcodeModule } from '@notiz/shortcodes';

@NgModule({
  declarations: [ArticleShortcodeComponent],
  exports: [ArticleShortcodeComponent],
  imports: [
    CommonModule,
    ArticleModule,
    ShortcodeModule.forChild([
      { shortcode: '', component: ArticleShortcodeComponent },
    ]),
  ],
})
export class ArticleShortcodeModule {}
