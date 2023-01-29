/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EServiceApplicationService } from './e-service-application.service';

describe('Service: EServiceApplication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EServiceApplicationService]
    });
  });

  it('should ...', inject([EServiceApplicationService], (service: EServiceApplicationService) => {
    expect(service).toBeTruthy();
  }));
});
