import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
import { NizMenuModule } from '@components/menu/menu.module';

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
    MarkdownModule.forRoot({ loader: HttpClient }),
    NizFooterModule,
    NizInlineSvgModule,
    NewsletterSignupModule,
    NizSearchComponentModule,
    PipesModule,
    NizMenuModule,
    ShortcodeModule.forRoot([
      {
        path: 'note',
        loadChildren: () =>
          import('./shortcodes/note/note.module').then((m) => m.NoteModule),
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
