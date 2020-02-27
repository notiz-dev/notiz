import { Component, OnInit } from '@angular/core';
import { ScullyContentService } from '@services/scully-content.service';
import { Observable } from 'rxjs';
import { ScullyRoute } from '@scullyio/ng-lib';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  blogPosts$: Observable<ScullyRoute[]>;
  tags$: Observable<ScullyRoute[]>;

  constructor(private scullyContent: ScullyContentService) {}

  ngOnInit(): void {
    this.blogPosts$ = this.scullyContent.blogPosts();
    this.tags$ = this.scullyContent.tags();
  }
}
