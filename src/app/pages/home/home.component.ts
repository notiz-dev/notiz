import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute } from '@scullyio/ng-lib';
import { ScullyContentService } from '@services/scully-content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  latestBlogPost$: Observable<ScullyRoute> = this.scullyContentService.latestPost();
  blogPosts$: Observable<ScullyRoute[]> = this.scullyContentService.posts();
  updateBlogPosts$: Observable<
    ScullyRoute[]
  > = this.scullyContentService.lastPosts();
  tags$: Observable<ScullyRoute[]> = this.scullyContentService.tags();

  constructor(private scullyContentService: ScullyContentService) {}
}
