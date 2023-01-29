/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OnlinePaymentsService } from './online-payments.service';

describe('Service: OnlinePayments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlinePaymentsService]
    });
  });

  it('should ...', inject([OnlinePaymentsService], (service: OnlinePaymentsService) => {
    expect(service).toBeTruthy();
  }));
});
