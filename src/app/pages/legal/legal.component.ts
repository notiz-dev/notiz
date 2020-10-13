import { Component, OnInit } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { ScullyContentService } from '@services/scully-content.service';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export class LegalComponent implements OnInit {
  page$: Observable<ScullyRoute>;

  constructor(public content: ScullyContentService) {}

  ngOnInit(): void {
    this.page$ = this.content.getCurrent();
  }
}
