/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibLoadingMdComponent } from './clib-loading-md.component';

describe('ClibLoadingMdComponent', () => {
  let component: ClibLoadingMdComponent;
  let fixture: ComponentFixture<ClibLoadingMdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibLoadingMdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibLoadingMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
