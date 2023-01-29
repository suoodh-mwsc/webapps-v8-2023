/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExternalPaymentsCommonViewComponent } from './external-payments-common-view.component';

describe('ExternalPaymentsCommonViewComponent', () => {
  let component: ExternalPaymentsCommonViewComponent;
  let fixture: ComponentFixture<ExternalPaymentsCommonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalPaymentsCommonViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalPaymentsCommonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
