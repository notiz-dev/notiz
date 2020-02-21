import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface TagCount {
  tag: ScullyRoute;
  count: number;
}

@Component({
  selector: 'app-tags-view',
  templateUrl: './tags-view.component.html',
  styleUrls: ['./tags-view.component.scss']
})
export class TagsViewComponent implements OnInit {
  tags$: Observable<ScullyRoute[]>;

  tagCounts$: Observable<TagCount[]>;
  constructor(private scully: ScullyRoutesService) {}

  ngOnInit(): void {
    const blogs$ = this.scully.available$.pipe(
      map(routes => routes.filter(route => route.route.startsWith('/blog/')))
    );
    this.tags$ = this.scully.available$.pipe(
      map(routes => routes.filter(route => route.route.startsWith('/tags/')))
    );

    this.tagCounts$ = blogs$.pipe(
      switchMap(blogs =>
        this.tags$.pipe(
          map(tags =>
            tags.map(tag => ({
              tag,
              count: blogs.filter(blog => blog.tags.some(t => t === tag.title))
                .length
            }))
          )
        )
      )
    );

    // this.tags$
    //   .pipe(
    //     map(tags => tags.map(tag => tag.title)),
    //     tap(console.log)
    //     // switchMap(tags => blogs$.pipe(map(blogs => blogs.filter(blog => blog.tags))))
    //   )
    //   .subscribe();
  }
}
