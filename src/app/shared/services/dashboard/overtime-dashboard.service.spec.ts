/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OvertimeDashboardService } from './overtime-dashboard.service';

describe('Service: OvertimeDashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OvertimeDashboardService]
    });
  });

  it('should ...', inject([OvertimeDashboardService], (service: OvertimeDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
