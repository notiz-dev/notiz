import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashPipe } from './dash.pipe';
import { SearchPipe } from './search.pipe';
import { StartsWithPipe } from './startswith.pipe';
import { MapPostAuthorsPipe } from './map-post-authors.pipe';

@NgModule({
  declarations: [DashPipe, SearchPipe, StartsWithPipe, MapPostAuthorsPipe],
  imports: [CommonModule],
  exports: [DashPipe, SearchPipe, StartsWithPipe, MapPostAuthorsPipe],
  providers: [SearchPipe],
})
export class PipesModule {}
