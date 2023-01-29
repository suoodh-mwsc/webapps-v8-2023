/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalBaseService } from './global-base.service';

describe('Service: GlobalBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalBaseService]
    });
  });

  it('should ...', inject([GlobalBaseService], (service: GlobalBaseService) => {
    expect(service).toBeTruthy();
  }));
});
