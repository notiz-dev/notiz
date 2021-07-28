import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  SecurityContext,
} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MarkdownModule } from 'ngx-markdown';
import { NewsletterSignupModule } from '@components/newsletter-signup/newsletter-signup.module';
import { NizSearchComponentModule } from '@components/search/search.module';
import { PipesModule } from '@pipes/pipes.module';
import { NizFooterModule } from '@components/footer/footer.module';
import { ShortcodeModule } from '@notiz/shortcodes';
import { NizInlineSvgModule } from '@components/inline-svg/inline-svg.module';
import { MenuModule } from '@components/menu/menu.module';
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ScullyLibModule.forRoot({ useTransferState: true, alwaysMonitor: true }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    MarkdownModule.forRoot({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
    }),
    NizFooterModule,
    NizInlineSvgModule,
    NewsletterSignupModule,
    NizSearchComponentModule,
    PipesModule,
    MenuModule,
    ShortcodeModule.forRoot([
      {
        shortcode: 'note',
        loadChildren: () =>
          import('./shortcodes/note/note.module').then((m) => m.NoteModule),
      },
      {
        shortcode: 'article',
        loadChildren: () =>
          import('./shortcodes/article/article.module').then(
            (m) => m.ArticleShortcodeModule
          ),
      },
      {
        shortcode: 'code',
        loadChildren: () =>
          import('./shortcodes/code/code.module').then((m) => m.CodeModule),
      },
      {
        shortcode: 'repo',
        loadChildren: () =>
          import('./shortcodes/github-repo/github-repo.module').then(
            (m) => m.GithubRepoModule
          ),
      },
      {
        shortcode: 'figure',
        loadChildren: () =>
          import('./shortcodes/figure/figure.module').then(
            (m) => m.FigureModule
          ),
      },
    ]),
    HotToastModule.forRoot({
      position: 'bottom-center',
      iconTheme: {
        primary: 'var(--primary)',
        secondary: '#F9FAFB',
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
