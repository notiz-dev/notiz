import { Pipe, PipeTransform } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Pipe({
  name: 'from'
})
export class FromPipe implements PipeTransform {
  transform(
    links$: Observable<ScullyRoute[]>,
    from: string
  ): Observable<ScullyRoute[]> {
    return links$.pipe(
      tap(console.log),
      map(links => links.filter(l => l.route.startsWith(from)))
    );
  }
}
