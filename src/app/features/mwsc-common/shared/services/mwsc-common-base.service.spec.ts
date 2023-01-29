/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MwscCommonBaseService } from './mwsc-common-base.service';

describe('Service: MwscCommonBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MwscCommonBaseService]
    });
  });

  it('should ...', inject([MwscCommonBaseService], (service: MwscCommonBaseService) => {
    expect(service).toBeTruthy();
  }));
});
