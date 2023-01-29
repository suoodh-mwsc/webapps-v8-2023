/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubordinateStatisticsService } from './subordinate-statistics.service';

describe('Service: SubordinateStatistics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubordinateStatisticsService]
    });
  });

  it('should ...', inject([SubordinateStatisticsService], (service: SubordinateStatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
