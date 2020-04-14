import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksRoutingModule } from './links-routing.module';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '@components/components.module';
import { NewsletterSignupModule } from '@components/newsletter-signup/newsletter-signup.module';
import { LinksComponent } from './links.component';
import { LinkModule } from '@pages/link/link.module';

@NgModule({
  declarations: [LinksComponent],
  imports: [
    LinkModule,
    CommonModule,
    LinksRoutingModule,
    ScullyLibModule,
    IonicModule,
    ComponentsModule,
    NewsletterSignupModule
  ],
  exports: [],
  providers: []
})
export class LinksModule {}
