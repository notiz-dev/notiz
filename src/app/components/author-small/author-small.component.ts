import { ScullyRoute } from '@scullyio/ng-lib';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'niz-author-small',
  templateUrl: './author-small.component.html',
  styleUrls: ['./author-small.component.scss']
})
export class AuthorSmallComponent implements OnInit {

  @Input() author: ScullyRoute;

  constructor() { }

  ngOnInit(): void {
  }

}
