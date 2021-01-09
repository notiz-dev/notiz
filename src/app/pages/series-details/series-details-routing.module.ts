import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeriesDetailsComponent } from './series-details.component';

const routes: Routes = [{ path: '', component: SeriesDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeriesDetailsRoutingModule { }
