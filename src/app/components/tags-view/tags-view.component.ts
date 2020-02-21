import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { map, switchMap, tap, reduce } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface TagWeight {
  tag: ScullyRoute;
  weight: number;
}

@Component({
  selector: 'app-tags-view',
  templateUrl: './tags-view.component.html',
  styleUrls: ['./tags-view.component.scss']
})
export class TagsViewComponent implements OnInit {
  tags$: Observable<ScullyRoute[]>;

  weighted$: Observable<TagWeight[]>;
  constructor(private scully: ScullyRoutesService) {}

  ngOnInit(): void {
    const blogs$ = this.scully.available$.pipe(
      map(routes => routes.filter(route => route.route.startsWith('/blog/')))
    );
    this.tags$ = this.scully.available$.pipe(
      map(routes => routes.filter(route => route.route.startsWith('/tags/')))
    );

    const used$: Observable<number> = blogs$.pipe(
      map(blogs => blogs.map(blog => blog.tags.length).reduce((a, b) => a + b))
    );

    this.weighted$ = blogs$.pipe(
      switchMap(blogs =>
        this.tags$.pipe(
          map(tags =>
            tags.map(tag => ({
              tag,
              count: blogs.filter(blog => blog.tags.some(t => t === tag.title))
                .length
            }))
          ),
          switchMap(counts =>
            used$.pipe(
              map(used =>
                counts.map(count => ({
                  tag: count.tag,
                  weight: (count.count / used) * 100
                }))
              )
            )
          )
        )
      )
      // map(weighted => weighted.sort((a, b) => a.tag.title > b.tag.title ? -1 : 1)) sorting not necessary?
    );
  }
}
