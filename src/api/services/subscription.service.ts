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

import { ConfirmDto } from '../models/confirm-dto';
import { SubscribeDto } from '../models/subscribe-dto';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation subscribe
   */
  static readonly SubscribePath = '/subscribe';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `subscribe()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  subscribe$Response(params: {
    body: SubscribeDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SubscriptionService.SubscribePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `subscribe$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  subscribe(params: {
    body: SubscribeDto
  }): Observable<void> {

    return this.subscribe$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation confirm
   */
  static readonly ConfirmPath = '/confirm';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `confirm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  confirm$Response(params: {
    body: ConfirmDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SubscriptionService.ConfirmPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `confirm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  confirm(params: {
    body: ConfirmDto
  }): Observable<void> {

    return this.confirm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation unsubscribe
   */
  static readonly UnsubscribePath = '/unsubscribe';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unsubscribe()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  unsubscribe$Response(params: {
    body: ConfirmDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SubscriptionService.UnsubscribePath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unsubscribe$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  unsubscribe(params: {
    body: ConfirmDto
  }): Observable<void> {

    return this.unsubscribe$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
