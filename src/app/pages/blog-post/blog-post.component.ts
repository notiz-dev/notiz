import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewChecked
} from '@angular/core';
import { HighlightService } from '@services/highlight.service';
import { SeoService } from '@services/seo.service';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated
})
export class BlogPostComponent implements OnInit, AfterViewChecked {
  post$: Observable<ScullyRoute>;
  constructor(
    private scully: ScullyRoutesService,
    private highlightService: HighlightService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.post$ = this.scully.getCurrent();
    this.post$
      .pipe(
        first(),
        tap(post =>
          this.seo.generateTags({
            title: post.title,
            description: post.description,
            route: post.route
          })
        )
      )
      .subscribe();
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}
