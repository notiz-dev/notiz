import { Injectable } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { filter, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScullyContentService {
  constructor(private scully: ScullyRoutesService) {}

  blogPosts() {
    return filterRoute(this.scully.available$, '/blog/').pipe(tap(console.log));
  }

  authors() {
    return filterRoute(this.scully.available$, '/authors/').pipe(
      tap(console.log)
    );
  }
}

export const filterRoute = (
  routes: Observable<ScullyRoute[]>,
  path: string
): Observable<ScullyRoute[]> => {
  return routes.pipe(map(r => r.filter(route => route.route.startsWith(path))));
};
