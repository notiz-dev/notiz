import { SimpleAnalyticsService } from '@services/simple-analytics.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ToastService, ToastType, NizInput } from '@notiz/ngx-design';

@Component({
  selector: 'app-newsletter-signup',
  templateUrl: './newsletter-signup.component.html',
  styleUrls: ['./newsletter-signup.component.scss'],
})
export class NewsletterSignupComponent implements OnInit {
  newsletterSignup: FormGroup;
  pending = false;
  invalid = false;

  @ViewChild(NizInput) input: NizInput;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    public element: ElementRef<HTMLElement>,
    private sa: SimpleAnalyticsService
  ) {
    this.setupForm();
  }

  ngOnInit(): void {}

  private setupForm() {
    this.newsletterSignup = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  signupNewsletter() {
    if (this.newsletterSignup.valid) {
      this.sa.event('newsletter_submit_with_email');
      this.pending = true;
      return this.http
        .post(
          'https://notiz-dev-api.herokuapp.com/subscribe',
          this.newsletterSignup.value
        )
        .pipe(
          tap(() => (this.pending = false)),
          tap(() => {
            this.sa.event('newsletter_subscribed');
          }),
          tap(() => {
            this.toast.show({
              type: ToastType.SUCCESS,
              duration: 4000,
              text:
                'Successfully subscribed to notiz.dev. Check your email. 📮',
            });
          })
        )
        .subscribe();
    }
    this.invalid = true;
    this.sa.event('newsletter_submit_without_email');

    this.toast.show({
      type: ToastType.ERROR,
      duration: 4000,
      text: 'Please enter your mail address. 📧',
    });
  }

  focus() {
    this.input.input.nativeElement.focus();
  }

  nizFocus() {
    this.invalid = false;
    this.sa.event('newsletter_focus');
  }
}
