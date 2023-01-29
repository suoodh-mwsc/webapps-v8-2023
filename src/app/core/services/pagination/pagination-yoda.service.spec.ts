/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaginationYodaService } from './pagination-yoda.service';

describe('Service: PaginationYoda', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationYodaService]
    });
  });

  it('should ...', inject([PaginationYodaService], (service: PaginationYodaService) => {
    expect(service).toBeTruthy();
  }));
});
