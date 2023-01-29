/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PendingLeaveApprovalService } from './pending-leave-approval.service';

describe('Service: PendingLeaveApproval', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendingLeaveApprovalService]
    });
  });

  it('should ...', inject([PendingLeaveApprovalService], (service: PendingLeaveApprovalService) => {
    expect(service).toBeTruthy();
  }));
});
