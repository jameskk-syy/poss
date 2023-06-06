import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSalesManagementComponent } from './product-sales-management.component';

describe('ProductSalesManagementComponent', () => {
  let component: ProductSalesManagementComponent;
  let fixture: ComponentFixture<ProductSalesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSalesManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSalesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
