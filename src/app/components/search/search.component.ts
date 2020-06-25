import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { shortcut, sequence } from '@utils/shortcuts';
import { KeyCode } from '@utils/keycodes';
import {
  tap,
  filter,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Subject } from 'rxjs';

@Component({
  selector: 'niz-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class NizSearch implements OnInit {
  search = '';
  isOpen = false;

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  searchChanged = new Subject<string>();

  constructor(public scully: ScullyRoutesService) {}

  ngOnInit() {
    this.scully.available$.subscribe(console.log);

    this.registerSearchShortcuts();

    this.searchChanged
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe((search) => {
        this.search = search;
      });
  }

  searchChange(search: string) {
    this.searchChanged.next(search);
  }

  resetSearch() {
    this.search = '';
  }

  private registerSearchShortcuts() {
    this.openSearchShortcut();
    this.closeSearchShortcut();
  }

  private openSearchShortcut() {
    shortcut([KeyCode.ControlLeft, KeyCode.KeyF])
      .pipe(
        sequence(),
        filter(() => !this.isOpen),
        tap(console.log),
        tap(() => this.openSearch())
      )
      .subscribe();
  }

  private closeSearchShortcut() {
    shortcut([KeyCode.Escape])
      .pipe(
        filter(() => this.isOpen),
        tap(console.log),
        tap(() => this.closeSearch())
      )
      .subscribe();
  }

  openSearch() {
    this.isOpen = true;
    setTimeout(() => this.searchInput.nativeElement.focus(), 0);
  }

  closeSearch() {
    this.isOpen = false;
    this.resetSearch();
  }
}
