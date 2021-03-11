import { Component, OnInit, Input } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { ScullyContentService } from '@services/scully-content.service';
import { ContentType } from 'src/app/types/types';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() route: ScullyRoute;
  type: ContentType;


  constructor(public content: ScullyContentService){}
  ngOnInit(): void {
    const type = this.route.route.split('/')[1];
    switch (type) {
      case 'blog':
        this.type = ContentType.ARTICLE;
        break;
      case 'links':
        this.type = ContentType.LINK;
        break;
    }
  }
}