import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashPipe } from './dash.pipe';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [DashPipe, SearchPipe],
  imports: [CommonModule],
  exports: [DashPipe, SearchPipe],
  providers: [SearchPipe],
})
export class PipesModule {}
