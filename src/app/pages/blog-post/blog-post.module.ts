import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BlogPostComponent } from './blog-post.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '@pipes/pipes.module';
import { ComponentsModule } from '@components/components.module';

@NgModule({
  declarations: [BlogPostComponent],
  imports: [
    CommonModule,
    ScullyLibModule,
    IonicModule,
    ComponentsModule,
    PipesModule
  ]
})
export class BlogPostModule {}
