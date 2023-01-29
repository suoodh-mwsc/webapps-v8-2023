/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PendingPriorApprovalService } from './pending-prior-approval.service';

describe('Service: PendingPriorApproval', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendingPriorApprovalService]
    });
  });

  it('should ...', inject([PendingPriorApprovalService], (service: PendingPriorApprovalService) => {
    expect(service).toBeTruthy();
  }));
});
