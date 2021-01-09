import { IsAvailable } from './../../guards/available.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeriesComponent } from './series.component';

const routes: Routes = [
  { path: '', component: SeriesComponent },
  {
    path: ':slug',
    loadChildren: () =>
      import('../series-details/series-details.module').then(
        (m) => m.SeriesDetailsModule
      ),
    canActivate: [IsAvailable],
  },
  {
    path: '**',
    loadChildren: () =>
      import('../series-details/series-details.module').then(
        (m) => m.SeriesDetailsModule
      ),
    canActivate: [IsAvailable],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeriesRoutingModule {}
