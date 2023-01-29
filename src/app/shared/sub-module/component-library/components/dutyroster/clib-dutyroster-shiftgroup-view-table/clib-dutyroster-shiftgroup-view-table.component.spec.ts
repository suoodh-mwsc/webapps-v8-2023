/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibDutyrosterShiftgroupViewTableComponent } from './clib-dutyroster-shiftgroup-view-table.component';

describe('ClibDutyrosterShiftgroupViewTableComponent', () => {
  let component: ClibDutyrosterShiftgroupViewTableComponent;
  let fixture: ComponentFixture<ClibDutyrosterShiftgroupViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibDutyrosterShiftgroupViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibDutyrosterShiftgroupViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
