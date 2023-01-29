/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StaffPortalAuthService } from './staff-portal-auth.service';

describe('Service: StaffPortalAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffPortalAuthService]
    });
  });

  it('should ...', inject([StaffPortalAuthService], (service: StaffPortalAuthService) => {
    expect(service).toBeTruthy();
  }));
});
