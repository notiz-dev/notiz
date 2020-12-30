import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute } from '@scullyio/ng-lib';
import { ScullyContentService } from '@services/scully-content.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  blogPosts$: Observable<ScullyRoute[]> = this.scullyContentService.posts();
  tags$: Observable<ScullyRoute[]> = this.scullyContentService.tags();

  constructor(private scullyContentService: ScullyContentService) {}
}
