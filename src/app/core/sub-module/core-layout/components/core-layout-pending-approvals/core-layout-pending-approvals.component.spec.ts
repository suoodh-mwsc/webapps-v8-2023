/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoreLayoutPendingApprovalsComponent } from './core-layout-pending-approvals.component';

describe('CoreLayoutPendingApprovalsComponent', () => {
  let component: CoreLayoutPendingApprovalsComponent;
  let fixture: ComponentFixture<CoreLayoutPendingApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreLayoutPendingApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreLayoutPendingApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
