/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TppaPaymentsService } from './tppa-payments.service';

describe('Service: TppaPayments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TppaPaymentsService]
    });
  });

  it('should ...', inject([TppaPaymentsService], (service: TppaPaymentsService) => {
    expect(service).toBeTruthy();
  }));
});
