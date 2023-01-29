/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YodaCoreApiBaseService } from './yoda-core-api-base.service';

describe('Service: YodaCoreApiBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YodaCoreApiBaseService]
    });
  });

  it('should ...', inject([YodaCoreApiBaseService], (service: YodaCoreApiBaseService) => {
    expect(service).toBeTruthy();
  }));
});
