import { environment } from '@environments/environment';
import { SimpleAnalyticsService } from '@services/simple-analytics.service';
import {
  Component,
  OnInit,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-newsletter-signup',
  templateUrl: './newsletter-signup.component.html',
  styleUrls: ['./newsletter-signup.component.scss'],
})
export class NewsletterSignupComponent implements OnInit {
  @HostBinding('class') class =
    'max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8';
  @ViewChild('emailAddress') input: ElementRef<HTMLInputElement>;
  newsletterSignup: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public element: ElementRef<HTMLElement>,
    private sa: SimpleAnalyticsService,
    private toast: HotToastService
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
      this.http
        .post(`${environment.api}/subscribe`, this.newsletterSignup.value)
        .pipe(
          this.toast.observe({
            loading: 'Signing you up...',
            success: 'Successfully signed up. Thank you!',
            error: 'Oh no, something went wrong! Please try again.',
          }),
          tap(() => {
            this.sa.event('newsletter_subscribed');
          })
        )
        .subscribe({ complete: () => this.newsletterSignup.reset() });
    }
  }
}
