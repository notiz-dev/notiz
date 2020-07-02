import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { HighlightService } from '@services/highlight.service';
import { SeoService } from '@services/seo.service';
import { ScullyContentService } from '@services/scully-content.service';
import { first, switchMap, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  post$: Observable<ScullyRoute>;
  related$: Observable<ScullyRoute[]>;
  constructor(
    private scully: ScullyRoutesService,
    private highlightService: HighlightService,
    private seo: SeoService,
    private content: ScullyContentService
  ) {}

  ngOnInit() {
    this.post$ = this.content.getCurrent();
    this.post$
      .pipe(
        first(),
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
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}
