/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibOtPriorApprovalStatusDescriptionComponent } from './clib-ot-prior-approval-status-description.component';

describe('ClibOtPriorApprovalStatusDescriptionComponent', () => {
  let component: ClibOtPriorApprovalStatusDescriptionComponent;
  let fixture: ComponentFixture<ClibOtPriorApprovalStatusDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibOtPriorApprovalStatusDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibOtPriorApprovalStatusDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
