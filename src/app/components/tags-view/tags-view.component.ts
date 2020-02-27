import { Component, OnInit, Input } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { map, switchMap, tap, reduce } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ScullyContentService } from '@services/scully-content.service';
import { TagWeight } from '../../types/types';

@Component({
  selector: 'app-tags-view',
  templateUrl: './tags-view.component.html',
  styleUrls: ['./tags-view.component.scss']
})
export class TagsViewComponent implements OnInit {
  @Input() blogPosts: Observable<ScullyRoute[]>;
  @Input() tags: Observable<ScullyRoute[]>;

  weightedTags$: Observable<TagWeight[]>;

  constructor(private scullyContent: ScullyContentService) {}

  ngOnInit(): void {
    this.weightedTags$ = this.scullyContent.weightedTags(
      this.blogPosts,
      this.tags
    );
  }
}
