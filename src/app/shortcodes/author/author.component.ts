import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { ScullyContentService } from '@services/scully-content.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'niz-author-shortcode',
  template: `
    <app-author class="w-full md:max-w-xl flex"
      *ngIf="author$ | async as author"
      [author]="author"
    ></app-author>
  `,
  styles: [],
})
export class AuthorComponent implements OnInit {
  @HostBinding('class') class = "block relative";
  @Input() name: string;
  author$: Observable<ScullyRoute>;
  constructor(private content: ScullyContentService) {}

  ngOnInit(): void {
    this.author$ = this.content
      .authors()
      .pipe(map((a) => a.find((author) => author.title === this.name)));
  }
}
