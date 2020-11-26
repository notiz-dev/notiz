import { ScullyContentService } from '@services/scully-content.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable, Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'niz-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.css'],
})
export class SeriesDetailsComponent implements OnInit, OnDestroy {
  page$: Observable<ScullyRoute> = this.scullyContent.getCurrent();

  seriesPosts$: Observable<ScullyRoute[]>;

  private destroy$ = new Subject();

  constructor(private scullyContent: ScullyContentService) {}

  ngOnInit(): void {
    this.seriesPosts$ = this.page$.pipe(
      switchMap((page) => this.scullyContent.seriesPosts(page))
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
