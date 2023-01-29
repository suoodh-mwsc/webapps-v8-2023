/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoreGlobalBaseService } from './core-global-base.service';

describe('Service: CoreGlobalBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoreGlobalBaseService]
    });
  });

  it('should ...', inject([CoreGlobalBaseService], (service: CoreGlobalBaseService) => {
    expect(service).toBeTruthy();
  }));
});
