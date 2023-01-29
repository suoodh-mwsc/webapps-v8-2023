/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibOvertimeAvatorRoundedCircleComponent } from './clib-overtime-avator-rounded-circle.component';

describe('ClibOvertimeAvatorRoundedCircleComponent', () => {
  let component: ClibOvertimeAvatorRoundedCircleComponent;
  let fixture: ComponentFixture<ClibOvertimeAvatorRoundedCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibOvertimeAvatorRoundedCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibOvertimeAvatorRoundedCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
