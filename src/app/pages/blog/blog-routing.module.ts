import { NgModule, Injectable } from '@angular/core';
import {
  Routes,
  RouterModule,
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree
} from '@angular/router';

import { BlogPostComponent } from '@pages/blog-post/blog-post.component';
import { BlogComponent } from './blog.component';
import { Observable } from 'rxjs';
import { ScullyContentService } from 'src/app/services/scully-content.service';
import { map } from 'rxjs/operators';

@Injectable()
class IsPost implements CanActivate {
  constructor(private content: ScullyContentService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.content
      .blogPosts()
      .pipe(
        map(
          posts =>
            posts.some(p => p.route === `/blog/${route.params.slug}`) ||
            this.router.parseUrl('/404')
        )
      );
  }
}

const routes: Routes = [
  { path: '', component: BlogComponent },
  {
    path: ':slug',
    component: BlogPostComponent,
    canActivate: [IsPost]
  },
  {
    path: '**',
    component: BlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [IsPost]
})
export class BlogRoutingModule {}
