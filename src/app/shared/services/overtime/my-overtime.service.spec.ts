/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyOvertimeService } from './my-overtime.service';

describe('Service: MyOvertime', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyOvertimeService]
    });
  });

  it('should ...', inject([MyOvertimeService], (service: MyOvertimeService) => {
    expect(service).toBeTruthy();
  }));
});
