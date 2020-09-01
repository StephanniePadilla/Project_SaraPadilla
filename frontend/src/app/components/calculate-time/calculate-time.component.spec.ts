import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateTimeComponent } from './calculate-time.component';

describe('CalculateTimeComponent', () => {
  let component: CalculateTimeComponent;
  let fixture: ComponentFixture<CalculateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateTimeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
