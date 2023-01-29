/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibOtPriorApprovalAvatorRoundedCircleComponent } from './clib-ot-prior-approval-avator-rounded-circle.component';

describe('ClibOtPriorApprovalAvatorRoundedCircleComponent', () => {
  let component: ClibOtPriorApprovalAvatorRoundedCircleComponent;
  let fixture: ComponentFixture<ClibOtPriorApprovalAvatorRoundedCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibOtPriorApprovalAvatorRoundedCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibOtPriorApprovalAvatorRoundedCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
