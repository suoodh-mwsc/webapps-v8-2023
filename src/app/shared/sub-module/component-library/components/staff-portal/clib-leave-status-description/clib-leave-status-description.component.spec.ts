/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibLeaveStatusDescriptionComponent } from './clib-leave-status-description.component';

describe('ClibLeaveStatusDescriptionComponent', () => {
  let component: ClibLeaveStatusDescriptionComponent;
  let fixture: ComponentFixture<ClibLeaveStatusDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibLeaveStatusDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibLeaveStatusDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
