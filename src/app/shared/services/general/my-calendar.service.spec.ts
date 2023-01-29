/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyCalendarService } from './my-calendar.service';

describe('Service: MyCalendar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyCalendarService]
    });
  });

  it('should ...', inject([MyCalendarService], (service: MyCalendarService) => {
    expect(service).toBeTruthy();
  }));
});
