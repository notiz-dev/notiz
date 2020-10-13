import { Component, OnInit } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { ScullyContentService } from '@services/scully-content.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  page$: Observable<ScullyRoute> = this.scullyContent.getCurrent();

  tagPosts$: Observable<ScullyRoute[]>;

  constructor(private scullyContent: ScullyContentService) {}

  ngOnInit(): void {
    this.page$ = this.scullyContent.getCurrent();

    this.tagPosts$ = this.scullyContent.tagPosts(this.page$);
  }
}
