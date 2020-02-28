import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '@components/components.module';
import { TagComponent } from './tag.component';
import { NewsletterSignupModule } from 'src/app/components/newsletter-signup/newsletter-signup.module';

@NgModule({
  declarations: [TagComponent],
  imports: [
    CommonModule,
    ScullyLibModule,
    IonicModule,
    ComponentsModule,
    NewsletterSignupModule
  ]
})
export class TagModule {}
