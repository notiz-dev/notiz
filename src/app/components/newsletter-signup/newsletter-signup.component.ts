import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ToastService, ToastType } from '@notiz/ngx-design';

@Component({
  selector: 'app-newsletter-signup',
  templateUrl: './newsletter-signup.component.html',
  styleUrls: ['./newsletter-signup.component.scss'],
})
export class NewsletterSignupComponent implements OnInit {
  newsletterSignup: FormGroup;
  pending = false;
  invalid = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toast: ToastService
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
      this.pending = true;
      return this.http
        .post(
          'https://notiz-dev-api.herokuapp.com/subscribe',
          this.newsletterSignup.value
        )
        .pipe(
          tap(() => (this.pending = false)),
          tap(() => {
            this.toast.show({
              type: ToastType.SUCCESS,
              text:
                'Successfully subscribed to notiz.dev. Check your email. 📮',
            });
          })
        )
        .subscribe();
    }
    this.invalid = true;

    this.toast.show({
      type: ToastType.ERROR,
      text:
        'Please enter your mail address. 📧',
    });
  }
}
