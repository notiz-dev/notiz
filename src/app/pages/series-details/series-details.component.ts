import { ScullyContentService } from '@services/scully-content.service';
import { Component, OnInit } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';

@Component({
  selector: 'niz-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.css'],
})
export class SeriesDetailsComponent implements OnInit {
  page$: Observable<ScullyRoute> = this.scullyContent.getCurrent();

  constructor(private scullyContent: ScullyContentService) {}

  ngOnInit(): void {}
}
