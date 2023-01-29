/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibServiceApplicationFormAttchmentComponent } from './clib-service-application-form-attchment.component';

describe('ClibServiceApplicationFormAttchmentComponent', () => {
  let component: ClibServiceApplicationFormAttchmentComponent;
  let fixture: ComponentFixture<ClibServiceApplicationFormAttchmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibServiceApplicationFormAttchmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibServiceApplicationFormAttchmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
