import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewChecked,
} from '@angular/core';
import { HighlightService } from '@services/highlight.service';
import { SeoService } from '@services/seo.service';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { first, tap, map, switchMap } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';
import { ScullyContentService } from 'src/app/services/scully-content.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogPostComponent implements OnInit, AfterViewChecked {
  post$: Observable<ScullyRoute>;
  related$: Observable<ScullyRoute[]>;
  authors$: Observable<ScullyRoute[]>;

  allowHighlight = true;

  constructor(
    private highlightService: HighlightService,
    private seo: SeoService,
    private content: ScullyContentService
  ) {}

  ngOnInit() {
    this.allowHighlight = true;
    console.warn('blog', this.allowHighlight);

    fromEvent(window, 'AngularReady')
      .pipe(
        tap(() => console.warn('Angular ready')),
        tap(() => (this.allowHighlight = false))
      )
      .subscribe();

    this.post$ = this.content.getCurrent();
    this.post$
      .pipe(
        first(),
        tap((post) => console.warn('post change', post)),
        switchMap((post) =>
          this.content.authors().pipe(
            tap((authors) =>
              this.seo.generateTags({
                title: post.title,
                description: post.description,
                route: post.route,
                keywords: post.tags,
                twitter_image: `https://notiz.dev/assets/banners${post.route}/twitter.png`,
                og_image: `https://notiz.dev/assets/banners${post.route}/og.png`,
                article: {
                  published_time: post.publishedAt,
                  modified_time: post.updatedAt,
                  tag: post.tags,
                  author: [
                    ...authors
                      .filter((a) => post.authors.some((a2) => a2 === a.title))
                      .map((a) => `https://notiz.dev${a.route}`),
                  ],
                },
              })
            )
          )
        )
      )
      .subscribe();

    this.related$ = this.content
      .posts()
      .pipe(
        switchMap((posts) =>
          this.post$.pipe(
            map((post) =>
              posts
                .filter((p) => p.route !== post.route)
                .filter((p) =>
                  p.tags.some((t) => post.tags.some((t2) => t2 === t))
                )
            )
          )
        )
      );

    this.authors$ = this.content
      .authors()
      .pipe(
        switchMap((authors) =>
          this.post$.pipe(
            map((post) =>
              authors.filter((author) =>
                post.authors.some((a) => a === author.title)
              )
            )
          )
        )
      );
  }

  ngAfterViewChecked() {
    if (this.allowHighlight) {
      console.warn('highlighing');
      this.highlightService.highlightAll();
    }
  }
}
