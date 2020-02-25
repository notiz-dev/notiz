import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogHeadlineComponent } from './blog-headline.component';

describe('BlogHeadlineComponent', () => {
  let component: BlogHeadlineComponent;
  let fixture: ComponentFixture<BlogHeadlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogHeadlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
