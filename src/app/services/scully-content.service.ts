import { Injectable } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TagWeight } from '../types/types';

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
    return filterRoute(this.scully.available$, '/tags/');
  }

  authorTags(author: Observable<ScullyRoute>): Observable<ScullyRoute[]> {
    const authorPosts$ = this.authorPosts(author);
    const tags$ = this.tags();
    return authorPosts$.pipe(
      switchMap(authorPosts =>
        tags$.pipe(
          map(tags => {
            return tags.filter(
              tag =>
                authorPosts.filter(post => post.tags.includes(tag.title))
                  .length > 0
            );
          })
        )
      )
    );
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

  weightedTags(
    blogPosts$: Observable<ScullyRoute[]>,
    tags$: Observable<ScullyRoute[]>
  ): Observable<TagWeight[]> {
    const used$: Observable<number> = blogPosts$.pipe(
      map(blogs =>
        blogs.map(blog => blog.tags.length).reduce((a, b) => a + b, 0)
      )
    );

    return blogPosts$.pipe(
      switchMap(blogs =>
        tags$.pipe(
          map(tags =>
            tags.map(tag => ({
              tag,
              count: blogs.filter(blog => blog.tags.some(t => t === tag.title))
                .length
            }))
          ),
          switchMap(counts =>
            used$.pipe(
              map(used =>
                counts.map(count => ({
                  tag: count.tag,
                  weight: (count.count / used) * 100
                }))
              )
            )
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
