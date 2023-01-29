/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DutyRosterCommonService } from './duty-roster-common.service';

describe('Service: DutyRosterCommon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DutyRosterCommonService]
    });
  });

  it('should ...', inject([DutyRosterCommonService], (service: DutyRosterCommonService) => {
    expect(service).toBeTruthy();
  }));
});
