/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyPriorApprovalService } from './my-prior-approval.service';

describe('Service: MyPriorApproval', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyPriorApprovalService]
    });
  });

  it('should ...', inject([MyPriorApprovalService], (service: MyPriorApprovalService) => {
    expect(service).toBeTruthy();
  }));
});
