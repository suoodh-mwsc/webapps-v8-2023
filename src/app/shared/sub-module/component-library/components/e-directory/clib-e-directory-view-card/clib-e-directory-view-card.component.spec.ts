/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibEDirectoryViewCardComponent } from './clib-e-directory-view-card.component';

describe('ClibEDirectoryViewCardComponent', () => {
  let component: ClibEDirectoryViewCardComponent;
  let fixture: ComponentFixture<ClibEDirectoryViewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibEDirectoryViewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibEDirectoryViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
