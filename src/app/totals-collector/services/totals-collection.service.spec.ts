import { TestBed } from '@angular/core/testing';

import { TotalsCollectionService } from './totals-collection.service';

describe('TotalsCollectionService', () => {
  let service: TotalsCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalsCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
