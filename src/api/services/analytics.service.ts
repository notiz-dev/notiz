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
import { Post } from '../models/post';

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
   * Path part for operation topPages
   */
  static readonly TopPagesPath = '/analytics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `topPages()` instead.
   *
   * This method doesn't expect any request body.
   */
  topPages$Response(params?: {
    period?: 'day' | '7d' | '30d' | 'month' | '6mo' | '12mo';
  }): Observable<StrictHttpResponse<Array<PageRequest>>> {

    const rb = new RequestBuilder(this.rootUrl, AnalyticsService.TopPagesPath, 'get');
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
   * To access the full response (for headers, for example), `topPages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  topPages(params?: {
    period?: 'day' | '7d' | '30d' | 'month' | '6mo' | '12mo';
  }): Observable<Array<PageRequest>> {

    return this.topPages$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PageRequest>>) => r.body as Array<PageRequest>)
    );
  }

  /**
   * Path part for operation latestPosts
   */
  static readonly LatestPostsPath = '/analytics/latest';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `latestPosts()` instead.
   *
   * This method doesn't expect any request body.
   */
  latestPosts$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Post>>> {

    const rb = new RequestBuilder(this.rootUrl, AnalyticsService.LatestPostsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Post>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `latestPosts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  latestPosts(params?: {
  }): Observable<Array<Post>> {

    return this.latestPosts$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Post>>) => r.body as Array<Post>)
    );
  }

}
