import { NizChipModule, NizInlineSvgModule } from '@notiz/ngx-design';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorSmallComponent } from './author-small.component';

@NgModule({
  declarations: [AuthorSmallComponent],
  imports: [CommonModule, RouterModule],
  exports: [AuthorSmallComponent],
  providers: [],
})
export class AuthorSmallModule {}
