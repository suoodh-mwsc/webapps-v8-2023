/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibLoadingXsComponent } from './clib-loading-xs.component';

describe('ClibLoadingXsComponent', () => {
  let component: ClibLoadingXsComponent;
  let fixture: ComponentFixture<ClibLoadingXsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibLoadingXsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibLoadingXsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
