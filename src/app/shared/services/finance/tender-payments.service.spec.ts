/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TenderPaymentsService } from './tender-payments.service';

describe('Service: TenderPayments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenderPaymentsService]
    });
  });

  it('should ...', inject([TenderPaymentsService], (service: TenderPaymentsService) => {
    expect(service).toBeTruthy();
  }));
});
