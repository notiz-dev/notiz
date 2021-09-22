import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubRepoComponent } from './github-repo.component';
import { ShortcodeModule } from '@notiz/shortcodes';

@NgModule({
  declarations: [GithubRepoComponent],
  imports: [
    CommonModule,
    ShortcodeModule.forChild([
      { shortcode: '', component: GithubRepoComponent },
    ]),
  ],
})
export class GithubRepoModule {}
