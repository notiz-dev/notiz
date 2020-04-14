import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkComponent } from '@pages/link/link.component';
import { IsAvailable } from 'src/app/guards/available.guard';
import { LinksComponent } from './links.component';

const routes: Routes = [
  { path: '', component: LinksComponent },
  {
    path: ':slug',
    component: LinkComponent,
    canActivate: [IsAvailable]
  },
  {
    path: '**',
    component: LinksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinksRoutingModule {}