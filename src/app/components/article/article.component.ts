import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { ScullyContentService } from '@services/scully-content.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() route: ScullyRoute;
  author$ = this.content.authors().pipe(
    map((authors) =>
      authors.filter((author) =>
        this.route.authors.some((a) => a === author.title)
      )
    ),
    map((authors) => authors[0])
  );
  ngOnInit(): void {}

  constructor(private content: ScullyContentService) {}
}
