/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UiConfigService } from './ui-config.service';

describe('Service: UiConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiConfigService]
    });
  });

  it('should ...', inject([UiConfigService], (service: UiConfigService) => {
    expect(service).toBeTruthy();
  }));
});
