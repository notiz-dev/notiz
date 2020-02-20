import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BlogComponent} from './blog.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {
    path: ':slug',
    component: BlogComponent,
  },
  {
    path: '**',
    component: BlogComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}

