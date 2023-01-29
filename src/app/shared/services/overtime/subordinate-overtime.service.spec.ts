/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubordinateOvertimeService } from './subordinate-overtime.service';

describe('Service: SubordinateOvertime', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubordinateOvertimeService]
    });
  });

  it('should ...', inject([SubordinateOvertimeService], (service: SubordinateOvertimeService) => {
    expect(service).toBeTruthy();
  }));
});
