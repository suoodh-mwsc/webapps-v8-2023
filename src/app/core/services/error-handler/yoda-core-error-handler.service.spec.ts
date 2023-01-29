/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YodaCoreErrorHandlerService } from './yoda-core-error-handler.service';

describe('Service: YodaCoreErrorHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YodaCoreErrorHandlerService]
    });
  });

  it('should ...', inject([YodaCoreErrorHandlerService], (service: YodaCoreErrorHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
