import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { SeoService } from '@services/seo.service';
import { first, tap } from 'rxjs/operators';
import { ScullyContentService } from '@services/scully-content.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  author$: Observable<ScullyRoute>;

  authorPosts$: Observable<ScullyRoute[]>;

  constructor(
    private scully: ScullyRoutesService,
    private scullyContent: ScullyContentService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.author$ = this.scully.getCurrent();
    this.author$
      .pipe(
        first(),
        tap(author =>
          this.seo.generateTags({ title: author.title, route: author.route })
        )
      )
      .subscribe();

    this.authorPosts$ = this.scullyContent.authorPosts(this.author$);
  }
}
