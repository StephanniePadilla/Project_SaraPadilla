import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementListPage } from './measurement-list.page';

describe('MeasurementListPage', () => {
  let component: MeasurementListPage;
  let fixture: ComponentFixture<MeasurementListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
