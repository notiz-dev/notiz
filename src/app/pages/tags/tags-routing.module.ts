import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagsComponent } from './tags.component';
import { TagComponent } from '@pages/tag/tag.component';
import { IsAvailable } from 'src/app/guards/available.guard';

const routes: Routes = [
  { path: '', component: TagsComponent, data: { breadcrumb: '' } },
  {
    path: ':slug',
    component: TagComponent,
    canActivate: [IsAvailable],
    data: { breadcrumb: (data) => data },
  },
  {
    path: '**',
    component: TagComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsRoutingModule {}
