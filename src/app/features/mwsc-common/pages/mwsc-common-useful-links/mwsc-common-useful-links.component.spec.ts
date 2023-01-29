/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MwscCommonUsefulLinksComponent } from './mwsc-common-useful-links.component';

describe('MwscCommonUsefulLinksComponent', () => {
  let component: MwscCommonUsefulLinksComponent;
  let fixture: ComponentFixture<MwscCommonUsefulLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwscCommonUsefulLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwscCommonUsefulLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
