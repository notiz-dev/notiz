import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { IonicModule } from '@ionic/angular';
import { ListComponent } from './list/list.component';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [BlogComponent, ListComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ScullyLibModule,
    IonicModule,
    ComponentsModule,
    PipesModule
  ]
})
export class BlogModule {}
