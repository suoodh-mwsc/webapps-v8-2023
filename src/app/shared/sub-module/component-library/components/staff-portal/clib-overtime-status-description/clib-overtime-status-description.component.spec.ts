/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibOvertimeStatusDescriptionComponent } from './clib-overtime-status-description.component';

describe('ClibOvertimeStatusDescriptionComponent', () => {
  let component: ClibOvertimeStatusDescriptionComponent;
  let fixture: ComponentFixture<ClibOvertimeStatusDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibOvertimeStatusDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibOvertimeStatusDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
