/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyDashboardService } from './my-dashboard.service';

describe('Service: MyDashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyDashboardService]
    });
  });

  it('should ...', inject([MyDashboardService], (service: MyDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
