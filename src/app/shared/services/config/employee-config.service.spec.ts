/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeeConfigService } from './employee-config.service';

describe('Service: EmployeeConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeConfigService]
    });
  });

  it('should ...', inject([EmployeeConfigService], (service: EmployeeConfigService) => {
    expect(service).toBeTruthy();
  }));
});
