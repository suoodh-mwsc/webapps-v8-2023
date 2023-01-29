/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibLeaveAvatorRoundedCircleComponent } from './clib-leave-avator-rounded-circle.component';

describe('ClibLeaveAvatorRoundedCircleComponent', () => {
  let component: ClibLeaveAvatorRoundedCircleComponent;
  let fixture: ComponentFixture<ClibLeaveAvatorRoundedCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibLeaveAvatorRoundedCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibLeaveAvatorRoundedCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
