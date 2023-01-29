/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExternalPaymentsService } from './external-payments.service';

describe('Service: ExternalPayments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExternalPaymentsService]
    });
  });

  it('should ...', inject([ExternalPaymentsService], (service: ExternalPaymentsService) => {
    expect(service).toBeTruthy();
  }));
});
