/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormatLeaveRequestIdService } from './format-leave-request-id.service';

describe('Service: FormatLeaveRequestId', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormatLeaveRequestIdService]
    });
  });

  it('should ...', inject([FormatLeaveRequestIdService], (service: FormatLeaveRequestIdService) => {
    expect(service).toBeTruthy();
  }));
});
