import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogPostComponent } from '@pages/blog-post/blog-post.component';
import { BlogComponent } from './blog.component';
import { IsAvailable } from 'src/app/guards/available.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':slug',
    component: BlogPostComponent,
    canActivate: [IsAvailable],
    data: { breadcrumb: (route) => route.title },
  },
  {
    path: '**',
    component: BlogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
