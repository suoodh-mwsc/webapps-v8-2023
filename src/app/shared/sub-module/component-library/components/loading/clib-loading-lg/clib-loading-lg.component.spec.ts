/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibLoadingLgComponent } from './clib-loading-lg.component';

describe('ClibLoadingLgComponent', () => {
  let component: ClibLoadingLgComponent;
  let fixture: ComponentFixture<ClibLoadingLgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibLoadingLgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibLoadingLgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
