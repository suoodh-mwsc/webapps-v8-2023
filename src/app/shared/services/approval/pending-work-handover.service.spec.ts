/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PendingWorkHandoverService } from './pending-work-handover.service';

describe('Service: PendingWorkHandover', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendingWorkHandoverService]
    });
  });

  it('should ...', inject([PendingWorkHandoverService], (service: PendingWorkHandoverService) => {
    expect(service).toBeTruthy();
  }));
});
