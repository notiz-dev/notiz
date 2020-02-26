import { Injectable } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { filter, map, tap, switchMap } from 'rxjs/operators';
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
    return filterRoute(this.scully.available$, '/authors/');
  }

  authorPosts(author: Observable<ScullyRoute>): Observable<ScullyRoute[]> {
    const blogPosts = this.blogPosts();
    return author.pipe(
      switchMap(a =>
        blogPosts.pipe(
          map(blogs =>
            blogs.filter(blog => blog.authors.some(t => t === a.title))
          )
        )
      )
    );
  }

  lastUpdateAuthorPosts(author: Observable<ScullyRoute>) {
    return this.authorPosts(author).pipe(
      map(posts =>
        posts.sort((p1, p2) =>
          new Date(p1.updatedAt) > new Date(p2.updatedAt) ? -1 : 1
        )
      )
    );
  }

  tags(): Observable<ScullyRoute[]> {
    return filterRoute(this.scully.available$, '/tags/').pipe(tap(console.log));
  }

  tagPosts(tag: Observable<ScullyRoute>): Observable<ScullyRoute[]> {
    const blogPosts = this.blogPosts();
    return tag.pipe(
      switchMap(page =>
        blogPosts.pipe(
          map(blogs =>
            blogs.filter(blog => blog.tags.some(t => t === page.title))
          )
        )
      )
    );
  }
}

export const filterRoute = (
  routes: Observable<ScullyRoute[]>,
  path: string
): Observable<ScullyRoute[]> => {
  return routes.pipe(map(r => r.filter(route => route.route.startsWith(path))));
};
