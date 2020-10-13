import { Component, OnInit } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { ScullyContentService } from '@services/scully-content.service';

@Component({
  selector: 'page-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  author$: Observable<ScullyRoute>;

  latestAuthorPosts$: Observable<ScullyRoute[]>;
  updatedAuthorPosts$: Observable<ScullyRoute[]>;
  authorTags$: Observable<ScullyRoute[]>;

  constructor(private scullyContent: ScullyContentService) {}

  ngOnInit(): void {
    this.author$ = this.scullyContent.getCurrent();

    this.latestAuthorPosts$ = this.scullyContent.authorPosts(this.author$);
    this.updatedAuthorPosts$ = this.scullyContent.lastUpdateAuthorPosts(
      this.author$
    );

    this.authorTags$ = this.scullyContent.authorTags(this.author$);
  }
}
