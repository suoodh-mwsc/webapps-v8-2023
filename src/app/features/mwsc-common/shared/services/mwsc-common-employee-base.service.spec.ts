/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MwscCommonEmployeeBaseService } from './mwsc-common-employee-base.service';

describe('Service: MwscCommonEmployeeBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MwscCommonEmployeeBaseService]
    });
  });

  it('should ...', inject([MwscCommonEmployeeBaseService], (service: MwscCommonEmployeeBaseService) => {
    expect(service).toBeTruthy();
  }));
});
