import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FromPipe } from './from.pipe';

@NgModule({
  declarations: [FromPipe],
  imports: [CommonModule],
  exports: [FromPipe],
  providers: []
})
export class PipesModule {}
