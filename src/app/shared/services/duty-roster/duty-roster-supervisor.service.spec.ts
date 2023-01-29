/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DutyRosterSupervisorService } from './duty-roster-supervisor.service';

describe('Service: DutyRosterSupervisor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DutyRosterSupervisorService]
    });
  });

  it('should ...', inject([DutyRosterSupervisorService], (service: DutyRosterSupervisorService) => {
    expect(service).toBeTruthy();
  }));
});
