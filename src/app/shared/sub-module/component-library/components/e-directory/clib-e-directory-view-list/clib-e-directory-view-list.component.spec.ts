/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibEDirectoryViewListComponent } from './clib-e-directory-view-list.component';

describe('ClibEDirectoryViewListComponent', () => {
  let component: ClibEDirectoryViewListComponent;
  let fixture: ComponentFixture<ClibEDirectoryViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibEDirectoryViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibEDirectoryViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
