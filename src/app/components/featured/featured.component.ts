import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScullyRoute } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';
import { ContentType } from 'src/app/types/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  type: ContentType;
  @Input() route: ScullyRoute;
  sneakpeak$: Observable<string>;

  constructor(private http: HttpClient) {}

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
    this.sneakpeak$ = this.http
      .get<string>(
        `https://raw.githubusercontent.com/notiz-dev/notiz/master/content/${type}/${this.route.sourceFile}`,
        { responseType: 'text' as 'json' }
      )
      .pipe(
        map((text) =>
          // strip of yaml part
          text.slice(nth_occurrence(text, '---', 2) + 3, text.length - 1)
        )
      );
  }
}

function nth_occurrence(text: string, searchString: string, nth: number) {
  const firstIndex = text.indexOf(searchString);
  const lengthUpToFirstIndex = firstIndex + 1;

  if (nth === 1) {
    return firstIndex;
  } else {
    const stringAfterFirstOccurrence = text.slice(lengthUpToFirstIndex);
    const nextOccurrence = nth_occurrence(
      stringAfterFirstOccurrence,
      searchString,
      nth - 1
    );

    if (nextOccurrence === -1) {
      return -1;
    } else {
      return lengthUpToFirstIndex + nextOccurrence;
    }
  }
}
