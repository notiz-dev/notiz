import { Component, OnInit, Input } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() route: ScullyRoute;
  @Input() feature: string;
  @Input() featureIcon: string;
  @Input() peek = false;


  sneakPeek: Observable<string>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.peek) {
      this.sneakPeek = this.http
        .get<string>(
          `https://raw.githubusercontent.com/notiz-dev/notiz/master/content/blog/${this.route.sourceFile}`,
          { responseType: 'text' as 'json' }
        )
        .pipe(
          map(text =>
            // strip of yaml part
            text.slice(nth_occurrence(text, '---', 2), text.length - 1)
          )
        );
    }
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
