import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { ScullyContentService } from '@services/scully-content.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'niz-article-shortcode',
  template: `
    <app-article
      *ngFor="let item of routes$ | async"
      [route]="item"
    ></app-article>
  `,
  styles: [],
})
export class ArticleShortcodeComponent implements OnInit {
  @HostBinding('class') class = 'grid lg:grid-cols-2 gap-4';
  @Input() routes: string;
  routes$: Observable<ScullyRoute[]>;

  constructor(private scully: ScullyContentService) {}

  ngOnInit(): void {
    this.routes$ = this.scully
      .blogPosts()
      .pipe(
        map((posts) =>
          posts.filter((p) => this.routes.split(',').some((r) => r === p.route))
        )
      );
  }
}
