/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibDutyrosterShiftgroupViewCardComponent } from './clib-dutyroster-shiftgroup-view-card.component';

describe('ClibDutyrosterShiftgroupViewCardComponent', () => {
  let component: ClibDutyrosterShiftgroupViewCardComponent;
  let fixture: ComponentFixture<ClibDutyrosterShiftgroupViewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibDutyrosterShiftgroupViewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibDutyrosterShiftgroupViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
