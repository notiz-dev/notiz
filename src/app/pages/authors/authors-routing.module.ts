import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorsComponent } from './authors.component';
import { AuthorComponent } from '@pages/author/author.component';
import { IsAvailable } from 'src/app/guards/available.guard';

const routes: Routes = [
  { path: '', component: AuthorsComponent, data: { breadcrumb: '' } },
  {
    path: ':slug',
    component: AuthorComponent,
    canActivate: [IsAvailable],
    data: { breadcrumb: (data) => data.title },
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule {}
