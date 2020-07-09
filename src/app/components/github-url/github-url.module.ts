import { NizInlineSvgModule } from '@notiz/ngx-design';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubUrlComponent } from './github-url.component';

@NgModule({
  declarations: [GithubUrlComponent],
  imports: [CommonModule, NizInlineSvgModule],
  exports: [GithubUrlComponent],
  providers: [],
})
export class GithubUrlModule {}
