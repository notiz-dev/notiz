import { Component } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { ScullyContentService } from '@services/scully-content.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  page$: Observable<ScullyRoute> = this.scullyContent.getCurrent();

  tagPosts$: Observable<ScullyRoute[]> = this.scullyContent.tagPosts(
    this.page$
  );

  constructor(private scullyContent: ScullyContentService) {}
}
