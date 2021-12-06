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

import { GitHubRepo } from '../models/git-hub-repo';
import { OpenSource } from '../models/open-source';

@Injectable({
  providedIn: 'root',
})
export class GitHubService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation repo
   */
  static readonly RepoPath = '/github/repos/{owner}/{repo}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `repo()` instead.
   *
   * This method doesn't expect any request body.
   */
  repo$Response(params: {
    owner: string;
    repo: string;
  }): Observable<StrictHttpResponse<GitHubRepo>> {

    const rb = new RequestBuilder(this.rootUrl, GitHubService.RepoPath, 'get');
    if (params) {
      rb.path('owner', params.owner, {});
      rb.path('repo', params.repo, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GitHubRepo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `repo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  repo(params: {
    owner: string;
    repo: string;
  }): Observable<GitHubRepo> {

    return this.repo$Response(params).pipe(
      map((r: StrictHttpResponse<GitHubRepo>) => r.body as GitHubRepo)
    );
  }

  /**
   * Path part for operation openSource
   */
  static readonly OpenSourcePath = '/github/openSource';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `openSource()` instead.
   *
   * This method doesn't expect any request body.
   */
  openSource$Response(params?: {
  }): Observable<StrictHttpResponse<Array<OpenSource>>> {

    const rb = new RequestBuilder(this.rootUrl, GitHubService.OpenSourcePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OpenSource>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `openSource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  openSource(params?: {
  }): Observable<Array<OpenSource>> {

    return this.openSource$Response(params).pipe(
      map((r: StrictHttpResponse<Array<OpenSource>>) => r.body as Array<OpenSource>)
    );
  }

}
