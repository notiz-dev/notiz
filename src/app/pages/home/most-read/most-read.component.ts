import { Component, HostBinding, OnInit } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { ScullyContentService } from '@services/scully-content.service';
import { map, Observable, shareReplay } from 'rxjs';
import { mostRead } from 'src/app/data/most-read';

@Component({
  selector: 'niz-most-read',
  template: `
    <h2>Most Read</h2>
    <a
      [routerLink]="[post.route]"
      *ngFor="let post of posts$ | async | slice: 0:6"
      class="group flex cursor-pointer items-center space-x-6 text-color"
    >
      <niz-inline-svg
        class="icon h-4 w-4 flex-shrink-0 text-primary"
        svgSource="assets/img/arrow-right.svg"
      ></niz-inline-svg>
      <span class="group-hover:text-primary">{{ post.title }}</span>
    </a>
  `,
  styles: [],
})
export class MostReadComponent implements OnInit {
  posts$: Observable<ScullyRoute[]> = this.content.blogPosts().pipe(
    map((posts) =>
      mostRead.map((a) => posts.find((p) => p.route + '/' === a.page))
    ),
    map((res) => res.filter((r) => !!r)),
    shareReplay(1)
  );
  @HostBinding() class = 'flex flex-col space-y-4';

  constructor(private content: ScullyContentService) {}

  ngOnInit(): void {}
}
