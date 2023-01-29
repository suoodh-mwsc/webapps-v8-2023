/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibDutyrosterShiftgroupViewListComponent } from './clib-dutyroster-shiftgroup-view-list.component';

describe('ClibDutyrosterShiftgroupViewListComponent', () => {
  let component: ClibDutyrosterShiftgroupViewListComponent;
  let fixture: ComponentFixture<ClibDutyrosterShiftgroupViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibDutyrosterShiftgroupViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibDutyrosterShiftgroupViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
