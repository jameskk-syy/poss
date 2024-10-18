import { TestBed } from '@angular/core/testing';

import { SalespersonsService } from './salespersons.service';

describe('SalespersonsService', () => {
  let service: SalespersonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalespersonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
