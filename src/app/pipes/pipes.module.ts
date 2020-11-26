import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashPipe } from './dash.pipe';
import { SearchPipe } from './search.pipe';
import { StartsWithPipe } from './startswith.pipe';
import { MapPostAuthorsPipe } from './map-post-authors.pipe';
import { FilterChapterPipe } from './filter-chapter.pipe';

@NgModule({
  declarations: [
    DashPipe,
    SearchPipe,
    StartsWithPipe,
    MapPostAuthorsPipe,
    FilterChapterPipe,
  ],
  imports: [CommonModule],
  exports: [
    DashPipe,
    SearchPipe,
    StartsWithPipe,
    MapPostAuthorsPipe,
    FilterChapterPipe,
  ],
  providers: [SearchPipe],
})
export class PipesModule {}
