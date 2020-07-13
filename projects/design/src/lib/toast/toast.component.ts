import { Component, OnInit, ElementRef } from '@angular/core';
import { ToastService } from './toast.service';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'niz-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  toast$ = this.toast.toast;
  constructor(
    private toast: ToastService,
    private el: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.toast$
      .pipe(
        filter((options) => !!options),
        tap(() => console.log('open')),
        tap((options) =>
          this.el.nativeElement.classList.add('open', options.type)
        )
      )
      .subscribe();

    this.toast$
      .pipe(
        filter((options) => !options),
        tap(() => (this.el.nativeElement.classList.value = ''))
      )
      .subscribe();
  }

  hide() {
    this.toast.hide();
  }
}
