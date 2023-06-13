import { TestBed } from '@angular/core/testing';

import { ProductSaleService } from './product-sale.service';

describe('ProductSaleService', () => {
  let service: ProductSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
