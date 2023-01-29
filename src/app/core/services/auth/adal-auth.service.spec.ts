/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdalAuthService } from './adal-auth.service';

describe('Service: AdalAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdalAuthService]
    });
  });

  it('should ...', inject([AdalAuthService], (service: AdalAuthService) => {
    expect(service).toBeTruthy();
  }));
});
