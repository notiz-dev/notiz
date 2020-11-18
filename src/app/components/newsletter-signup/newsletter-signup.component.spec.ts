import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewsletterSignupComponent } from './newsletter-signup.component';

describe('NewsletterSignupComponent', () => {
  let component: NewsletterSignupComponent;
  let fixture: ComponentFixture<NewsletterSignupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NewsletterSignupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
