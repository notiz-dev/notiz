import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '@components/components.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule,
    IonicModule,
    ComponentsModule
  ]
})
export class PageNotFoundModule {}
