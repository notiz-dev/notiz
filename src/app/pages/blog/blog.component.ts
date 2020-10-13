import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute } from '@scullyio/ng-lib';
import { ScullyContentService } from '@services/scully-content.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blogPosts$: Observable<ScullyRoute[]>;
  tags$: Observable<ScullyRoute[]>;

  constructor(private scullyContentService: ScullyContentService) {}

  ngOnInit() {
    this.blogPosts$ = this.scullyContentService.posts();
    this.tags$ = this.scullyContentService.tags();
  }
}
