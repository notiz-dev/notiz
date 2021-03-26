import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InlineSvgComponent } from './inline-svg.component';

describe('InlineSvgComponent', () => {
  let component: InlineSvgComponent;
  let fixture: ComponentFixture<InlineSvgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
