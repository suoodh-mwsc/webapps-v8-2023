/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubordinatePriorApprovalService } from './subordinate-prior-approval.service';

describe('Service: SubordinatePriorApproval', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubordinatePriorApprovalService]
    });
  });

  it('should ...', inject([SubordinatePriorApprovalService], (service: SubordinatePriorApprovalService) => {
    expect(service).toBeTruthy();
  }));
});
