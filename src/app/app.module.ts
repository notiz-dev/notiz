import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { IonicModule } from '@ionic/angular';
import { TagsComponent } from './tags/tags.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ScullyLibModule.forRoot({ useTranferState: true }),
    IonicModule.forRoot({ mode: 'md' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
