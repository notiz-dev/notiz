import { PlausibleService } from 'ngx-plausible';
import { Router } from '@angular/router';
import { SearchItem, PlausibleEvent } from './../../types/types';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { shortcut, sequence, KeyCode } from '@notiz/toolbelt';
import {
  tap,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs/operators';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Subject, merge } from 'rxjs';
import { SearchPipe } from '@pipes/search.pipe';

@Component({
  selector: 'niz-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class NizSearch implements OnInit {
  search = '';
  isOpen = false;
  activeIndex = 0;

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  searchChanged = new Subject<string>();

  @ViewChildren('searchItem') searchItems: QueryList<
    ElementRef<HTMLUListElement>
  >;

  searchResult: SearchItem[] = [];

  @HostListener('document:keydown.escape', ['$event'])
  escapeDown(event: KeyboardEvent) {
    if (this.isOpen) {
      this.closeSearch();
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  enterDown(event: KeyboardEvent) {
    if (this.isOpen && this.searchResult?.length > 0) {
      this.openActive(this.activeIndex);
    }
  }

  @HostListener('document:keydown.arrowUp', ['$event'])
  keyUp(event: KeyboardEvent) {
    if (this.isOpen) {
      this.activeIndex = Math.max(0, this.activeIndex - 1);
      this.scrollSearchItemIntoView();
    }
  }

  @HostListener('document:keydown.arrowDown', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (this.isOpen) {
      this.activeIndex = Math.min(
        this.searchResult.length - 1,
        this.activeIndex + 1
      );

      this.scrollSearchItemIntoView();
    }
  }

  constructor(
    public scully: ScullyRoutesService,
    private searchPipe: SearchPipe,
    private router: Router,
    private plausible: PlausibleService
  ) {}

  ngOnInit() {
    this.registerSearchShortcuts();

    this.searchChanged
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap((search) => (this.search = search)),
        tap(() => (this.activeIndex = 0)),
        switchMap((search) =>
          this.scully.available$.pipe(
            map((routes) => this.searchPipe.transform(routes, search))
          )
        ),
        tap((searchResult) => (this.searchResult = searchResult))
      )
      .subscribe();
  }

  searchChange(search: string) {
    this.searchChanged.next(search);
  }

  resetSearch() {
    this.searchChanged.next('');
    this.activeIndex = 0;
    this.scrollSearchItemIntoView();
  }

  private openActive(index: number) {
    this.closeSearch();
    const url = this.searchResult[index].url;
    this.plausible.event(PlausibleEvent.Search, {
      props: { event: 'click_result', url: url, trigger: 'enter' },
    });
    this.router.navigateByUrl(url);
  }

  private registerSearchShortcuts() {
    this.openSearchShortcut();
  }

  private openSearchShortcut() {
    merge(
      shortcut([KeyCode.ShiftLeft, KeyCode.Digit7]),
      shortcut([KeyCode.ShiftRight, KeyCode.Digit7]),
      shortcut([KeyCode.ControlLeft, KeyCode.KeyF]),
      shortcut([KeyCode.ControlRight, KeyCode.KeyF]),
      shortcut([KeyCode.NumpadDivide]),
      shortcut([KeyCode.Slash])
    )
      .pipe(
        sequence(),
        filter(() => !this.isOpen),
        tap(() => this.openSearch('shortcut'))
      )
      .subscribe();
  }

  private scrollSearchItemIntoView() {
    this.searchItems
      .find((item, i) => i === this.activeIndex)
      ?.nativeElement?.scrollIntoView({ block: 'nearest' });
  }

  openSearch(trigger: 'click' | 'shortcut' = 'click') {
    this.plausible.event(PlausibleEvent.Search, {
      props: { event: 'open', trigger: trigger },
    });
    this.isOpen = true;
    setTimeout(() => this.searchInput.nativeElement.focus(), 0);
  }

  closeSearch(url?: string) {
    this.isOpen = false;
    this.resetSearch();

    if (url) {
      this.plausible.event(PlausibleEvent.Search, {
        props: { event: 'click_result', url: url, trigger: 'click' },
      });
    }
  }
}
