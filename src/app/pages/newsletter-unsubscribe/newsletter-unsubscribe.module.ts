import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '@components/components.module';
import { NewsletterUnsubscribeRoutingModule } from './newsletter-unsubscribe-routing.module';
import { NewsletterUnsubscribeComponent } from './newsletter-unsubscribe.component';
import { NewsletterSignupModule } from '@components/newsletter-signup/newsletter-signup.module';

@NgModule({
  declarations: [NewsletterUnsubscribeComponent],
  imports: [
    CommonModule,
    NewsletterUnsubscribeRoutingModule,
    IonicModule,
    ComponentsModule,
    NewsletterSignupModule
  ],
  exports: [NewsletterUnsubscribeComponent],
  providers: []
})
export class NewsletterUnsubscribeModule {}
