import { Pipe, PipeTransform } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';

@Pipe({
  name: 'mapPostAuthors',
})
export class MapPostAuthorsPipe implements PipeTransform {
  transform(authors: ScullyRoute[]): string[] {
    if (!authors) {
      return [];
    }
    return authors.map((author) => `https://notiz.dev${author.route}`);
  }
}
