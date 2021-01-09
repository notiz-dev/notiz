import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardStackComponent } from './card-stack/card-stack.component';
import { PipesModule } from '@pipes/pipes.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardStackComponent],
  imports: [CommonModule, PipesModule, RouterModule],
  exports: [CardStackComponent],
  providers: [],
})
export class ComponentsModule {}
