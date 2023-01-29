/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubordinateCalendarService } from './subordinate-calendar.service';

describe('Service: SubordinateCalendar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubordinateCalendarService]
    });
  });

  it('should ...', inject([SubordinateCalendarService], (service: SubordinateCalendarService) => {
    expect(service).toBeTruthy();
  }));
});
