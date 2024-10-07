import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseProductsComponent } from './warehouse-products.component';

describe('WarehouseProductsComponent', () => {
  let component: WarehouseProductsComponent;
  let fixture: ComponentFixture<WarehouseProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
