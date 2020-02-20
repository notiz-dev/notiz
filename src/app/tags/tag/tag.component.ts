import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map, switchMap, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  page$: Observable<ScullyRoute> = this.scully.getCurrent();

  posts$: Observable<ScullyRoute[]>;

  constructor(private scully: ScullyRoutesService) {}

  ngOnInit(): void {
    const blogs$ = this.scully.available$.pipe(
      map(pages => pages.filter(p => p.route.startsWith('/blog/')))
    );

    this.posts$ = this.page$.pipe(
      switchMap(page =>
        blogs$.pipe(
          map(blogs =>
            blogs.filter(blog => blog.tags.some(t => t === page.slug))
          )
        )
      )
    );
  }
}
