import { Router, NavigationStart } from '@angular/router';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { HighlightService } from '@services/highlight.service';
import { ScullyRoute } from '@scullyio/ng-lib';
import { tap, map, switchMap, takeUntil, filter } from 'rxjs/operators';
import { Observable, fromEvent, Subject } from 'rxjs';
import { ScullyContentService } from 'src/app/services/scully-content.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogPostComponent implements OnInit, AfterViewChecked, OnDestroy {
  post$: Observable<ScullyRoute> = this.content.getCurrent();
  related$: Observable<ScullyRoute[]>;
  authors$: Observable<ScullyRoute[]>;

  allowHighlight = true;

  private destroy$ = new Subject();

  constructor(
    private highlightService: HighlightService,
    private content: ScullyContentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event) => event instanceof NavigationStart),
        tap(() => (this.allowHighlight = true))
      )
      .subscribe();

    fromEvent(window, 'AngularReady')
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.allowHighlight = false))
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
      this.highlightService.highlightAll();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
