/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PageRequest } from '../models/page-request';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation analyticsControllerTopPages
   */
  static readonly AnalyticsControllerTopPagesPath = '/analytics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsControllerTopPages()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsControllerTopPages$Response(params?: {
    period?: 'day' | '7d' | '30d' | 'month' | '6mo' | '12mo';
  }): Observable<StrictHttpResponse<Array<PageRequest>>> {

    const rb = new RequestBuilder(this.rootUrl, AnalyticsService.AnalyticsControllerTopPagesPath, 'get');
    if (params) {
      rb.query('period', params.period, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PageRequest>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `analyticsControllerTopPages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsControllerTopPages(params?: {
    period?: 'day' | '7d' | '30d' | 'month' | '6mo' | '12mo';
  }): Observable<Array<PageRequest>> {

    return this.analyticsControllerTopPages$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PageRequest>>) => r.body as Array<PageRequest>)
    );
  }

}
