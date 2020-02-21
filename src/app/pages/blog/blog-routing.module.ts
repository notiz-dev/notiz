import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogPostComponent } from '@pages/blog-post/blog-post.component';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  {
    path: ':slug',
    component: BlogPostComponent
  },
  {
    path: '**',
    component: BlogPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {}
