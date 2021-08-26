import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Renderer2,
  OnDestroy,
  HostBinding,
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
export class CommentsComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'block';

  @Input() route: ScullyRoute;
  private onDestroy$ = new Subject<void>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private theme: ThemeService
  ) {}
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    this.theme.themeChange
      .pipe(
        distinctUntilChanged(),
        tap((theme) => {
          this.addUtterances(theme);
          this.addGiscus(theme);
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  private addUtterances(theme: Theme) {
    (this.el.nativeElement as HTMLElement)
      .querySelector('.utterances')
      ?.remove();
    const script: HTMLScriptElement = this.renderer.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'notiz-dev/notiz');
    script.setAttribute('issue-term', this.route.title);
    script.setAttribute('theme', `github-${theme}`);
    script.setAttribute('crossorin', 'anonymous');
    script.async = true;
    this.renderer.appendChild(this.el.nativeElement, script);
  }

  private addGiscus(theme: Theme) {
    (this.el.nativeElement as HTMLElement).querySelector('.giscus')?.remove();
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
    script.setAttribute('data-theme', theme);
    script.setAttribute('crossorin', 'anonymous');
    script.async = true;
    this.renderer.appendChild(this.el.nativeElement, script);
  }
}
