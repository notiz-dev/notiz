import { ScullyContentService } from '@services/scully-content.service';
import { Component } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'niz-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.scss'],
})
export class SeriesDetailsComponent {
  page$: Observable<ScullyRoute> = this.scullyContent.getCurrent();

  seriesPosts$: Observable<ScullyRoute[]> = this.page$.pipe(
    switchMap((page) => this.scullyContent.seriesPosts(page))
  );

  constructor(private scullyContent: ScullyContentService) {}
}
