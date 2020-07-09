import { NizInlineSvgModule } from '@notiz/ngx-design';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterConfirmComponent } from './newsletter-confirm.component';
import { NewsletterConfirmRoutingModule } from './newsletter-confirm-routing.module';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '@components/components.module';

@NgModule({
  declarations: [NewsletterConfirmComponent],
  imports: [
    CommonModule,
    NewsletterConfirmRoutingModule,
    IonicModule,
    ComponentsModule,
    NizInlineSvgModule,
  ],
  exports: [NewsletterConfirmComponent],
  providers: [],
})
export class NewsletterConfirmModule {}
