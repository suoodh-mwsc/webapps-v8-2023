/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MySubordinatesService } from './my-subordinates.service';

describe('Service: MySubordinates', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MySubordinatesService]
    });
  });

  it('should ...', inject([MySubordinatesService], (service: MySubordinatesService) => {
    expect(service).toBeTruthy();
  }));
});
