import { Injectable } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { filter, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScullyContentService {
  constructor(private scully: ScullyRoutesService) {}

  blogPosts(): Observable<ScullyRoute[]> {
    return filterRoute(this.scully.available$, '/blog/').pipe(
      map(posts =>
        posts.sort((p1, p2) =>
          new Date(p1.publishedAt) > new Date(p2.publishedAt) ? -1 : 1
        )
      )
    );
  }

  latestBlogPost(): Observable<ScullyRoute> {
    return this.blogPosts().pipe(map(posts => posts[0]));
  }

  lastUpdateBlogPosts() {
    return this.blogPosts().pipe(
      map(posts =>
        posts.sort((p1, p2) =>
          new Date(p1.updatedAt) > new Date(p2.updatedAt) ? -1 : 1
        )
      )
    );
  }

  authors(): Observable<ScullyRoute[]> {
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
