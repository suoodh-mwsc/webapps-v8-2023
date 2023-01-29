/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyLetterService } from './my-letter.service';

describe('Service: MyLetter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyLetterService]
    });
  });

  it('should ...', inject([MyLetterService], (service: MyLetterService) => {
    expect(service).toBeTruthy();
  }));
});
