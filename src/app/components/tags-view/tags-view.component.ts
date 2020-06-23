import { Component, OnInit, Input } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ScullyContentService } from '@services/scully-content.service';
import { TagWeight } from '../../types/types';

@Component({
  selector: 'app-tags-view',
  templateUrl: './tags-view.component.html',
  styleUrls: ['./tags-view.component.scss'],
})
export class TagsViewComponent implements OnInit {
  @Input() blogPosts: Observable<ScullyRoute[]>;
  @Input() tags: Observable<ScullyRoute[]>;
  @Input() limit;
  count: number;

  weightedTags$: Observable<TagWeight[]>;

  constructor(private scullyContent: ScullyContentService) {}

  ngOnInit(): void {
    this.weightedTags$ = this.scullyContent
      .weightedTags(this.blogPosts, this.tags)
      .pipe(
        map((tags) => tags.sort((t1, t2) => (t1.weight < t2.weight ? 1 : -1))),
        tap((tags) => (this.count = tags.length)),
        map((tags) => tags.slice(0, this.limit || this.count)),
        map((tags) =>
          tags.sort((t1, t2) => (t1.tag.title > t2.tag.title ? 1 : -1))
        )
      );
  }

  getSize(weight: number): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
    if (weight < 4) {
      return 'xs';
    } else if (weight < 8) {
      return 'sm';
    } else if (weight < 13) {
      return 'md';
    } else if (weight < 21) {
      return 'lg';
    } else {
      return 'xl';
    }
  }
}
