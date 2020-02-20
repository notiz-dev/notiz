import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TagsComponent} from './tags.component';
import { TagComponent } from './tag/tag.component';

const routes: Routes = [
  {path: '', component: TagsComponent},
  {
    path: ':slug',
    component: TagComponent,
  },
  {
    path: '**',
    component: TagComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsRoutingModule {}

