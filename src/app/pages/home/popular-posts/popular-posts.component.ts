import { Component, HostBinding, OnInit } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { ScullyContentService } from '@services/scully-content.service';
import { map, Observable, shareReplay, withLatestFrom } from 'rxjs';
import { AnalyticsService } from 'src/api/services';

@Component({
  selector: 'niz-popular-posts',
  template: `
    <h2>Trending Posts</h2>
    <a  [routerLink]="[post.route]"
      *ngFor="let post of posts$ | async | slice : 0 : 6"
      class="flex text-color group cursor-pointer items-center space-x-6"
    >
      <niz-inline-svg
        class="icon h-4 flex-shrink-0 w-4 text-primary"
        svgSource="assets/img/arrow-right.svg"
      ></niz-inline-svg>
      <span class="group-hover:text-primary">{{ post.title }}</span>
    </a>
  `,
  styles: [],
})
export class PopularPostsComponent implements OnInit {
  posts$: Observable<
    ScullyRoute[]
  > = this.analytics.analyticsControllerTopPages({ period: '30d' }).pipe(
    shareReplay(),
    withLatestFrom(this.content.blogPosts()),
    map(([analytics, posts]) =>
      analytics.map((a) => posts.find((p) => p.route + '/' === a.page))
    ),
    map(res => res.filter(r => !!r))
  );
  @HostBinding() class = 'flex flex-col space-y-4';

  constructor(
    private content: ScullyContentService,
    private analytics: AnalyticsService
  ) {}

  ngOnInit(): void {}
}
