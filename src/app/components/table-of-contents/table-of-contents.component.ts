import { ScullyContentService } from '@services/scully-content.service';
import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { fromEvent, Subject, Observable, merge } from 'rxjs';
import { tap, map, takeUntil, switchMap, filter } from 'rxjs/operators';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { ActivatedRoute } from '@angular/router';
import { media$ } from '@notiz/toolbelt';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'niz-toc',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
})
export class TableOfContentsComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();
  headers$: Observable<Element[]>;
  @HostBinding('class') class = 'flex flex-col space-y-2';
  collapsed = true;
  md$ = media$(`(min-width: 768px)`);
  url: string;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public scully: ScullyRoutesService,
    public content: ScullyContentService,
    private route: ActivatedRoute,
    private location: Location,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.headers$ = fromEvent(window, 'AngularReady').pipe(
      map((ev) =>
        Array.from(this.document.querySelectorAll('.prose h2,.prose h3'))
      )
    );

    fromEvent(window, 'AngularReady')
      .pipe(
        switchMap((ev) => this.route.fragment),
        switchMap((fragment) =>
          this.content.getCurrent().pipe(map((c) => [fragment, c.route]))
        ),
        filter(([fragment, route]) => !!fragment && !!route),
        tap(([fragment, route]) => this.scrollTo(route, fragment)),
        takeUntil(this.onDestroy$)
      )
      .subscribe();

    const isVisible = (element: Element) => {
      const subject = new Subject<Element>();
      const observer = new IntersectionObserver((entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((e) => subject.next(element));
      });
      observer.observe(element);

      return subject.pipe(
        takeUntil(
          this.onDestroy$.pipe(
            tap(() => {
              observer.disconnect();
            })
          )
        )
      );
    };

    this.headers$
      .pipe(
        switchMap((headers) => merge(...headers.map((h) => isVisible(h)))),
        switchMap((el) =>
          this.content.getCurrent().pipe(map((c) => [el.id, c.route]))
        ),
        tap(([el, route]) => (this.url = `${route}#${el}`)),
        takeUntil(this.onDestroy$)
      )
      .subscribe();

    this.headers$
      .pipe(
        switchMap((anchors) =>
          merge(
            ...anchors.map((a) =>
              fromEvent(a, 'click').pipe(
                switchMap((ev) =>
                  this.content.getCurrent().pipe(map((c) => [a.id, c.route]))
                )
              )
            )
          )
        ),
        tap(([id, route]) => this.location.replaceState(`${route}#${id}`)),
        tap(() =>
          this.toast.success('URL updated!', {
            duration: 4000,
          })
        ),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  scrollTo(url: string, id: string) {
    this.url = `${url}#${id}`;
    this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  active(url: string, id: string) {
    return this.url === `${url}#${id}` ? 'active' : '';
  }

  scrollToTop(url: string) {
    this.location.replaceState(`${url}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToRelated() {
    const stack = Array.from(
      this.document.getElementsByTagName('app-card-stack')
    )[0];
    stack?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToComments() {
    const stack = Array.from(
      this.document.getElementsByTagName('app-comments')
    )[0];
    stack?.scrollIntoView({ behavior: 'smooth' });
  }

  headerClasses(header: string): string {
    if (header === 'h2') {
      return 'text-lg text-semibold';
    } else if (header === 'h3') {
      return 'text-base ml-3';
    }

    return '';
  }
}
