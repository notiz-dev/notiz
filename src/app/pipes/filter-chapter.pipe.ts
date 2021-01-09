import { ScullyRoute } from '@scullyio/ng-lib';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterChapter',
})
export class FilterChapterPipe implements PipeTransform {
  transform(posts: ScullyRoute[], chapterSlug: string): ScullyRoute[] {
    return posts
      .filter((post) => post.series.find((s) => s.chapterSlug === chapterSlug))
      .sort((p1, p2) => {
        return (
          p1.series.find((s) => s.chapterSlug === chapterSlug).weight -
          p2.series.find((s) => s.chapterSlug === chapterSlug).weight
        );
      });
  }
}
