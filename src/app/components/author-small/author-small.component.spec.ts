import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorSmallComponent } from './author-small.component';

describe('AuthorSmallComponent', () => {
  let component: AuthorSmallComponent;
  let fixture: ComponentFixture<AuthorSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
