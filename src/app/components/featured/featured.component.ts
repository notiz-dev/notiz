import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { ScullyContentService } from '@services/scully-content.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  @Input() route: ScullyRoute;

  author$: Observable<ScullyRoute>;

  constructor(private content: ScullyContentService) {}

  ngOnInit(): void {
    this.author$ = this.content.authors().pipe(
      map((authors) =>
        authors.filter((author) =>
          this.route.authors.some((a) => a === author.title)
        )
      ),
      map((authors) => authors[0])
    );
  }
}
