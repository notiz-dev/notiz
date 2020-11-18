import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NizTabs } from './tabs.component';

describe('NizTabs', () => {
  let component: NizTabs;
  let fixture: ComponentFixture<NizTabs>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NizTabs],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NizTabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
