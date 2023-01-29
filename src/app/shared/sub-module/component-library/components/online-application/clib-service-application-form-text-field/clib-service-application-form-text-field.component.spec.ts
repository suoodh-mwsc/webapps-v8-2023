/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibServiceApplicationFormTextFieldComponent } from './clib-service-application-form-text-field.component';

describe('ClibServiceApplicationFormTextFieldComponent', () => {
  let component: ClibServiceApplicationFormTextFieldComponent;
  let fixture: ComponentFixture<ClibServiceApplicationFormTextFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibServiceApplicationFormTextFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibServiceApplicationFormTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
