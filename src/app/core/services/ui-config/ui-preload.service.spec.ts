/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UiPreloadService } from './ui-preload.service';

describe('Service: UiPreload', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiPreloadService]
    });
  });

  it('should ...', inject([UiPreloadService], (service: UiPreloadService) => {
    expect(service).toBeTruthy();
  }));
});
