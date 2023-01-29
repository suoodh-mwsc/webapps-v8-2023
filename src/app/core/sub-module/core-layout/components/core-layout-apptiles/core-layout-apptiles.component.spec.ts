/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoreLayoutApptilesComponent } from './core-layout-apptiles.component';

describe('CoreLayoutApptilesComponent', () => {
  let component: CoreLayoutApptilesComponent;
  let fixture: ComponentFixture<CoreLayoutApptilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreLayoutApptilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreLayoutApptilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
