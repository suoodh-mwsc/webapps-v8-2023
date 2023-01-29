/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyPayslipService } from './my-payslip.service';

describe('Service: MyPayslip', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyPayslipService]
    });
  });

  it('should ...', inject([MyPayslipService], (service: MyPayslipService) => {
    expect(service).toBeTruthy();
  }));
});
