/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UiBaseService } from './ui-base.service';

describe('Service: UiBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiBaseService]
    });
  });

  it('should ...', inject([UiBaseService], (service: UiBaseService) => {
    expect(service).toBeTruthy();
  }));
});
