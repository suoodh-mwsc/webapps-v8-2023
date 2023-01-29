/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DutyRosterHrService } from './duty-roster-hr.service';

describe('Service: DutyRosterHr', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DutyRosterHrService]
    });
  });

  it('should ...', inject([DutyRosterHrService], (service: DutyRosterHrService) => {
    expect(service).toBeTruthy();
  }));
});
