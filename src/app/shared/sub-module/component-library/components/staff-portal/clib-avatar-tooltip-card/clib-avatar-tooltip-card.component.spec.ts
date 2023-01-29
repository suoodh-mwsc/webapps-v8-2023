/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClibAvatarTooltipCardComponent } from './clib-avatar-tooltip-card.component';

describe('ClibAvatarTooltipCardComponent', () => {
  let component: ClibAvatarTooltipCardComponent;
  let fixture: ComponentFixture<ClibAvatarTooltipCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClibAvatarTooltipCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClibAvatarTooltipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
