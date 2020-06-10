import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterSignupComponent } from './newsletter-signup.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NizPrimaryButtonModule, NizInputModule } from '@notiz/ngx-design';

@NgModule({
  declarations: [NewsletterSignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NizPrimaryButtonModule,
    NizInputModule,
  ],
  exports: [NewsletterSignupComponent],
  providers: [],
})
export class NewsletterSignupModule {}
