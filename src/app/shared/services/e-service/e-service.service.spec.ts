/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EServiceService } from './e-service.service';

describe('Service: EService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EServiceService]
    });
  });

  it('should ...', inject([EServiceService], (service: EServiceService) => {
    expect(service).toBeTruthy();
  }));
});
