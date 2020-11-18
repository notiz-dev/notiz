import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NizToolbar } from './toolbar.component';

describe('NizToolbar', () => {
  let component: NizToolbar;
  let fixture: ComponentFixture<NizToolbar>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NizToolbar],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NizToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
