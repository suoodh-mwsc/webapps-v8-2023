/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MultipleAcPaymentsCommonViewComponent } from './multiple-ac-payments-common-view.component';

describe('MultipleAcPaymentsCommonViewComponent', () => {
  let component: MultipleAcPaymentsCommonViewComponent;
  let fixture: ComponentFixture<MultipleAcPaymentsCommonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleAcPaymentsCommonViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleAcPaymentsCommonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
