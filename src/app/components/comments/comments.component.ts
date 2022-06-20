import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  OnDestroy,
  HostBinding,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Theme, ThemeService } from '@services/theme.service';
import { distinctUntilChanged, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-comments',
  template: ``,
  styles: [``],
})
export class CommentsComponent implements OnChanges, OnDestroy {
  @HostBinding('class') classes = 'block mt-4';

  @Input() route: ScullyRoute;

  private onDestroy$ = new Subject<void>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private theme: ThemeService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.theme.themeChange
      .pipe(
        distinctUntilChanged(),
        tap((theme) => {
          this.addGiscus(theme);
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private addGiscus(theme: Theme) {
    (this.el.nativeElement as HTMLElement).querySelector('.giscus')?.remove();
    (this.el.nativeElement as HTMLElement).querySelector('script')?.remove();
    const script: HTMLScriptElement = this.renderer.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'notiz-dev/notiz');
    script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkyNDIwMDQ3NTU=');
    script.setAttribute('data-category', 'General');
    script.setAttribute(
      'data-category-id',
      'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyMDY1OTYw'
    );
    script.setAttribute('data-mapping', 'title');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorin', 'anonymous');
    script.async = true;
    this.renderer.appendChild(this.el.nativeElement, script);
  }
}
