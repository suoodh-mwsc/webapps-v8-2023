/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibLoadingXlComponent } from './clib-loading-xl.component';

describe('ClibLoadingXlComponent', () => {
  let component: ClibLoadingXlComponent;
  let fixture: ComponentFixture<ClibLoadingXlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibLoadingXlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibLoadingXlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
