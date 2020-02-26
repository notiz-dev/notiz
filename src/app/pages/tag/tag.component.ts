import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { ScullyContentService } from '@services/scully-content.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  page$: Observable<ScullyRoute> = this.scully.getCurrent();

  tagPosts$: Observable<ScullyRoute[]>;

  constructor(
    private scully: ScullyRoutesService,
    private scullyContent: ScullyContentService
  ) {}

  ngOnInit(): void {
    this.page$ = this.scully.getCurrent();
    this.tagPosts$ = this.scullyContent.tagPosts(this.page$);
  }
}
