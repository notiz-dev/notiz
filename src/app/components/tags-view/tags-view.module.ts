import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsViewComponent } from './tags-view.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NizChipModule } from '@notiz/ngx-design';

@NgModule({
  declarations: [TagsViewComponent],
  imports: [CommonModule, RouterModule, IonicModule, NizChipModule],
  exports: [TagsViewComponent],
  providers: [],
})
export class TagsViewModule {}
