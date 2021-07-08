import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsViewComponent } from './tags-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TagsViewComponent],
  imports: [CommonModule, RouterModule],
  exports: [TagsViewComponent],
  providers: [],
})
export class TagsViewModule {}
