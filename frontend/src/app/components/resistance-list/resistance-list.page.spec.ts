import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResistanceListPage } from './resistance-list.page';

describe('ResistanceListPage', () => {
  let component: ResistanceListPage;
  let fixture: ComponentFixture<ResistanceListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResistanceListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResistanceListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
