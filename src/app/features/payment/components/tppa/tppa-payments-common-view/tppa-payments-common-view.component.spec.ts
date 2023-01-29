/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TppaPaymentsCommonViewComponent } from './tppa-payments-common-view.component';

describe('TppaPaymentsCommonViewComponent', () => {
  let component: TppaPaymentsCommonViewComponent;
  let fixture: ComponentFixture<TppaPaymentsCommonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TppaPaymentsCommonViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TppaPaymentsCommonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
