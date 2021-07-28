import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterSignupComponent } from './newsletter-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NizInlineSvgModule } from '../inline-svg/inline-svg.module';

@NgModule({
  declarations: [NewsletterSignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NizInlineSvgModule,
  ],
  exports: [NewsletterSignupComponent],
  providers: [],
})
export class NewsletterSignupModule {}
