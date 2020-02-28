import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewChecked
} from '@angular/core';
import { HighlightService } from '@services/highlight.service';
import { SeoService } from '@services/seo.service';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { first, tap, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ScullyContentService } from 'src/app/services/scully-content.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated
})
export class BlogPostComponent implements OnInit, AfterViewChecked {
  post$: Observable<ScullyRoute>;
  related$: Observable<ScullyRoute[]>;
  authors$: Observable<ScullyRoute[]>;

  constructor(
    private scully: ScullyRoutesService,
    private highlightService: HighlightService,
    private seo: SeoService,
    private content: ScullyContentService
  ) {}

  ngOnInit() {
    this.post$ = this.scully.getCurrent();
    this.post$
      .pipe(
        first(),
        switchMap(post =>
          this.content.authors().pipe(
            tap(authors =>
              this.seo.generateTags({
                title: post.title,
                description: post.description,
                route: post.route,
                keywords: post.tags,
                article: {
                  published_time: post.publishedAt,
                  modified_time: post.updatedAt,
                  tag: post.tags,
                  author: [
                    ...authors
                      .filter(a => post.authors.some(a2 => a2 === a.title))
                      .map(a => `https://notiz.dev${a.route}`)
                  ]
                }
              })
            )
          )
        )
      )
      .subscribe();

    this.related$ = this.content
      .blogPosts()
      .pipe(
        switchMap(posts =>
          this.post$.pipe(
            map(post =>
              posts
              .filter(p => p.route !== post.route)
              .filter(p =>
                p.tags.some(t => post.tags.some(t2 => t2 === t))
              )
            )
          )
        )
      );

    this.authors$ = this.content
      .authors()
      .pipe(
        switchMap(authors =>
          this.post$.pipe(
            map(post =>
              authors.filter(author =>
                post.authors.some(a => a === author.title)
              )
            )
          )
        )
      );
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}
