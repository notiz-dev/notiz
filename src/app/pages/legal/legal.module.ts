import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalComponent } from './legal.component';
import { LegalRoutingModule } from './legal-routing.module';
import { ScullyContentModule } from '@scullyio/ng-lib';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '@components/components.module';
import { NewsletterSignupModule } from '@components/newsletter-signup/newsletter-signup.module';

@NgModule({
  declarations: [LegalComponent],
  imports: [
    CommonModule,
    IonicModule,
    LegalRoutingModule,
    ScullyContentModule,
    ComponentsModule,
    NewsletterSignupModule
  ]
})
export class LegalModule {}
