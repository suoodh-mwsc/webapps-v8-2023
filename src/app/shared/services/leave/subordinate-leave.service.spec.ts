/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubordinateLeaveService } from './subordinate-leave.service';

describe('Service: SubordinateLeave', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubordinateLeaveService]
    });
  });

  it('should ...', inject([SubordinateLeaveService], (service: SubordinateLeaveService) => {
    expect(service).toBeTruthy();
  }));
});
