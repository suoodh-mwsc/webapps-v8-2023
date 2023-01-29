/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibEDirectoryViewTableComponent } from './clib-e-directory-view-table.component';

describe('ClibEDirectoryViewTableComponent', () => {
  let component: ClibEDirectoryViewTableComponent;
  let fixture: ComponentFixture<ClibEDirectoryViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibEDirectoryViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibEDirectoryViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
