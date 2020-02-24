import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { SeoService } from '@services/seo.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  author$: Observable<ScullyRoute>;

  authorPosts$: Observable<ScullyRoute[]>;

  constructor(private scully: ScullyRoutesService, private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.generateTags();
    this.author$ = this.scully.getCurrent();
    const blogs$ = this.scully.available$.pipe(
      map(pages => pages.filter(p => p.route.startsWith('/blog/')))
    );

    this.authorPosts$ = this.author$.pipe(
      switchMap(author =>
        blogs$.pipe(
          map(blogs =>
            blogs.filter(blog => blog.authors.some(t => t === author.title))
          )
        )
      )
    );
  }
}
