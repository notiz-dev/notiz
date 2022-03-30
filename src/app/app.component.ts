import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '@services/theme.service';
import { delay, filter, takeUntil, tap } from 'rxjs/operators';
import { shortcut, KeyCode } from '@notiz/toolbelt';
import { interval, merge, Observable, Subject } from 'rxjs';
import { ScullyContentService } from '@services/scully-content.service';
import { ScullyRoute } from '@scullyio/ng-lib';
import { NewsletterSignupComponent } from '@components/newsletter-signup/newsletter-signup.component';
import { NizSearch } from '@components/search/search.component';
import { FooterSection } from '@components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('newsletter', { read: NewsletterSignupComponent })
  newsletter: NewsletterSignupComponent;
  menuOpen = false;
  copyrightUrl = 'legal/privacy-policy';
  current$: Observable<ScullyRoute>;
  createdWithSvgSources = [
    'assets/stack/angular.svg',
    'assets/stack/scully.svg',
    'assets/stack/tailwind-css.svg',
    'assets/stack/firebase.svg',
  ];

  footerSections: FooterSection[] = [
    {
      title: 'Links',
      links: [
        {
          title: 'Portfolio',
          url: 'https://portfolio.notiz.dev',
          external: true,
        },
        {
          title: 'GitHub',
          url: 'https://github.com/notiz-dev',
          external: true,
        },
        {
          title: 'Twitter',
          url: 'https://twitter.com/notiz_dev',
          external: true,
        },
      ],
    },
    {
      title: 'more',
      links: [
        {
          title: 'Blog',
          url: '/',
          svg: 'assets/img/blog-white.svg',
        },
        {
          title: 'Authors',
          url: '/authors/',
          svg: 'assets/img/author.svg',
        },
        {
          title: 'Tags',
          url: '/tags/',
          svg: 'assets/img/tags-white.svg',
        },
      ],
    },
  ];
  destroy$ = new Subject<void>();
  stars: string;

  constructor(
    public themeService: ThemeService,
    private content: ScullyContentService
  ) {
    let shadow = '';
    const w = window.screen.width;
    const h = window.screen.height;
    const count = Math.floor(Math.sqrt(w * h) / 14);
    for (let index = 0; index < count; index++) {
      shadow += `${Math.random() * w}px ${Math.random() * h}px #fff, `;
    }
    this.stars = shadow.slice(0, shadow.length - 2);

    interval(6000)
      .pipe(
        filter(() => this.themeService.theme === 'dark'),
        delay(Math.random() * 16000),
        tap(() => this.shower()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  shower(): void {
    const left = Math.random() * window.outerWidth;
    const top = Math.random() * window.outerHeight;
    const duration = (Math.random() * 70000) / 10 + 3000;
    const div = document.createElement('div');
    div.className = 'meteor';
    div.style.top = top - 300 + 'px';
    div.style.left = left + 'px';
    document.body.append(div);
    const animation = div.animate(
      [
        {
          offset: 0,
          opacity: 1,
          marginTop: '-300px',
          marginRight: '-300px',
        },
        { offset: 0.12, opacity: 0 },
        {
          offset: 0.15,
          opacity: 0,
          marginTop: '300px',
          marginLeft: '-600px',
        },
        { offset: 1, opacity: 0, width: 0 },
      ],
      { duration: duration, easing: 'linear' }
    );

    animation.onfinish = () => div.remove();
  }

  ngOnInit() {
    const notiz =
      "##::: ##::'#######::'########:'####:'########:\n" +
      "###:: ##:'##.... ##:... ##..::. ##::..... ##::\n" +
      '####: ##: ##:::: ##:::: ##::::: ##:::::: ##:::\n' +
      '## ## ##: ##:::: ##:::: ##::::: ##::::: ##::::\n' +
      '##. ####: ##:::: ##:::: ##::::: ##:::: ##:::::\n' +
      '##:. ###: ##:::: ##:::: ##::::: ##::: ##::::::\n' +
      "##::. ##:. #######::::: ##::::'####: ########:\n";

    console.log(
      `${notiz} \n\n* notiz [noˈtiːt͡s] - (german) short, brief, written record \n\nInterested in our source code? It is available on GitHub https://github.com/notiz-dev/notiz ⭐. Created with Angular and Scully, hosted on Firebase.`
    );

    this.themeService.initTheme();

    merge(
      shortcut([KeyCode.ControlLeft, KeyCode.KeyT]),
      shortcut([KeyCode.ControlRight, KeyCode.KeyT])
    )
      .pipe(
        tap(() => {}),
        tap(() => this.themeService.toggleTheme('shortcut'))
      )
      .subscribe();

    this.current$ = this.content.getCurrent();
  }

  openSearch(search: NizSearch) {
    search.openSearch();
  }

  toggleTheme() {
    this.themeService.toggleTheme('click');
  }
}
