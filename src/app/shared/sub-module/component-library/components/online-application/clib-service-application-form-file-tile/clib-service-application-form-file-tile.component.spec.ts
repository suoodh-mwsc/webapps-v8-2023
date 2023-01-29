/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibServiceApplicationFormFileTileComponent } from './clib-service-application-form-file-tile.component';

describe('ClibServiceApplicationFormFileTileComponent', () => {
  let component: ClibServiceApplicationFormFileTileComponent;
  let fixture: ComponentFixture<ClibServiceApplicationFormFileTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibServiceApplicationFormFileTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibServiceApplicationFormFileTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
