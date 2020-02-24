import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-newsletter-signup',
  templateUrl: './newsletter-signup.component.html',
  styleUrls: ['./newsletter-signup.component.scss']
})
export class NewsletterSignupComponent implements OnInit {
  newsletterSignup: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.setupForm();
  }

  ngOnInit(): void {}

  private setupForm() {
    this.newsletterSignup = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }

  signupNewsletter() {
    this.http
      .post(
        'https://notiz-dev-api.herokuapp.com/subscribe',
        this.newsletterSignup.value
      )
      .pipe(first())
      .subscribe(console.log);
  }
}
