/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyStatisticsService } from './my-statistics.service';

describe('Service: MyStatistics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyStatisticsService]
    });
  });

  it('should ...', inject([MyStatisticsService], (service: MyStatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
