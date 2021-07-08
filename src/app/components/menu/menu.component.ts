import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'niz-menu',
  template: ` <div
    *ngIf="open"
    class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
  >
    <div
      class="rounded-lg shadow-md bg-canvas-shade ring-1 ring-black ring-opacity-5 overflow-hidden"
    >
      <ng-content></ng-content>
    </div>
  </div>`,
  styles: [],
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  private destroy$ = new Subject();
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    fromEvent(window, 'click')
      .pipe(
        filter(() => this.open),
        filter((ev: MouseEvent) => !this.el.nativeElement.contains(ev.target)),
        tap(() => (this.open = false)),
        tap(() => this.openChange.emit(false)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
