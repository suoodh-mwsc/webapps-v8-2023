/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MultipleAccountPaymentsService } from './multiple-account-payments.service';

describe('Service: MultipleAccountPayments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultipleAccountPaymentsService]
    });
  });

  it('should ...', inject([MultipleAccountPaymentsService], (service: MultipleAccountPaymentsService) => {
    expect(service).toBeTruthy();
  }));
});
