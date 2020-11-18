import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewsletterConfirmComponent } from './newsletter-confirm.component';

describe('NewsletterConfirmComponent', () => {
  let component: NewsletterConfirmComponent;
  let fixture: ComponentFixture<NewsletterConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NewsletterConfirmComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
