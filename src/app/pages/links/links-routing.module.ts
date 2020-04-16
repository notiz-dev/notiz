import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkComponent } from '@pages/link/link.component';
import { IsAvailable } from 'src/app/guards/available.guard';

const routes: Routes = [
  {
    path: ':slug',
    component: LinkComponent,
    canActivate: [IsAvailable]
  },
  { path: '', redirectTo: '/blog' },
  {
    path: '**',
    redirectTo: '/blog'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinksRoutingModule {}