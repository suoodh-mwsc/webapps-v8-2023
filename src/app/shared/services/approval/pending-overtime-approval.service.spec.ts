/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PendingOvertimeApprovalService } from './pending-overtime-approval.service';

describe('Service: PendingOvertimeApproval', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendingOvertimeApprovalService]
    });
  });

  it('should ...', inject([PendingOvertimeApprovalService], (service: PendingOvertimeApprovalService) => {
    expect(service).toBeTruthy();
  }));
});
