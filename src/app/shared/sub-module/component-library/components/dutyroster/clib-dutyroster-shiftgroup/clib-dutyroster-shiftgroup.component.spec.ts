/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibDutyrosterShiftgroupComponent } from './clib-dutyroster-shiftgroup.component';

describe('ClibDutyrosterShiftgroupComponent', () => {
  let component: ClibDutyrosterShiftgroupComponent;
  let fixture: ComponentFixture<ClibDutyrosterShiftgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibDutyrosterShiftgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibDutyrosterShiftgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
