import { Component } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { ScullyContentService } from '@services/scully-content.service';

@Component({
  selector: 'page-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent {
  author$: Observable<ScullyRoute> = this.scullyContent.getCurrent();

  latestAuthorPosts$: Observable<
    ScullyRoute[]
  > = this.scullyContent.authorPosts(this.author$);
  updatedAuthorPosts$: Observable<
    ScullyRoute[]
  > = this.scullyContent.lastUpdateAuthorPosts(this.author$);
  authorTags$: Observable<ScullyRoute[]> = this.scullyContent.authorTags(
    this.author$
  );

  constructor(private scullyContent: ScullyContentService) {}
}
