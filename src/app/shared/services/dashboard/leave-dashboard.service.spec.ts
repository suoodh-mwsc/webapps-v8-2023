/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LeaveDashboardService } from './leave-dashboard.service';

describe('Service: LeaveDashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveDashboardService]
    });
  });

  it('should ...', inject([LeaveDashboardService], (service: LeaveDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
