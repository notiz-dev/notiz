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
   * Path part for operation githubControllerRepo
   */
  static readonly GithubControllerRepoPath = '/github/repos/{owner}/{repo}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `githubControllerRepo()` instead.
   *
   * This method doesn't expect any request body.
   */
  githubControllerRepo$Response(params: {
    owner: string;
    repo: string;
  }): Observable<StrictHttpResponse<GitHubRepo>> {

    const rb = new RequestBuilder(this.rootUrl, GitHubService.GithubControllerRepoPath, 'get');
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
   * To access the full response (for headers, for example), `githubControllerRepo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  githubControllerRepo(params: {
    owner: string;
    repo: string;
  }): Observable<GitHubRepo> {

    return this.githubControllerRepo$Response(params).pipe(
      map((r: StrictHttpResponse<GitHubRepo>) => r.body as GitHubRepo)
    );
  }

}
