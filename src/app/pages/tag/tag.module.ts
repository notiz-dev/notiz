import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { IonicModule } from '@ionic/angular';

import { PipesModule } from '@pipes/pipes.module';
import { ComponentsModule } from '@components/components.module';
import { TagComponent } from './tag.component';

@NgModule({
  declarations: [TagComponent],
  imports: [
    CommonModule,
    ScullyLibModule,
    IonicModule,
    ComponentsModule,
    PipesModule
  ]
})
export class TagModule {}
