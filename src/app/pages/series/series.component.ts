import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { ScullyContentService } from '@services/scully-content.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'niz-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit {
  series$: Observable<ScullyRoute[]>;
  constructor(private scullyContent: ScullyContentService) {}

  ngOnInit(): void {
    this.series$ = this.scullyContent.series();
  }
}
