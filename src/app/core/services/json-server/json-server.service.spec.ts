/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JsonServerService } from './json-server.service';

describe('Service: JsonServer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonServerService]
    });
  });

  it('should ...', inject([JsonServerService], (service: JsonServerService) => {
    expect(service).toBeTruthy();
  }));
});
