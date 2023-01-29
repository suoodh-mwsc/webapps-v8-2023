/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyLeaveService } from './my-leave.service';

describe('Service: MyLeave', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyLeaveService]
    });
  });

  it('should ...', inject([MyLeaveService], (service: MyLeaveService) => {
    expect(service).toBeTruthy();
  }));
});
