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
export class NewsletterService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation newsletterControllerSubscribe
   */
  static readonly NewsletterControllerSubscribePath = '/subscribe';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newsletterControllerSubscribe()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newsletterControllerSubscribe$Response(params: {
    body: SubscribeDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, NewsletterService.NewsletterControllerSubscribePath, 'post');
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
   * To access the full response (for headers, for example), `newsletterControllerSubscribe$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newsletterControllerSubscribe(params: {
    body: SubscribeDto
  }): Observable<void> {

    return this.newsletterControllerSubscribe$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation newsletterControllerConfirm
   */
  static readonly NewsletterControllerConfirmPath = '/confirm';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newsletterControllerConfirm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newsletterControllerConfirm$Response(params: {
    body: ConfirmDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, NewsletterService.NewsletterControllerConfirmPath, 'put');
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
   * To access the full response (for headers, for example), `newsletterControllerConfirm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newsletterControllerConfirm(params: {
    body: ConfirmDto
  }): Observable<void> {

    return this.newsletterControllerConfirm$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation newsletterControllerUnsubscribe
   */
  static readonly NewsletterControllerUnsubscribePath = '/unsubscribe';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newsletterControllerUnsubscribe()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newsletterControllerUnsubscribe$Response(params: {
    body: ConfirmDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, NewsletterService.NewsletterControllerUnsubscribePath, 'put');
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
   * To access the full response (for headers, for example), `newsletterControllerUnsubscribe$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newsletterControllerUnsubscribe(params: {
    body: ConfirmDto
  }): Observable<void> {

    return this.newsletterControllerUnsubscribe$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
