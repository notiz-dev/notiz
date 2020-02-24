import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '@components/components.module';
import { AuthorRoutingModule } from './author-routing.module';
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [AuthorComponent],
  imports: [
    CommonModule,
    IonicModule,
    AuthorRoutingModule,
    ComponentsModule,
    ScullyLibModule
  ]
})
export class AuthorModule {}
