/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyWorkHandoverService } from './my-work-handover.service';

describe('Service: MyWorkHandover', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyWorkHandoverService]
    });
  });

  it('should ...', inject([MyWorkHandoverService], (service: MyWorkHandoverService) => {
    expect(service).toBeTruthy();
  }));
});
