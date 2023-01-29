/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MwscCommonAboutComponent } from './mwsc-common-about.component';

describe('MwscCommonAboutComponent', () => {
  let component: MwscCommonAboutComponent;
  let fixture: ComponentFixture<MwscCommonAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwscCommonAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwscCommonAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
