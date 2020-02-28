import { Component, OnInit, Input } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';

@Component({
  selector: 'app-blog-headline',
  templateUrl: './blog-headline.component.html',
  styleUrls: ['./blog-headline.component.scss']
})
export class BlogHeadlineComponent implements OnInit {
  @Input() post: ScullyRoute;

  constructor() {}

  ngOnInit(): void {
    console.log(this.post);
  }
}
